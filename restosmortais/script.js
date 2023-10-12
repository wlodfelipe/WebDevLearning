const mainContent = document.getElementById('mainContent')
const addColumnBtn = document.getElementById('addColumnBtn')
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
    mainContent.appendChild(newColumn)
    newColumn.append(newDiv, removeColumnBtn) 
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


  