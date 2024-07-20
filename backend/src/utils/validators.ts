import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations:ValidationChain[]) => {
    return async(req:Request, res:Response, next:NextFunction) => {
        for(let validation of validations){
            // This loop is to verify all the entries made by the user.
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }   //encountering an error breaks the loop.
        }
            const errors = validationResult(req);
            // If there are no errors then go ahead to execute the next middleware function.
            if(errors.isEmpty()) {
                return next();
            }

            // If there are any errors found,
            return res.status(422).json({errors: errors.array()});
            // 422 - unprocessable entity/data
    };
};

export const loginValidator = [
    body("email").trim().isEmail().notEmpty().withMessage("Valid email is required"),
    body("password").trim().isLength({min:8}).notEmpty().withMessage("Strong password is required")
];

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator
];