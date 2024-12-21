import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {individual ,group} from "./routes/registrationRoutes.js"
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the MongoDB database
connectDB();

// Routes
app.post('/individual-sports',individual);
app.post('/group-sports',group)

// Server listening on the defined port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});