# SUI Fusion Plus Relayer Service

A Node.js Express server built with TypeScript for handling cross-chain relay operations in the SUI Fusion Plus ecosystem.

## Features

- **RESTful API** for cross-chain order management
- **TypeScript** for type safety and better development experience
- **Express.js** with security middleware (Helmet, CORS)
- **Health checks** and monitoring endpoints
- **Order tracking** and status management
- **Multi-chain support** (Ethereum, SUI, Polygon, BSC)
- **Configurable** environment settings

## Project Structure

```
src/
├── controllers/          # Request handlers and business logic
├── routes/              # API route definitions
├── services/            # Business logic and external integrations
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
├── middlewares/         # Custom Express middleware
├── app.ts               # Express application setup
└── index.ts             # Application entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`

### Development

Start the development server with hot reload:
```bash
npm run dev
```

Or use the watch mode:
```bash
npm run dev:watch
```

### Building

Build the project for production:
```bash
npm run build
```

### Running in Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system information

### Relayer Operations
- `GET /api/v1/relayer/status` - Get relayer status
- `POST /api/v1/relayer/submit` - Submit a cross-chain order
- `GET /api/v1/relayer/order/:orderId` - Get order status
- `GET /api/v1/relayer/orders` - Get all orders (with filtering)
- `POST /api/v1/relayer/order/:orderId/cancel` - Cancel an order
- `GET /api/v1/relayer/chains` - Get supported chains

### Example Request

Submit a cross-chain order:
```bash
curl -X POST http://localhost:3000/api/v1/relayer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "sourceChain": "ethereum",
    "destinationChain": "sui",
    "sourceToken": "USDC",
    "destinationToken": "USDC",
    "amount": "100.0",
    "recipient": "0x...",
    "sender": "0x..."
  }'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `ETHEREUM_RPC_URL` | Ethereum RPC endpoint | - |
| `SUI_RPC_URL` | SUI RPC endpoint | - |
| `POLYGON_RPC_URL` | Polygon RPC endpoint | - |
| `BSC_RPC_URL` | BSC RPC endpoint | - |

## Scripts

- `npm run dev` - Start development server
- `npm run dev:watch` - Start development server with file watching
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run type-check` - Run TypeScript type checking

## Development Notes

- The project uses TypeScript path mapping (`@/*`) for cleaner imports
- ESLint and TypeScript strict mode are enabled for code quality
- The service currently uses in-memory storage for orders (implement database integration as needed)
- Error handling includes proper HTTP status codes and structured error responses
- CORS is configured for cross-origin requests

## Next Steps

1. **Database Integration**: Replace in-memory storage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Blockchain Integration**: Implement actual blockchain interactions for order processing
3. **Authentication**: Add API key or JWT-based authentication
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Monitoring**: Add metrics collection and logging
6. **Testing**: Add unit and integration tests
7. **Docker**: Add Dockerfile for containerization

## License

ISC