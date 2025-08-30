import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes'
dotenv.config();

export const mongo_url = process.env.MONGO_URI || "";
export const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.get('/health', (_req, res) => {
    res.status(200).json({status: "OK"});
});

const startServer = async () =>{
    try{
        await mongoose.connect(mongo_url);
        console.log('mongoose connected');
        app.listen(port, () => {
            console.log('app is listening on port: ', port);
        });
    }catch(e){
        console.log("Failed to connect mongodb", e);
        process.exit(1);
    }
}

startServer();