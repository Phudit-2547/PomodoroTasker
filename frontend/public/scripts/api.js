import { BACKEND_URL } from "./config.js";

/** @typedef {import("./config.js").Task} Task */
/** @typedef {import("./config.js").TaskPayload} TaskPayload */

export async function getTasks() {
  /** @type {Task[]} */
  const tasks = await fetch(`${BACKEND_URL}/tasks`).then((r) => r.json());

  return tasks;
}

/**
 * @param {TaskPayload} task
 */
export async function createTask(task) {
  await fetch(`${BACKEND_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id, task) {
  await fetch(`${BACKEND_URL}/task/${id}`, {
    method: "DELETE",
  });
}
