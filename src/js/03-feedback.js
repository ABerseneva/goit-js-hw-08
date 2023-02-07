import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const email = document.querySelector("input[name=email]");
const message = document.querySelector("textarea[name=message]");

const LOCALSTORAGE_KEY = "feedback-form-state";
const savedValues = localStorage.getItem(LOCALSTORAGE_KEY);
const savedDataObject = JSON.parse(savedValues);

let formData = {};

reloadPage();

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(storageFormData, 500));

function storageFormData(e) { 
    formData[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
    console.log(formData)
    
};

function onFormSubmit(e) {
    e.preventDefault();
    const savedDatas = localStorage.getItem(LOCALSTORAGE_KEY);
    console.log(JSON.parse(savedDatas));
    
    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    formData = {};
};

function reloadPage() {
     if (savedValues) {
   email.value = savedDataObject.email || '';
    message.value = savedDataObject.message || '';
  }
};

