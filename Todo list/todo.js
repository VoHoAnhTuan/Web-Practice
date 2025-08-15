const taskInput = document.getElementById("taskInput");
const taskButton = document.getElementById("taskButton");
const taskList = document.getElementById("taskList");

// Array to store tasks
let tasks = [];

// Render task list
function renderTasks() {
  taskList.innerHTML = ""; // Clears the <ul> before re-adding items, so you don’t end up with duplicates.
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center m-1";

    li.innerHTML = `
      <span class="task-text">${index + 1}. ${task}</span>
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary edit-btn" data-index="${index}">✏️</button>
        <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add button
taskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
});

// Press Enter to add task
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form submit / page reload
    taskButton.click(); // trigger the Add button's click handler
  }
});

// Delegated clicks (Delete, Edit, Save, Cancel)
taskList.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".delete-btn");

  if (deleteButton) {
    const index = Number(deleteButton.dataset.index);
    if (Number.isInteger(index)) {
      tasks.splice(index, 1);
      renderTasks();
    }
    return;
  }

  // Edit task
  const edit = e.target.closest(".edit-btn");
  if (edit) {
    const idx = Number(edit.dataset.index);
    if (!Number.isInteger(idx)) return;

    const li = edit.closest("li");
    const currentText = tasks[idx];

    li.innerHTML = `
        <input type="text" class="form-control me-2 edit-input" value="${currentText}"/>
     <div class="btn-group">
        <button class="btn btn-sm btn-outline-success save-btn" data-index="${idx}">✅</button>
        <button class="btn btn-sm btn-outline-danger cancel-btn">❌</button>
      </div>
    `;

    // SAVE
    li.querySelector(".save-btn").addEventListener("click", () => {
      const newValue = li.querySelector(".edit-input").value.trim();
      if (newValue) {
        tasks[idx] = newValue;
        renderTasks();
      }
    });

    // CANCEL
    li.querySelector(".cancel-btn").addEventListener("click", () => {
      renderTasks();
    });
  }
});
