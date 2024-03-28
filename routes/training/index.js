import express from 'express';

const trainingRouter = express.Router();

//dashboard
trainingRouter.get('/', (req, res) => {
    res.render('app/training/index')
})

//create a new training plan
trainingRouter.get("/new", (req,res) => {
    res.render('app/training/new')
})


export default trainingRouter;