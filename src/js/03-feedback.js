import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
// const email = document.querySelector("input[name=email]");
// const message = document.querySelector("textarea[name=message]");

const LOCALSTORAGE_KEY = "feedback-form-state";
// let formData = {};

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onFormInput, 500));

reloadPage();

function onFormSubmit(e) {
  const { elements: { email, message } } = form;
  e.preventDefault();
  
  if (email.value === "" || message.value === "") {
      return alert(`Всі поля повинні бути заповнені, козаче!`);
  }

  const result = localStorage.getItem(LOCALSTORAGE_KEY);
  console.log(result);

  e.target.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY)
};

function onFormInput(e) {
  // formData[e.target.name] = e.target.value
  const { elements: { email, message } } = form;
  const dataValue = {
    email: email.value,
    message: message.value
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataValue))
  // console.log(dataValue)
};

function reloadPage() { 
  const { elements: { email, message } } = form;
  const savedDatas = localStorage.getItem(LOCALSTORAGE_KEY);
  const storedDatas = JSON.parse(savedDatas)
  if (savedDatas) {
    email.value = storedDatas.email;
    message.value = storedDatas.message;
  }
};


