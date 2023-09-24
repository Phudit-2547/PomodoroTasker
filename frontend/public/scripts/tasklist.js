import { createTask, deleteTask, getTasks } from "./api.js";

/** @typedef {import("./config.js").Task} Task */
/** @typedef {import("./config.js").TaskPayload} TaskPayload */

/**
 * @param {Task[]} tasks
 */
function drawTaskList(tasks) {
  /** @type {HTMLTableSectionElement} */
  const taskList = document.getElementById("task-list");

  // Clear all elements
  taskList.innerHTML = "";

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.setAttribute("class", "task-item");
    const taskName = document.createElement("div");
    taskName.setAttribute("class", "task-name");
    taskName.innerText = task.name;
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button");
    removeButton.innerHTML =
      '<!-- https://iconmonstr.com/check-mark-1-svg/ -->'
      + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">'
      +   '<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>'
      + '</svg>';
    removeButton.addEventListener("click", () => handleDelete(task._id));
    taskItem.appendChild(taskName);
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
  }
}

export async function fetchAndDrawTaskList() {
  const tasks = await getTasks();

  drawTaskList(tasks);
}

/**
 * @param {string} id
 */
export async function handleDelete(id) {
  await deleteTask(id);
  await fetchAndDrawTaskList();
}

export async function handleCreateTask() {
  /** @type {HTMLSelectElement} */
  const taskName = prompt("Task name");

  if (!taskName) {
    return;
  }

  const payload = {
    name: taskName,
  };

  await createTask(payload);
  await fetchAndDrawTaskList();
}
