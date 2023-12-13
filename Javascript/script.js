let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');

btn1.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('IMAGES/back4.jpg')";
});

btn2.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('IMAGES/back3.avif')";
});

btn3.addEventListener('click', () => {
    document.body.style.backgroundImage = "url('IMAGES/back5.jpg')";
});

const taskInput = document.querySelector("#task-form input");
var filters = document.querySelectorAll("#filter-bar span");
var clearAll = document.querySelector(".clear-btn");
var taskBox = document.querySelector("#task-box");
var addbtn = document.querySelector(".add-btn");

let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})

function showTodo(filter) {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                    <p class="${completed}">${todo.name}</p>
                                </label>
                                <div class="settings" >
                                    <i onclick="showMenu(this)"></i>
                                    <ul class="task-menu">
                                        <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                        <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span style="color: white;">You don't have any task here</span>`;
    var checkTask = taskBox.querySelectorAll(".task");
    // !checkTask.length ? clearAll.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 100 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow:")

}
showTodo("all");

function showMenu(selectedTask) {
    var menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    var taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});


taskInput.addEventListener("keyup", e => {
    var userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            var taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

function add(e) {
    var userTask = taskInput.value.trim();

    if (!isEditTask) {
        todos = !todos ? [] : todos;
        var taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
    } else {
        isEditTask = false;
        todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
}


// $('.dateselect').datepicker({
//     format: 'mm/dd/yyyy',
//     // startDate: '-3d'
// });


// (function ($) {

//     "use strict";

//     $('#id_0').datetimepicker({
//         allowInputToggle: true,
//         showClose: true,
//         showClear: true,
//         showTodayButton: true,
//         format: "MM/DD/YYYY hh:mm:ss A",
//         icons: {
//             time: 'fa fa-clock-o',

//             date: 'fa fa-calendar-o',

//             up: 'fa fa-chevron-up',

//             down: 'fa fa-chevron-down',

//             previous: 'fa fa-chevron-left',

//             next: 'fa fa-chevron-right',

//             today: 'fa fa-chevron-up',

//             clear: 'fa fa-trash',

//             close: 'fa fa-close'
//         },

//     });

// })(jQuery);


// Search Bar Start
document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    var taskBoxes = document.getElementById("task-box");

    function updateTaskList(searchTerm) {
        Array.from(taskBoxes.getElementsByTagName('li')).forEach(taskElement => {
            const tasks = taskElement.textContent;
            if (tasks.toLowerCase().includes(searchTerm.toLowerCase())) {
                taskElement.style.display = 'list-item';
            } else {
                taskElement.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', function (event) {
        const searchTerm = event.target.value;
        updateTaskList(searchTerm);
    });

    Array.from(taskBoxes.getElementsByTagName('li')).forEach(taskElement => {
        taskElement.className.add('task');
    });
});
// Search Bar End