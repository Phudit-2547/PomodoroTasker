/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} name
 */

/** @typedef {Omit<Task, "_id">} TaskPayload */

export const BACKEND_URL = "http://localhost:3222";