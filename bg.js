const body = document.querySelector("body");

const IMG_NUMBER = 3;   //이미지가 3장이라서 3 으로 지정하였음.

function handleImgLoad(){

}

function paintImage(imgNumber){
    const image = new Image()
    image.src = `images/${imgNumber + 1}.jpg`
    image.classList.add("bgImage")
    body.prepend(image)
}
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number 
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();