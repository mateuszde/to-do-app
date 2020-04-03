class ToDoList {
    constructor(listName) {
        this.toDoTasks = [];
        this.listName = listName;
        this.editingTaskTemp = [];

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
        this.searchInput.addEventListener('input', this.searchTasks);

        this.changeSection = document.getElementById('changeSection');

        this.taskSaveBtn = document.getElementById('saveBtn');
        this.taskSaveBtn.addEventListener('click', this.handleSaveBtn);

        this.taskCancelBtn = document.getElementById('cancelBtn');
        this.taskCancelBtn.addEventListener('click', this.handleClickCanelBtn);

        this.changeTaskInput = document.getElementById('changeTaskInput');
    }

    createTask = (taskId, task, completed = false) => {
        //Create container for task
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');
        this.taskSection.appendChild(taskContainer);
        taskContainer.dataset.key = taskId;

        //Create checkbox to mark task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = completed;
        taskContainer.appendChild(checkbox);
        checkbox.addEventListener('change', this.changeStatus);

        //Create task
        const contentOfTask = document.createElement('p');
        contentOfTask.classList.add('taskText');
        contentOfTask.textContent = task;
        taskContainer.appendChild(contentOfTask);

        if (checkbox.checked) {
            contentOfTask.classList.add('done');
        }

        //Create icon to edit task
        const changeIconSection = document.createElement('div');
        changeIconSection.classList.add('editIconSection');
        changeIconSection.title = 'Edytuj';
        taskContainer.appendChild(changeIconSection);

        const editIcon = document.createElement('i');
        editIcon.classList.add('fas');
        editIcon.classList.add('fa-edit');
        changeIconSection.appendChild(editIcon);

        changeIconSection.addEventListener('click', this.handleClickEdit);

        //Create button to delete task
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteBtn');
        const icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add('fa-times')
        icon.title = 'Usuń';
        deleteButton.appendChild(icon);
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

    findId = (obj, nameOfKey) => {
        if (Object.keys(obj.dataset)[0] == nameOfKey) {
            const objectWithKey = obj;
            console.log(objectWithKey);
            return objectWithKey;
        }
        else {
            this.findId(obj.parentNode, nameOfKey);
        }
    }

    removeTask = (e) => {
        const taskList = this.toDoTasks;
        const objectToDelete = this.findId(e.target, 'key');
        console.log(`Obiekt do skasowania: ${objectToDelete}`);

        const idOfTaskToDelete = objectToDelete.dataset.key;
        console.log(`Id taska do skasowania: ${idOfTaskToDelete}`);

        // const foundedTask = taskList.find(item => item.id == idOfTaskToDelete);

        // if (foundedTask) {
        //     const index = taskList.indexOf(foundedTask);
        //     taskList.splice(index, 1);
        //     e.target.parentNode.parentNode.remove();

        //     this.saveTasks();
        // }
    }

    handleClickEdit = (e) => {
        this.changeSection.classList.toggle('active');

        const taskList = this.toDoTasks;
        const idOfTaskToChange = e.target.parentNode.parentNode.dataset.key;
        const foundedTask = taskList.find(item => item.id == idOfTaskToChange);

        if (foundedTask) {
            this.editingTaskTemp = foundedTask;
            this.changeTaskInput.value = foundedTask.task;
        }
    }

    handleSaveBtn = (e) => {
        e.preventDefault();

        const taskList = this.toDoTasks;
        const idOfTaskToUpdate = this.editingTaskTemp.id;
        const newTaskContent = this.changeTaskInput.value;

        const foundedTaskInTable = taskList.find(item => item.id == idOfTaskToUpdate);
        if (foundedTaskInTable) {
            foundedTaskInTable.task = newTaskContent;
        }

        this.saveTasks();
        this.render();

        this.changeTaskInput.value = "";
        this.changeSection.classList.toggle('active');
    }

    handleClickCanelBtn = (e) => {
        e.preventDefault();
        this.changeSection.classList.toggle('active');
    }

    changeStatus = (e) => {
        const taskList = this.toDoTasks;
        const idOfTaskToChange = e.target.parentNode.dataset.key;
        const foundedTask = taskList.find(item => item.id == idOfTaskToChange);

        if (foundedTask) {
            //Change class on task
            e.target.parentNode.childNodes[1].classList.toggle('done');

            foundedTask.completed = e.target.checked;
            this.saveTasks();
        }
    }

    searchTasks = () => {
        const searchText = searchInput.value.toLowerCase();
        let tasks = this.toDoTasks;

        tasks = tasks.filter(el => el.task.toLowerCase().includes(searchText));
        this.taskSection.textContent = '';

        this.render(tasks);
    }

    saveTasks = () => {
        localStorage.setItem(this.listName, JSON.stringify(this.toDoTasks));
    }

    render = (taskList = this.toDoTasks) => {
        this.taskSection.textContent = "";

        for (let i = 0; i < taskList.length; i++) {
            this.createTask(taskList[i].id, taskList[i].task, taskList[i].completed);
        }
    }
}

const toDo = new ToDoList('toDoTasks');
toDo.render();
