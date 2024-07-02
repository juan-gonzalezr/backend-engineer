import jwt from 'jsonwebtoken'
import {TOKEN_SECRET_KEY} from '../config'

export function createAccesToken(payload:any){
    return new Promise ((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
                if(err) reject;
                resolve(token)
              
            }
          );
    })

}