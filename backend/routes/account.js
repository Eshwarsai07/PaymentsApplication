const express = require('express');
const {authMiddleware} = require('../middleware/middleware');
const { default: mongoose } = require('mongoose');
const {Account} = require('../db')
const accountRouter = express.Router();


accountRouter.get('/balance',authMiddleware,async function(req,res){
   
     console.log(req.userId);
      const acc = await Account.findOne({userId : req.userId}) ;

      if(acc){
        return res.status(200).json({
            balance :acc.balance
        })
      }
})

accountRouter.post('/transfer',authMiddleware,async function(req,res){
 
      //creating a session 
      const session = await mongoose.startSession();

      session.startTransaction();
       const to = req.body.to;
       const amount = req.body.amount;

       //doing all the logic with in the session for money transfer ,fetching account details
       const acc = await Account.findOne({userId : req.userId}).session(session);

       console.log(typeof acc.balance + ' '+typeof amount);
       if(acc.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg : "Insufficient balance"
        })
       }    

       const toAcct = await Account.findOne({userId : to}).session(session)
       console.log('to---->'+to+' '+toAcct);
       if(!toAcct){
        await session.abortTransaction();
        return res.status(411).json({
          msg : 'Invalid Account'
        })
       }

       await Account.updateOne({userId : req.userId},{
        $inc : {
          balance : -amount
        }
       }).session(session);

       await Account.updateOne({userId : to},{
        $inc : {
          balance : amount
        }
       }).session(session);

       //commiting the transaction
       await session.commitTransaction();

       
       return res.status(200).json({
        msg : 'Transfer successfull'
       })
})

accountRouter.get('/getAccount',authMiddleware, async function(req,res){

  const acct = await Account.findOne({userId : req.userId});
  return res.status(200).json(acct);

})

module.exports = {accountRouter}