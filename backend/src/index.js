import express from 'express';

import { PORT } from './config/env.js'
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';

const app = express()

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)

app.get('/', (req,res)=>{
    res.json({message:"Hello World!!"})
})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})