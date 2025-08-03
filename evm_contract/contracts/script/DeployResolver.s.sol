// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {Resolver} from "../src/Resolver.sol";
import {DeploymentConfig} from "./DeploymentConfig.sol";
import {IEscrowFactory} from "../lib/cross-chain-swap/contracts/interfaces/IEscrowFactory.sol";
import {IOrderMixin} from "limit-order-protocol/contracts/interfaces/IOrderMixin.sol";

/**
 * @title DeployResolver
 * @notice 部署 Resolver 合約
 * 
 * 注意: 需要先部署 EscrowFactory 或者提供現有的 EscrowFactory 地址
 * 
 * 使用方法:
 * 1. 如果已經有 EscrowFactory 地址:
 *    forge script script/DeployResolver.s.sol:DeployResolver --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast --verify
 * 
 * 2. 如果需要讀取環境變數中的 EscrowFactory 地址:
 *    export ESCROW_FACTORY_ADDRESS=0x...
 *    forge script script/DeployResolver.s.sol:DeployResolver --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
 */
contract DeployResolver is Script {
    Resolver public resolver;
    DeploymentConfig public deploymentConfig;

    function setUp() public {}

    function run() public {
        // 獲取部署配置
        deploymentConfig = new DeploymentConfig();
        DeploymentConfig.NetworkConfig memory config = deploymentConfig.getActiveNetworkConfig();

        // 獲取 EscrowFactory 地址
        address escrowFactoryAddress = _getEscrowFactoryAddress();
        
        // 驗證配置
        require(config.limitOrderProtocol != address(0), "limitOrderProtocol address not set");
        require(config.owner != address(0), "owner address not set");
        require(escrowFactoryAddress != address(0), "escrowFactory address not set");

        console.log("=== Deployment Configuration ===");
        console.log("Chain ID:", block.chainid);
        console.log("Deployer:", msg.sender);
        console.log("EscrowFactory:", escrowFactoryAddress);
        console.log("Limit Order Protocol:", config.limitOrderProtocol);
        console.log("Initial Owner:", config.owner);
        console.log("===============================");

        // 開始廣播交易
        vm.startBroadcast();

        // 部署 Resolver
        resolver = new Resolver(
            IEscrowFactory(escrowFactoryAddress),
            IOrderMixin(config.limitOrderProtocol),
            config.owner
        );

        vm.stopBroadcast();

        // 輸出部署結果
        console.log("=== Deployment Results ===");
        console.log("Resolver deployed at:", address(resolver));
        console.log("Transaction hash will be shown by forge");
        console.log("=========================");

        // 驗證部署
        _verifyDeployment(escrowFactoryAddress, config);
    }

    function _getEscrowFactoryAddress() internal view returns (address) {
        // 1. 嘗試從環境變數獲取
        try vm.envAddress("ESCROW_FACTORY_ADDRESS") returns (address factoryAddr) {
            if (factoryAddr != address(0)) {
                console.log("Using EscrowFactory from environment:", factoryAddr);
                return factoryAddr;
            }
        } catch {
            // 環境變數不存在或無效，繼續下一步
        }

        // 2. 如果環境變數沒有設置，提示用戶
        console.log("WARNING: ESCROW_FACTORY_ADDRESS not set in environment");
        console.log("Please set the EscrowFactory address:");
        console.log("export ESCROW_FACTORY_ADDRESS=0x...");
        console.log("");
        console.log("Or deploy EscrowFactory first using:");
        console.log("forge script script/DeployEscrowFactory.s.sol:DeployEscrowFactory");
        console.log("  --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast");
        
        revert("EscrowFactory address required");
    }

    function _verifyDeployment(
        address escrowFactoryAddress,
        DeploymentConfig.NetworkConfig memory config
    ) internal view {
        console.log("=== Verifying Deployment ===");
        
        // 基本驗證
        require(address(resolver) != address(0), "Resolver deployment failed");
        require(address(resolver).code.length > 0, "Resolver has no code");
        
        // 驗證所有者
        try resolver.owner() returns (address owner) {
            require(owner == config.owner, "Owner mismatch");
            console.log("Owner set correctly:", owner);
        } catch {
            console.log("Could not verify owner");
        }
        
        console.log("Contract deployed successfully");
        console.log("Contract has bytecode");
        console.log("============================");
    }

    // Helper function to get the deployed resolver address (for other scripts)
    function getDeployedResolver() public view returns (address) {
        return address(resolver);
    }
}