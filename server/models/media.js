import mongoose from 'mongoose';
import mediaSchema from '../schemas/media.js';

export default mongoose.model('mediaInfo', mediaSchema);