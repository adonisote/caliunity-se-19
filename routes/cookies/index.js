import express from 'express';
import { convertToDollar } from '../../helpers/cookie-views.js';

const cookiesRouter = express.Router();

const cookies = [
  { name: 'Double Choc', slug: 'double-choc', priceInCents: 350, isInStock: true },
  { name: 'Chocho Chip', slug: 'choco-chip', priceInCetns: 350, isInStock: false },
];
const ingredients = ['flour', 'water', 'eggs', 'salt'];

cookiesRouter.get('/', (req, res) => {
  res.render('cookies/index', {
    cooki: cookies, ingre: ingredients,
    readablePrice: convertToDollar
  });
});

export default cookiesRouter;
