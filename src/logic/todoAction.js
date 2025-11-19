
import { saveState } from "../utils/storage";
import { createTodo } from "../models/createTodo.js";
import { todoItem } from "../components/todoItem.js";

export function renderTodos(appState, DOM, handlers) {
  const { todoListContainer, currentProjectName } = DOM;

  todoListContainer.innerHTML = "";

  const todos = appState.todos;

  if (currentProjectName) {
    currentProjectName.textContent = "Tasks";
  }

  if (todos.length === 0) {
    todoListContainer.innerHTML =
      '<p class="empty-state animate__animated animate__fadeIn"> Empty. Create new task!</p>';
    return;
  }

  todos.forEach((todo) => {
    const itemElement = todoItem(todo, {
      onEdit: (id, title, desc, date, priority) =>
        handlers.handleEditTodo(
          id,
          title,
          desc,
          date,
          priority,
          appState,
          DOM,
          handlers
        ),
      onDelete: (id) => handlers.handleDeleteTodo(id, appState, DOM, handlers),
      onToggleComplete: (id) =>
        handlers.handleToggleComplete(id, appState, DOM, handlers),
    });
    todoListContainer.appendChild(itemElement);
  });
}

export function handleAddTodo(event, appState, DOM, handlers) {
  event.preventDefault();

  const { addTaskForm, addTaskContainer } = DOM;

  const title = document.querySelector("#task-title").value.trim();
  const description = document.querySelector("#task-description").value.trim();
  const dueDate = document.querySelector("#task-due-date").value;
  const priority = document.querySelector("#task-priority").value;

  if (!title) return alert("Name task required");

  const newTodo = createTodo(title, description, dueDate, priority);
  newTodo.isExpanded = false;

  appState.todos.unshift(newTodo);
  saveState(appState);

  renderTodos(appState, DOM, handlers);

  addTaskForm.reset();
  addTaskContainer.classList.remove("active");
}

export function handleDeleteTodo(taskId, appState, DOM, handlers) {
  const taskElement = document.getElementById(`task-${taskId}`);

  if (taskElement) {
    taskElement.classList.add("animate__animated", "animate__tada");

    appState.todos = appState.todos.filter((todo) => todo.id !== taskId);
    saveState(appState);

    setTimeout(() => {
      renderTodos(appState, DOM, handlers);
    }, 1500);
  }
}

export function handleToggleComplete(taskId, appState, DOM, handlers) {
  const todo = appState.todos.find((t) => t.id === taskId);

  if (todo) {
    todo.completed = !todo.completed;
    saveState(appState);
    renderTodos(appState, DOM, handlers);
  }
}

export function handleEditTodo(
  taskId,
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  appState,
  DOM,
  handlers
) {
  const todo = appState.todos.find((t) => t.id === taskId);

  if (todo) {
    todo.title = newTitle;
    todo.description = newDescription;
    todo.dueDate = newDueDate;
    todo.priority = newPriority;

    saveState(appState);
    renderTodos(appState, DOM, handlers);
  }
}
