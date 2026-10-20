import prisma from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/appError.js';

export const registerUserService = async(name,email, password)=>{
    const userExist = await prisma.users.findUnique({
        where : {
            email : email,
        }
    });
    if(userExist){
        throw new Error("Email already Exist")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await prisma.users.create({
        data:{
            name,
            email,
            password : hashedPassword,
            role : "job seeker",
        },
        select :{
            id : true,
            name : true,
            email : true,
            created_at : true
        }
    })
    return newUser
}

export const loginUserService = async(email,password)=>{

    const userExist = await prisma.users.findUnique({
        where:{
            email : email,
        }
    })
    if(!userExist){
        throw new AppError("User Doesnt Exists", 401)
    }
    const comparePassword = await bcrypt.compare(password, userExist.password)
    if(!comparePassword){
        throw new AppError("Incorrect Password", 401)
    }

    const token = jwt.sign({
        id : userExist.id,
        role: userExist.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h",
    })  
    return {
        token,
        user:{
            id : userExist.id,
            name : userExist.name,
            email : userExist.email,
            role : userExist.role,
        }
    }   


}