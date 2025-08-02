import { Router, Request, Response } from 'express';
import { hashTo20Bytes } from 'cross-chain-sdk-custom'

export const healthRouter = Router();

/**
 * Health check endpoint
 * GET /health
 */
healthRouter.get('/', (req: Request, res: Response) => {
  const hash = hashTo20Bytes('test');
  console.log(hash);
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
    }
  };

  res.status(200).json(healthCheck);
});

/**
 * Detailed health check endpoint
 * GET /health/detailed
 */
healthRouter.get('/detailed', (req: Request, res: Response) => {
  const detailedHealth = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid
    },
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      external: Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100
    },
    services: {
      // Add service health checks here
      database: 'ok', // placeholder
      blockchain: 'ok' // placeholder
    }
  };

  res.status(200).json(detailedHealth);
});