import { v4 as uuidv4 } from "uuid";
export const createProject = (name) => ({
    id: uuidv4(),
    name,
    todos: [],
});

export const restoreProject = (data) => ({
    id: data.id,
    name: data.name,
    todos: data.todos,
});