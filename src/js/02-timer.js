import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_red.css"
import {Notify} from 'notiflix';

const inputEl = document.querySelector("#datetime-picker")
const buttonStart = document.querySelector("button[data-start]")
const timeDay = document.querySelector("span[data-days]")
const timeHour = document.querySelector("span[data-hours")
const timeMin = document.querySelector("span[data-minutes]")
const timeSec = document.querySelector("span[data-seconds]")

Notify.info(
    "Please, choose a date and click on start",
  );
buttonStart.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (new Date() > selectedDates[0]) { Notify.failure("Please choose a date in the future") } 
        else{Notify.success("Goog! You chose a date in the future. Click on Start button")}
        buttonStart.removeAttribute("disabled");
        },
       
};

const time = flatpickr(inputEl, options);

function onBtnStartClick() {
    const timeDiference = time.selectedDates[0] - Date.now();

    const startInterval = setInterval(() => {
     const { days, hours, minutes, seconds } = convertMs(time.selectedDates[0] - Date.now());
     timeDay.textContent = days;
     timeHour.textContent = addLeadingZero(hours);
     timeMin.textContent = addLeadingZero(minutes);
     timeSec.textContent = addLeadingZero(seconds);
    }, 1000);

    setTimeout(() => { clearInterval(startInterval) }, timeDiference)
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

buttonStart.addEventListener('click', onBtnStartClick);

