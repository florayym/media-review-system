import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.set('useCreateIndex', true); // fix warning: https://github.com/Automattic/mongoose/issues/6890

const ReviewerSchema = new mongoose.Schema({
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

// Secure passwords

const saltRounds = 10;

ReviewerSchema.pre('save', function (next) {
  // Check if document is new or a new password has been set

  if (this.isNew || this.isModified('password')) {
    const document = this;

    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      // Store hash in your password DB.
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

/* Create a method to compare encrypted password and post password */
ReviewerSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      callback(err);
    } else {
      callback(err, match);
    }
  });
}

export default ReviewerSchema;