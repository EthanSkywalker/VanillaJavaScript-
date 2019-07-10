const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser"
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);    //키 이름, 키 밸류 localStorage 는 key value 로 되있음.
}

function handleSubmit(event){
    event.preventDefault(); //event 금지 
    const currentValue = input.value
    paintGreeting(currentValue);
    saveName(currentValue); // input 에서 입력 한 값을 localStorage 에 저장 함.
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);   // submit 이 동작되었을 때 새로고침을 막음.
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN)   // form 의 class showing 을 제거함. css 가 지워짐.
    greeting.classList.add(SHOWING_CN)  // greeting 에 class 
    greeting.innerText = `Hello ${text}`
}

function loadName(){
    const currnetUser = localStorage.getItem(USER_LS)
    if(currnetUser === null){   // localStorage 의 currnetUser(key)가 null 이라면 
        askForName();   // askForName 
    }else{
        paintGreeting(currnetUser)
    }
}

function init(){
    loadName();
}
init();