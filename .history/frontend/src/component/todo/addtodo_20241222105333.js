import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const [todos, setTodos] = useState([]); // Tasks fetched from the backend
  const [newTask, setNewTask] = useState(""); // New task input
  const [editingTodo, setEditingTodo] = useState(null); // Task being edited
  const [email, setEmail] = useState(""); // Email of the user
  const [error, setError] = useState(""); // Error messages

  const baseURL = "http://localhost:8000/api";

  // Fetch tasks by user email
  const fetchTodos = async () => {
    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }
    try {
      const response = await axios.get(`${baseURL}/todos/${email}`);
      setTodos(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching tasks");
      console.error(err);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(`${baseURL}/todo`, { task: newTask, email });
      setTodos([...todos, response.data]);
      setNewTask("");
    } catch (err) {
      setError("Error adding task");
      console.error(err);
    }
  };

  // Update a task
  const handleUpdateTask = async (todoId) => {
    if (!editingTodo.task.trim()) return;
    try {
      await axios.put(`${baseURL}/todo/${todoId}`, { task: editingTodo.task });
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, task: editingTodo.task } : todo
        )
      );
      setEditingTodo(null);
    } catch (err) {
      setError("Error updating task");
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (todoId) => {
    try {
      await axios.delete(`${baseURL}/todo/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      setError("Error deleting task");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">To-Do List</h1>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email to fetch tasks"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={fetchTodos}
            className="w-full mt-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Fetch Tasks
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Add Task */}
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white p-3 rounded-r-md hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
              >
                {editingTodo && editingTodo._id === todo._id ? (
                  <input
                    type="text"
                    value={editingTodo.task}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, task: e.target.value })
                    }
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span className="text-gray-700">{todo.task}</span>
                )}
                <div className="flex space-x-2">
                  {editingTodo && editingTodo._id === todo._id ? (
                    <button
                      onClick={() => handleUpdateTask(todo._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(todo._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No tasks found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
