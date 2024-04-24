import express from 'express';

//import helpers
import { currentDate } from '../../helpers/training.js';

//import Middlewares
import { userIdMiddleware } from '../../middlewares/userId.js';

//import models
import Record from '../../models/record.js';

const trainingRouter = express.Router();


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

//Records Dashboard
trainingRouter.get('/records', async (req, res) => {
  try {
    const records = await Record.find({}).exec()
    res.render('app/training/records', {
      records: records
    })
  } catch (error) {
    console.log(error)

    res.render('app/training/records', {
      records: []
    })
  }

})

trainingRouter.get('/records/:id', async (req, res) => {
  try {
    const id = req.params.id
    const record = await Record.findOne({ _id: id }).exec()

    if (!record) throw new Error('Record not found')

    res.render('app/training/show', {
      record: record
    })

  } catch (error) {
    console.log(error)
    res.status(500).send('Could not find the record id')
  }

})

//Route to display the form to create a new training plan. It should come beofre :trainingId
trainingRouter.get('/training/new', (req, res) => {
  res.render('app/training/new');
});

//Route to handle submission of the record form. Create a record in mongodb
trainingRouter.post('/training/new', async (req, res) => {
  try {
    //let date = new Date().toDateString();
    const record = new Record({
      duration: req.body.duration,
      type: req.body.type,
      phase: req.body.phase,
      exercises: req.body.exercises,
      equipment: req.body.equipment
    })
    const result = await record.save()
    res.status(200).json(result)
    console.log('Record created')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'The record could not be created' })

  }


});

//Route to edit the record from the database
trainingRouter.get('/records/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const record = await Record.findOne({ _id: id }).exec()
    if (!record) throw new Error("Record not found")

    res.render('app/training/edit',
      {
        record: record,
        userId: req.user.userId,
      })

  } catch (error) {
    console.log(error)
    res.status(500).send("Could not find record id")
  }
})


trainingRouter.post('/records/:id', async (req, res) => {
  try {
    const id = req.params.id
    const record = await Record.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    )
    if (!record) throw new Error('Record not found')

    res.redirect(`${record._id}`)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'The record id could not be updated.' })

  }
})

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
