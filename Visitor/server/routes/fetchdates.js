const express = require("express");
const { PrismaClient } = require('@prisma/client');
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
module.exports = router;