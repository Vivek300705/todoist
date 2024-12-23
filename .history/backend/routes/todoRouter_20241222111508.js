import express from "express";
import {
  addTask,
  updateTodo,
  deleteTodo,
  getTodosByUser,
} from "../controllers/todo.controllers.js";
import verifyJWT from "../middlerware/auth.midddleware.js";

const todorouter = express.Router();

// Protect all routes with verifyJWT middleware
todorouter.route("/todo").post(verifyJWT, addTask);
todorouter.route("/todo/:todoId").put(verifyJWT, updateTodo);
todorouter.route("/todo/:todoId").delete(verifyJWT, deleteTodo);
todorouter.route("/todos").get(verifyJWT, getTodosByUser);

export default todorouter;
