import React, { useEffect, useState } from "react";
import "./App.css";

// tasks, drzi listu svih taskova koje si dodao ili ucitao.
// newTask drzi vrijednost iz input polja.
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedCurrentTask, setNewEditTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Adding The Task.
  const handleAddTask = async () => {
    if (!newTask) {
      alert("Please add your task"); // must enter the task..
      return; //do not do anything if empty (ako je prazno ne radi nista) tj falsy value.
    }
    try {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      const data = await res.json(); //backend vraca JSON sa novim tasks.
      console.log(data); //samo da testiram da vidim sta vraca backend.
      setTasks([...tasks, data]); //dodaje novi task u state i update-uje UI.
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };
  // Deleting The Added Task.
  const handleDltTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        //headers takodje nije potreban jer se on koristi samo kad saljes podatke u body-u (POST, PATCH).
        //body nije potreban u ovom slucaju jer kada brisemo neki resurs ne saljemo nikakav body.
        //backend vec zna koji task da obrise iz URL-a (/tasks/${id}).
      });
      const data = await res.json();
      console.log(data);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Editing the added task.
  // Edituje task na osnovu ID-a.
  const handleEditTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedCurrentTask }),
      });
      const data = await res.json();
      console.log(data);
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
      setEditingId(null);
      setNewEditTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // here (after return) comes everything that you want to see in browser (UI-rendering).
  // ovdje poslije returna dolazi frontend tj klijent strana (UI).
  return (
    <>
      <div className="main-container">
        <h1>Tasks for Today</h1>
        <button className="addBtn" onClick={handleAddTask}>
          ADD
        </button>
        <div className="input-tasks">
          <input
            type="text"
            placeholder="What is up.."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} //ovo hvata unos taska.
          />
          <ul>
            {tasks.map(
              (
                task //vraca novi array od tasks
              ) => (
                <li key={task._id}>
                  {editingId === task._id ? (
                    <>
                      <input
                        type="text"
                        value={editedCurrentTask}
                        onChange={(e) => setNewEditTask(e.target.value)}
                      />
                      <button
                        className="saveBtn"
                        onClick={() => {
                          if (editedCurrentTask.trim().length === 0) {
                            console.log("Please enter something..");
                            return;
                          }
                          if (editedCurrentTask === task.title) {
                            return;
                          }
                          handleEditTask(task._id);
                        }}
                      >
                        SAVE
                      </button>
                    </>
                  ) : (
                    <>
                      {task.title}
                      <button
                        className="editBtn"
                        onClick={() => {
                          setEditingId(task._id);
                          setNewEditTask(task.title);
                        }}
                      >
                        EDIT
                      </button>

                      <button
                        className="dltBtn"
                        onClick={() => handleDltTask(task._id)}
                      >
                        DELETE
                      </button>
                    </>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default App;
