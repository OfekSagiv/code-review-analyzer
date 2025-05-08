import express from 'express';
import { getAdviceFromHistory } from '../services/advisorService.js';
import { ERROR_MESSAGES } from '../constants/errors.js';

const router = express.Router();

export default (prisma) => {
    router.post('/', async (req, res) => {
        const { snippet, description } = req.body;

        if (!snippet || !description) {
            return res.status(400).json({ error: ERROR_MESSAGES.MISSING_SNIPPET_OR_DESCRIPTION });
        }

        try {
            const advice = await getAdviceFromHistory(prisma, snippet, description);
            res.json({ advice });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: ERROR_MESSAGES.GET_ADVICE_FAILED });
        }
    });

    return router;
};
