import express from 'express';
const app = express();
const PORT = 5000;

app.get('/', (req,res) => res.send('Backend radi'));

app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));

