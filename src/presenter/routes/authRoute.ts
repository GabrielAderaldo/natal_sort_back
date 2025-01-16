import express from 'express';
import { UserController } from '../../useCase/controller/userController';
const router = express.Router();


router.post('/register', async function(req,res){

    const {name,email,pass} = req.body;
    
    if(!name || name == "" || name == undefined) res.status(400).json({error:'Name is required'});
    
    if(!email || email == "" || email == undefined) res.status(400).json({error:'Email is required'});

    if(!pass || pass == "" || pass == undefined) res.status(400).json({error:'Password is required'});

    const userController = new UserController();
    const userCreated = await userController.createUser(name,email,pass);
    
    res.status(201).json({user:userCreated});

})

export default router;