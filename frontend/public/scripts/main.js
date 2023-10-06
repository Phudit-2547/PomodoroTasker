import { fetchAndDrawTaskList, handleCreateTask } from "./tasklist.js";
import { pomodoroTimer } from "./timer.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDrawTaskList();
  // Ask for permission to send notifications and tell reason why
  Notification.requestPermission();
  /** @type {HTMLButtonElement} */
  const timerButton = document.getElementById("timer-button");
  timerButton.addEventListener("click", () => {
    pomodoroTimer.toggleTimer();
  });

  /** @type {HTMLButtonElement} */
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", () => {
    handleCreateTask();
  });
});
