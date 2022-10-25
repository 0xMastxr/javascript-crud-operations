let form = document.getElementById("submit-btn")
let textInput = document.getElementById("textInput")
let dateInput = document.getElementById("dateInput")
let textarea = document.getElementById("textarea")
let msg = document.getElementById("msg")
let tasks = document.getElementById("tasks")

form.addEventListener("click", (e) => {
    formValidation()
})

let formValidation = () => {
    if (textInput.value === "") {
        msg.textContent = "Task cannot be blank"
    } else {
        msg.textContent = ""
        acceptData()
        form.setAttribute("data-dismiss", "modal")
        form.click()
        msg.textContent = ""
        form.setAttribute("data-dismiss", "")
    }
}

let data = []

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    })
    localStorage.setItem("data", JSON.stringify(data))
    createTasks(data)
}

let createTasks = (data) => {
    tasks.innerHTML = ""
    data.map((x, y) => {
        return (tasks.innerHTML += `<div id=${y}>
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
    <span class="options">
        <i onClick="editTask(this)" data-toggle="modal" data-target="#form"" class="fas fa-edit"></i>
        <i
            onClick="deleteTask(this)"
            class="fas fa-trash-alt"
        ></i>
    </span>
</div>`)
    })
    resetForm()
}

let deleteTask = (task) => {
    task.parentElement.parentElement.remove()
    data.splice(task.parentElement.parentElement.id, 1)
    localStorage.setItem("data", JSON.stringify(data))
}

let editTask = (task) => {
    let selectedTask = task.parentElement.parentElement
    textInput.value = selectedTask.children[0].innerHTML
    dateInput.value = selectedTask.children[1].innerHTML
    textarea.value = selectedTask.children[2].innerHTML
    deleteTask(task)
}

let resetForm = () => {
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}

//THIS WILL RUN ON INITIALIZATION
const dataFromLocalStorage = JSON.parse(localStorage.getItem("data")) || []
if (dataFromLocalStorage) {
    data = dataFromLocalStorage
    createTasks(data)
}
