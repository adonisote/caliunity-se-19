import express from 'express'

const cookiesRouter = express.Router()

const cookies = [
    {name:'Double Choc', slug: 'double-choc', isInStock: true},
    {name:'Chocho Chip', slug: 'choco-chip', isInStock: false}
]
const ingredients = ['flour', 'water', 'eggs', 'salt']


cookiesRouter.get('/', (req, res) => {
    res.render('cookies/index', {cooki: cookies, ingre: ingredients})
})


export default cookiesRouter