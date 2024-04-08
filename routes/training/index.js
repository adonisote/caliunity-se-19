import express from 'express';

//import fake training data
import trainingData from '../../users.json' assert { type: 'json' }


//import helpers
import { currentDate } from '../../helpers/training.js';

//import Middlewares
import { userIdMiddleware } from '../../middlewares/userId.js';


const trainingRouter = express.Router();

//specify userId Middleware
trainingRouter.use("/:userId", userIdMiddleware)

//Fake training data dashboard
trainingRouter.get('/:userId/training/', (req, res) => {
  const user = trainingData.find(user => user.userId.toLocaleLowerCase() == req.userId.toLocaleLowerCase())
  console.log(user)
  if (user) {
    const { userId, userName, userGoal, userGoalStatus, userTotalWorkouts } = user
    // const userGoal = userName.userGoal
    // res.json(`${userGoal}`)
    res.render('app/training/index', {
      currentDate: currentDate,
      userId: userId,
      userGoal: userGoal,
      userGoalStatus: userGoalStatus,
      userTotalWorkouts: userTotalWorkouts
    })
  } else {
    res.status(404).send('User not found')
  }
})



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
trainingRouter.get('/:userId/training/:trainingId', (req, res) => {
  const user = trainingData.find(user => user.userId.toLocaleLowerCase() === req.userId.toLocaleLowerCase())
  if (!user) {
    res.status(404).send(`Username '${req.userId}' not found.`)
  }
  //asyncronus function? -> prove if user and trianinid exist at the same time?
  const training = user.userPastTrainings.find(training => training.trainingId === req.params.trainingId)
  if (training) {
    console.log(training)
    const { trainingId, trainingType, trainingPhase, exercises } = training
    res.render('app/training/training', {
      trainingId: trainingId,
      trainingType: trainingType,
      trainingPhase: trainingPhase,
      exercises: exercises
    })
  } else {
    res.status(404).send(`Training id "${req.params.trainingId}" not found.`)
  }

  // res.send(`User id: ${req.userId}. Training id: ${trainingId}. Infos about specific training:`)
})






export default trainingRouter;
