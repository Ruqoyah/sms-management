import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/** Connect to database
 */
mongoose.Promise = global.Promise;

export default mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
