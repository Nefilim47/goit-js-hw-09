import Notiflix from 'notiflix';
const delayEl = document.querySelector('[name="delay"]')
const stepEl = document.querySelector('[name="step"]')
const amountEl = document.querySelector('[name="amount"]')
const formEl = document.querySelector('.form')

const handlerOnSubmit = (event) => {
  event.preventDefault();
  const amountNumber = Number(amountEl.value);
  const startDelay = Number(delayEl.value);
  const stepDelay = Number(stepEl.value);
  let delay = startDelay;
  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepDelay;
  };
};
function createPromise(position, delay){
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      }
      else {
        reject({ position, delay })
      }
    }, delay);
  });
};

formEl.addEventListener('submit', handlerOnSubmit);
