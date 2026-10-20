import express from 'express';
import "dotenv/config";
import authRoute from './src/routes/authRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import applicationRoute from './src/routes/applicationRoute.js';
import documentUploadRoute from './src/routes/documentUploadRoute.js'
import aiRoute from "./src/routes/aiRoute.js"

const app = express();



app.use(express.json())

app.use('/auth',authRoute)
app.use('/jobs',jobRoute)
app.use('/applications',applicationRoute)
app.use('/upload',documentUploadRoute)
app.use('/ai',aiRoute)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})