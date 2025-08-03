// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script} from "forge-std/Script.sol";

/**
 * @title DeploymentConfig - 部署配置合约
 * @notice 存储不同网络的部署参数
 */
contract DeploymentConfig is Script {
    struct NetworkConfig {
        address limitOrderProtocol;  // 1inch Limit Order Protocol 地址
        address feeToken;           // 费用代币地址 (通常是 USDC 或 USDT)
        address accessToken;        // 访问代币地址
        address owner;              // 合约所有者地址
        uint32 rescueDelaySrc;      // 源链救援延迟 (秒)
        uint32 rescueDelayDst;      // 目标链救援延迟 (秒)
    }

    NetworkConfig public activeNetworkConfig;

    mapping(uint256 => NetworkConfig) public networkConfigs;

    constructor() {
        // Ethereum Mainnet
        networkConfigs[1] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65, // 1inch v5 Router
            feeToken: 0xA0b86a33e6441b8dB8C847221F9a61AE5Fe3B4a6,        // USDC
            accessToken: 0xA0b86a33e6441b8dB8C847221F9a61AE5Fe3B4a6,     // can be set to other token
            owner: msg.sender,
            rescueDelaySrc: 24 hours,
            rescueDelayDst: 12 hours
        });

        // Polygon
        networkConfigs[137] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65,
            feeToken: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174,        // USDC on Polygon
            accessToken: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174,
            owner: msg.sender,
            rescueDelaySrc: 24 hours,
            rescueDelayDst: 12 hours
        });

        // Arbitrum One
        networkConfigs[42161] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65,
            feeToken: 0xaf88d065e77c8cC2239327C5EDb3A432268e5831,        // USDC on Arbitrum
            accessToken: 0xaf88d065e77c8cC2239327C5EDb3A432268e5831,
            owner: msg.sender,
            rescueDelaySrc: 24 hours,
            rescueDelayDst: 12 hours
        });

        // BSC
        networkConfigs[56] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65,
            feeToken: 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d,        // USDC on BSC
            accessToken: 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d,
            owner: msg.sender,
            rescueDelaySrc: 24 hours,
            rescueDelayDst: 12 hours
        });

        // Base
        networkConfigs[8453] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65,
            feeToken: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913,        // USDC on Base
            accessToken: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913,
            owner: msg.sender,
            rescueDelaySrc: 24 hours,
            rescueDelayDst: 12 hours
        });

        // Sepolia Testnet (for testing)
        networkConfigs[11155111] = NetworkConfig({
            limitOrderProtocol: 0x111111125421cA6dc452d289314280a0f8842A65, // may need to adjust for testnet
            feeToken: 0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5,        // testnet USDC
            accessToken: 0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5,
            owner: msg.sender,
            rescueDelaySrc: 1 hours,   // shorter delay for testnet
            rescueDelayDst: 30 minutes
        });

        // Local network/Anvil
        networkConfigs[31337] = NetworkConfig({
            limitOrderProtocol: address(0x1), // need to deploy locally or use mock
            feeToken: address(0x2),
            accessToken: address(0x3),
            owner: msg.sender,
            rescueDelaySrc: 1 hours,
            rescueDelayDst: 30 minutes
        });

        // Set active network config
        uint256 currentChainId = block.chainid;
        activeNetworkConfig = networkConfigs[currentChainId];
        
        // If no config for current chain, use default config
        if (activeNetworkConfig.limitOrderProtocol == address(0) && currentChainId != 31337) {
            activeNetworkConfig = NetworkConfig({
                limitOrderProtocol: address(0x1), // need to set manually
                feeToken: address(0x2),
                accessToken: address(0x3),
                owner: msg.sender,
                rescueDelaySrc: 24 hours,
                rescueDelayDst: 12 hours
            });
        }
    }

    function getActiveNetworkConfig() public view returns (NetworkConfig memory) {
        return activeNetworkConfig;
    }

    function getNetworkConfig(uint256 chainId) public view returns (NetworkConfig memory) {
        return networkConfigs[chainId];
    }
}