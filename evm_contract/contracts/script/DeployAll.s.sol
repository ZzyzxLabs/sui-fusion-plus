// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {TestEscrowFactory} from "../src/TestEscrowFactory.sol";
import {Resolver} from "../src/Resolver.sol";
import {DeploymentConfig} from "./DeploymentConfig.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IEscrowFactory} from "../lib/cross-chain-swap/contracts/interfaces/IEscrowFactory.sol";
import {IOrderMixin} from "limit-order-protocol/contracts/interfaces/IOrderMixin.sol";

/**
 * @title DeployAll
 * @notice 一次性部署 EscrowFactory 和 Resolver 合約
 * 
 * 使用方法:
 * forge script script/DeployAll.s.sol:DeployAll --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast --verify
 * 
 * 或者使用環境變數:
 * forge script script/DeployAll.s.sol:DeployAll --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
 */
contract DeployAll is Script {
    TestEscrowFactory public escrowFactory;
    Resolver public resolver;
    DeploymentConfig public deploymentConfig;

    function setUp() public {}

    function run() public {
        // 獲取部署配置
        deploymentConfig = new DeploymentConfig();
        DeploymentConfig.NetworkConfig memory config = deploymentConfig.getActiveNetworkConfig();

        // 驗證配置
        require(config.limitOrderProtocol != address(0), "limitOrderProtocol address not set");
        require(config.feeToken != address(0), "feeToken address not set");
        require(config.accessToken != address(0), "accessToken address not set");
        require(config.owner != address(0), "owner address not set");

        console.log("=== Deployment Configuration ===");
        console.log("Chain ID:", block.chainid);
        console.log("Deployer:", msg.sender);
        console.log("Limit Order Protocol:", config.limitOrderProtocol);
        console.log("Fee Token:", config.feeToken);
        console.log("Access Token:", config.accessToken);
        console.log("Owner:", config.owner);
        console.log("Rescue Delay Src:", config.rescueDelaySrc);
        console.log("Rescue Delay Dst:", config.rescueDelayDst);
        console.log("===============================");

        // 開始廣播交易
        vm.startBroadcast();

        // 1. 部署 TestEscrowFactory
        console.log("Deploying TestEscrowFactory...");
        escrowFactory = new TestEscrowFactory(
            config.limitOrderProtocol,
            IERC20(config.feeToken),
            IERC20(config.accessToken),
            config.owner,
            config.rescueDelaySrc,
            config.rescueDelayDst
        );

        console.log("TestEscrowFactory deployed at:", address(escrowFactory));

        // 2. 部署 Resolver (使用剛部署的 EscrowFactory)
        console.log("Deploying Resolver...");
        resolver = new Resolver(
            IEscrowFactory(address(escrowFactory)),
            IOrderMixin(config.limitOrderProtocol),
            config.owner
        );

        console.log("Resolver deployed at:", address(resolver));

        vm.stopBroadcast();

        // 輸出部署結果
        console.log("=== Deployment Results ===");
        console.log("TestEscrowFactory:", address(escrowFactory));
        console.log("Resolver:", address(resolver));
        console.log("=========================");

        // 驗證部署
        _verifyDeployment(config);

        // 保存部署地址到文件 (可選)
        _saveDeploymentAddresses();
    }

    function _verifyDeployment(DeploymentConfig.NetworkConfig memory config) internal view {
        console.log("=== Verifying Deployment ===");
        
        // 驗證 EscrowFactory
        require(address(escrowFactory) != address(0), "EscrowFactory deployment failed");
        require(address(escrowFactory).code.length > 0, "EscrowFactory has no code");
        
        // 驗證 Resolver
        require(address(resolver) != address(0), "Resolver deployment failed");
        require(address(resolver).code.length > 0, "Resolver has no code");
        
        // 驗證 Resolver 的所有者
        try resolver.owner() returns (address owner) {
            require(owner == config.owner, "Resolver owner mismatch");
            console.log("Resolver owner set correctly:", owner);
        } catch {
            console.log("Could not verify resolver owner");
        }
        
        console.log("All contracts deployed successfully");
        console.log("All contracts have bytecode");
        console.log("============================");
    }

    function _saveDeploymentAddresses() internal {
        console.log("");
        console.log("=== Save These Addresses ===");
        console.log("Network: Chain ID", block.chainid);
        console.log("EscrowFactory:", address(escrowFactory));
        console.log("Resolver:", address(resolver));
        console.log("");
        console.log("Environment variables for next deployment:");
        console.log("export ESCROW_FACTORY_ADDRESS=", vm.toString(address(escrowFactory)));
        console.log("export RESOLVER_ADDRESS=", vm.toString(address(resolver)));
        console.log("============================");
    }

    // Helper functions to get deployed addresses
    function getDeployedFactory() public view returns (address) {
        return address(escrowFactory);
    }

    function getDeployedResolver() public view returns (address) {
        return address(resolver);
    }
}