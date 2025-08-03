import { Request, Response } from 'express';
import { RelayerService } from '../services/relayerService';
import { SignatureRequest, VerifyRequest, SecretRequest } from '../types';

/**
 * Controller for handling relayer operations
 */
export class RelayerController {
  private relayerService: RelayerService;

  constructor() {
    this.relayerService = new RelayerService();
  }

  /**
   * Get relayer status
   */
  public getStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const status = await this.relayerService.getStatus();
      res.status(200).json(status);
    } catch (error) {
      console.error('Error getting relayer status:', error);
      res.status(500).json({
        error: 'Failed to get relayer status',
        timestamp: new Date().toISOString()
      });
    }
  };

  

  /**
   * Submit a cross-chain order for relay
   */
  public submitOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderData = req.body;
      const result = await this.relayerService.submitOrder(orderData);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error submitting order:', error);
      res.status(400).json({
        error: 'Failed to submit order',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Get order status
   */
  public getOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const status = await this.relayerService.getOrderStatus(orderId);
      
      if (!status) {
        res.status(404).json({
          error: 'Order not found',
          orderId,
          timestamp: new Date().toISOString()
        });
        return;
      }

      res.status(200).json(status);
    } catch (error) {
      console.error('Error getting order status:', error);
      res.status(500).json({
        error: 'Failed to get order status',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Get all orders with optional filtering
   */
  public getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters = req.query;
      const orders = await this.relayerService.getAllOrders(filters);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({
        error: 'Failed to get orders',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Cancel an order
   */
  public cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId } = req.params;
      const result = await this.relayerService.cancelOrder(orderId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(400).json({
        error: 'Failed to cancel order',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Get supported chains
   */
  public getSupportedChains = async (req: Request, res: Response): Promise<void> => {
    try {
      const chains = await this.relayerService.getSupportedChains();
      res.status(200).json(chains);
    } catch (error) {
      console.error('Error getting supported chains:', error);
      res.status(500).json({
        error: 'Failed to get supported chains',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Get signature for an order (EVM orders only)
   */
  public resolveIntent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId, resolverId } = req.query;
      
      if (!orderId || typeof orderId !== 'string') {
        res.status(400).json({
          error: 'orderId query parameter is required',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const request: SignatureRequest = {
        orderId,
        resolverId: resolverId as string | undefined
      };

      const signature = await this.relayerService.resolveIntent(request);
      res.status(200).json(signature);
    } catch (error) {
      console.error('Error getting signature:', error);
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 
                         error instanceof Error && error.message.includes('Only EVM orders') ? 403 : 500;
      
      res.status(statusCode).json({
        error: 'Failed to get signature',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Verify escrow status for an order
   */
  public verifyEscrow = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId, escrowSrc, escrowDst } = req.body;
      console.log('verifyEscrow', orderId, escrowSrc, escrowDst)
      // Validate required fields
      if (!orderId || !escrowSrc || !escrowDst) {
        res.status(400).json({
          error: 'orderId, escrowSrc, and escrowDst are required',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const request: VerifyRequest = {
        orderId,
        escrowSrc,
        escrowDst
      };

      const verification = await this.relayerService.verifyEscrow(request);
      res.status(200).json(verification);
    } catch (error) {
      console.error('Error verifying escrow:', error);
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 500;
      
      res.status(statusCode).json({
        error: 'Failed to verify escrow',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };

  /**
   * Submit secret for an order
   */
  public submitSecret = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderId, secret } = req.body;
      
      // Validate required fields
      if (!orderId || !secret) {
        res.status(400).json({
          error: 'orderId and secret are required',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const request: SecretRequest = {
        orderId,
        secret
      };

      const result = await this.relayerService.submitSecret(request);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error submitting secret:', error);
      const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 
                         error instanceof Error && error.message.includes('Cannot submit secret') ? 400 : 500;
      
      res.status(statusCode).json({
        error: 'Failed to submit secret',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };
}