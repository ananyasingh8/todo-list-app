const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

const event = new KeyboardEvent('keydown', {
  key: 'Enter',
  code: 'Enter',
  which: 13,
  keyCode: 13,
});

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let task = {
      text: inputBox.value,
      checked: false,
    };
    tasks.push(task);
    renderTask(task);
  }

  inputBox.value = "";
  saveData();
}

function renderTask(task) {
  let li = document.createElement("li");
  li.innerHTML = task.text;
  if (task.checked) {
    li.classList.add("checked");
  }
  listContainer.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
}

inputBox.addEventListener("keydown", function(event) {
  if (event.key === "Enter") { 
    addTask(); 
  }
});

listContainer.addEventListener(
  "click",

  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      let index = Array.from(listContainer.children).indexOf(e.target);
      tasks[index].checked = !tasks[index].checked;
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      let index = Array.from(listContainer.children).indexOf(
        e.target.parentElement
      );
      tasks.splice(index, 1);
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(renderTask);
  }
}

showTask();


