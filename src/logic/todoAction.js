import { saveState } from "../utils/storage";
import { createTodo } from "../models/createTodo.js";
import { todoItem } from "../components/todoItem.js";

function getCurrentProject(appState) {
  return appState.projects.find((p) => p.id === appState.currentProjectId);
}

export function renderTodos(appState, DOM, handlers) {
  const { todoListContainer, currentProjectName } = DOM;

  todoListContainer.innerHTML = "";

  const project = getCurrentProject(appState);
  if (!project) return;

  currentProjectName.textContent = project.name;

  if (project.todos.length === 0) {
    todoListContainer.innerHTML =
      '<p class="empty-state animate__animated animate__fadeIn"> Empty. Create new task!</p>';
    return;
  }

  project.todos.forEach((todo) => {
    const itemElement = todoItem(todo, {
      onDelete: (id) => handlers.handleDeleteTodo(id, appState, DOM, handlers),
      onToggleComplete: (id) =>
        handlers.handleToggleComplete(id, appState, DOM, handlers),
    });
    todoListContainer.appendChild(itemElement);
  });
}

export function handleAddTodo(event, appState, DOM) {
  event.preventDefault();

  const { addTaskForm, addTaskContainer } = DOM;

  const title = document.querySelector("#task-title").value.trim();
  const description = document.querySelector("#task-description").value.trim();
  const dueDate = document.querySelector("#task-due-date").value;
  const priority = document.querySelector("#task-priority").value;

  if (!title) return alert("Name task required");

  const newTodo = createTodo(title, description, dueDate, priority);
  const project = getCurrentProject(appState);

  if (project) {
    project.todos.unshift(newTodo);
    saveState(appState);
    renderTodos(appState, DOM, {
      handleAddTodo,
      handleDeleteTodo,
      handleToggleComplete,
    });

    addTaskForm.reset();
    addTaskContainer.classList.remove("active");
  }
}

export function handleDeleteTodo(taskId, appState, DOM, handlers) {
  const taskElement = document.getElementById(`task-${taskId}`);
  const project = getCurrentProject(appState);

  if (taskElement && project) {
    taskElement.classList.add("animate__animated", "animate__tada");

    setTimeout(() => {
      taskElement.remove();
      project.todos = project.todos.filter((todo) => todo.id !== taskId);
      saveState(appState);
      renderTodos(appState, DOM, handlers);
    }, 1500);
  }
}

export function handleToggleComplete(taskId, appState, DOM, handlers) {
  const project = getCurrentProject(appState);
  if (!project) return;

  const todo = project.todos.find((t) => t.id === taskId);
  if (todo) {
    todo.completed = !todo.completed;
    saveState(appState);
    renderTodos(appState, DOM, handlers);
  }
}
