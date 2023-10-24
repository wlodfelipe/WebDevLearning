function createTaskElement(name, description, columnId) {
    const taskElement = document.createElement('div');
    taskElement.className = 'taskElement';
    taskElement.innerHTML = `
        <h3 class="taskTitle">${name}</h3>
        <p class="taskDescription">${description}</p>
        <button onclick="removeTask(parentElement)">X Remover</button>
    `;

    const column = document.getElementById(columnId);
    column.appendChild(taskElement);

    return taskElement;
}

function addTask(columnId) {
    const nameField = document.getElementById(columnId + "-name");
    const descriptionField = document.getElementById(columnId + "-description");

    const name = nameField.value;
    const description = descriptionField.value;

    if (name !== "" && description !== "") {

        createTaskElement(name, description, columnId);
        saveTask(name, description, columnId);

        nameField.value = "";
        descriptionField.value = "";
    }else{
        alert("INSIRA UM NOME E DESCRIÇÃO PARA A TASK")
    }
}

function saveTask() {
    const columns = document.querySelectorAll('.column');
    const tasks = {};


    columns.forEach(column => {
        const columnId = column.id;
        const tasksColumn = column.querySelectorAll('.taskElement')
        const taskContent = []

        tasksColumn.forEach(task => {
            const taskName = task.querySelector('.taskTitle').innerText;
            const taskDescription = task.querySelector('.taskDescription').innerText
            taskContent.push({ name: taskName, description: taskDescription })
        })

        tasks[columnId] = taskContent
    })

    localStorage.setItem('tasks', (JSON.stringify(tasks)))
}


function removeTask(taskElement) {
    const confirmRemove = confirm('Tem certeza que deseja remover?');
    if (confirmRemove) {
        taskElement.remove();
        saveTask();
    }
    console.log(taskElement);
}

function loadTasks() {
    const columns = document.querySelectorAll('.column');
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        columns.forEach(column => {
            const columnId = column.id
            const taskContent = tasks[columnId]

            if (taskContent) {
                taskContent.forEach(task => {
                    const taskName = task.name
                    const taskDescription = task.description

                    const taskElement = createTaskElement(taskName, taskDescription, columnId)

                    document.getElementById(`${columnId}-taskContent`).appendChild(taskElement)
                })
            }
        })
    }
}

loadTasks();
