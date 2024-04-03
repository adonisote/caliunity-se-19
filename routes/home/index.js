import express from 'express';

const homeRouter = express.Router();


const landingPage = (req, res) => {
    res.render('pages/index')
}

homeRouter.get('/', landingPage)
homeRouter.get('/home', landingPage)

homeRouter.get('/about', (req, res) => {
    res.render('pages/about')
})

homeRouter.get('/contact', (req, res) => {
    res.render('pages/contact')
})

export default homeRouter