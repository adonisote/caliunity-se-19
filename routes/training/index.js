import express from 'express';

//import fake training data
// import trainingData from '../../users.json' assert { type: 'json' }

//import helpers
import { currentDate } from '../../helpers/training.js';

//import Middlewares
import { userIdMiddleware } from '../../middlewares/userId.js';

const trainingRouter = express.Router();

//specify userId Middleware
// trainingRouter.use("/:userId", userIdMiddleware)

//Fake training data dashboard
trainingRouter.get('/training/', (req, res) => {
  res.render('app/training/index', {
    currentDate: currentDate,
    userId: req.user.userId,
    userGoal: req.user.userGoal,
    userGoalStatus: req.user.userGoalStatus,
    userTotalWorkouts: req.user.userTotalWorkouts,
    userPastTrainings: req.user.userPastTrainings
  });
});

//Route to display the form to create a new training plan. It should come beofre :trainingId
trainingRouter.get('/training/new', (req, res) => {
  res.render('app/training/new');
});

//Route to handle submission of the form
trainingRouter.post('/training/new', (req, res) => {
  let date = new Date().toDateString();
  const { type, phase, exName, exReps } = req.body;
  console.log('Info: ', req.body);
  res.send(
    `Thank you for your entry. Date: ${date}. Type: ${type}. Phase ${phase}. Exercise: ${exName}. Reps: ${exReps}`
  );
});

// Route with :userId and :trainingId as parameters
// This comes after the more specific /new route
trainingRouter.get('/training/:trainingId', (req, res) => {
  //asyncronus function? -> prove if user and trianinid exist at the same time?
  const training = req.user.userPastTrainings.find(
    (training) => training.trainingId === req.params.trainingId
  );
  console.log('First', training);
  if (!training) {
    return res
      .status(404)
      .send(`Training id "${req.params.trainingId}" not found.`);
  }

  const { trainingId, trainingType, trainingPhase, exercises } = training;
  res.render('app/training/training', {
    trainingId: trainingId,
    trainingType: trainingType,
    trainingPhase: trainingPhase,
    exercises: exercises,
  });
});

export default trainingRouter;
