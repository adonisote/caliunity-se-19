import express from "express";
import {logger} from "./middlewares/logger.js"
import path from 'path'
import { fileURLToPath } from "url";

import dataJson from "./data.json" assert {type: "json"}

const app = express()
const PORT = 3005
app.set('view engine', 'ejs')

//Middlewares
// app.use('/',express.static('public')) // serve static assests & add virtual path so that public is not being shown in the route
app.use(logger) // logger middleware
app.use(express.urlencoded({extended: true}))



const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

//send data from backend to frontend
app.get("/data", (req, res) => {
    res.send(`${dataJson.id}`)
})

// route to landing page
const homepage =  (req, res) => {
    res.sendFile("/public/pages/index.html", {root: __dirname})
}
app.get("/", homepage)
app.get("/home", homepage)

// dynamic root
app.get("/users/:userName/sucess/:postNumber", (req, res) => {
    const userName = req.params.userName
    const postNumber = req.params.postNumber
    res.send(`Username: ${userName}. Post number: ${postNumber}`)
})

//contact page root
app.get("/contact", (req, res) => {
    res.sendFile("/public/pages/contact.html", {root: __dirname})
})

//contact form post root
app.post("/contact", (req, res) => {
    console.log('Contact form submission: ', req.body)
    res.send(`Thank you for message. We will be in touch soon. This is your message:"${req.body.user_message}" `)
    // res.sendFile("public/pages/contact.html", {root: __dirname})
})

//about root
app.get("/about", (req, res) => {
    res.sendFile("/public/pages/about.html", {root: __dirname})
})

////////Web Dev Tutorials
//query strings
app.get('/cookies', (req, res) => {
    console.log(req.query)
    res.send(`
    <h1>Cookies</h1>
    <p>Cooking incoming...!</p>
    <h2>Ingredients:</h2>
    <ul>
    <li>Egs</li>
    </ul>
    `
    )
})
//send a json file to the backend
app.get('/api/v1/cookies', (req, res) => {
    res.json({
        cookies: [
            {name: 'Chochochip', price: 3.50},
            { name: 'Banana', price: 3.00 }
        ]
    }
    )
})

//respond with a file download

app.get('/file/:name', (req, res, next) => {
    const options = {
      root: path.join(__dirname, 'public'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Disposition': `attachment; filename=${req.params.name}` //force download
      }
    }
  
    const fileName = req.params.name
    res.sendFile(fileName, options, (err) => {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  })

//////////////////////////////
//////////////////////////////



////APP Routes
//profile page using EJS Template
app.get("/app", (req, res) => {
    const numberOfTraining = 17
    res.render('index', {
        numberOfTraining: numberOfTraining,
        numberOfPost: 20,
        numberOfSkill: 5, 
        nameOfBrand: "Caliunity"})
})




//advice search route

app.get("/advice", (req, res) => {
    const searchAdvice = req.query.search
    console.log(searchAdvice)
    res.send(`You searched for: "${searchAdvice}". We are looking in our database. We will get back to you soon...`)
})

//create training plan

app.post("/newlog", (req,res)=>{
    let workoutType = req.body.type
    let workoutPhase = req.body.phase
    let exerciseName = req.body.exName
    let exerciseReps = req.body.exReps
    console.log(req.body)
    res.send(`Sucessully created a workout.
        Type:${workoutType}.
        Phase: ${workoutPhase}. 
        To do: ${exerciseReps} ${exerciseName}s.  `)
})

//users list with user objects
const users = [
    {name: 'jan', exp: 'beginner', postsTotal: 17, posts: [
        {postId: 1, title: "How to master motivation", message: "I want to go more often...."}
    ]},
    {name: 'fernand', exp: 'pro', postTotal: 7},
    {name: 'nikita', exp: 'intermediate', postTotal: 10}
]

//api root for users
app.get("/api/v1/users", (req, res) => {
    res.json(users)
})
//api user slug root
app.get("/api/v1/users/:name", (req, res) => {
    const userName = req.params.name

    const userDisplay = users.find((user)=> user['name'] === userName)
    console.log(userDisplay)

    if (userDisplay) {
        res.json(userDisplay)
    } else {
        res.status(404).sendFile('public/pages/404.html', {root: __dirname})
    }
})



//404 route -> It has to bee after the root definitions (at the end). Otherwsie conflict. 
app.use((req, res, next) =>{
    res.status(404).sendFile('/public/pages/404.html', {root: __dirname})
})

app.listen(PORT, () => 
console.log(`server listening on port ${PORT}`)
)