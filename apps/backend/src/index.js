import express from 'express';

import { PORT } from './config/env.js'
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware,  notFound } from './middlewares/error.middleware.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)


app.get('/', (req,res)=>{
    res.send({message:"Hello World!!"})
})
app.use(notFound)
app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})