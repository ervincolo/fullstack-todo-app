// importujemo mongooseDB model

import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB is connected!'))
.catch((err) => console.error('MongoDB is not connected!!', err));

export default mongoose;