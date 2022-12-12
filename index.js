import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import Patientroutes from './Routes/Patientroutes.js'

import dotenv from 'dotenv'
dotenv.config();

const MongoURI = process.env.MONGOURI
const port = 5000 || process.env.PORT


const app = express();
app.use(cors())
app.use(express.json())

app.use('/data',Patientroutes)
app.use('/', (req, res) => {
    res.json({ "message": "server is running at '/' " })
})

mongoose.set('strictQuery', true);
mongoose.connect(MongoURI, { useUnifiedTopology: true }).then(() => { console.log("connect to mongodb") }).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})


