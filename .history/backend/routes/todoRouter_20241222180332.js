import express from "express";
import {
  addTask,
  updateTodo,
  deleteTodo,
  getTodosByUser,
} from "../controllers/todo.controllers";
import verifyJWT from "../middleware/auth.middleware.js";

const todorouter = express.Router();

todorouter.use(verifyJWT); // Apply middleware to all routes below

todorouter.route("/todo").post(addTask);
todorouter.route("/todo/:todoId").put(updateTodo);
todorouter.route("/todo/:todoId").delete(deleteTodo);
todorouter.route("/todos").get(getTodosByUser); // Updated: no email param

export default todorouter;
