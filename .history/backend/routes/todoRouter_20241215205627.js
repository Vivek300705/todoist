import express from 'express';
import { addTask,updateTodo,deleteTodo,getTodosByUser } from '../controllers/todo.controllers.js';
const todorouter = express.Router();


todorouter.route("/todo").post(addTask)
todorouter.route("/todo/:todoId").put(updateTodo);
todorouter.route("/todo/:todoId").delete(deleteTodo);
todorouter.route("/todos/:email").get(getTodosByUser);


export default todorouter