import Todo from "../model/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../model/users.js";
// Add Task
export const addTask = asyncHandler(async (req, res) => {
  const { heading, text } = req.body;

  if (!heading || !text) {
    return res.status(400).json({ message: "Heading and text are required" });
  }

  // Fetch the user from the database using the userId from the JWT token
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Create a new todo associated with the user
  const newTodo = new Todo({
    heading,
    text,
    user: req.user.userId, // Attach userId from token
  });

  user.list.push(newTodo._id); 
  // Save the todo to the database
  await newTodo.save();

  // Log the todo with the associated user's email
  console.log(`Todo added by user with email: ${user.email}`, newTodo);

  res.status(201).json({
    message: "Todo added successfully",
    todo: newTodo,
    email: user.email, // Return the email of the user associated with the todo
  });
});
// Update Task
export const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const { heading, text } = req.body;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: todoId, user: req.user.userId }, // Ensure user owns the task
    { heading, text },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ message: "Todo updated", todo: updatedTodo });
});

// Delete Task
export const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  const deletedTodo = await Todo.findOneAndDelete({
    _id: todoId,
    user: req.user.userId, // Ensure user owns the task
  });

  if (!deletedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ message: "Todo deleted" });
});

// Get All Todos for a User
export const getTodosByUser = asyncHandler(async (req, res) => {
  // Get todos for the logged-in user
  const todos = await Todo.find({ user: req.user.userId });

  if (!todos.length) {
    return res.status(200).json({ message: "No tasks found", todos: [] });
  }

  res.status(200).json({ message: "Todos fetched successfully", todos });
});
