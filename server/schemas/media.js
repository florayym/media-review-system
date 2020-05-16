/**
 * media (all kinds of resources: video, audio, image, document)
 * table schema
 * 
 * 有必要每一种媒体资源各自拥有不同的schema吗，可以创建“继承”性质的
 */
import mongoose from 'mongoose';

{/** Subdocuments */ }
/*
const reviewHistorySchema = new mongoose.Schema({
  reviewerID: {
    type: Number,
    required: true
  },
  reviewDate: {
    type: Date,
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
*/

export default new mongoose.Schema({
  //ID: {
  //  type: Number,
  //required: [true, 'ReviewerID empty!']
  //},
  name: {
    type: String,
    required: true,
    // unique?(folder_path/name)
    //minlength:5,
    //maxlength:30,
  },
  //date: { // because of the use of timestamps, this might not be necessary
  //  type: Date,
  //  default: Date.now
  //},
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['video', 'audio', 'image', 'document'],
    required: true
  },
  path: { // name+path=identifier & identifier should be unique.
    type: String,
    required: true
  },
  //reviewHisotry: [reviewHistorySchema]
}, {
  timestamps: true // this will add createdAt and updatedAt timestamps
});