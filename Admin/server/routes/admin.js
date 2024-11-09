import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

<<<<<<< HEAD
router.get('/', async (req, res) => {
=======
router.get('/busy-dates', async (req, res) => {
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526
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

<<<<<<< HEAD
router.post('/', async (req, res) => {
=======
router.post('/busy-dates', async (req, res) => {
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526
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

<<<<<<< HEAD
=======
// Add a new route to delete individual dates
router.delete('/busy-dates/:date', async (req, res) => {
  const dateStr = req.params.date;
  
  try {
    const date = new Date(dateStr);
    date.setUTCHours(0, 0, 0, 0);

    await prisma.busyDate.deleteMany({
      where: {
        date: date,
      },
    });

    res.json({ message: 'Date deleted successfully' });
  } catch (error) {
    console.error('Error deleting date:', error);
    res.status(500).json({ error: 'Failed to delete date' });
  }
});
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526

export default router;