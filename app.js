import express from "express";
import {logger} from "./middlewares/logger.js"
import path from 'path'
import { fileURLToPath } from "url";

import dataJson from "./data.json" assert {type: "json"}

const app = express()
const PORT = 3005

//Middlewares
app.use('/',express.static('public')) // serve static assests & add virtual path so that public is not being shown in the route
app.use(logger) // logger middleware
app.use(express.urlencoded({extended: true}))



// 404 response
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory


app.get("/data", (req, res) => {
    res.send(`${dataJson.id}`)
})

// route to landing page
const homepage =  (req, res) => {
    res.sendFile("/public/pages/index.html", {root: __dirname})
}
app.get("/", homepage)
app.get("/home", homepage)

// dynamic route
app.get("/users/:userName/sucess/:postNumber", (req, res) => {
    const userName = req.params.userName
    const postNumber = req.params.postNumber
    res.send(`Username: ${userName}. Post number: ${postNumber}`)
})




//query strings
app.get('/cookies', (req, res) => {
    console.log(req.query)
    res.send('Here ')
})



//contact form
app.post("/contact", (req, res) => {
    console.log('Contact form submission: ', req.body)
    res.send('Thank you for message. We will be in touch soon.')
    // res.sendFile("public/pages/contact.html", {root: __dirname})
})

////APP Routes
//advice search route

app.get("/advice", (req, res) => {
    const searchAdvice = req.query
    res.send(`You searched for: ${searchAdvice}. We are looking in our database. We will get back to you soon...`)
})


//404 route -> It has to bee after the root definitions (at the end). Otherwsie conflict. 
app.use((req, res, next) =>{
    res.status(404).sendFile('/public/pages/404.html', {root: __dirname})
})

app.listen(PORT, () => 
console.log(`server listening on port ${PORT}`)
)