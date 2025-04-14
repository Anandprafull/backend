import express from 'express';
import Emotion from '../models/Emotion';
import User from '../models/User';
import Application from '../models/Application';

const router = express.Router();

// Log emotion with application ID
router.post('/', async (req, res) => {
  try {
    const { userId, applicationId, emotionType, intensity } = req.body;
    
    const user = await User.findById(userId);
    const application = await Application.findById(applicationId);

    if (!user || !application) {
      return res.status(404).json({ error: 'User or application not found' });
    }

    const emotion = new Emotion({
      user: userId,
      application: applicationId,
      emotionType,
      intensity,
      metadata: {
        device: req.headers['user-agent'],
        location: req.ip
      }
    });

    await emotion.save();
    res.status(201).json(emotion);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;