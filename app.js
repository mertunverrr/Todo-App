const addTaskButton = document.querySelector("#todoAddButton");
const addTaskName = document.querySelector("#todoName");
const addTaskForm = document.querySelector("#todoAddForm");
const todoList = document.querySelector("#listGroup");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const allClearButton = document.querySelector("#todoClearButton");
const searchTodo = document.querySelector("#searchTask");
const searchTodoText = document.querySelector("#todoSearch");

let todos=[];

runEvents();

function runEvents(){
    secondCardBody.addEventListener("click",deleteTodoToUI);
    addTaskForm.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    allClearButton.addEventListener("click",allTaskClear);
    searchTodoText.addEventListener("keyup",searchAllTask);
    
}

function addTodo(e){
    const taskText = addTaskName.value.trim();
    
    if(taskText==null || taskText==""){
        alert("Lütfen bir değer girin");
        
    }else{
        
        addTodoToUI(taskText);
        addTodoLS(taskText);
    }

    e.preventDefault();
    }
    
function deleteTodoToUI(e){
    if(e.target.className === "fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        deleteTodoLs(todo.textContent);
    }

}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className ="list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addTaskName.value = "";

}

function addTodoLS(newTodo) {
    checkTodosFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    

}

function deleteTodoLs(todo) {
    checkTodosFromLS();
    todos.forEach(function(todom,index){
        if(todo===todom){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromLS(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function pageLoaded(){
    checkTodosFromLS();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function allTaskClear(){
    
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        todoList.forEach(function(todo){
            todo.remove();
        })
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

function searchAllTask(e){
    debugger
const myText = e.target.value.toLowerCase().trim();
const todoTasks = document.querySelectorAll(".list-group-item");

todoTasks.forEach(function(todo){
    if(todo.textContent.toLowerCase().trim().includes(myText)){
        todo.setAttribute("style","display : block ");
    }else{
        todo.setAttribute("style","display : none !important");
    }
})
    
}

    




