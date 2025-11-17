export function todoItem(todo, { onDelete, onToggleComplete }) {
  const itemDiv = document.createElement("div");
  itemDiv.id = `task-${todo.id}`;

  itemDiv.className = `todo-item ${
    todo.completed ? "completed" : ""
  } priority-${todo.priority} animate__animated animate__fadeIn`;

  const statusIcon = todo.completed
    ? `<i class="fa-solid fa-circle-check" title="Done"></i>`
    : `<i class="fa-solid fa-circle" title="Active"></i>`;

  itemDiv.innerHTML = `
        <div class="todo-main">
            <button class="toggle-complete-btn">${statusIcon}</button>
            
            <div class="todo-details">
                <span class="todo-title">${todo.title}</span>
                <p class="todo-description">${todo.description}</p>
                <span class="todo-due-date">📅 ${todo.dueDate}</span>
            </div>
            
            <div class="todo-actions">
                <button class="delete-btn" title="delit">
                    <i class="fa-solid fa-trash"></i>delit
                </button>
            </div>
        </div>
    `;
  //complete
  itemDiv
    .querySelector(".toggle-complete-btn")
    .addEventListener("click", () => {
      onToggleComplete(todo.id);
    });
  //delete
  itemDiv.querySelector(".delete-btn").addEventListener("click", () => {
    onDelete(todo.id);
  });

  return itemDiv;
}
