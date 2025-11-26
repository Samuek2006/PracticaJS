import { getTasks, postTask, deleteTask as deleteTaskApi, putTask } from "./Api.js";

// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const tasksContainer = document.getElementById('tasksContainer');

// Array para almacenar las tareas
let tasks = [];

// Cargar tareas al iniciar
function loadTasks() {
    getTasks().then(data => {
        tasks = data;
        renderTasks();
    });
}

// Función para agregar una tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, ingresa una tarea');
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    postTask(task).then(newTask => {
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    });
}

// Función para marcar tarea como completada
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        putTask(id, task).then(() => {
            renderTasks();
        });
    }
}

// Función para eliminar una tarea
function deleteTask(id) {
    deleteTaskApi(id).then(() => {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    });
}

// Función para mostrar las tareas en el DOM
function renderTasks() {
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        // Crear elemento de tarea
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        // Crear texto de la tarea
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        if (task.completed) {
            taskText.classList.add('completed');
        }
        taskText.textContent = task.text;

        // Crear botón opcional
        const optionalButton = document.createElement('button');
        optionalButton.className = 'optional-button';
        optionalButton.textContent = 'opcional';

        // Crear contenedor de botones de acción
        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        // Crear botón de check
        const checkButton = document.createElement('button');
        checkButton.className = 'action-button check-button';
        checkButton.innerHTML = '✓';
        checkButton.onclick = () => toggleTask(task.id);

        // Crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.className = 'action-button delete-button';
        deleteButton.innerHTML = '🗑';
        deleteButton.onclick = () => deleteTask(task.id);

        // Agregar botones al contenedor de acciones
        actionButtons.appendChild(checkButton);
        actionButtons.appendChild(deleteButton);

        // Agregar elementos al item de tarea
        taskItem.appendChild(taskText);
        taskItem.appendChild(optionalButton);
        taskItem.appendChild(actionButtons);

        // Agregar tarea al contenedor
        tasksContainer.appendChild(taskItem);
    });
}

// Event listener para el botón de agregar
addButton.addEventListener('click', addTask);

// Event listener para Enter en el input
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas al iniciar
loadTasks();
