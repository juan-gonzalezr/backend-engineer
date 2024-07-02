import { NextFunction,Request,Response } from 'express';
import { z, ZodSchema } from "zod";

export const validateSchema =(schema:any)=>(req:Request,res:Response,next:NextFunction)=>{
    
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(error =>error.message);
            return res.status(400).json({ errors });
          }
          return res.status(500).json({ message: "Internal server error" });
        }
}