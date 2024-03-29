import express from 'express';



//import Routers
import homeRouter from './routes/home/index.js';
import trainingRouter from './routes/training/index.js';

const PORT = 3000;
const app = express()
//specify engine to to render ejs
app.set('view engine', 'ejs')


//serve public folder
app.use('/public', express.static('public'))

//landing page
app.use('/', homeRouter)

//training feature
app.use('/training', trainingRouter)



app.listen(PORT, () => console.log(`server listening on port ${PORT}`))