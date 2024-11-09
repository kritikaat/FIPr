import { Router } from 'express';
import { createFeedback } from '../controllers/feedbackController.js';

const router = Router();

router.post('/', (req, res, next) => {
    console.log('Received feedback request:', req.body);
    createFeedback(req, res);
  });

export default router;