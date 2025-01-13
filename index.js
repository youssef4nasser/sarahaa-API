import dotenv from 'dotenv'
import express from 'express'
import userRouter from './src/modules/user/user.router.js'
import { connectdb } from './dataBase/connection.js'
import authRouter from './src/modules/Authentication/auth.router.js'
import { globalErrorHandling } from './src/utils/errorHanding.js'
import messageRouter from './src/modules/message/message.router.js';
import { AppError } from './src/utils/appError.js';
import cors from "cors"
dotenv.config();
const app = express()
const port = process.env.PORT || 5000
connectdb();


process.on('uncaughtException', (error)=>{
    console.log("Uncaught Exception", error)
})

app.use(cors({origin: "*"}))
app.use(express.json())
app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/messages", messageRouter)
app.use("/uploads", express.static("./uploads"))
app.use("*", (req, res, next)=>{
    return next(new AppError (`In-valid url can't access this endPoint ${req.originalUrl}`))
})

app.use(globalErrorHandling)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (error)=>{
    console.log("Eroor", error)
})