import Todo from "../model/todo.model.js";
import User from "../model/users.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addTask = asyncHandler(async (req, res) => {
  try {
    const { heading, text, email } = req.body;

    // Check if all required fields are provided
    if (!heading || !text || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the todo and associate it with the user's _id
    const newTodo = new Todo({
      heading,
      text,
      user: user._id, // Use the user's _id as the reference
    });

    await newTodo.save();

    // Optionally, add the todo ID to the user's list array
    user.list.push(newTodo._id);
    await user.save();

    res.status(201).json({ message: "Todo added successfully", newTodo });
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
export const updateTodo = asyncHandler(async (req, res) => {
    try {
      const { todoId } = req.params;
      const { heading, body } = req.body;
  
      // Find and update the todo
      const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { heading, body },
        { new: true } // Return the updated document
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      return res.status(200).json({
        status: true,
        message: "Todo updated successfully",
        updatedTodo,
      });
    } catch (error) {
      console.error("Error updating todo:", error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  
//delete task
export const deleteTodo = asyncHandler(async (req, res) => {
    try {
      const { todoId } = req.params;
  
      // Find and delete the todo
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
  
      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      // Remove the todo from the user's list
      const user = await User.findById(deletedTodo.userId);
      if (user) {
        user.list = user.list.filter((id) => id.toString() !== todoId);
        await user.save();
      }
  
      return res.status(200).json({
        status: true,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  //get all todo lists
  export const getTodosByUser = asyncHandler(async (req, res) => {
    try {
      const { email } = req.params;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find all todos linked to this user
      const todos = await Todo.find({ user: user._id });
  
      if (todos.length === 0) {
        return res.status(200).json({
          status: true,
          message: "No tasks found for this user",
          todos: [], // Return an empty array for tasks
        });
      }
  
      return res.status(200).json({
        status: true,
        message: "Todos fetched successfully",
        todos,
      });
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  });  
  