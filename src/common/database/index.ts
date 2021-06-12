import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
import { configService } from '../config';
import { logger } from '../helper';

const connectionOptions: ConnectionOptions = {
  useNewUrlParser: true,
  autoIndex: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

export class DatabaseService {
  private instance: Mongoose;
  async connect(uri: string = configService.getEnv('DB_URI'), options: ConnectionOptions = connectionOptions) {
    try {
      this.instance = await mongoose.connect(uri, options);
      logger.info('Database is Connected');
    } catch (error) {
      logger.error('Connect database error', error);
    }
    return this.instance;
  }
  disconnect() {
    return this.instance.disconnect();
  }
}
export const databaseService = new DatabaseService();
