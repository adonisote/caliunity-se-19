import express from 'express';
import { currentDate } from '../../helpers/training.js';

const trainingRouter = express.Router();

//dashboard
trainingRouter.get('/', (req, res) => {
  res.render('app/training/index', { currentDate: currentDate });
});

//create a new training plan
trainingRouter.get('/new', (req, res) => {
  res.render('app/training/new');
});

//thanks for your training plan creation
trainingRouter.post('/new', (req, res) => {
  let date = new Date().toUTCString();
  let type = req.body.type;
  let phase = req.body.phase;
  let exName = req.body.exName;
  let exReps = req.body.exReps;
  console.log('Info: ', req.body);
  res.send(
    `Thank you for your entry. Date: ${date}. Type: ${type}. Phase ${phase}. Exercise: ${exName}. Reps: ${exReps}`
  );
});

//slug

trainingRouter.get('/users/:entry', (req, res) => {
  const entryId = req.params.entry
  res.send(`${entryId}`)
})

export default trainingRouter;
