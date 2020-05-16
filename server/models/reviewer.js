import mongoose from 'mongoose';
import reviewerSchema from '../schemas/reviewer.js';

export default mongoose.model('reviewerInfo', reviewerSchema);