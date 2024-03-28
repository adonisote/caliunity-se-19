import express from 'express';



//import Routers
import trainingRouter from './routes/training/index.js';

const PORT = 3000;
const app = express()
//specify engine to to render ejs
app.set('view engine', 'ejs')


app.use('/training', trainingRouter)



app.listen(PORT, () => console.log(`server listening on port ${PORT}`))