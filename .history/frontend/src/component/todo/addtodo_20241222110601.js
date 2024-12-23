// src/components/AddTodo.jsx
import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ refreshTodos }) => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8000/api/todo",
        { heading, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      setHeading("");
      setText("");
      refreshTodos(); // Refresh the todo list after adding a task
    } catch (error) {
      console.error("Error adding todo:", error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleAddTodo} className="flex flex-col gap-4 p-4">
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
  );
};

export default AddTodo;
