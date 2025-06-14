const mongoose = require('mongoose');
const config = require('./environment');
const logger = require('../utils/logger');

class Database {
  static async connect() {
    try {
      const conn = await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      logger.error('Database connection failed:', error);
      process.exit(1);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('MongoDB Disconnected');
    } catch (error) {
      logger.error('Error disconnecting from database:', error);
    }
  }
}

module.exports = Database;
