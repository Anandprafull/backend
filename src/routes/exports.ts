import express from 'express';
import { Parser } from 'json2csv';
import Emotion from '../models/Emotion';

const router = express.Router();

// Export emotions to CSV
router.get('/emotions', async (req, res) => {
  try {
    const emotions = await Emotion.find()
      .populate('user', 'email')
      .populate('application', 'name platform');

    const fields = [
      'user.email',
      'application.name',
      'emotionType',
      'intensity',
      'metadata.timestamp'
    ];

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(emotions);

    res.header('Content-Type', 'text/csv');
    res.attachment('emotion-export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

export default router;