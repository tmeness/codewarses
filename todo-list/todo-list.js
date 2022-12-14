// 1. fix the naming of the variables :) camelCase and use full names :) done
// 2. move task creation into a separate function :)
// 3. move working with localStorage into separate class :)
// 4. move creation DOM elements into separate functions :) done
// 5. rename function storage to reflect what it is doing :) done
// 6. fix formatting

//
// createDOMElement(
//     "div",
//     {
//         classList: ['text'],
//         type: 'text',
//         value: 'text',
//         attributes: {
//             key: 'readonly'

//         }
//     }
// )
//


function createDOMElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if ('classList' in options){
        for (let i = 0; i < options.classList.length; i++){
            element.classList.add(options.classList[i])
        }
    }

    if ('type' in options){
        element.type = options.type
    }

    if ('value' in options){
        element.value = options.value
    }

    if ('attributes' in options){
        for (const keyAndValue of Object.entries(options.attributes)){
            element.setAttribute(keyAndValue[0], keyAndValue[1]) ;
        }
    }

    if ('innerHTML' in options){
        element.innerHTML = options.innerHTML
    }

    return element;
}


window.addEventListener('load',() => {
    const form = document.querySelector("#new-todo-form");
    const input = document.querySelector("#new-todo-input");
    const listElement = document.querySelector("#tasks");

    function getTasksFromLocalStorage(value){
        
        const taskElementStorage = createDOMElement("div", {
            classList: ["task"]
        });

        const taskContentElementStorage = createDOMElement("div", {
            classList: ["content"]
        });

        taskElementStorage.appendChild(taskContentElementStorage);

        const taskInputElementStorage = createDOMElement( "input" , {
            classList: ["text"],
            type: "text",
            value: value,
            attributes: { "readonly": "readonly"}
        })

        taskContentElementStorage.appendChild(taskInputElementStorage);
        
        const taskActionsElementStorage = createDOMElement("div", {
            classList: ["actions"]
        })

        const taskEditElementStorage = createDOMElement("button", {
            classList: ["edit"],
            innerHTML: "Редагувати"
        })
        
        const taskDeleteElementStorage = createDOMElement("button", {
            classList: ["delete"],
            innerHTML: "В смітничок"
        })

        taskActionsElementStorage.appendChild(taskEditElementStorage);
        taskActionsElementStorage.appendChild(taskDeleteElementStorage);

        taskElementStorage.appendChild(taskActionsElementStorage);

        listElement.appendChild(taskElementStorage);

        input.value = "";

        taskEditElementStorage.addEventListener('click', () =>{
            console.log('Hello World!');
            if (taskEditElementStorage.innerText.toLowerCase() === "редагувати") {
                taskInputElementStorage.removeAttribute("readonly");
                taskInputElementStorage.focus();
                taskEditElementStorage.innerText = "Зберегти";
            } else {
                taskInputElementStorage.setAttribute("readonly", "readonly");
                taskEditElementStorage.innerText = "Редагувати";
            }

            //EDIT TASK IN LOCAL STORAGE

            //1. get all tasks
            //2. json parse string to array of objects
            const storageTasks =  JSON.parse(localStorage.getItem('taskKey')) || [];
            console.log(storageTasks);


            //3. find element we want to edit (by value)
            //4. replace old value with new
            for (let i = 0; i < storageTasks.length; i++) {
                console.log(storageTasks[i], value);
                if ( storageTasks[i].task === value) {
                    console.log(taskInputElementStorage);
                    console.log(taskInputElementStorage.value);
                    storageTasks[i].task = taskInputElementStorage.value;
                    console.log(storageTasks);

                }
            }

            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })
        taskDeleteElementStorage.addEventListener('click', () => {
            listElement.removeChild(taskElementStorage);

            //DELETE FROM LOCAL STORAGE

            //1. get all tasks
            //2. json parse string to array of objects
            const storageTasks =  JSON.parse(localStorage.getItem('taskKey')) || [];

            //3. find element we want to delete (by value)
            //4. delete it from array
            for (let i = 0; i < storageTasks.length; i++) {
                if ( storageTasks[i].task === value) {
                    console.log(storageTasks[i].task);
                    console.log(storageTasks);
                    storageTasks.splice(i, 1);
                    console.log(storageTasks);
                }
            }
            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })

    }

    const storageTasks = JSON.parse(localStorage.getItem('taskKey')) || [];

    for (let i = 0; i < storageTasks.length; i++) {
        getTasksFromLocalStorage(storageTasks[i].task);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill the task");
            return;
        }

        const storageTasks = JSON.parse(localStorage.getItem('taskKey')) || [];
        console.log(storageTasks);
        for (let i = 0; i < storageTasks.length; i++){
            console.log(storageTasks[i].task, task);
            if(task === storageTasks[i].task){

                alert("The same task is already in the list!");
                return;

            }
        }
        
        const taskElement = createDOMElement("div", {
            classList: ["task"]
        });

        const taskContentElement = createDOMElement("div", {
            classList: ["content"]
        });

        taskElement.appendChild(taskContentElement);

        const taskInputElement = createDOMElement( "input" , {
            classList: ["text"],
            type: "text",
            value: task,
            attributes: { "readonly": "readonly"}
        })

        const allTasks = JSON.parse(localStorage.getItem('taskKey') || '[]');
        allTasks.push({ task: task });

        console.log(allTasks);
        localStorage.setItem('taskKey', JSON.stringify(allTasks));

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

        taskEditElement.addEventListener('click', () =>{
            console.log('Hello World!');
            if (taskEditElement.innerText.toLowerCase() === "редагувати") {
                taskInputElement.removeAttribute("readonly");
                taskInputElement.focus();
                taskEditElement.innerText = "Зберегти";
            } else {
                taskInputElement.setAttribute("readonly", "readonly");
                taskEditElement.innerText = "Редагувати";
            }

            //EDIT TASK IN LOCAL STORAGE

            //1. get all tasks
            //2. json parse string to array of objects
            const storageTasks =  JSON.parse(localStorage.getItem('taskKey')) || [];
            console.log(storageTasks);


            //3. find element we want to edit (by value)
            //4. replace old value with new
            for (let i = 0; i < storageTasks.length; i++) {
                console.log(storageTasks[i], task);
                if ( storageTasks[i].task === task) {
                    console.log(taskInputElement);
                    console.log(taskInputElement.value);
                    storageTasks[i].task = taskInputElement.value;
                    console.log(storageTasks);

                }
            }

            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })
        taskDeleteElement.addEventListener('click', () => {
            listElement.removeChild(taskElement);

            //DELETE FROM LOCAL STORAGE

            //1. get all tasks
            //2. json parse string to array of objects
            const storageTasks =  JSON.parse(localStorage.getItem('taskKey')) || [];

            //3. find element we want to delete (by value)
            //4. delete it from array
            for (let i = 0; i < storageTasks.length; i++) {
                if ( storageTasks[i].task === value) {
                    console.log(storageTasks[i].task);
                    console.log(storageTasks);
                    storageTasks.splice(i, 1);
                    console.log(storageTasks);

                }
            }
            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })

    })
})
