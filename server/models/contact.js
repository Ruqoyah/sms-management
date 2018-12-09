import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;
/**
 * Contact Schema
 */
const contactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    unique: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('contact', contactSchema);
