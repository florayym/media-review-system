import mongoose from 'mongoose'; // { connect, connection }

mongoose
  .connect(
    //'mongodb://superAdmin:700614@127.0.0.1:27017/admin?authSource=admin', // db admin
    'mongodb://mediaMgr:700614@127.0.0.1:27017/media-system?authSource=media-system', // db media-system
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .catch(e => {
    console.error('Connection error', e.message)
  });

const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  // Once our connection opens, our callback will be called
  console.log("MongoDB database connection established successfully");
});

export default db;