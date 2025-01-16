import express from 'express';
import { UserController } from '../../useCase/controller/userController';
import { CustomError } from '../../utils/customError';
import { LOCALE_BR } from '../../utils/constants';
const router = express.Router();


router.post('/register', async function(req,res){

    try{
        const {name,email,password} = req.body;
        const userController = new UserController();
        const user = await userController.createUser(name,email,password);
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