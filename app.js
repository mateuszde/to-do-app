class ToDoList {
    constructor(listName) {
        this.toDoTasks = [];
        this.listName = listName;

        if (localStorage.hasOwnProperty(this.listName)) {
            this.toDoTasks = JSON.parse(localStorage.getItem(this.listName));
        }

        document.getElementById('addTaskBtn').addEventListener('click', this.addTask);
        this.inputAddTask = document.getElementById('addTaskInput');
        this.inputAddTask.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                this.addTask(e);
            }
        });
        this.taskSection = document.querySelector('.toDoTasks');
        this.searchInput = document.getElementById('searchInput');
        this.searchInput.addEventListener('input', this.searchTasks)
    }

    createTask = (taskId, task, completed = false) => {
        //Create container for task
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');
        this.taskSection.appendChild(taskContainer);
        taskContainer.dataset.key = taskId;

        //Create task
        const contentOfTask = document.createElement('p');
        contentOfTask.classList.add('taskText');
        contentOfTask.textContent = task;
        taskContainer.appendChild(contentOfTask);

        //Create checkbox to mark task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = completed;
        taskContainer.appendChild(checkbox);
        checkbox.addEventListener('change', this.changeStatus);

        if (checkbox.checked) {
            contentOfTask.classList.add('done');
        }

        //Create button to delete task
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteBtn');
        deleteButton.textContent = 'usuń';
        taskContainer.appendChild(deleteButton);
        deleteButton.addEventListener('click', this.removeTask);
    }

    addTask = (e) => {
        e.preventDefault();
        const task = this.inputAddTask.value;
        const id = Date.now();

        if (task === '') return alert('Puste polecenie. Wpisz coś co chciałbys zapamiętać.');
        let taskItem = {
            id: id,
            task: task,
            completed: false,
        }

        this.toDoTasks.push(taskItem);
        this.inputAddTask.value = '';
        this.inputAddTask.focus();
        this.saveTasks();

        this.createTask(taskItem.id, taskItem.task, taskItem.completed);
    }

    removeTask = (e) => {
        const taskList = this.toDoTasks;
        const idOfTaskToDelete = e.target.parentNode.dataset.key;

        let foundedTask = taskList.find(item => item.id == idOfTaskToDelete);
        const index = taskList.indexOf(foundedTask);

        taskList.splice(index, 1);
        e.target.parentNode.remove();

        this.saveTasks();
    }

    changeStatus = (e) => {
        const taskList = this.toDoTasks
        const idOfTaskToChange = e.target.parentNode.dataset.key;

        //Change class on task
        e.target.parentNode.childNodes[0].classList.toggle('done');

        const foundedTask = taskList.find(item => item.id == idOfTaskToChange);
        foundedTask.completed = e.target.checked;
        this.saveTasks();
    }

    searchTasks = () => {
        const searchText = searchInput.value.toLowerCase();
        let tasks = this.toDoTasks;

        tasks = tasks.filter(el => el.task.toLowerCase().includes(searchText));
        this.taskSection.textContent = '';

        this.render(tasks);
    }

    saveTasks = () => {
        localStorage.setItem('toDoTasks', JSON.stringify(this.toDoTasks));
    }

    render = (taskList = this.toDoTasks) => {
        for (let i = 0; i < taskList.length; i++) {
            this.createTask(taskList[i].id, taskList[i].task, taskList[i].completed);
        }
    }
}

const toDo = new ToDoList('toDoTasks');
toDo.render();
