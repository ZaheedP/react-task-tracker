import { useState, useEffect } from "react";

import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const makeAPICall = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/swot/api/v1/syllabus/get-all",
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors",
      day: "5th Feb",
      reminder: true,
    },
    {
      id: 2,
      text: "Teacher",
      day: "5th March",
      reminder: true,
    },
    {
      id: 3,
      text: "Dog",
      day: "24th April",
      reminder: false,
    },
  ]);

  //ADD TASk
  const addTask = (task) => {
    // console.log("task", task);
    const id = Math.floor(Math.random() * 10000 + 1);

    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //TOGGLE REMINDER
  const toggleReminder = (id) => {
    console.log("reminder", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onDoubleClick={toggleReminder}
        />
      ) : (
        "No Tasks To Show"
      )}{" "}
    </div>
  );
}

export default App;
