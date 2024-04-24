import 'dotenv/config'
import express from 'express';

//mongoose
import mongoose from 'mongoose'

//import middlewares
import { logger } from './middlewares/logger.js';
import { userIdMiddleware } from './middlewares/userId.js';

//import Routers
import homeRouter from './routes/home/index.js';
import trainingRouter from './routes/training/index.js';
import cookiesRouter from './routes/cookies/index.js';


const app = express();

// Middleware to parse JSON
app.use(express.json())
//db
mongoose.connect(process.env.MONGODB_URI)
  .then((client) => {
    console.log('💽 Database connected')
  })
  .catch(error => console.error(error))

//specify engine to to render ejs
app.set('view engine', 'ejs');

//serve public folder
app.use('/public', express.static('public'));

// Middlewares
app.use(logger); // logger middleware
app.use(express.urlencoded({ extended: true }));

//landing page
app.use('/', homeRouter);

//User Training Router
app.use('/app/users/:userId', userIdMiddleware, trainingRouter);

//cookies se-19
app.use('/cookies', cookiesRouter);

app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));
