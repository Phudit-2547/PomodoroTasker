import express from "express";

import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/:id", taskController.getTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

export default router;
