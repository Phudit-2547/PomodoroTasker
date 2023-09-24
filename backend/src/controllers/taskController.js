import Task from "../models/taskModel.js";

/** @type {import("express").RequestHandler} */
export const getTask = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  res.status(200).json(task);
};

/** @type {import("express").RequestHandler} */
export const getAllTasks = async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
};

/** @type {import("express").RequestHandler} */
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();

    res.status(200).json({ message: "OK", _id: newTask._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

// /** @type {import("express").RequestHandler} */
// export const editTask = async (req, res) => {
//   try {
//     const updated = await Task.findByIdAndUpdate(req.params.id, req.body);

//     if (updated) {
//       res.status(200).json({ message: "OK" });
//     } else {
//       res.status(404).json({ error: "Not Found" });
//     }
//   } catch (err) {
//     if (err.name === "CastError") {
//       res.status(400).json({ error: "Bad Request" });
//     } else {
//       res.status(500).json({ error: "Internal server error." });
//     }
//   }
// };

/** @type {import("express").RequestHandler} */
export const deleteTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndDelete(req.params.id, req.body);

    if (updated) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
