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

  // Function to toggle the completion of a todo and move it to the end
  const handleToggleCompletion = async (id, completed) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(`http://localhost:8000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }), // Toggle the completion status
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update task.");
      }

      // After toggling the completion status, reorder the tasks
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      );

      // Reorder the todos so completed tasks go to the bottom
      const reorderedTodos = [
        ...updatedTodos.filter((todo) => !todo.completed),
        ...updatedTodos.filter((todo) => todo.completed),
      ];

      setTodos(reorderedTodos); // Update the todos state with the new order

    } catch (error) {
      console.error("Error toggling completion:", error.message);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container mx flex flex-row gap-6 py-4 px-2">
        {/* Todo List Box */}
        <div className="flex-1  bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-medium mb-4">Todo List</h2>
          <div className="flex flex-col gap-4">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex flex-col p-4 bg-blue-100 rounded-md shadow-md"
                style={{
                  minWidth: "250px", // Adjust the min-width as needed
                  maxWidth: "400px", // Adjust the max-width as needed
                }}
              >
                <div className="flex items-center gap-2">
                  {/* Checkbox at the start of each todo */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompletion(todo._id, todo.completed)}
                    className="mr-2"
                  />
                  <div
                    className={`${
                      todo.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <strong>{todo.heading}</strong>: {todo.text}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
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
              </div>
            ))}
          </div>
        </div>

        {/* Todo Form Box */}
        <div className="flex-1 bg-white p-6 rounded-md shadow-md">
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
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
