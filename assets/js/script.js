function addTask(columnId) 
{
    const nameInput = document.getElementById(`${columnId}-task-name`).value;
    const descriptionInput = document.getElementById(`${columnId}-task-description`).value;
    const taskCreated = createTaskElement(nameInput, descriptionInput);
    document.getElementById(`${columnId}-tasks`).appendChild(taskCreated);

    saveTask();
}

function createTaskElement(nameInput, descriptionInput)
{
    const taskContainer = document.createElement('div');
    taskContainer.className = "taskContainer";
    const taskName = document.createElement('h2');
    taskName.innerText = nameInput;
    const taskDescription = document.createElement('p');
    taskDescription.innerText = descriptionInput;

    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDescription);

    return taskContainer;
}

function saveTask() {
    const columns = document.querySelectorAll('.column');
    const tasks = {};

    columns.forEach(column => {
        const columnId = column.id;
        tasks[columnId] = [];

        const taskElements = column.querySelectorAll('.taskContainer');
        taskElements.forEach(task => {
            const taskName = task.querySelector('h2').innerText;
            const taskDescription = task.querySelector('p').innerText;

            const taskInfo = {
                name: taskName,
                description: taskDescription
            };
            
            tasks[columnId].push(taskInfo);
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    if(tasksJSON)
    {
        const tasks = JSON.parse(tasksJSON);

        Object.keys(tasks).forEach(columnId => {
            const column = document.getElementById(columnId);
            const taskList = tasks[columnId];

            taskList.forEach(task => {
                const taskElement = createTaskElement(task.name, task.description);
                column.querySelector('.tasks').appendChild(taskElement);
            });
        });
    }
}