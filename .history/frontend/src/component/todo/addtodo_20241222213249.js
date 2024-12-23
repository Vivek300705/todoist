import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AddTodo = () => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]); // State to store the list of todos
  const [editingTodo, setEditingTodo] = useState(null); // State to track the todo being edited
  const [error, setError] = useState(""); // State to store error message

  // Function to fetch the updated list of todos
  const refreshTodos = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:8000/api/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch todos.");
      }

      const data = await response.json();
      setTodos(data.todos); // Update the todos state with the fetched data
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      setError(error.message); // Display error
    }
  };

  // Function to add or update a todo
  const handleAddOrUpdateTodo = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const url = editingTodo
        ? `http://localhost:8000/api/todo/${editingTodo._id}`
        : "http://localhost:8000/api/todo";

      const method = editingTodo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ heading, text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add/update task.");
      }

      const data = await response.json();
      console.log(data.message);
      setHeading("");
      setText("");
      setEditingTodo(null);
      refreshTodos(); // Fetch updated todos after adding/updating a task
    } catch (error) {
      console.error("Error adding/updating todo:", error.message);
      setError(error.message); // Display error
    }
  };

  // Function to delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(`http://localhost:8000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete task.");
      }

      console.log("Todo deleted successfully.");
      refreshTodos(); // Fetch updated todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      setError(error.message); // Display error
    }
  };

  // Function to start editing a todo
  const handleEditTodo = (todo) => {
    setHeading(todo.heading);
    setText(todo.text);
    setEditingTodo(todo);
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-2xl text-center">Todo App</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

          <form onSubmit={handleAddOrUpdateTodo} className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Task Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              required
            />
            <textarea
              placeholder="Task Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
            >
              {editingTodo ? "Update Task" : "Add Task"}
            </button>
          </form>

          <div>
            <h2 className="text-xl font-medium text-center mb-4">Todo List</h2>
            <ul className="list-disc pl-5">
              {todos.map((todo) => (
                <li key={todo._id} className="mb-2 flex justify-between items-center">
                  <div>
                    <strong>{todo.heading}</strong>: {todo.text}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTodo(todo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
