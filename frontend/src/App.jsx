import React, {useEffect, useState} from 'react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/tasks")  //salje zahtjev na ovaj URL i vraca promise a .then ga obradjuje
  //   .then(res => res.json())
  //   .then(data => setTasks(data))
  //   .catch(err => console.err(err));
  // }, []);

  //drugi nacin => second and more understandable way
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:4000/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.err(err);
      }
  };
  fetchTasks();
}, []);

  return (
    <>
      <div className="main-container">
        <h1>My Tasks</h1>
        <div className="input-task">
        <input type="text" placeholder='Add Task..'/>
        <button className='addBtn'>ADD</button>
        <button className='delBtn'>DEL</button>
        </div>
      </div>
    </>
  )
}

export default App;
