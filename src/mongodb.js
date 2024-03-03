const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/LoginSignup")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("faild to connect mongodb");
})

const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model("LoginCollection", LoginSchema);


module.exports = collection;