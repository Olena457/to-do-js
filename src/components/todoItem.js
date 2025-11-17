
export function todoItem(todo, { onDelete, onToggleComplete, onEdit }) {
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
            
            <div class="todo-details view-mode">
                <span class="todo-title">${todo.title}</span>
                <p class="todo-description">${todo.description}</p>
                <span class="todo-due-date">📅 ${todo.dueDate}</span>
            </div>
            
            <div class="todo-details edit-mode hidden">
                <input type="text" class="edit-title" value="${todo.title}">
                <textarea class="edit-description">${todo.description}</textarea>
                <input type="date" class="edit-due-date" value="${todo.dueDate}">
                <select class="edit-priority">
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </div>
            
            <div class="todo-actions">
                <button class="edit-btn" title="Edit">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="save-edit-btn hidden" title="Save">
                    <i class="fa-solid fa-floppy-disk"></i> Save
                </button>
                <button class="delete-btn" title="delit">
                    <i class="fa-solid fa-trash"></i>del
                </button>
            </div>
        </div>
    `;

  const viewMode = itemDiv.querySelector(".view-mode");
  const editMode = itemDiv.querySelector(".edit-mode");
  const editBtn = itemDiv.querySelector(".edit-btn");
  const saveBtn = itemDiv.querySelector(".save-edit-btn");
  const titleInput = itemDiv.querySelector(".edit-title");
  const descriptionInput = itemDiv.querySelector(".edit-description");
  const dueDateInput = itemDiv.querySelector(".edit-due-date");
  const priorityInput = itemDiv.querySelector(".edit-priority");

  priorityInput.value = todo.priority;

  itemDiv
    .querySelector(".toggle-complete-btn")
    .addEventListener("click", () => {
      onToggleComplete(todo.id);
    });

  itemDiv.querySelector(".delete-btn").addEventListener("click", () => {
    onDelete(todo.id);
  });

  editBtn.addEventListener("click", () => {
    viewMode.classList.add("hidden");
    editMode.classList.remove("hidden");
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
    titleInput.focus();
  });

  saveBtn.addEventListener("click", () => {
    const newTitle = titleInput.value.trim();
    const newDescription = descriptionInput.value.trim();
    const newDueDate = dueDateInput.value;
    const newPriority = priorityInput.value;

    if (!newTitle) {
      alert("Name task required");
      return;
    }

    onEdit(todo.id, newTitle, newDescription, newDueDate, newPriority);

    viewMode.classList.remove("hidden");
    editMode.classList.add("hidden");
    editBtn.classList.remove("hidden");
    saveBtn.classList.add("hidden");
  });

  return itemDiv;
}
