import mongoose from 'mongoose';
import hisotrySchema from '../schemas/history.js';

export default mongoose.model('reviewHistory', hisotrySchema);