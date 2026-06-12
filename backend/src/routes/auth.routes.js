import {Router} from 'express';

export const authRouter = Router()

// Sign in
authRouter.post('/sign-in',(req,res)=>{
    res.send({message: "Signed in successfully"})
})

// Sign up
authRouter.post('/sign-up',(req,res)=>{
    res.send({message:"Signed Up successfully"})
})

//Sign-out
authRouter.post('/sign-out',(req,res)=>{
    res.send({message:"Signed Up successfully"})
})