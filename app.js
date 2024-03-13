import express from "express";
import {logger} from "./middlewares/logger.js"
import path from 'path'
import { fileURLToPath } from "url";


const app = express()
const PORT = 3005

app.use(express.static('public')) // serve static assests
app.use(logger) // logger middleware

// 404 response
const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory



// partners route
app.get("/home", (req, res) => {
    res.send("Our partners will be here..")
})


// route to landing page
app.get("/", (req, res) => {
    res.sendFile("/public/index.html", {root: __dirname})
})



// dynamic route
app.get("/users/:userName/sucess/:postNumber", (req, res) => {
    const userName = req.params.userName
    const postNumber = req.params.postNumber
    res.send(`Username: ${userName}. Post number: ${postNumber}`)
})


app.use((req, res, next) =>{
    res.status(404).sendFile('/public/404.html', {root: __dirname})
})

app.listen(PORT, () => 
console.log(`server listening on port ${PORT}`)
)