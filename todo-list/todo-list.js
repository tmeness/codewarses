// 1. fix the naming of the variables :) camelCase and use full names :) done
// 2. move task creation into a separate function :) done
// 3. move working with localStorage into separate class :) done
// 4. move creation DOM elements into separate functions :) done
// 5. rename function storage to reflect what it is doing :) done

function createDOMElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if ('classList' in options) {
        for (let i = 0; i < options.classList.length; i++) {
            element.classList.add(options.classList[i])
        }
    }

    if ('type' in options) {
        element.type = options.type
    }

    if ('value' in options) {
        element.value = options.value
    }

    if ('attributes' in options) {
        for (const keyAndValue of Object.entries(options.attributes)) {
            element.setAttribute(keyAndValue[0], keyAndValue[1]);
        }
    }

    if ('innerHTML' in options) {
        element.innerHTML = options.innerHTML
    }

    return element;
}

class TasksStorage {
    #storage;

    constructor({ storage }) {
        this.#storage = storage;
    }

    getAllTasks() {
        return JSON.parse(this.#storage.getItem('taskKey') || '[]');
    }

    addTask(taskName) {
        const allTasks = this.getAllTasks();
        allTasks.push({task: taskName});

        return this.#storage.setItem('taskKey', JSON.stringify(allTasks));
    }

    setTasks(newTasks) {
        this.#storage.setItem('taskKey', JSON.stringify(newTasks));
    }

    editTask(oldValue, newValue) {
        const storageTasks = this.getAllTasks();

        for (let i = 0; i < storageTasks.length; i++) {
            if (storageTasks[i].task === oldValue) {
                console.log(newValue);
                storageTasks[i].task = newValue;
            }
        }

        this.setTasks(storageTasks);
    }

    deleteTask(value) {
        const storageTasks = this.getAllTasks();

        for (let j = 0; j < storageTasks.length; j++) {
            if (storageTasks[j].task === value) {
                storageTasks.splice(j, 1);
            }
        }

        this.setTasks(storageTasks);
    }

    doesTaskExist(task) {
        const storageTasks = this.getAllTasks();

        for (let i = 0; i < storageTasks.length; i++) {
            if (task === storageTasks[i].task) {
                return true;
            } else {
                return false;
            }
        }
    }
}

const tasksLocalStorage = new TasksStorage({
    storage: localStorage,
});
const form = document.querySelector("#new-todo-form");
const input = document.querySelector("#new-todo-input");
const listElement = document.querySelector("#tasks");

window.addEventListener('load', () => {
    const storageTasks = tasksLocalStorage.getAllTasks();

    for (let i = 0; i < storageTasks.length; i++) {
        renderTask(storageTasks[i].task);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let task = input.value;

        if (!task) {
            alert("Please fill the task");
            return;
        }

        if (tasksLocalStorage.doesTaskExist(task)) {
            alert("The same task is already in the list!");
            input.value = '';
            return;
        }

        tasksLocalStorage.addTask(task);
        renderTask(task);
    })
})

function renderTask(value) {
    const taskElement = createDOMElement("div", {
        classList: ["task"]
    });

    const taskContentElement = createDOMElement("div", {
        classList: ["content"]
    });

    taskElement.appendChild(taskContentElement);

    const taskInputElement = createDOMElement("input", {
        classList: ["text"],
        type: "text",
        value: value,
        attributes: {"readonly": "readonly"}
    })

    taskContentElement.appendChild(taskInputElement);

    const taskActionsElement = createDOMElement("div", {
        classList: ["actions"] //додаємо css клас до елемента
    })

    const taskEditElement = createDOMElement("button", {
        classList: ["edit"],
        innerHTML: "Редагувати"
    })

    const taskDeleteElement = createDOMElement("button", {
        classList: ["delete"],
        innerHTML: "В смітничок"
    })

    taskActionsElement.appendChild(taskEditElement);
    taskActionsElement.appendChild(taskDeleteElement);

    taskElement.appendChild(taskActionsElement);

    listElement.appendChild(taskElement);

    input.value = "";

    taskEditElement.addEventListener('click', () => {
        if (taskEditElement.innerText.toLowerCase() === "редагувати") {
            taskInputElement.removeAttribute("readonly");
            taskInputElement.focus();
            taskEditElement.innerText = "Зберегти";
        } else {
            taskInputElement.setAttribute("readonly", "readonly");
            taskEditElement.innerText = "Редагувати";
        }

        tasksLocalStorage.editTask(value, taskInputElement.value)
    })

    taskDeleteElement.addEventListener('click', () => {
        listElement.removeChild(taskElement);

        tasksLocalStorage.deleteTask(value);
    })
}

