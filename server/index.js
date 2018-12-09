import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import winston from 'winston';
import './config';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Welcome to sms management API');
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: new winston.transports.Console()
});

app.listen(port, () => {
   logger.info(`Connected on port: ${port}`);
});

export default app;