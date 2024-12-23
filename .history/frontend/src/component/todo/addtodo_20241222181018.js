import React, { useState, useEffect } from "react";

const AddTodo = () => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]); // State to store the list of todos

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

  // Function to add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:8000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ heading, text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add task.");
      }

      const data = await response.json();
      console.log(data.message);
      setHeading("");
      setText("");
      refreshTodos(); // Fetch updated todos after adding a task
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="p-4">
      <form onSubmit={handleAddTodo} className="flex flex-col gap-4 mb-6">
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
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Todo List</h2>
        <ul className="list-disc pl-5">
          {todos.map((todo) => (
            <li key={todo._id} className="mb-2">
              <strong>{todo.heading}</strong>: {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTodo;
