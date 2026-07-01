import express from 'express';
import type { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorMiddleware } from './core/middlewares/error.middleware';
import { loadVersionedRoutes } from './core/utils/versioned.router';
import corsMiddleware from '@core/middlewares/cors.middleware';

const app = express();

// --- Middlewares ---
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// --CORS Middleware---
app.use(corsMiddleware);

// --- Health check route ---
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'CourtSync API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    about: 'REST API built with Node.js, Express, and TypeScript, featuring JWT authentication, PostgreSQL, Redis caching, Docker containerization, and automated AWS deployment through GitHub Actions.',
    technologies: {
      language: ['TypeScript'],
      runtime: ['Node.js'],
      framework: ['Express.js'],
      database: ['PostgreSQL'],
      orm: ['TypeORM'],
      cache: ['Redis'],
      authentication: ['JWT', 'bcrypt'],
      api: ['REST API', 'Swagger / OpenAPI'],
      devops: [
        'Docker',
        'GitHub Actions',
        'AWS ECS',
        'AWS ECR',
        'Amazon RDS',
      ],
      tooling: ['pnpm', 'ESLint', 'Prettier'],
    }
  });
});

// --- Feature Routes ---
// The modules themselves handle versioned routing (v1/v2) and default version
app.use('/api/users', loadVersionedRoutes('users'));
app.use('/api/auth', loadVersionedRoutes('auth'));
app.use('/api/venues', loadVersionedRoutes('venues'));
app.use('/api/bookings', loadVersionedRoutes('bookings'));
app.use('/api/courts', loadVersionedRoutes('courts'));
app.use('/api/payments', loadVersionedRoutes('payments'));
app.use('/api/notifications', loadVersionedRoutes('notifications'));
app.use('/api/court-availability', loadVersionedRoutes('courtAvailability'));
// add more modules here

// --- 404 Handler ---
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Global Error Handler ---
app.use(errorMiddleware);

export default app;
