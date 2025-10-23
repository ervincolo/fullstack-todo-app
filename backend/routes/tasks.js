//ovdje idu svi api (endpoints za taskove)!

import express, { Router } from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// uzmi sve tasks ruta
// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// dodaj novi task ruta
// POST new task
router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create({title: req.body.title});
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// izbrisi task ruta
// DELTETE task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'Task deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;