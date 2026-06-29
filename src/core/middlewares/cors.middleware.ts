import cors from 'cors';
import config from '@config';

const origins = config.corsOrigin ? config.corsOrigin
  .split(',')
  .map(origin => origin.trim()): ['*']; // Default to allow all origins if not specified

export default cors({
  origin(origin, callback) {
    // Allow Postman, curl, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (origins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
  ],

  exposedHeaders: [
    'Content-Length',
    'Content-Disposition',
  ],
});