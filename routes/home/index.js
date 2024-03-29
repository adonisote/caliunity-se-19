import express from 'express';

const homeRouter = express.Router();


const landingPage = (req, res) => {
    res.render('pages/index')
}

homeRouter.get('/', landingPage)
homeRouter.get('/home', landingPage)

export default homeRouter