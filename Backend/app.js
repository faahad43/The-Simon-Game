import express from 'express';
import connectDB from './DB/connectToDb.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import protectedRoute from './Middleware/protectedRoute.js';

import authRoute from "./Routes/authRoute.js"
import scoreRoute from './Routes/scoreRoute.js'


const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    credentials: true  // Allow credentials (cookies, authorization headers)
};


app.use(cors(corsOptions));

const portNo = 3000;

connectDB();
app.use(express.json());
app.use(cookieParser());


app.get('/M00916353',(req,res)=>{
    res.send("The backend server is running");
})

app.use('/M00916353/auth',authRoute);
app.use('/M00916353/player/',scoreRoute);




app.listen(portNo,(error)=>{
    if(!error){
    console.log(`Server is listening on port ${portNo}`);
    }else{
        console.log(`Error: ${error}`);
    }
})