import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:[3, "Name must conatain minimum three letter"],
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        require:true,
        min:[6, "Password must be atleast 6 digit long"],
    },gender:{
        type:String,
        require:true,
    },highestScore: {
        type: Number,
        default: 0,
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema);
export default User;