import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";      //bcrpyt is used on pwds to encrypt them.

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    // fetch all users directly from the database.
    try {
        const users = await User.find();
        return res.status(200).json({message:"OK", users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};

export const userSignup = async (req:Request, res:Response, next:NextFunction) => {
    // fetch the details - name, email and pwd, written in the body (entered by the user).
    
    try {
        const{name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {      //To check if the email is already registered.
            return res.status(401).send("User already registered");     //401 - Unauthorized.
        }
        const hashedPwd = await hash(password, 10);
        const user = new User({name, email, password: hashedPwd});
        await user.save();
        return res.status(201).json({message:"OK", id: user._id.toString() });      //201 - status id to create a new user.
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};

export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).send("User not yet registered!");
        }

        const isPasswordCorrect = await compare(password, user.password);
        // To check if the entered password is correct.
        // The stored pwd is not completely decrypted for comparison.
        if(!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");      //403 - Forbidden
        }

        return res.status(200).json({message: "OK", id: user._id.toString()});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
};