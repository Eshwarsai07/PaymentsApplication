const express = require('express');
const app = express();
const { User, Account } = require('../db');
const zod = require('zod')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware/middleware');
const signupBody = zod.object({
    userName: zod.string().email().min(3).max(30),
    firstName: zod.string().max(30),
    lastName: zod.string().max(30),
    password: zod.string().min(8).max(15),

})

const updateBody = zod.object({
    firstName : zod.string().max(30),
    lastName : zod.string().max(30),
    password : zod.string().min(8).max(15)
})

const userRouter = express.Router();

userRouter.post('/signup', async function (req, res) {

    const { success } = signupBody.safeParse(req.body)
    console.log(success);
    if (!success) {
        return res.status(411).json({
            msg: 'Email already taken/ Incorrect Inputs'
        })
    }
    const existingUser = await User.findOne({
        userName: req.body.userName,
    })
    if (existingUser != null) {
        return res.status(411).json({
            msg: 'Email already taken/ Incorrect Inputs'
        })
    }
    const username = req.body.userName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    try {
        const user = await User.create({
            userName: username,
            firstName: firstName,
            lastName: lastName,
            password: password
        });

        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET)
        
        await Account.create({
            userId : userId,
            balance : 1 + Math.random() * 10000
        })
        return res.status(200).json({
            msg: `User created successfully"`,
            token: `${token}`
        })

    } catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: 'Failed to create a User please try again...'
        })
    }

})

const signinBody = zod.object({
    userName : zod.string().email(),
    password : zod.string()
})

userRouter.post('/signin', async function (req, res) {

    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg : "Email already taken / Incorrect inputs"
        })
    }
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({ userName: userName, password: password });
    if (user) {
        const userId = user._id;
        return res.status(200).json({
            msg: 'Login Sucess',
            token: jwt.sign({ userId }, JWT_SECRET),
        })
    }

    return res.status(400).json({
        msg: 'Invalid Credentials'
    })
})

userRouter.put('/', authMiddleware, async function (req, res) {

    const {success} = updateBody.safeParse(req.body);
   console.log(success + ' '+req.body);

    if(!success) return res.status(411).json({
        msg: "Error while updating information"
    })

    await User.updateOne({_id : req.userId},req.body);

    return res.status(200).json({
        msg : 'Updated successfully'
    })
})

userRouter.get('/bulk',async function(req,res){

    const  filter  = req.query.filter || "";
    
    const users = await User.find({$or: [
        { firstName: { $regex: filter, $options: 'i' } },
        { lastName: { $regex: filter, $options: 'i' } }
      ]}, '_id firstName lastName')

    return res.status(200).json({
        Users : users,
    })
})

userRouter.get('/getUser',authMiddleware, async function(req,res){

    const id = req.userId;
    const user = await User.findOne({_id : id});
    return res.status(200).json(user);

})
module.exports = { userRouter };