const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function paintToDo(text){
   const li = document.createElement("li"); //li 라는 태그를 만드는 자바스크립트
   const delBtn = document.createElement("button");
   delBtn.value = "❌"
   const span = document.createElement("span");
   span.innerText = text;
   li.appendChild(span);
   li.appendChild(delBtn);
   toDoList.appendChild(li);
}

function handleSubmit(event){
    event.preventDefault();
    const currenValue = toDoInput.value
    paintToDo(currenValue);
    toDoInput.value = ""; // inputValue 값이 span.innerText 로
}

function loadToDos(){
    const toDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null){

    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();