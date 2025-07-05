// src index.tsx
import express from 'express';
import { router 
} from './routes';

import cors from 'cors';

const app = express();
const PORT = process.env.HTTP_SERVER_PORT?process.env.HTTP_SERVER_PORT:3000;

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
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app