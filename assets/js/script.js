
/*adiciona um eventListener que só deixará essas funçoes carregarem quando o DOM
for completamente carregado, assim evitando das funçoes atropelarem a estrutura do site.
(da para adicionar outras funçoes que precisam disso aqui tambem, como das colunas)*/
document.addEventListener("DOMContentLoaded", function () {
    const colorInput = document.getElementById('colors');
    const body = document.querySelector('body');

    colorInput.addEventListener('input', () => {
        const selectedColor = colorInput.value;
        body.style.backgroundColor = selectedColor;
        saveBackgroundColor(selectedColor);
    });

    //vai salvar a cor escolhida pelo usuario dentro do localstorage, pegando a propriedade do background-color
    function saveBackgroundColor(hexadecimalColor) {
        localStorage.setItem("background-color", hexadecimalColor);
    }

    // vai pegar a cor salva no local storage(se tiver) e rodar ela toda vez q o site atualizar
    window.addEventListener('load', () => {
        const savedColor = localStorage.getItem("background-color");
        if (savedColor) {
            body.style.backgroundColor = savedColor;
            colorInput.value = savedColor;
        }
    });
});

// ----------  somente a parte de adicionar coluna ------------------

//atribui a const mainContent ao id mainContent que está na div de criar coluna
const mainContent = document.getElementById('mainContent');

//atribui a const addColumnBtn que está dentro da div de criar coluna
const addColumnBtn = document.getElementById('addColumnBtn');

//variavel auxiliar para controlar a quantidade de colunas
let idControl = 0;

function createColumn() {
    const newColumn = document.createElement('div'); //a constante newColumn cria uma div e atribui a div a ela mesma
    newColumn.className = 'listTasks'; //a div da nova coluna recebe a classe listTasks

    newColumn.id = 'listTasks' + idControl; /*a div da nova coluna recebe o id listTasks + o valor de idControl, por exemplo,  
    se idControl = 1; o id da div vai ser listTasks1 */

    const newDiv = document.createElement('div'); //a const newDiv cria uma nova div e atribui a ela mesma
    newDiv.className = 'addTaskContent'; //a div da task recebe a classe addTaskContent

    const newInput = document.createElement('input'); //a const newInput cria um input sem tipo e atribui a ela mesma

    newInput.type = 'text'; //o input criado antes recebe o tipo como texto

    newInput.placeholder = 'Adicione uma Task'; /*atribui um placeholder dentro do input para orientar o que
    o usuario deve fazer*/

    const newButton = document.createElement('button'); //a const newButton cria um botao e atribui a ela mesma
    newButton.innerText = '+'; //o texto dentro do botao vai ser um +
    newButton.id = 'addTaskBtn'; //o id do botao vai ser addTaskBtn

    /* neste caso a nossa const newButton está com um eventListener que ao receber um click executa uma
    arrowfunction, uma funçao sem nome, que realiza o addTask, tendo de parametro o newInput e newColumn*/
    newButton.addEventListener('click', () => {
        addTask(newInput, newColumn);
    });

    // a const removeColumnBtn cria um botao e atribui a ela mesma
    const removeColumnBtn = document.createElement('button');

    removeColumnBtn.innerText = 'Remover Coluna'; //o botao recebe o texto dentro dele
    removeColumnBtn.className = 'removeColumnBtn'; //o botao recebe a classe removeColumnBtn

    /* neste caso a nossa const removeColumnBtn está com um eventListener que ao receber um click executa uma
    arrowfunction, uma funçao sem nome, que atribui o metodo remove a newColumn, ou seja, a exclui.*/
    removeColumnBtn.addEventListener('click', () => {
        newColumn.remove();
        idControl--; //remove um do contador quando exclui a coluna
    });

    newDiv.append(newInput, newButton); // anexando o newInput e newButton à newDiv que é o elemento pai
    mainContent.append(newColumn, addColumnBtn); //anexando a newColumn e addColumnBtn à mainContent que é o elemento pai
    newColumn.append(newDiv, removeColumnBtn); //anexando a newDiv e removeColumnBtn à newColumn que é o elemento pai
    idControl++; //a variavel idControl recebe +1 quando a funçao termina
}

// -----------------adicionar tarefas--------------------

let idControltasks = 0

function addTask(inputElement, columnElement) {
    if (inputElement.value != '') {
        const newDiv = document.createElement('div');
        newDiv.className = 'taskContent';
        newDiv.id = 'taskContent-' + idControltasks;
        newDiv.setAttribute('draggable', true);
        newDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
        newDiv.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        newDiv.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const draggableTask = document.getElementById(taskId);

            if (draggableTask !== newDiv) {
                // Determine if the task should be moved above or below the target task
                const rect = newDiv.getBoundingClientRect();
                const mouseY = event.clientY;
                const targetMiddle = rect.top + rect.height / 2;

                if (mouseY < targetMiddle) {
                    newDiv.before(draggableTask);
                } else {
                    newDiv.after(draggableTask);
                }
            }
        });

        const newTask = document.createElement('p');
        newTask.innerText = inputElement.value;
        newTask.className = 'task';
        newTask.id = 'task' + idControltasks;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'removeBtn';
        removeBtn.innerText = 'x';
        removeBtn.addEventListener('click', () => {
            newDiv.remove();
            idControltasks--;
        });

        columnElement.appendChild(newDiv);
        newDiv.append(newTask, removeBtn);

        inputElement.value = '';
        idControltasks++;
    }
}