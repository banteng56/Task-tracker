const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

function readTasks() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function addTask(title) {
    const tasks = readTasks();
    const newTask = { id: Date.now(), title, status: 'not done' };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Tugas berhasil ditambahkan:', title);
}

function updateTask(id, title) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.title = title;
        writeTasks(tasks);
        console.log('Tugas berhasil diperbarui:', title);
    } else {
        console.log('Tugas tidak ditemukan');
    }
}

function deleteTask(id) {
    let tasks = readTasks();
    tasks = tasks.filter(task => task.id !== id);
    writeTasks(tasks);
    console.log('Tugas berhasil dihapus');
}

function updateStatus(id, status) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.status = status;
        writeTasks(tasks);
        console.log(`Status tugas berhasil diubah menjadi "${status}"`);
    } else {
        console.log('Tugas tidak ditemukan');
    }
}

function listTasks(filter = 'all') {
    const tasks = readTasks();
    let filteredTasks;

    switch (filter) {
        case 'done':
            filteredTasks = tasks.filter(task => task.status === 'done');
            break;
        case 'not done':
            filteredTasks = tasks.filter(task => task.status === 'not done');
            break;
        case 'in progress':
            filteredTasks = tasks.filter(task => task.status === 'in progress');
            break;
        default:
            filteredTasks = tasks;
    }

    console.log('Daftar Tugas:');
    filteredTasks.forEach(task => {
        console.log(`- [${task.status}] ${task.title} (ID: ${task.id})`);
    });
}

function handleCommand(command, args) {
    switch (command) {
        case 'add':
            addTask(args[0]);
            break;
        case 'update':
            updateTask(Number(args[0]), args[1]);
            break;
        case 'delete':
            deleteTask(Number(args[0]));
            break;
        case 'status':
            updateStatus(Number(args[0]), args[1]);
            break;
        case 'list':
            listTasks(args[0]);
            break;
        default:
            console.log('Perintah tidak dikenal. Gunakan perintah: add, update, delete, status, list');
    }
}

const [,, command, ...args] = process.argv;
handleCommand(command, args);
