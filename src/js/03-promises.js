const refs = {
  form: document.querySelector('form')
}

let delay = 0;
let step = 0;
let amount = 0;
let position = 0;

refs.form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();
  delay = Number(event.currentTarget.delay.value);
  step = Number(event.currentTarget.step.value);
  amount = Number(event.currentTarget.amount.value);
  makePromises();
  event.currentTarget.reset();
  position = 0;
}

function makePromises() {
  for (let i = 0; i < amount; i += 1) {
    if (i === 0 ) {
   position += 1;
    createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });  
    } else {
    delay += step;
    position += 1;
    createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });  
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    } 
    }, delay); 
    });
}