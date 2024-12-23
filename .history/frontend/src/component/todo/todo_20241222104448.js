import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [newTask, setNewTask] = useState(""); // State for new task input
  const [error, setError] = useState(""); // State for error message

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks");
        setTasks(response.data); // Set tasks from the backend
      } catch (error) {
        setError("Error fetching tasks");
        console.error(error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once on component mount

  // Handle adding a new task
  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post("http://localhost:8000/api/tasks", {
          task: newTask,
        });
        setTasks([...tasks, response.data]); // Add the new task to the state
        setNewTask(""); // Reset the input field
      } catch (error) {
        setError("Error adding task");
        console.error(error);
      }
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove deleted task from state
    } catch (error) {
      setError("Error deleting task");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-center font-bold mb-6">To-Do List</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}

        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                <span className="text-gray-700">{task.task}</span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No tasks available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
