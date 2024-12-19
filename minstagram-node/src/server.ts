import mongoose from 'mongoose';

import app from './app';
import config from './config';

const { dbUrl } = config.mongo;

const server = app.listen(app.get('port'), async () => {
  await initMongo();
  console.log(`minstagram is chill at ${app.get('port')} 😍`)
})

async function initMongo() {
  return new Promise(() => {
    mongoose.connect(`${dbUrl}`, {
      user: config.mongo.mongoUsername,
      pass: config.mongo.mongoPassword,
    });
    const db = mongoose.connection;
    db.once('open', () => {
      console.log(`Connected to DB ${dbUrl}`);
    });
    
    db.on('error', (error: Error) => {
      console.error(error);
      throw error;
    });
  })
}
export default server;