import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const inputPicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMins = document.querySelector('span[data-minutes]');
const dataSecs = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', '');

let userSelectedDate;
let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
  
      if (selectedDate < new Date()) {
        startBtn.disabled = true;
          iziToast.error({ 
            position: 'topRight',
            message: 'Please choose a date in the future',
         });
      } else {
        userSelectedDate = selectedDate;
        startBtn.disabled = false;
      }
    },
  };
  
flatpickr(inputPicker, options);
  
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    inputPicker.disabled = true;
  
    countdownInterval = setInterval(() => {
      const currentTime = Date.now();
      const diff = userSelectedDate - currentTime;
  
      if (diff <= 0) {
        clearInterval(countdownInterval);
        updateTimerDisplay(0);
        inputPicker.disabled = false;
        return;
      }
  
      updateTimerDisplay(diff);
    }, 1000);
  });
  
  function updateTimerDisplay(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
  
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMins.textContent = addLeadingZero(minutes);
    dataSecs.textContent = addLeadingZero(seconds);
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }



