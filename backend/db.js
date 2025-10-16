import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Mongo baza je konektovana!'))
.catch((err) => console.error('Mongo baza nije konektovana', err));

export default mongoose;