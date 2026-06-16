import { withTransaction } from "../utils/transaction.js"
import {users} from '../db/users.schema.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_TOKEN} from '../config/env.js'
import { eq } from "drizzle-orm"
import { db } from "../db/db.js"

export const signUp = async(req,res,next)=>{
    const {email, username,displayName, password} = req.body

    if(!email|| !password||!displayName){
        return res.status(400).json({message:"email,display name and password are required"})
    }
    try {
        const newUser = await withTransaction(async (trx)=>{
            const [existingUser] = await trx
            .select({id:users.id})
            .from(users)
            .where(eq(users.email,email.toLowerCase().trim()))

            if(existingUser){
                const err = new Error('EMAIL_TAKEN')
                err.statusCode = 409;
                throw err
            }

            const salt = await bcrypt.genSalt(12)
            const password_hash = await bcrypt.hash(password,salt);

            const [newUser] = await trx
            .insert(users)
            .values({
                email:email.toLowerCase().trim(),
                username: username?.toLowerCase().trim()??null,
                displayName:displayName.trim(),
                passwordHash:password_hash,
            })
            .returning({
                id:users.id,
                email:users.email,
                displayName:users.displayName,
                username:users.username,
                createdAt:users.createdAt,
            })
            
            return newUser
        })
        
        const token = jwt.sign({id: newUser.id},JWT_TOKEN,{expiresIn: JWT_EXPIRES_IN})

        return res.status(201).json({
            message: 'Account Created Successfully',
            success:true,
            data:{
                token,
                user:newUser,
            },
        })
    } catch (error) {
       if(error.message === 'EMAIL_TAKEN'){
        return res.status(409).json({message:'Email is already in use'})
       }
       
       if(error.code === '23505'){
        return res.status(409).json({message:'Email or username already in use'})
       }

       console.error('SignUp error',error)
       return res.status(500).json({message: "Internal Server Error",error:error.message})
    }
}
export const signIn = async(req,res,next)=>{

    try {
        const {email,password} = req.body

        if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
        
            const [user] = await db
            .select({
                id:users.id,
                passwordHash: users.passwordHash
            })
            .from(users)
            .where(eq(users.email,email.toLowerCase().trim()))

            if(!user){
                const error = new Error('User not found')
                error.statusCode = 404
                throw error
            }

            const isPasswordValid = await bcrypt.compare(password,user.passwordHash)
            if(!isPasswordValid){
                const error = new Error('Invalid credentials')
                error.statusCode = 401
                throw error
            }
            
        

        const token = jwt.sign({id: user.id},JWT_TOKEN,{expiresIn: JWT_EXPIRES_IN})

        const{passwordHash, ...safeUser} = user

        res.status(200).json({
            success:true,
            message:'User Signed in successfully',
            data:{
                token,
                safeUser
            }
        })

    } catch (error) {
        next(error)
    }

}
export const signOut = async(req,res,next)=>{}
