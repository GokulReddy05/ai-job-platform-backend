import {registerUserService, loginUserService} from '../services/authService.js'
import { AppError } from '../utils/appError.js'

export const registerUser = async(req,res)=>{
    const {name, email, password} = req.body
    try {
        if(!name || !email || !password){
            return res.status(400).json({
                message : "User Credentials are required"
            })
        }
      const users = await registerUserService(name, email, password)
      res.status(201).json({
        message : "User Created",
        users
      })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Error"
        })
    }
}


export const loginUser = async(req,res)=>{
    const { email, password } = req.body

    try {
        if(!email || !password){
            return res.status(400).json({
                message : "Email and Password are required"
            })
        }

        const user = await loginUserService(email,password)
        res.status(200).json({
            message : "Successful Login",
            user
        })
    } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
}
}

