const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in your environment variables (.env file).');
    }

    // For Mongoose 6+ the connection options like useNewUrlParser/useUnifiedTopology
    // are no longer needed and will throw errors if passed.
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('Database connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection disconnected');
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Optionally exit the process so you notice failures immediately
    // process.exit(1);
  }
};