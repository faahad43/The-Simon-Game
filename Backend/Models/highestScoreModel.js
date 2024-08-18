import mongoose from "mongoose";

const scoreModel = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    score:{
        type:Number,
        required:true
    }
    
},{timestamps:true})

const highestScore = mongoose.model('Highest Score',scoreModel);
export default highestScore;