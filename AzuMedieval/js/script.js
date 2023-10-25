// A função 'createTaskElement' recebe três parâmetros: 'name', 'description' e 'columnId'
function createTaskElement(name, description, columnId) {
    // Cria um novo elemento 'div' e o armazena na constante 'taskElement'
    const taskElement = document.createElement('div');
    // Define a classe do elemento 'taskElement' como 'taskElement'
    taskElement.className = 'taskElement';
    // Define o conteúdo interno do elemento 'taskElement' usando uma template string
    taskElement.innerHTML = `
        <h3 class="taskTitle">${name}</h3>
        <p class="taskDescription">${description}</p>
        <button onclick="removeTask(parentElement)">X Remover</button>
    `;
    // Torna o elemento 'taskElement' arrastável
    taskElement.draggable = true;
    // Define o id do elemento 'taskElement' como 'taskElement-' seguido da data e hora atual em milissegundos
    taskElement.id = `taskElement-${Date.now()}`;
    taskElement.addEventListener("dragstart", drag);
    // Exibe no console o id do elemento 'taskElement'
    console.log(`ID: ${taskElement.id}`)
    // Seleciona o elemento com o id igual a 'columnId' e o armazena na constante 'column'
    const column = document.getElementById(columnId);
    // Anexa o elemento 'taskElement' ao final do elemento 'column'
    column.appendChild(taskElement);
    // Retorna o elemento 'taskElement'
    saveTask()
    return taskElement;
}

// A função 'addTask' recebe um parâmetro: 'columnId'
function addTask(columnId) {
    // Seleciona o campo de nome e descrição da tarefa com base no 'columnId' fornecido
    const nameField = document.getElementById(columnId + "-name");
    const descriptionField = document.getElementById(columnId + "-description");
    // Obtém os valores dos campos de nome e descrição
    const name = nameField.value;
    const description = descriptionField.value;
    // Verifica se os campos de nome e descrição não estão vazios
    if (name !== "" && description !== "") {
        // Cria um novo elemento de tarefa com o nome, descrição e id da coluna fornecidos
        createTaskElement(name, description, columnId);

        // Salva a tarefa com o nome, descrição e id da coluna fornecidos
        saveTask(name, description, columnId);
        // Limpa os campos de nome e descrição após a criação da tarefa
        nameField.value = "";
        descriptionField.value = "";
    } else {
        // Se os campos de nome e descrição estiverem vazios, exibe um alerta para o usuário
        alert("INSIRA UM NOME E DESCRIÇÃO PARA A TASK")
    }
}

// A função 'saveTask' não recebe nenhum parâmetro
function saveTask() {
    // Seleciona todos os elementos com a classe 'column' e os armazena na constante 'columns'
    const columns = document.querySelectorAll('.column');

    // Cria um objeto vazio 'tasks' para armazenar as tarefas
    const tasks = {};

    // Para cada coluna, executa a função de callback
    columns.forEach(column => {
        // Obtém o id da coluna e o armazena na constante 'columnId'
        const columnId = column.id;
        // Seleciona todos os elementos com a classe 'taskElement' dentro da coluna e os armazena na constante 'tasksColumn'
        const tasksColumn = column.querySelectorAll('.taskElement')
        // Cria um array vazio 'taskContent' para armazenar o conteúdo das tarefas
        const taskContent = []
        // Para cada tarefa na coluna, executa a função de callback
        tasksColumn.forEach(task => {
            // Obtém o texto interno do elemento com a classe 'taskTitle' e o armazena na constante 'taskName'
            const taskName = task.querySelector('.taskTitle').innerText;
            // Obtém o texto interno do elemento com a classe 'taskDescription' e o armazena na constante 'taskDescription'
            const taskDescription = task.querySelector('.taskDescription').innerText
            // Adiciona um objeto com o nome e a descrição da tarefa ao array 'taskContent'
            taskContent.push({ name: taskName, description: taskDescription })
        })
        // Adiciona o array 'taskContent' ao objeto 'tasks' com a chave sendo o id da coluna
        tasks[columnId] = taskContent
    })
    // Armazena o objeto 'tasks' no armazenamento local. O objeto é convertido em uma string JSON antes de ser armazenado.
    localStorage.setItem('tasks', (JSON.stringify(tasks)))
}

// A função 'removeTask' recebe um parâmetro: 'taskElement'
function removeTask(taskElement) {
    // Exibe uma caixa de diálogo de confirmação para o usuário com a mensagem 'Tem certeza que deseja remover?'
    const confirmRemove = confirm('Tem certeza que deseja remover?');
    // Se o usuário clicar em 'OK' na caixa de diálogo de confirmação, 'confirmRemove' será verdadeiro
    if (confirmRemove) {
        // Remove o elemento 'taskElement' do DOM
        taskElement.remove();
        // Chama a função 'saveTask' para atualizar o armazenamento local após a remoção da tarefa
        saveTask();
    }
    // Exibe no console o elemento 'taskElement'
    console.log(taskElement);
}

// A função 'loadTasks' não recebe nenhum parâmetro
function loadTasks() {
    // Seleciona todos os elementos com a classe 'column' e os armazena na constante 'columns'
    const columns = document.querySelectorAll('.column');
    // Recupera as tarefas do armazenamento local e as converte de uma string JSON para um objeto JavaScript, armazenando-as na constante 'tasks'
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    // Verifica se existem tarefas armazenadas localmente
    if (tasks) {
        // Para cada coluna, executa a função de callback
        columns.forEach(column => {
            // Obtém o id da coluna e o armazena na constante 'columnId'
            const columnId = column.id
            // Obtém o conteúdo da tarefa para a coluna atual do objeto 'tasks' e o armazena na constante 'taskContent'
            const taskContent = tasks[columnId]
            // Verifica se existe conteúdo da tarefa para a coluna atual
            if (taskContent) {
                // Para cada tarefa no conteúdo da tarefa, executa a função de callback
                taskContent.forEach(task => {
                    // Obtém o nome e a descrição da tarefa e os armazena nas constantes 'taskName' e 'taskDescription', respectivamente
                    const taskName = task.name
                    const taskDescription = task.description
                    // Cria um novo elemento de tarefa com o nome, descrição e id da coluna fornecidos, e o armazena na constante 'taskElement'
                    const taskElement = createTaskElement(taskName, taskDescription, columnId)
                    // Anexa o elemento 'taskElement' ao final do elemento com o id igual a '${columnId}-taskContent'
                    document.getElementById(`${columnId}-taskContent`).appendChild(taskElement)
                })
            }
        })
    }
}


// A função 'allowDrop' impede que o comportamento padrão do navegador ocorra quando um elemento é arrastado sobre outro
function allowDrop(event) {
    console.log("allowDrop+");
    // O método 'preventDefault' impede que o comportamento padrão do navegador ocorra
    event.preventDefault();
}

// A função 'dragStart' é chamada quando o usuário começa a arrastar um elemento
function dragStart(event) {
    console.log("Dragstart");
    // Exibe no console o objeto do evento
    console.log(event);
    // Exibe no console o id do elemento que está sendo arrastado
    console.log(`Dragging ID: ${event.target.id}`);
    // O método 'setData' define os dados que serão transferidos durante a operação de arrastar e soltar.
    // Neste caso, o id do elemento que está sendo arrastado é definido como os dados a serem transferidos.
    event.dataTransfer.setData("text/plain", event.target.id);
}


function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data)
    let targetColumn = ev.target;

    while (targetColumn && !targetColumn.classList.contains('column')) {
        targetColumn = targetColumn.parentElement;
    }

    if (targetColumn) {
        const newTask = createTaskElement(
            draggedElement.querySelector('.taskTitle').innerText,
            draggedElement.querySelector('.taskDescription').innerText,
            draggedElement.id
        );
        targetColumn.querySelector('.taskContainer').appendChild(newTask);
        draggedElement.parentElement.removeChild(draggedElement);
        saveTask();
    }

}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
// Enquanto a coluna alvo não for nula e não tiver a classe 'column', procura pelo seu elemento pai
while (targetColumn && !targetColumn.classList.contains('column')) {
    targetColumn = targetColumn.parentElement;
}

// Se a coluna alvo existir, executa os seguintes passos
if (targetColumn) {
    // Cria um novo elemento de tarefa com os mesmos dados do elemento arrastado
    const newTask = createTaskElement(
        draggedElement.querySelector('.taskTitle').innerText,
        draggedElement.querySelector('.taskDescription').innerText,
        draggedElement.id
    );
    // Adiciona o novo elemento de tarefa ao contêiner de tarefas da coluna alvo
    targetColumn.querySelector('.taskContainer').appendChild(newTask);
    // Remove o elemento arrastado do seu contêiner original
    draggedElement.parentElement.removeChild(draggedElement);
    // Salva a tarefa no armazenamento local
    saveTask();
}

loadTasks();
