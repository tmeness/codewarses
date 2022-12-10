// 1. fix the naming of the variables :) camelCase and use full names :)
// 2. move task creation into a separate function :)
// 3. move working with localStorage into separate class :)
// 4. move creation DOM elements into separate functions :)
// 5. rename function storage to reflect what it is doing :)
// 6. fix formatting


// createElement(
//     "div",
//     {
//         classList: ['text'],
//         type: 'text',
//         value: 'text',
//         attributes: {
//             readonly: 'readonly'
//         }
//     }
// )



window.addEventListener('load',() => {
    const form = document.querySelector("#new-todo-form");
    const input = document.querySelector("#new-todo-input");
    const list_el = document.querySelector("#tasks");

    function storage(value){

        const task_el_storage = document.createElement("div");
        task_el_storage.classList.add("task");

        const task_content_el_storage = document.createElement("div");
        task_content_el_storage.classList.add("content");

        task_el_storage.appendChild(task_content_el_storage);

        const task_input_el_storage = document.createElement("input");
        task_input_el_storage.classList.add("text");
        task_input_el_storage.type = "text";
        task_input_el_storage.value = value;
        task_input_el_storage.setAttribute("readonly","readonly");

        task_content_el_storage.appendChild(task_input_el_storage);

        const task_actions_el_storage = document.createElement("div");
        task_actions_el_storage.classList.add("actions");

        const task_edit_el_storage = document.createElement("button");
        task_edit_el_storage.classList.add("edit");
        task_edit_el_storage.innerHTML = "Редагувати";

        const task_delete_el_storage = document.createElement("button");
        task_delete_el_storage.classList.add("delete");
        task_delete_el_storage.innerHTML = "В смітничок";

        task_actions_el_storage.appendChild(task_edit_el_storage);
        task_actions_el_storage.appendChild(task_delete_el_storage);

        task_el_storage.appendChild(task_actions_el_storage);

        list_el.appendChild(task_el_storage);

        input.value = "";

        task_edit_el_storage.addEventListener('click', () =>{
            console.log('Hello World!');
            if (task_edit_el_storage.innerText.toLowerCase() === "редагувати") {
                task_input_el_storage.removeAttribute("readonly");
                task_input_el_storage.focus();
                task_edit_el_storage.innerText = "Зберегти";
            } else {
                task_input_el_storage.setAttribute("readonly", "readonly");
                task_edit_el_storage.innerText = "Редагувати";
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
                    console.log(task_input_el_storage);
                    console.log(task_input_el_storage.value);
                    storageTasks[i].task = task_input_el_storage.value;
                    console.log(storageTasks);

                }
            }

            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })
        task_delete_el_storage.addEventListener('click', () => {
            list_el.removeChild(task_el_storage);

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
        storage(storageTasks[i].task);
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


        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content"); //додаємо css клас до елемента
        // task_content_el.innerText = task;

        task_el.appendChild(task_content_el); // додаємо child до елемента task_el

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        console.log(task);
        task_input_el.setAttribute("readonly","readonly");

        const allTasks = JSON.parse(localStorage.getItem('taskKey') || '[]');
        allTasks.push({ task: task });

        console.log(allTasks);
        localStorage.setItem('taskKey', JSON.stringify(allTasks));


        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Редагувати";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "В смітничок";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

        task_edit_el.addEventListener('click', () =>{
            console.log('Hello World!');
            if (task_edit_el.innerText.toLowerCase() === "редагувати") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Зберегти";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Редагувати";
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
                    console.log(task_input_el);
                    console.log(task_input_el.value);
                    storageTasks[i].task = task_input_el.value;
                    console.log(storageTasks);

                }
            }

            //5. json stringify array of objects
            //6. set item
            localStorage.setItem('taskKey', JSON.stringify(storageTasks));

        })
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);

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
