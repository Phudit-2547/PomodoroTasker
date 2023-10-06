/** @typedef {int} workDuration */
/** @typedef {int} breakDuration */

const WORK_DURATION = 1500;
const BREAK_DURATION = 300;

/**
 * @typedef {Object} pomodoroTimer
 * @property {int} secondsLeft
 * @property {Date} prevDate
 * @property {int} intervalID
 * @property {boolean} timerStarted
 * @property {boolean} isWorkingState
 * @property {boolean} isTimerRunning
 * @property {function} pauseTimer
 * @property {function} startTimer
 * @property {function} toggleTimer
 * @property {function} decrementTimer
 */

export const pomodoroTimer = {
    secondsLeft: WORK_DURATION,
    timerStarted: false,
    isWorkingState: true,
    isTimerRunning: false,
    startTimer: function () {
        pomodoroTimer.prevDate = new Date();
        pomodoroTimer.isTimerRunning = true;
        document.getElementById("status").setAttribute("class", "active");
        document.getElementById("timer").setAttribute("class", "active");
        document.getElementById("timer-button").innerText = "Pause";
        pomodoroTimer.intervalID = setInterval(pomodoroTimer.updateTimer, 100);
    },
    pauseTimer: function () {
        pomodoroTimer.isTimerRunning = false;
        document.getElementById("status").setAttribute("class", "inactive");
        document.getElementById("timer").setAttribute("class", "inactive");
        document.getElementById("timer-button").innerText = "Continue";
        clearInterval(pomodoroTimer.intervalID);
    },
    toggleTimer: function () {
        if (pomodoroTimer.isTimerRunning) {
            pomodoroTimer.pauseTimer();
        } else {
            if (!pomodoroTimer.timerStarted) {
                pomodoroTimer.timerStarted = true;
                document.getElementById("reset-button").setAttribute("class", "big-button active");
                document.getElementById("reset-button").addEventListener("click", pomodoroTimer.resetTimer);
            }
            pomodoroTimer.startTimer();
        }
    },
    resetTimer: function () {
        if (pomodoroTimer.isTimerRunning) {
            pomodoroTimer.pauseTimer();
        }
        document.getElementById("status").innerText = "Work";
        document.getElementById("timer-button").innerText = "Start";
        document.getElementById("reset-button").setAttribute("class", "big-button inactive");
        document.getElementById("reset-button").removeEventListener("click", pomodoroTimer.resetTimer);
        pomodoroTimer.timerStarted = false;
        pomodoroTimer.secondsLeft = WORK_DURATION;
        pomodoroTimer.isWorkingState = true;
        pomodoroTimer.isTimerRunning = false;
        document.getElementById("timer").innerText = pomodoroTimer.getTimeStr(pomodoroTimer.secondsLeft);
    },
    updateTimer: function () {
        let currDate = new Date();
        pomodoroTimer.secondsLeft -= (currDate - pomodoroTimer.prevDate) / 1000;
        pomodoroTimer.prevDate = currDate;
        if (pomodoroTimer.secondsLeft <= 0) {
            if (pomodoroTimer.isWorkingState) {
                pomodoroTimer.isWorkingState = false;
                pomodoroTimer.secondsLeft = BREAK_DURATION;
                document.getElementById("status").innerText = "Break";
                new Notification("Pomodoro Timer", {
                body: "Time to take a break",
            });
            } 
            else {
                pomodoroTimer.isWorkingState = true;
                pomodoroTimer.secondsLeft = WORK_DURATION;
                document.getElementById("status").innerText = "Work";
                new Notification("Pomodoro Timer", {
                body: "Break's over!",
            },);
            }
            
        }
        document.getElementById("timer").innerText = pomodoroTimer.getTimeStr();
    },
    getTimeStr: function () {
        let minutes = Math.floor(pomodoroTimer.secondsLeft / 60);
        let seconds = Math.floor(pomodoroTimer.secondsLeft % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
};