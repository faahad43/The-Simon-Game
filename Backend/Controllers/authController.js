import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const JWT_SECRET="hello";
export const Signup = async (req,res)=>{
   
    const {name,email,password,confirmPassword,gender} = req.body;
    if(!name || !gender || !email || !password || !confirmPassword){
       
       return res.status(400).json({message:"Please fill all the fields."})
    }
    if(password !== confirmPassword){
       
        return res.status(400).json({message:"Password does not match."})
    }
    const user = await User.findOne({email: req.body.email});
    if(user){
      
        return res.status(400).json({message:"User already exist with this email"});
    }

     const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        name,
        email,
        gender,
        password:hashedPassword,
        highestScore: 0,
    })

    if(newUser){
        await newUser.save();

        res.status(200).json({message:"ok"});
        console.log("User created");
        
    }else{
        res.status(400).json({error:"Error while creating user. Invalid data"});
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        res.status(400).json({ message: "The username or password is invalid" });
        return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '5h' });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000,
        path: '/Frontend',
        secure: false
    });
    res.status(200).json({ message: 'ok', userData: user });
}

export const Logout = async (req,res)=>{
    try{
        res.cookie('token',"",{maxAge:0});
        res.status(200).json({message:'ok'});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server error"})
    }
    
}