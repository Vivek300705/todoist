import React, { useState } from "react";

const AddTodo = ({ refreshTodos }) => {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken"); // Ensure correct key is used for the token
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:8000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
        body: JSON.stringify({ heading, text }), // Align request body with backend structure
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add task.");
      }

      const data = await response.json();
      console.log(data.message);
      setHeading("");
      setText("");
      refreshTodos(); // Refresh the todo list after adding a task
    } catch (error) {
      console.error("Error adding todo:", error.message);
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
