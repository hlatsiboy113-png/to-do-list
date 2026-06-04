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

  const priority = document.getElementById("priority").value;

  const task = {
    id: Date.now(),
    text,
    completed: false,
    priority: priority
  };

  tasks.push(task);
  input.value = ""; document.getElementById("priority").value = "medium";
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

  <small style="
    margin-left:10px;
    padding:2px 6px;
    border-radius:5px;
    font-size:10px;
    background:${
      task.priority === "high"
        ? "#ff4d4d"
        : task.priority === "medium"
        ? "#ffa500"
        : "#4caf50"
    };
    color:white;
  ">
    ${task.priority.toUpperCase()}
  </small>

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