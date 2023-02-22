const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
const errorHandlerMiddleware = require("./middlewares/error-handler")
//Load env variables
require("dotenv").config()

const port = 5000

//middleware
app.use(express.static("./public"))
app.use(express.json())

//Routes
app.use("/api/v1/tasks",tasks)

app.use(errorHandlerMiddleware)

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`Listening on port ${5000}`)
        })

    }
    catch(e){
        console.log("It is a problem of connection db")
    }
}


start()