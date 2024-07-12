import startApp from './app.js';

const port = process.env.PORT ? parseInt(process.env.PORT) : 9000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Project02-Recipe-DB';
startApp(port, dbUrl);