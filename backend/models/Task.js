//ovdje idu Mongoose Modeli !
//Importing Mongoose models.

import mongoose from "mongoose";
const { Schema } = mongoose; //destructuring => moongose.Schema

const taskSchema = new Schema({
    title: { type: String, required: true},
    completed: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now }
});

//Kada importujemo ovaj model Task je sada objekat koji cemo koristiti u backendu
//kako bi mogli raditi CRUD: npr Task.create({title: 'Ucim Programiranje'});
//Task.find() ... itd..
const Task = mongoose.model('Task', taskSchema);
export default Task;