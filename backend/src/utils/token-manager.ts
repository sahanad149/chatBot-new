import jwt from 'jsonwebtoken';

export const createToken = (id:string, email:string, expiresIn:string) => {
    const payloaad = {id, email};
    const token = jwt.sign(payloaad, process.env.JWT_SECRET, {
        expiresIn
    });
    return token;
};