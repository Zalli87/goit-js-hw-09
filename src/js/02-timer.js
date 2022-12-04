import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const element = document.querySelector('input#datetime-picker');
let selectedDate;
let intervalId = null;
let validDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    validDate = selectedDates[0] - currentTime;
    if (validDate < 0) {
      alert('Please choose a date in the future');
      return;
    }
    refs.stratBtn.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr(element, options);

const refs = {
  stratBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}



refs.stratBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    intervalId = setInterval(() => {
    const clickCurrentTime = Date.now();
    const ms = selectedDate - clickCurrentTime;
    const time = convertMs(ms);
    updateTexContent(time);
    if (ms < 1000) {
    clearInterval(intervalId);
      };
    }, 1000);
}

function updateTexContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

