import express from 'express';


//import helpers
import { currentDate } from '../../helpers/training.js';

//import Middlewares
import { userIdMiddleware } from '../../middlewares/userId.js';


const trainingRouter = express.Router();

//specify userId Middleware
trainingRouter.use("/:userId", userIdMiddleware)

//User dashboard
trainingRouter.get('/:userId/training/', (req, res) => {
  res.render('app/training/index', { currentDate: currentDate, userId: req.userId });
});

//Route to display the form to create a new training plan. It should come beofre :trainingId
trainingRouter.get('/:userId/training/new', (req, res) => {
  res.render('app/training/new');
});

//Route to handle submission of the form
trainingRouter.post('/:userId/training/new', (req, res) => {
  let date = new Date().toDateString();
  const { type, phase, exName, exReps } = req.body
  console.log('Info: ', req.body);
  res.send(
    `Thank you for your entry. Date: ${date}. Type: ${type}. Phase ${phase}. Exercise: ${exName}. Reps: ${exReps}`
  );
});

// Route with :userId and :trainingId as parameters
// This comes after the more specific /new route
trainingRouter.get('/:usersId/training/:trainingId', (req, res) => {
  const trainingId = req.params.trainingId
  res.send(`User id: ${req.userId}. Training id: ${trainingId}. Infos about specific training:`)
})


export default trainingRouter;
