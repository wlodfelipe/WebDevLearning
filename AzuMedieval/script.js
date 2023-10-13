function changeBackgroundColor() {
    const color = document.getElementById("background-color").value;
    document.body.style.backgroundColor = color;
}

function createTaskElement(name, description, columnId) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <button onclick="removeTask(this)">X Remover</button>
    `;

    const column = document.getElementById(columnId);
    column.appendChild(taskElement);
}

function addTask(columnId) {
    const nameField = document.getElementById(columnId + "-name");
    const descriptionField = document.getElementById(columnId + "-description");

    const name = nameField.value;
    const description = descriptionField.value;

    createTaskElement(name, description, columnId);
    saveTask(name, description, columnId);

    nameField.value = "";
    descriptionField.value = "";
}

function saveTask(name, description, columnId) {
    const task = { name, description };
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push(task);
    localStorage.setItem(columnId, JSON.stringify(tasks));
}

function loadTasks() {
    const columns = ["todo", "inProgress", "done"];
    columns.forEach(columnId => {
        const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
        tasks.forEach(task => {
            createTaskElement(task.name, task.description, columnId);
        });
    });
}

function removeTask(button) {
    const taskElement = button.parentElement;
    const column = taskElement.parentElement;
    const columnName = column.id;
    const tasks = JSON.parse(localStorage.getItem(columnName)) || [];
    const taskIndex = Array.from(column.children).indexOf(taskElement);

    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem(columnName, JSON.stringify(tasks));
    }

    column.removeChild(taskElement);
    saveTask();
}


loadTasks();