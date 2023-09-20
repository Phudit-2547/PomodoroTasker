import express from "express";
import cors from "cors"
import TasksRoute from "./routes/tasksRoute.js";
import TaskRoute from "./routes/taskRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// use routes
app.use("/tasks", TasksRoute);
app.use("/task", TaskRoute);

export default app;
