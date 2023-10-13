/* Adiciona um eventListener que só deixará essas funções carregarem quando o DOM
for completamente carregado, assim evitando que as funções atropelem a estrutura do site.
(Dá para adicionar outras funções que precisam disso aqui também, como das colunas) */
document.addEventListener("DOMContentLoaded", function () {
    const colorInput = document.getElementById('colors');
    const body = document.querySelector('body');

    colorInput.addEventListener('input', () => {
        const selectedColor = colorInput.value;
        body.style.backgroundColor = selectedColor;
        saveBackgroundColor(selectedColor);
    });

    // Vai salvar a cor escolhida pelo usuário dentro do localStorage, pegando a propriedade do background-color.
    function saveBackgroundColor(hexadecimalColor) {
        localStorage.setItem("background-color", hexadecimalColor);
    }

    // Vai pegar a cor salva no localStorage (se tiver) e rodá-la toda vez que o site atualizar.
    window.addEventListener('load', () => {
        const savedColor = localStorage.getItem("background-color");
        if (savedColor) {
            body.style.backgroundColor = savedColor;
            colorInput.value = savedColor;
        }
    });
});

// ---------- Somente a parte de adicionar coluna ------------------

// Atribui a const mainContent ao ID mainContent que está na div de criar coluna.
const mainContent = document.getElementById('mainContent');

// Atribui a const addColumnBtn que está dentro da div de criar coluna.
const addColumnBtn = document.getElementById('addColumnBtn');

// Variável auxiliar para controlar a quantidade de colunas.
let idControl = 0;

function createColumn() {
    const newColumn = document.createElement('div'); // A constante newColumn cria uma div e atribui a div a ela mesma.
    newColumn.className = 'listColumn'; // A div da nova coluna recebe a classe listTasks.

    newColumn.id = 'listColumn' + idControl; // A div da nova coluna recebe o ID listTasks + o valor de idControl.

    const newDiv = document.createElement('div'); // A const newDiv cria uma nova div e atribui a ela mesma.
    newDiv.className = 'addColumnName'; // A div da coluna recebe a classe addTaskContent.

    const newInput = document.createElement('input'); // A const newInput cria um input sem tipo e atribui a ela mesma.

    newInput.type = 'text'; // O input criado antes recebe o tipo como texto.

    newInput.placeholder = 'Nome da Coluna'; // Atribui um placeholder dentro do input para orientar o que o usuário deve fazer.

    const newButton = document.createElement('button'); // A const newButton cria um botão e atribui a ela mesma.
    newButton.innerText = '+'; // O texto dentro do botão será um +.
    newButton.id = 'addColumnBtn'; // O ID do botão será addTaskBtn.

    /* Neste caso, a nossa const newButton está com um eventListener que, ao receber um clique, executa uma
    arrow function que realiza o addTask, tendo como parâmetro o newInput e newColumn. */
    newButton.addEventListener('click', () => {
        addColumnName(newInput, newColumn);
        newInput.remove();
        newButton.remove();
    });

    // A const removeColumnBtn cria um botão e atribui a ela mesma.
    const removeColumnBtn = document.createElement('button');

    removeColumnBtn.innerText = 'Remover Coluna'; // O botão recebe o texto dentro dele.
    removeColumnBtn.className = 'removeColumnBtn'; // O botão recebe a classe removeColumnBtn.

    /* Neste caso, a nossa const removeColumnBtn está com um eventListener que, ao receber um clique, executa uma
    arrow function que atribui o método remove a newColumn, ou seja, a exclui. */
    removeColumnBtn.addEventListener('click', () => {
        newColumn.remove();
        idControl--; // Remove um do contador quando exclui a coluna.
    });

    newColumn.append(newDiv, removeColumnBtn); // Mova a linha aqui para que o botão fique abaixo do nome da coluna
    newDiv.append(newInput, newButton);

    mainContent.append(newColumn, addColumnBtn);

    idControl++; // A variável idControl recebe +1 quando a função termina.
}

// ----------------- Adicionar tarefas --------------------

let idControlTasks = 0;

function addColumnName(inputElement, columnElement) {
    if (inputElement.value !== '') {
        const newDiv = document.createElement('div');
        newDiv.className = 'columnContent';
        newDiv.id = 'column-' + idControlTasks;
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
                // Determine if the task should be moved above or below the target task.
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

        const columnName = document.createElement('p');
        columnName.innerText = inputElement.value;
        columnName.className = 'columnName';
        columnName.id = 'createdColumn' + idControlTasks;

        columnElement.appendChild(newDiv);
        newDiv.append(columnName);

        inputElement.value = '';
        idControlTasks++;
    }
}
