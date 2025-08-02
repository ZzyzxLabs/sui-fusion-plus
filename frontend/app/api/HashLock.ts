/**
 * @fileoverview A TypeScript library for implementing a HashLock mechanism
 * tailored for cross-chain interactions (e.g., Ethereum and Sui).
 * This library provides functions to create hash commitments and verify them
 * using a preimage (secret), and to generate Merkle tree structures for
 * multiple-fill scenarios.
 *
 * It now uses `keccak256` from the 'ethers' library for hashing to ensure
 * consistency with Ethereum's hashing standard, which can be beneficial
 * for projects bridging between EVM and Sui.
 * It continues to use @mysten/sui for BCS serialization (where applicable for Sui-specific data structures)
 * and @openzeppelin/merkle-tree for Merkle tree operations.
 */

// Import keccak256 from ethers for consistent hashing with EVM chains
import { keccak256 } from 'ethers';
// Keep Sui-specific utilities for type checking and BCS serialization
// Corrected import for fromHex (formerly hexToBytes)
import { fromHex } from '@mysten/sui/utils';
import { bcs } from '@mysten/sui/bcs';
import { SimpleMerkleTree } from '@openzeppelin/merkle-tree';
import assert from 'assert';

/**
 * Type alias for a Merkle tree leaf, which is a hex-encoded string representing a hash.
 * The `_tag` is a nominal type to distinguish it from a regular string.
 */
export type MerkleLeaf = string & { _tag: 'MerkleLeaf' };

/**
 * Helper function to check if a string is a valid hex string with a '0x' prefix.
 * This replaces the removed `isHex` utility from `@mysten/sui/utils`.
 *
 * @param value The string to check.
 * @param byteLength Optional. If provided, checks if the hex string represents this exact byte length.
 * @returns True if the string is a valid hex string (and matches byteLength if provided), false otherwise.
 */
function isHexString(value: string, byteLength?: number): boolean {
    if (typeof value !== 'string' || !value.startsWith('0x')) {
        return false;
    }
    const hex = value.slice(2);
    if (byteLength !== undefined && hex.length !== byteLength * 2) {
        return false;
    }
    return /^[0-9a-fA-F]*$/.test(hex);
}

/**
 * Represents a HashLock, typically a 32-byte hex-encoded hash.
 * In a Sui Move contract, this would correspond to a `vector<u8>` or `address` type
 * depending on how you choose to represent the hash on-chain.
 */
export class HashLock {
    // Note: Web3Type is removed as it's EVM-specific.
    // Sui types would be defined in your Move contract.

    private readonly value: string; // The 32-byte hex-encoded hash

    protected constructor(val: string) {
        this.value = val;
    }

    /**
     * Generates a Keccak256 hash of a given secret.
     * The secret is expected to be a 32-byte hex-encoded string.
     *
     * @param secret The 32-byte hex-encoded secret (preimage) to hash.
     * @returns The 32-byte hex-encoded Keccak256 hash of the secret.
     */
    public static hashSecret(secret: string): string {
        // Use the custom isHexString validator
        assert(
            isHexString(secret, 32), // Ensure it's a 32-byte hex string
            'secret length must be 32 bytes hex encoded and start with 0x'
        );

        // Using keccak256 from ethers for consistency with EVM
        return keccak256(secret);
    }

    /**
     * Generates Merkle tree leaves from a list of secrets.
     * Each leaf is a Keccak256 hash of the BCS-serialized concatenation
     * of its index (u64) and the Keccak256 hash of the secret (bytes32).
     *
     * @param secrets An array of 32-byte hex-encoded secrets.
     * @returns An array of MerkleLeaf (hex-encoded hash strings).
     */
    public static getMerkleLeaves(secrets: string[]): MerkleLeaf[] {
        return HashLock.getMerkleLeavesFromSecretHashes(
            secrets.map(HashLock.hashSecret)
        );
    }

    /**
     * Generates Merkle tree leaves from a list of pre-hashed secrets.
     * Each leaf is a Keccak256 hash of the BCS-serialized concatenation
     * of its index (u64) and the secret hash (bytes32).
     *
     * @param secretHashes An array of 32-byte hex-encoded secret hashes.
     * @returns An array of MerkleLeaf (hex-encoded hash strings).
     */
    public static getMerkleLeavesFromSecretHashes(
        secretHashes: string[]
    ): MerkleLeaf[] {
        return secretHashes.map(
            (secretHash, idx) => {
                // Serialize index (u64) and secret hash (vector<u8> of length 32) using BCS.
                // The order and types here should match how you'd serialize on-chain in Move.
                const serializedIndex = bcs.u64().serialize(BigInt(idx)).toBytes();
                // Use fromHex to convert the hex string to Uint8Array
                const serializedSecretHash = fromHex(secretHash);

                // Concatenate the serialized bytes and hash them to form the leaf using Keccak256.
                // Note: keccak256 from ethers expects a hex string or Uint8Array.
                // We convert the concatenated bytes back to hex for keccak256.
                const leafBytes = new Uint8Array([...serializedIndex, ...serializedSecretHash]);
                const leafHex = '0x' + Array.from(leafBytes).map(b => b.toString(16).padStart(2, '0')).join('');
                return keccak256(leafHex) as MerkleLeaf;
            }
        );
    }

    /**
     * Computes the Merkle proof for a specific leaf at a given index.
     *
     * @param leaves An array of MerkleLeaf (hex-encoded hash strings) representing all leaves.
     * @param idx The index of the leaf for which to generate the proof.
     * @returns An array of MerkleLeaf representing the Merkle proof.
     */
    public static getProof(leaves: string[], idx: number): MerkleLeaf[] {
        return SimpleMerkleTree.of(leaves).getProof(idx) as MerkleLeaf[];
    }

    /**
     * Creates a HashLock instance from a 32-byte hex-encoded string.
     *
     * @param value The 32-byte hex-encoded hash string.
     * @returns A new HashLock instance.
     */
    public static fromString(value: string): HashLock {
        // Use the custom isHexString validator
        assert(
            isHexString(value, 32), // Ensure it's a 32-byte hex string
            'HashLock value must be 32 bytes hex encoded and start with 0x'
        );

        return new HashLock(value);
    }

    /**
     * Creates a HashLock for a single-fill scenario by hashing a secret.
     * This is equivalent to the root of a Merkle tree with a single leaf.
     *
     * @param secret The 32-byte hex-encoded secret.
     * @returns A HashLock instance representing the hash of the secret.
     */
    public static forSingleFill(secret: string): HashLock {
        return new HashLock(HashLock.hashSecret(secret));
    }

    /**
     * Creates a HashLock for multiple-fill scenarios using a Merkle tree.
     * The HashLock value will be the Merkle root of the provided leaves.
     * Note: The `partsCount` encoding from the 1inch version is removed,
     * as this is an EVM-specific optimization. For Sui, `partsCount`
     * would typically be managed as a separate field in your Move contract.
     *
     * @param leaves An array of MerkleLeaf (hex-encoded hash strings) for the tree.
     * @returns A HashLock instance representing the Merkle root.
     */
    public static forMultipleFills(leaves: MerkleLeaf[]): HashLock {
        // For a single leaf, forSingleFill should be used.
        // For two leaves, a direct hash of their concatenation might be simpler
        // than a full Merkle tree, but using MerkleTree.of handles it.
        assert(
            leaves.length >= 1, // Changed from > 2, as SimpleMerkleTree can handle 1 or more.
            'leaves array must contain at least 1 leaf. Use HashLock.forSingleFill for single leaves.'
        );
        const root = SimpleMerkleTree.of(leaves).root;

        // In the 1inch version, `partsCount` was encoded into the root.
        // This is removed for Sui as it's an EVM-specific gas optimization.
        // `partsCount` should be a separate field in your Move contract if needed.
        return new HashLock(root);
    }

    public toString(): string {
        return this.value;
    }

    public eq(other: HashLock): boolean {
        return this.value === other.value;
    }

}
/**
 * This method is removed as it was tied to the EVM-specific `BitMask`
 * encoding of `partsCount` within the Merkle root.
 * For Sui, `partsCount` would be a separate field in your Move contra
**/