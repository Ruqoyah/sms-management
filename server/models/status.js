import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;
/**
 * Status Schema
 */
const statusSchema = new Schema({
  status: {
    type: String,
    trim: true
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  sms: {
    type: Schema.Types.ObjectId,
    ref: 'sms'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('status', statusSchema);
