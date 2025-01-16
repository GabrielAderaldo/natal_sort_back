import express from 'express';
import { UserController } from '../../useCase/controller/userController';
import { CustomError } from '../../utils/customError';
import { LOCALE_BR } from '../../utils/constants';
import { validate } from '../../utils/validators';
const router = express.Router();


router.post('/login', async function(req,res){
    try{
        const {email,password} = req.body;

        if(!validate(email)) throw new CustomError("INVALID_ERROR","Error because email is invalid",400);
        if(!validate(password)) throw new CustomError("INVALID_ERROR","Error because password is invalid",400);

        const userController = new UserController();
        const user = await userController.login(email,password);
        res.status(200).json(user);
    }catch(e){
        if(e instanceof CustomError){
            res.status(e.status).json(e.message);
        }else{
            console.log("Error: "+e+" Horario: "+new Date().toLocaleString(LOCALE_BR));
            res.status(500).json({message: 'Internal server error, please contact the support'});
        }
    }
})

router.post('/register', async function(req,res){
    try{
        const {name,email,password} = req.body;

        if(!validate(name)) throw new CustomError("INVALID_ERROR","Error because name is invalid",400);
        if(!validate(email)) throw new CustomError("INVALID_ERROR","Error because email is invalid",400);
        if(!validate(password)) throw new CustomError("INVALID_ERROR","Error because password is invalid",400);

        const userController = new UserController();
        const user = await userController.register(name,email,password);
        res.status(201).json(user);
    }catch(e){
        if(e instanceof CustomError){
            res.status(e.status).json(e.message);
        }else{
            console.log("Error: "+e+"Horario: "+new Date().toLocaleString(LOCALE_BR));
            res.status(500).json({message: 'Internal server error, please contact the support'});
        }
    }

})

export default router;