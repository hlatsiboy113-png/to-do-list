let tasks = [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("ActionItemList");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

addBtn.addEventListener("click", addTask);

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(task);
  input.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (currentFilter === "active") {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}" 
            onclick="toggleTask(${task.id})">
        ${task.text}
      </span>
      <button onclick="deleteTask(${task.id})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}