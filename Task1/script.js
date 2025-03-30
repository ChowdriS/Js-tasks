const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

document.addEventListener('DOMContentLoaded', loadTasks());

addButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks)
    taskList.innerHTML = ''; 
    tasks.forEach((task, index) => renderTask(task, index));
    updateTaskCount();
}

function addTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTask = { text: text, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(newTask, tasks.length - 1);
    updateTaskCount();
}

function toggleTaskStatus(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function renderTask(task, index) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">&times;</button>
    `;

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', function () {
        toggleTaskStatus(index);
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteTask(index);
    });

    taskList.appendChild(li);
}

function updateTaskCount() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}