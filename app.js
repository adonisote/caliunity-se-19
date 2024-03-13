import Express from "express";

const app = Express()
const PORT = 3005

app.get("/", (req, res) => {
    res.send('Hello calisthenics app')
})



app.listen(PORT, () => 
    console.log(`server listening on port ${PORT}`)
)