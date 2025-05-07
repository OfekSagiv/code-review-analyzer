// scripts/clearDatabase.js
import { PrismaClient } from '@prisma/client';
import { ERROR_MESSAGES } from '../constants/errors.js';
import { CONSOLE_MESSAGES } from '../constants/messages.js';

const prisma = new PrismaClient();

async function clearDB() {
    try {
        await prisma.comment.deleteMany();
        console.log(CONSOLE_MESSAGES.CLEAR_COMMENTS_SUCCESS);
    } catch (err) {
        console.error(ERROR_MESSAGES.CLEAR_COMMENTS_FAILED, err.message);
    } finally {
        await prisma.$disconnect();
    }
}

clearDB();
