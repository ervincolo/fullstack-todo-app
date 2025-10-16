import express from "express";
import "./db.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Server radi i MongoDB je povezan!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
