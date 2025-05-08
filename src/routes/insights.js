import express from 'express';
import { ERROR_MESSAGES } from '../constants/errors.js';
import { SORT_ORDER } from '../constants/query.js';

const router = express.Router();

export default (prisma) => {
    router.get('/', async (req, res) => {
        try {
            const patterns = await prisma.pattern.findMany({
                include: { exampleSnippets: true },
                orderBy: { occurrences: SORT_ORDER.DESC },
            });
            res.json({ patterns });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: ERROR_MESSAGES.LOAD_PATTERNS_FAILED });
        }
    });

    return router;
};
