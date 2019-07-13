const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];

function deleteToDo(event){

}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // localStorage 에 setItem 로 key 값이 TODOS_LS(toDos) 인 것에 value(toDos[]) 을 저장함.
}

function paintToDo(text){
   const li = document.createElement("li");                 // li 라는 태그를 만드는 자바스크립트
   const delBtn = document.createElement("button");
   const newId = toDos.length + 1;
   delBtn.value = "❌"
   delBtn.addEventListener("click",deleteToDo);
   const span = document.createElement("span");
   span.innerText = text;
   li.appendChild(delBtn);
   li.appendChild(span);
   li.id = newId;
   toDoList.appendChild(li);

   const toDoObj = {
       text : text,
       id : newId
   }

   toDos.push(toDoObj)
   saveToDos();
}   

function handleSubmit(event){
    event.preventDefault();
    const currenValue = toDoInput.value
    paintToDo(currenValue);
    toDoInput.value = "";                               // inputValue 값이 span.innerText 로
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS); // 저장한 localStorage 에 있는 key 값을 불러옴.
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);    // String 데이터를 Object 로 변경 하는 JSON.parse 적용.
        parsedToDos.forEach(function(toDo){             // item 즉 parsedToDos 의 값이 toDo 에 담김
            paintToDo(toDo.text);                       // 해당 item 의 text 값을 가져옴.
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();