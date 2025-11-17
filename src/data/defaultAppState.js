import { createTodo, restoreTodo } from "../models/createTodo.js";
import { createProject, restoreProject } from "../models/createProject";

const project1 = createProject("Work");
const project2 = createProject("Shopping");

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
project1.todos.push(todo1);
project2.todos.push(todo2);

export const defaultAppState = {
  projects: [project1, project2],
  currentProjectId: project1.id,
  isCreatingProject: false,
};
export function hydrateData(data) {
    if (!data || !data.projects) return defaultAppState;
    data.projects = data.projects.map(projData => {
        const project = restoreProject(projData);

        project.todos = projData.todos.map((todoData) => restoreTodo(todoData));

        return project;
    });
    return data;
}
