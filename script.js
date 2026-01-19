document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            createTaskElement(task, index);
        });
    }

    function createTaskElement(taskText, index) {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'edit-btn');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteTask(index);

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actionsDiv);
        todoList.appendChild(li);
    }

    function addTask() {
        const text = input.value.trim();
        if (text === "") {
            alert("kuch to likho bhai!!!");
            return;
        }

        tasks.push(text);
        saveTasks();
        renderTasks();
        input.value = '';
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newText = prompt("Edit your task:", tasks[index]);
        if (newText !== null && newText.trim() !== "") {
            tasks[index] = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteAll() {
        if (tasks.length === 0) return;
        if (confirm("Are you sure you want to delete all tasks?")) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    deleteAllBtn.addEventListener('click', deleteAll);
});
