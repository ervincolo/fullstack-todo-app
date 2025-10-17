import React, {useEffect, useState} from 'react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // useEffect(() => {
  //   fetch("http://localhost:4000/tasks")  //salje zahtjev na ovaj URL i vraca promise a .then ga obradjuje
  //   .then(res => res.json())
  //   .then(data => setTasks(data))
  //   .catch(err => console.err(err));
  // }, []);

  //drugi nacin => second and more understandable way
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/tasks");
//         const data = await res.json();
//         setTasks(data);
//       } catch (err) {
//         console.err(err);
//       }
//   };
//   fetchTasks();
// }, []);

  const handleAddTask = async () => {
    if (!newTask) 
    return; //do not do anything if empty (ako je prazno ne radi nista)

  try {
    const res = await fetch("http://localhost:4000/tasks", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({title: newTask})
  });
    const data = await res.json(); //backend vraca JSON sa novim tasks
    console.log(data); //samo da testiram da vidim sta vraca backend
    setTasks([...tasks, data]); //dodaje novi task u state i update-uje UI
    setNewTask('');
  } catch (err) {
    console.err(err);
  }
};
    return (
    <>
     <div className="main-container">
      <input type="text"
      placeholder='Add New Task..'
      value= {newTask} 
      onChange={ e => setNewTask(e.target.value)}
      />
      <button className='addBtn' onClick={handleAddTask}>ADD</button>
    </div>
   
    </>
  );




};


export default App;
