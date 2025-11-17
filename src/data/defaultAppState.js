import { createTodo, restoreTodo } from "../models/createTodo.js";

const todo1 = createTodo(
"Buy juce",
 "Get 2 liters juce: orange and cherry",
"2025-11-15",
 "low"
);

const todo2 = createTodo(
"Write a report ",
"Prepare a readme report file",
 "2025-11-29",
 "high"
);

export const defaultAppState = {
 todos: [todo1, todo2],
};

export function hydrateData(data) {
 if (!data || !data.todos) return defaultAppState;
 data.todos = data.todos.map((todoData) => restoreTodo(todoData));
 return data;
}