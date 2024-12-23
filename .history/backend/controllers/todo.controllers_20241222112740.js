import Todo from "../model/todo.model.js";
import User from "../model/users.js";
import asyncHandler from "../utils/asyncHandler.js";



export const addTask = asyncHandler(async (req, res) => {
  try {
    const { heading, description } = req.body;

    // Extract user ID from the authenticated request (from the token middleware)
    const userId = req.user._id;
    if (!heading || !text) {
      return res.status(400).json({ message: "Heading and text are required" });
    }

    // Create the new Todo
    const newTodo = new Todo({
      heading,
      description,
      user: userId, // Associate with the logged-in user
    });

    await newTodo.save();

    res.status(201).json({ message: "Todo added successfully", newTodo });
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).json({ message: "not able to add task" });
  }
});


// Update Todo
export const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const { heading, text } = req.body;

    // Find and update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { heading, text },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete Todo
export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId } = req.params;

    // Find and delete the todo
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get All Todos for Authenticated User
export const getTodosByUser = asyncHandler(async (req, res) => {
  try {
    // Get the user ID from the authenticated user (e.g., from a middleware)
    const userId = req.user._id;

    // Find all todos linked to this user
    const todos = await Todo.find({ user: userId });

    res.status(200).json({
      message: todos.length > 0 ? "Todos fetched successfully" : "No tasks found",
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});
