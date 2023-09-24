import { fetchAndDrawTaskList as fetchAndDrawTaskList, handleCreateTask } from "./tasklist.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTaskList();

  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", () => {
    handleCreateTask();
  });
});
