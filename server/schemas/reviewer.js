import mongoose from 'mongoose';

// Ref: https://mongoosejs.com/docs/schematypes.html

mongoose.set('useCreateIndex', true); // fix warning: https://github.com/Automattic/mongoose/issues/6890

export default new mongoose.Schema({
  ID: {
    type: Number,
    required: [true, 'ReviewerID empty!'],
    unique: true,
    //index: true,
  },
  password: {
    type: String,
    //custom validation functions
    //required: [true, 'Password empty!']
  },
  type: {
    type: String,
    enum: ['junior', 'senior'],
    //lowercase: true,
    //trim: true,
    //required: [true, 'User type empty!']
  }
});