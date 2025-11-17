
import "./style.css";
import { loadState } from "./utils/storage.js";
import {
  renderTodos,
  handleAddTodo,
  handleToggleComplete,
  handleDeleteTodo,
  handleEditTodo,
} from "./logic/todoAction.js";

let appState = loadState();

const DOM = {
  todoListContainer: document.querySelector("#todo-list"),
  addTaskForm: document.querySelector("#add-task-form"),
  currentProjectName: document.querySelector("#current-project-name"),
  addTaskBtn: document.querySelector("#show-add-task-btn"),
  addTaskContainer: document.querySelector("#add-task-container"),
  greeting: document.querySelector(".greeting"),
};

const handlers = {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleComplete,
  handleEditTodo,
};

renderTodos(appState, DOM, handlers);

document.addEventListener("DOMContentLoaded", function () {
  if (DOM.addTaskForm) {
    DOM.addTaskForm.addEventListener("submit", (event) => {
      handleAddTodo(event, appState, DOM, handlers);
    });
  }

  if (DOM.addTaskBtn && DOM.addTaskContainer) {
    DOM.addTaskBtn.addEventListener("click", () => {
      DOM.addTaskContainer.classList.toggle("active");
      if (DOM.addTaskContainer.classList.contains("active")) {
        document.querySelector("#task-title").focus();
      }
    });
  }

  if (DOM.greeting) {
    DOM.greeting.classList.add("animate__animated", "animate__fadeIn");
  }
});
