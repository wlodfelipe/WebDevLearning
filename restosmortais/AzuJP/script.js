const addColumnBtn = document.getElementById('addColumnBtn');
const mainContent = document.getElementById('mainContent');
const columnContainer = document.getElementById('columnContainer');

function createColumn() {
    const newDiv = document.createElement('div');
    newDiv.className = 'columnName';

    const newInput = document.createElement('input');
    newInput.className = 'column-title-input'; // Classe para a entrada de título da lista
    newInput.type = 'text';
    newInput.placeholder = 'Insira o título da lista';

    const addButton = document.createElement('button');
    addButton.className = 'add-list-button'; // Classe para o botão "Adicionar Lista"
    addButton.innerText = 'Adicionar Lista';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-button'; // Classe para o botão "X"
    cancelButton.innerText = 'X';

    cancelButton.addEventListener('click', function () {
        // Remove a coluna e seus elementos
        newDiv.remove();
    });

    addButton.addEventListener('click', function () {
        const columnName = newInput.value;
        if (columnName) {
            // Cria a coluna e seu conteúdo
            const column = document.createElement('div');
            column.className = 'column';
            const columnTitle = document.createElement('h2');
            columnTitle.textContent = columnName;
            column.appendChild(columnTitle);

            // Cria um botão de exclusão da coluna
            const deleteColumnButton = document.createElement('button');
            deleteColumnButton.className = 'delete-column-button'; // Classe para o botão de exclusão da coluna
            deleteColumnButton.innerText = 'Excluir Lista';
            
            deleteColumnButton.addEventListener('click', function () {
                // Remove a coluna e seus elementos
                column.remove();
            });

            // Cria um campo de entrada para adicionar tarefas
            const taskInput = document.createElement('input');
            taskInput.className = 'task-input'; // Classe para a entrada de tarefas
            taskInput.type = 'text';
            taskInput.placeholder = 'Insira um título para este cartão...';

            // Botão para adicionar tarefas
            const taskButton = document.createElement('button');
            taskButton.className = 'add-task-button'; // Classe para o botão "Adicionar Tarefa"
            taskButton.innerText = '+ Adicionar Cartão';

            const taskList = document.createElement('ul');

            taskButton.addEventListener('click', function () {
                const taskText = taskInput.value;
                if (taskText) {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = taskText;

                    // Cria um botão de exclusão de tarefa
                    const deleteTaskButton = document.createElement('button');
                    deleteTaskButton.className = 'delete-task-button'; // Classe para o botão de exclusão de tarefa
                    deleteTaskButton.innerText = 'X';

                    deleteTaskButton.addEventListener('click', function () {
                        // Remove a tarefa
                        taskItem.remove();
                    });

                    taskItem.appendChild(deleteTaskButton);
                    taskList.appendChild(taskItem);
                    taskInput.value = ''; // Limpa o campo de entrada
                }
                
                // Após criar a lista de tarefas, torne-a classificável usando Sortable
                new Sortable(taskList, {
                    animation: 350,
                    handle: 'li' // seleciona o elemento que irá aparecer no drag
                });
            });

            // Adiciona o campo de entrada, o botão de tarefa, o botão de exclusão e a lista de tarefas à coluna
            column.appendChild(taskInput);
            column.appendChild(taskButton);
            column.appendChild(taskList);
            column.appendChild(deleteColumnButton);

            // Adiciona a coluna ao container de colunas
            columnContainer.appendChild(column);

            // Limpa o campo de entrada do título da coluna
            newInput.value = '';
        }
    });

    newDiv.appendChild(newInput);
    newDiv.appendChild(addButton);
    newDiv.appendChild(cancelButton);

    // Adiciona o novo elemento à área de conteúdo principal
    mainContent.appendChild(newDiv);
}

addColumnBtn.addEventListener('click', createColumn);
