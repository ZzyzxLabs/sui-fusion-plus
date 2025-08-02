import { NetworkEnum } from '@1inch/fusion-sdk';

export const config = {
    srcChainId: NetworkEnum.ETHEREUM, // Using Sepolia for testing
    dstChainId: 99999, // Placeholder for SUI chain ID, as it's not in NetworkEnum
    srcWithdrawal: 10n, // Default value
    srcPublicWithdrawal: 120n, // Default value
    srcCancellation: 121n, // Default value
    srcPublicCancellation: 122n, // Default value
    dstWithdrawal: 20n, // Default value
    dstPublicWithdrawal: 100n, // Default value
    dstCancellation: 101n // Default value
};