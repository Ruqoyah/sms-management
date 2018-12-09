import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;
/**
 * SMS Schema
 */
const smsSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('sms', smsSchema);
