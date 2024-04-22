import express from 'express';

//import middlewares
import { logger } from './middlewares/logger.js';
import { userIdMiddleware } from './middlewares/userId.js';

//import Routers
import homeRouter from './routes/home/index.js';
import trainingRouter from './routes/training/index.js';
import cookiesRouter from './routes/cookies/index.js';

//import database
import { connectToDb, getDb } from './db.js';
import { ObjectId } from 'mongodb';

const PORT = 3000;
const app = express();
app.use(express.json()) // middleware for POST request

//db connection
let db

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    db = getDb()
  }

})

app.get("/data", (req, res) => {
  //current page
  const page = req.query.p || 0
  const recordsPerPage = 2

  let records = []
  db.collection("records")
    .find() //cursor toArray forEach
    .sort({ type: 1 })
    .skip(page * recordsPerPage)
    .limit(recordsPerPage)
    .forEach(record => records.push(record))
    .then(() => {
      res.status(200).json(records)
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the records' })
    })

});
app.get("/data/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('records')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not fetch the document' })
      })

  } else {
    res.status(500).json({ error: 'Not valid document id' })
  }



})

app.post('/data', (req, res) => {
  const record = req.body

  db.collection('records')
    .insertOne(record)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ err: 'Could not create a new document' })
    })
})

app.delete('/data/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection('records')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not delete the record' })
      })
  } else {
    res.status(500).json({ error: 'Not valid record id' })
  }
})

app.patch('/data/:id', (req, res) => {
  const updates = req.body
  if (ObjectId.isValid(req.params.id)) {
    db.collection('records')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then(update => {
        res.status(200).json(update)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not update the record' })
      })
  } else {
    res.status(500).json({ error: 'Not valid record id' })
  }


})

//specify engine to to render ejs
app.set('view engine', 'ejs');

//serve public folder
app.use('/public', express.static('public'));

// Middlewares
app.use(logger); // logger middleware
app.use(express.urlencoded({ extended: true }));

//landing page
app.use('/', homeRouter);

//User Training Router
app.use('/app/users/:userId', userIdMiddleware, trainingRouter);

//cookies se-19
app.use('/cookies', cookiesRouter);

//app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
