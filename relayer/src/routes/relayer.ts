import { Router, Request, Response } from 'express';
import { RelayerController } from '../controllers/relayerController';

export const relayerRouter = Router();
const relayerController = new RelayerController();

/**
 * Get relayer status
 * GET /api/v1/relayer/status
 */
relayerRouter.get('/status', relayerController.getStatus);

/**
 * Submit a cross-chain order for relay
 * POST /api/v1/relayer/submit
 */
relayerRouter.post('/orders', relayerController.submitOrder);

/**
 * Get order status
 * GET /api/v1/relayer/order/:orderId
 */
relayerRouter.get('/order/:orderId', relayerController.getOrderStatus);

/**
 * Get all orders with optional filtering
 * GET /api/v1/relayer/orders
 */
relayerRouter.get('/orders', relayerController.getAllOrders);

/**
 * Cancel an order
 * POST /api/v1/relayer/order/:orderId/cancel
 */
relayerRouter.post('/order/:orderId/cancel', relayerController.cancelOrder);

/**
 * Get supported chains
 * GET /api/v1/relayer/chains
 */
relayerRouter.get('/chains', relayerController.getSupportedChains);

/**
 * Get signature for an order (EVM orders only)
 * GET /api/v1/relayer/signature?orderId=...&resolverId=...
 */
relayerRouter.get('/resolve-intent', relayerController.resolveIntent);

/**
 * Verify escrow status for an order
 * POST /api/v1/relayer/verify
 */
relayerRouter.post('/verify', relayerController.verifyEscrow);

/**
 * Submit secret for an order
 * POST /api/v1/relayer/secret
 */
relayerRouter.post('/secret', relayerController.submitSecret);



