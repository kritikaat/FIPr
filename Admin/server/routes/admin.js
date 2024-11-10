import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const busyDates = await prisma.busyDate.findMany({
      orderBy: {
        date: 'asc',
      },
    });

    res.json({ dates: busyDates });
  } catch (error) {
    console.error('Error fetching busy dates:', error);
    res.status(500).json({ error: 'Failed to fetch busy dates' });
  }
});

router.post('/', async (req, res) => {
  const { dates } = req.body;

  try {
    // Start a transaction
    await prisma.$transaction(async (tx) => {
      // Delete all existing dates
      await tx.busyDate.deleteMany();

      // Insert new dates with timezone handling
      const busyDates = await tx.busyDate.createMany({
        data: dates.map((dateStr) => {
          // Create date object and handle timezone
          const date = new Date(dateStr);
          // Ensure consistent UTC midnight
          date.setUTCHours(0, 0, 0, 0);
          
          return {
            date: date,
          };
        }),
      });
    });

    res.json({ message: 'Dates updated successfully' });
  } catch (error) {
    console.error('Error saving busy dates:', error);
    res.status(500).json({ error: 'Failed to save busy dates' });
  }
});


export default router;