import React, {useEffect, useState} from 'react';
import './App.css'

// tasks, drzi listu svih taskova koje si dodao ili ucitao.
// newTask drzi vrijednost iz input polja.
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


// Adding The Task  
const handleAddTask = async () => {
    if (!newTask) 
    return; //do not do anything if empty (ako je prazno ne radi nista) tj falsy value.

  try {
    const res = await fetch("http://localhost:4000/tasks", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({title: newTask})
  });
    const data = await res.json(); //backend vraca JSON sa novim tasks.
    console.log(data); //samo da testiram da vidim sta vraca backend.
    setTasks([...tasks, data]); //dodaje novi task u state i update-uje UI.
    setNewTask('');
  } catch (err) {
    console.error(err);
  }
};
// Deleting The Added Task
const handleDltTask = async (id) => {
  try {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      //headers takodje nije potreban jer se on koristi samo kad saljes podatke u body-u (POST, PATCH).
      //body nije potreban u ovom slucaju jer kada brisemo neki resurs ne saljemo nikakav body.
      //backend vec zna koji task da obrise iz URL-a (/tasks/${id}).
    });
    const data = await res.json();
    console.log(data);
    setTasks(tasks.filter(task => task._id !== id));
  } catch (err)
 {
  console.error(err);
 }};

  // here (after return) comes everything that you want to see in browser (UI-rendering).
    return (
    <>
     <div className="main-container">
      <h1>My Tasks</h1>
          <button className='addBtn' onClick={handleAddTask}>ADD</button>
      <div className="input-tasks">
       <input type="text"
        placeholder='Add New Task..'
        value= {newTask} 
        onChange={ e => setNewTask(e.target.value)} //ovo hvata unos taska.
      />
      <ul>
        {tasks.map(task => 
          <li key={task._id}>
            {task.title}
          <button className='dltBtn' onClick={() => handleDltTask(task._id)}>DEL</button>
          </li>
        )}
      </ul>
  
     </div>
    </div>
  </>
);


};
export default App;
