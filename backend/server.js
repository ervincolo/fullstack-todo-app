//ucitava express
//registruje rute
//poveze se sa bazom (MongoDB)
//pokrece server na zeljenom portu

import express from "express";
import cors from 'cors';
import "./db.js"; // importovana MongoDB baza kako bi se mogli modeli koristiti unutar
import taskRoutes from './routes/tasks.js';

const app = express();
app.use(cors()); //da bi dozvolili sve domene
app.use(express.json()); //cita req.body

app.use('/tasks', taskRoutes); //registrovane task rute

app.get("/", (req, res) => res.send("Server is working, mongoDB connected"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

export default app;