import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const applicationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  platform: { type: String, enum: ['web', 'mobile', 'kiosk'] },
  description: String
});

export default models.Application || model('Application', applicationSchema);