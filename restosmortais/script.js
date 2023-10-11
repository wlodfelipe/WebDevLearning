const addColumnBtn = document.getElementById('addColumnBtn')
const mainContent = document.getElementById('mainContent')
let idControl = 0

function createColumn() {
    const newColumn = document.createElement('div')
    newColumn.className = 'listTasks'
    newColumn.id = 'listTasks-' + idControl

    const newDiv = document.createElement('div')
    newDiv.className = 'addTaskContent'
    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.placeholder = 'Adicione uma Task'
    const newButton = document.createElement('button')
    newButton.innerText = '+'
    newButton.id = 'addTaskBtn'
    newButton.addEventListener('click', () => {
        addTask(newInput, newColumn)
    })

    const removeColumnBtn = document.createElement('button')
    removeColumnBtn.innerText = 'Remover Coluna'
    removeColumnBtn.className = 'removeColumnBtn'
    removeColumnBtn.addEventListener('click', () => {
        newColumn.remove()
    })

    newDiv.append(newInput, newButton)
    newColumn.append(newDiv, removeColumnBtn)
    mainContent.appendChild(newColumn)
    idControl++
}

function addTask(inputElement, columnElement) {

    if (inputElement.value != '') {
        const newDiv = document.createElement('div')
        newDiv.className = 'taskContent'
        newDiv.id = 'taskContent-' + idControl

        const newTask = document.createElement('h2')
        newTask.innerText = inputElement.value
        newTask.className = 'task'
        newTask.id = 'task-' + idControl

        const removeBtn = document.createElement('button')
        removeBtn.className = 'removeBtn'
        removeBtn.innerText = 'x'
        removeBtn.addEventListener('click', () => {
            newDiv.remove(this)
        })

        columnElement.appendChild(newDiv)
        newDiv.append(newTask, removeBtn)

        inputElement.value = ''
    }
}


addColumnBtn.addEventListener('click', createColumn)


document.addEventListener("DOMContentLoaded", function () {
    // Função de chamada para carregar cores no carregamento da página
    loadColor();
  
    // Adicione um evento ao botão "Crocar de Cor"
    var colorButton = document.getElementById("colorButton");
    colorButton.addEventListener("click", toggleColorPicker);
  
    // Obtenha todos os botões coloridos e adicione um evento a cada um
    var colorButtons = document.querySelectorAll(".color-option");
    colorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var color = button.style.backgroundColor;
            changeColor(color);
        });
    });
  });
  
  function changeColor(color) {
    document.getElementsByTagName("BODY")[0].style.backgroundColor = color;
    saveBackgroundColor(color);
  }
  
  function saveBackgroundColor(hexadecimalColor) {
    localStorage.setItem("background-color", hexadecimalColor);
  }
  
  function loadColor() {
    var backgroundColor = localStorage.getItem("background-color");
    if (backgroundColor) {
        changeColor(backgroundColor);
    }
  }
  
  function toggleColorPicker() {
    var colorSelector = document.getElementById("colors");
    if (colorSelector.style.display === "none" || colorSelector.style.display === "") {
        colorSelector.style.display = "block";
    } else {
        colorSelector.style.display = "none";
    }
  }
  