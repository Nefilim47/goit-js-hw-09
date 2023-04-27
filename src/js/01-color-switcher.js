const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
let backColor;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  
function onBtnStop() {
    buttonStartEl.removeAttribute('disabled');
    clearInterval(backColor)
}
function onBtnStart() { 
    buttonStartEl.setAttribute('disabled', true);
    backColor = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

buttonStartEl.addEventListener('click', onBtnStart);
buttonStopEl.addEventListener('click', onBtnStop);