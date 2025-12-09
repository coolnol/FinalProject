let tasks = [];
let taskId = 1;

// form and task display div
let form = document.getElementById("taskForm");
let taskArea = document.getElementById("taskmanager");

// form submit event
form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("taskName").value.trim();
    let priority = document.getElementById("taskPriority").value;
    let important = document.getElementById("importantCheck").checked;
    let completed = document.getElementById("completedCheck").checked;

    // check for empty input
    if(name === ""){
        document.getElementById("errorMessage").innerHTML = "Task name can't be empty.";
        return;
    } else {
        document.getElementById("errorMessage").innerHTML = "";
    }

    // date the task was added
    let dateAdded = new Date().toLocaleString();

    let task = {
        id: taskId++,
        name: name,
        priority: priority,
        isImportant: important,
        isCompleted: completed,
        date: dateAdded
    };

    tasks.push(task);

    form.reset();
    document.getElementById("taskPriority").value = "Medium";

    showTasks();
    logTasks();
});

// function to display tasks
function showTasks(){
    if(tasks.length === 0){
        taskArea.innerHTML = "<p>No tasks yet.</p>";
        return;
    }

    let out = "";

    for(let i = 0; i < tasks.length; i++){
        let t = tasks[i];

        out += `
        <div id="box-${t.id}" class="taskBox">
            <p><strong>${t.name}</strong> (${t.priority})</p>
            <p>Added: ${t.date}</p>

            <button onclick="toggleDone(${t.id})">
                ${t.isCompleted ? "Undo" : "Done"}
            </button>

            <button onclick="toggleImportant(${t.id})">
                ${t.isImportant ? "Unmark Important" : "Important"}
            </button>

            <button onclick="deleteTask(${t.id})" style="color:red;">
                Delete
            </button>
        </div>
        `;
    }

    taskArea.innerHTML = out;

    applyStyles();
}

// style tasks based on conditions
function applyStyles(){
    for(let i = 0; i < tasks.length; i++){
        let t = tasks[i];
        let box = document.getElementById("box-" + t.id);

        // base styles
        box.style.borderLeft = "4px solid gray";
        box.style.textDecoration = "none";
        box.style.opacity = "1";
        box.style.background = "white";

        // priority colors
        if(t.priority === "High"){
            box.style.borderLeft = "4px solid red";
        } else if(t.priority === "Low"){
            box.style.borderLeft = "4px solid green";
        }

        // important tasks
        if(t.isImportant){
            box.style.background = "#ffcccc";
        }

        // completed tasks
        if(t.isCompleted){
            box.style.textDecoration = "line-through";
            box.style.opacity = "0.7";
        }
    }
}

// delete function
function deleteTask(id){
    tasks = tasks.filter(t => t.id !== id);
    showTasks();
    logTasks();
}

// toggle completed
function toggleDone(id){
    let t = tasks.find(task => task.id === id);
    t.isCompleted = !t.isCompleted;
    showTasks();
    logTasks();
}

// toggle important
function toggleImportant(id){
    let t = tasks.find(task => task.id === id);
    t.isImportant = !t.isImportant;
    showTasks();
    logTasks();
}

// log JSON array to console
function logTasks(){
    console.log(JSON.stringify(tasks));
}

// initial screen
showTasks();