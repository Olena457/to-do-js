
import { v4 as uuidv4 } from "uuid";

export const createTodo = (
  title,
  description,
  dueDate,
  priority,
  completed = false
) => ({
  id: uuidv4(),
  title,
  description,
  dueDate,
  priority,
  completed,
  isExpanded: false,
});

export const restoreTodo = (data) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  dueDate: data.dueDate,
  priority: data.priority,
  completed: data.completed,
  isExpanded: data.isExpanded || false,
});