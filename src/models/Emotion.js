import { Schema, model } from 'mongoose';

const emotionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  application: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
  emotionType: { type: String, enum: ['happy', 'sad', 'neutral', 'angry'], required: true },
  intensity: { type: Number, min: 0, max: 1 },
  metadata: {
    device: String,
    location: String,
    timestamp: { type: Date, default: Date.now }
  }
});

export default model('Emotion', emotionSchema);