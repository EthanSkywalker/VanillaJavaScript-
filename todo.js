const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;      // 클릭한 아이디 값을 가져 옴.
    toDoList.removeChild(li);       // 자식 값을 삭제 함.
    const cleanToDos = toDos.filter(function(toDo){ // filter 를 이용해 toDos[] 배열의 조건이 true 일 경우에 리턴한다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // localStorage 에 setItem 로 key 값이 TODOS_LS(toDos) 인 것에 value(toDos[]) 을 저장함.
}

function paintToDo(text){
   const li = document.createElement("li");                 // li 라는 태그를 만드는 자바스크립트
   const delBtn = document.createElement("button");
   const newId = toDos.length + 1;
   const span = document.createElement("span");
   delBtn.value = "X"
   delBtn.addEventListener("click",deleteToDo); // delBtn 을 만들때 addEventListener
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