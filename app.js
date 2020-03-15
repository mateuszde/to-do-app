class ToDoList {
    constructor() {
        this.toDoTasks = [
            {
                id: 1,
                task: "zadanie 1",
                completed: false
            },
            {
                id: 2,
                task: "zadanie 2",
                completed: true
            },
            {
                id: 3,
                task: "zadanie 3",
                completed: false
            }
        ];

        document.getElementById('addTaskBtn').addEventListener('click', this.addTask);
        this.inputAddTask = document.getElementById('addTaskInput');
        this.taskSection = document.querySelector('.toDoTasks');
    }

    createTask = (taskId, task, completed = false) => {
        //Crate containter for task
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

    addTask = (e, task = this.inputAddTask.value, id = Date.now()) => {
        e.preventDefault();

        if (task === '') return alert('Puste polecenie. Wpisz coś co chciałbys zapamiętać.');
        let taskItem = {
            id: id,
            task: task,
            completed: false,
        }

        this.toDoTasks.push(taskItem);
        this.inputAddTask.value = '';

        this.createTask(taskItem.id, taskItem.task, taskItem.completed);
    }

    removeTask = (e, taskList = this.toDoTasks) => {
        const idOfTaskToDelete = e.target.parentNode.dataset.key;

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == idOfTaskToDelete) {
                taskList.splice(i, 1);

                e.target.parentNode.remove();
                break;
            }
        }
    }

    changeStatus = (e, taskList = this.toDoTasks) => {
        const idOfTaskToChange = e.target.parentNode.dataset.key;

        //Change class on task
        e.target.parentNode.childNodes[0].classList.toggle('done');

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == idOfTaskToChange) {
                taskList[i].completed = e.target.checked;
                break;
            }
        }
    }

    clearView = () => {
        const allTasks = document.querySelectorAll('.task');
        allTasks.forEach(el => {
            el.remove();
        })
    }

    render = () => {
        this.clearView();

        const taskList = this.toDoTasks;

        for (let i = 0; i < taskList.length; i++) {
            this.createTask(taskList[i].id, taskList[i].task, taskList[i].completed);
        }
    }
}

const toDo = new ToDoList();
toDo.render();
