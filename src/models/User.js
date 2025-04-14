import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
  createdAt: { type: Date, default: Date.now }
});

export default model('User', userSchema);