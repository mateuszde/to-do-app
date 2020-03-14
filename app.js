class ToDoList {
    constructor() {
        this.toDoTasks = [
            // {
            //     id: 1,
            //     task: 'kupic 4 bulki',
            //     completed: false,
            // },
            // {
            //     id: 2,
            //     task: 'przedluzyc abonament',
            //     completed: false,
            // },11`1
            // {
            //     id: 3,
            //     task: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi amet incidunt, mollitia vero doloremque quisquam corporis veritatis eum dolore commodi esse iste ratione nemo. Cumque ad eaque quo. Sapiente, perspiciatis?',
            //     completed: true,
            // }
        ];

        document.getElementById('addTaskBtn').addEventListener('click', this.addTask);
        this.inputAddTask = document.getElementById('addTaskInput');
        this.taskSection = document.querySelector('.toDoTasks');

        this.render();
    }

    addTask = (e, task = this.inputAddTask.value, id = Date.now()) => {
        e.preventDefault();

        if (task === '') return alert('cos chcialbys zapamietac, nie puste znaki...');
        let taskItem = {
            id: id,
            task: task,
            completed: false,
        }

        this.toDoTasks.push(taskItem);
        this.inputAddTask.value = '';
        this.render();
    }

    removeTask = (e, taskList = this.toDoTasks) => {
        const idOfTaskToDelete = e.target.parentNode.dataset.key;

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == idOfTaskToDelete) {
                taskList.splice(i, 1);
                break;
            }
        }

        this.render();
    }

    changeStatus = (e, taskList = this.toDoTasks) => {
        const idOfTaskToChange = e.target.parentNode.dataset.key;

        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == idOfTaskToChange) {
                taskList[i].completed = e.target.checked;
                break;
            }
        }

        this.render();
    }

    clearView = () => {
        const allTasks = document.querySelectorAll('.task');
        allTasks.forEach(el => {
            el.remove();
        })

    }

    render = (taskList = this.toDoTasks) => {
        this.clearView();

        for (let i = 0; i < taskList.length; i++) {

            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            this.taskSection.appendChild(taskContainer);
            taskContainer.dataset.key = taskList[i].id;

            const contentOfTask = document.createElement('p');
            contentOfTask.classList.add('taskText');
            contentOfTask.textContent = taskList[i].task;
            taskContainer.appendChild(contentOfTask);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.checked = taskList[i].completed;
            taskContainer.appendChild(checkbox);

            if (checkbox.checked) {
                contentOfTask.classList.add('done');
            }

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteBtn');
            deleteButton.textContent = 'usuń';
            taskContainer.appendChild(deleteButton);
        }

        const checkboxes = document.querySelectorAll('.checkbox');

        checkboxes.forEach(el => {
            el.addEventListener('change', this.changeStatus);
        })

        const deleteButtons = document.querySelectorAll('.deleteBtn');

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', this.removeTask);
        })
    }

}

const toDo = new ToDoList();