const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://eashwarsai55:12345@cluster0.c4oivnr.mongodb.net/paytm');

const userSchema  = mongoose.Schema({
    userName  : {
      type : String,
      required : true,
      lowercase : true,
      minLength : 3,
      maxLength : 30,
      unique : true,
      trim : true
    },
    firstName : {
      type : String,
      required : true,
      trim : true,
      maxLength : 30
    },
    lastName: {
        type : String,
      required : true,
      trim : true,
      maxLength : 30
    },
    password : {
      type : String,
      required : true,
      minLength : 8,
      maxLength : 15,
      lowercase : true,
      uppercase : true
    }
});

const accountScheme = {

       userId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
       }],
       balance : {
        type : Number,
        required : true
       }
}

const User = mongoose.model('User' , userSchema);

const Account = mongoose.model('Account',accountScheme); 

module.exports = {
    User,
    Account
}