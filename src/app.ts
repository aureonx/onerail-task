
import express, { Express, NextFunction, Request, Response } from 'express';
import sequelize from './config/database';
import router from './routes';
import { logger } from './config/logger';
import { HttpException } from './utilis/http-exception';
import { loggerMiddleware } from './middleware/logger.middleware';

bootstrap();

async function bootstrap() {
  const app: Express = express();

  try {
    await sequelize.authenticate();
    logger.info('Database connected');
  } catch (err) {
    logger.error('Unable to connect to DB:', err);
    process.exit(1);
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggerMiddleware);

  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Server-node Exercise API',
      version: '1.0.0',
    },
    paths: {},
  };

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
  });

  app.get('/readiness', async (req: Request, res: Response) => {
    try {
      await sequelize.authenticate();

      res.status(200).json({ status: 'READY' });
    } catch (error) {
      console.error('Readiness DB check failed:', error);
      res.status(503).json({ status: 'NOT_READY' });
    }
  });

  app.use('/api', router);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${req.method} ${req.originalUrl} ${err.message}`);

    if (err instanceof HttpException) {
      return res.status(err.status).json({
        status: err.status,
        error: err.message,
      });
    }


    return res.status(400).json({ status: 500, error: "Internal error" });
  });

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Swagger documentation available at http://localhost:${PORT}/swagger`);
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      logger.info('HTTP server closed');
    });
  });
}