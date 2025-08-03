// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {TestEscrowFactory} from "../src/TestEscrowFactory.sol";
import {DeploymentConfig} from "./DeploymentConfig.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

/**
 * @title DeployEscrowFactory
 * @notice 部署 TestEscrowFactory 合约
 * 
 * 使用方法:
 * forge script script/DeployEscrowFactory.s.sol:DeployEscrowFactory --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast --verify
 * 
 * 或者使用環境變數:
 * forge script script/DeployEscrowFactory.s.sol:DeployEscrowFactory --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
 */
contract DeployEscrowFactory is Script {
    TestEscrowFactory public escrowFactory;
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

        // 部署 TestEscrowFactory
        escrowFactory = new TestEscrowFactory(
            config.limitOrderProtocol,
            IERC20(config.feeToken),
            IERC20(config.accessToken),
            config.owner,
            config.rescueDelaySrc,
            config.rescueDelayDst
        );

        vm.stopBroadcast();

        // 輸出部署結果
        console.log("=== Deployment Results ===");
        console.log("TestEscrowFactory deployed at:", address(escrowFactory));
        console.log("Transaction hash will be shown by forge");
        console.log("=========================");

        // 驗證部署
        _verifyDeployment(config);
    }

    function _verifyDeployment(DeploymentConfig.NetworkConfig memory config) internal view {
        console.log("=== Verifying Deployment ===");
        
        // 基本驗證
        require(address(escrowFactory) != address(0), "EscrowFactory deployment failed");
        require(address(escrowFactory).code.length > 0, "EscrowFactory has no code");
        
        console.log("Contract deployed successfully");
        console.log("Contract has bytecode");
        console.log("============================");
    }

    // Helper function to get the deployed factory address (for other scripts)
    function getDeployedFactory() public view returns (address) {
        return address(escrowFactory);
    }
}