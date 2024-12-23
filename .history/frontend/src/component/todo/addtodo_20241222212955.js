import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AddTodo = () => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]); // State to store the list of todos
  const [editingTodo, setEditingTodo] = useState(null); // State to track the todo being edited

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
    }
  };

  // Function to add or update a todo
  const handleAddOrUpdateTodo = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen flex flex-col bg-grey-lighter">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 text-center shadow-lg">
        <h1 className="text-lg font-semibold">Todo App</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <form onSubmit={handleAddOrUpdateTodo} className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Task Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="border rounded p-2"
              required
            />
            <textarea
              placeholder="Task Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded p-2"
              required
            />
            <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
              {editingTodo ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="w-full max-w-lg">
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center shadow-lg">
        <p>&copy; 2024 Todo App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AddTodo;
