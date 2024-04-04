import express from 'express';
import {logger} from "./middlewares/logger.js"


//import Routers
import homeRouter from './routes/home/index.js';
import trainingRouter from './routes/training/index.js';
import cookiesRouter from './routes/cookies/index.js';

const PORT = 3000;
const app = express()
//specify engine to to render ejs
app.set('view engine', 'ejs')


//serve public folder
app.use('/public', express.static('public'))


// Middlewares
app.use(logger) // logger middleware
app.use(express.urlencoded({ extended: true }))





//landing page
app.use('/', homeRouter)

//training feature
app.use('/app/training', trainingRouter)

//cookies se-19
app.use('/cookies', cookiesRouter)



app.listen(PORT, () => console.log(`server listening on port ${PORT}`))