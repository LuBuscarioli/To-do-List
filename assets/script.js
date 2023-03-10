
const newTaskInput = document.querySelector('#new-task input');
const tasksDiv = document.querySelector('#tasks');

let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

// on window load
window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks();
};

// function to display tasks

const displayTasks = () => {
    if(Object.keys(localStorage).length > 0) {
        tasksDiv.style.display = "inline-block";
    } else {
        tasksDiv.style.diplay = "none";
    }

    //clear the tasks
    tasksDiv.innerHTML = ""

    //fetch all the keys in local storage
    let tasks = Objects.keys(localStorage);
    tasks = tasks.sort();

    for (let key of tasks) {
        let classValue = "";

        //get all values
        let value = localStorage.getItem(key);
        let taskInnerDiv = document.createElement("div");
        taskInnerDiv.classList.add("task");
        taskInnerDiv.setAttribute("id", key);
        taskInnerDiv.innerHTML  = `<span id="taskname">${key.split("_")[1]}</span>`;
        //localstorage would store boolean as string so we parse it to boolean back
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
        if (!JSON.parse(value)) {
            editButton.style.visibility = "visible";
        } else {
            editButton.style.visibility = "hidden";
            taskInnerDiv.classList.add("completed");
        }
        taskInnerDiv.appendChild(editButton);
        taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash"></i></button>`
        tasksDiv.appendChild(taskInnerDiv);
    }
};

// disable edit button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

//Remove task from local storage 
const removeTask = (taskValue) => {
    localStorage.removeItem(taskValue);
    displayTasks();
}

//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
    localStorage.setItem(`${index}_${taskValue}`, completed);
    displayTasks();
};

//Function to add new task 
document.querySelector("#push").addEventListener("click", () => {
    //Enable edit button
    disableButtons(false);
    if(newTaskInput.value.length == 0) {
        alert("Please enter a task");
    } else {
        //store locally and display from local storage
        if (updateNote == "") {
            //new task
            updateStorage(count, newTaskInput.value, false);
        } else {
            //update task
            let existingCount = updateNote.split("_")[0];
            removeTask(updateNote);
            updateStorage(existingCount, newTaskInput.value, false);
            updateNote = "";
        }
        count += 1;
        newTaskInput.value = "";
    }
});