import { Request, Response } from 'express';
import { RelayerService } from '../services/relayerService';

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
}