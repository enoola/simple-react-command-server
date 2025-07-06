// src index.tsx
import express from 'express';
import { router 
} from './routes.ts';

import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' }); // Load .env.local

const app = express();
const PORT = process.env.HTTP_SERVER_PORT ? process.env.HTTP_SERVER_PORT : 3000;
const FQDN = process.env.HTTP_SERVER_FQDN ? process.env.HTTP_SERVER_FQDN : 'localhkost';

app.use(cors());

app.use('/api', router);

// Catch-all for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    error: '404',
    message: 'Woop woop, Curious you',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${FQDN}:${PORT}`);
});

export default app