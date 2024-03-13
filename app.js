import Express from "express";
import {logger} from "./middlewares/logger.js"

const app = Express()
const PORT = 3005

app.use(logger)




app.listen(PORT, () => 
    console.log(`server listening on port ${PORT}`)
)