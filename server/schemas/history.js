import mongoose from 'mongoose';

export default new mongoose.Schema({
  mediaID: {
    type: mongoose.Types.ObjectId, // from _id @ mediaInfo
    required: true
  },
  reviewerID: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  decision: {
    type: String,
    enum: ['rejected', 'accepted', 'pending'],
    required: true
  },
  description: {
    type: String,
    maxlength: 150
  }
});