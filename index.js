import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import advisorRouter from './src/routes/advisor.js';
import insightsRouter from './src/routes/insights.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/advisor', advisorRouter(prisma));
app.use('/api/insights', insightsRouter(prisma));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
