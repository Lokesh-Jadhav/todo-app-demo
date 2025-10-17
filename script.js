document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.className = 'task';
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = () => {
            li.remove();
            deleteTaskFromStorage(task);
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Add task
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTaskToStorage(task);
            taskInput.value = '';
        }
    };

    // Save task to localStorage
    const saveTaskToStorage = (task) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Delete task from localStorage
    const deleteTaskFromStorage = (task) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
