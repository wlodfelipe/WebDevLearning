const addColumnBtn = document.getElementById('addColumnBtn');
const mainContent = document.getElementById('mainContent');
const columnContainer = document.getElementById('columnContainer');

addColumnBtn.addEventListener('click', createColumn);

function createColumn() {
    const newDiv = document.createElement('div');
    newDiv.className = 'columnName';

    const newInput = createInput('text', 'column-title-input', 'Insira o título da lista');
    const addButton = createButton('add-list-button', 'Adicionar Lista', createTaskList);
    const cancelButton = createButton('cancel-button', 'X', deleteColumn);

    newDiv.appendChild(newInput);
    newDiv.appendChild(addButton);
    newDiv.appendChild(cancelButton);

    mainContent.appendChild(newDiv);
}

function createInput(type, className, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.placeholder = placeholder;
    return input;
}

function createButton(className, text, clickHandler) {
    const button = document.createElement('button');
    button.className = className;
    button.innerText = text;
    button.addEventListener('click', clickHandler);
    return button;
}

function createTaskList() {
    const columnDiv = event.target.parentNode;
    const newTaskList = document.createElement('ul');
    const taskInput = createInput('text', 'task-input', 'Insira um título para este cartão...');
    const taskButton = createButton('add-task-button', '+ Adicionar Cartão', createTask);
    const deleteColumnButton = createButton('delete-column-button', 'Excluir Lista', deleteColumn);

    columnDiv.appendChild(taskInput);
    columnDiv.appendChild(taskButton);
    columnDiv.appendChild(newTaskList);
    columnDiv.appendChild(deleteColumnButton);

    // Configuração do sortable para a lista de tarefas
    new Sortable(newTaskList, {
        animation: 350,
        handle: 'li'
    });
}

function createTask() {
    const taskInput = event.target.parentNode.querySelector('.task-input');
    const taskList = event.target.parentNode.querySelector('ul');
    const taskText = taskInput.value;

    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

function deleteColumn() {
    const columnDiv = event.target.parentNode;
    columnDiv.remove();
}
