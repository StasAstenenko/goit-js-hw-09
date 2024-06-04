const feedbackElem = document.querySelector('.feedback-form');
const textareaElem = feedbackElem.querySelector('textarea');
const inputElem = feedbackElem.querySelector('input')

feedbackElem.addEventListener('input', () => {

    const form = new FormData(feedbackElem);
    const email = form.get('email');
    const message = form.get('message');
    const formData = {
        email,
        message,
    };
    saveToLs('feedback-form-state', formData);
});

feedbackElem.addEventListener('submit', e => {
  e.preventDefault();

  if (textareaElem.value === '' || inputElem.value === '') return;

  const formData = new FormData(feedbackElem);
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();
  const data = { email, message };

  console.log(data);

  feedbackElem.reset();

  localStorage.removeItem('feedback-form-state');
});

function saveToLs(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('feedback-form-state');

  feedbackElem.elements.email.value = data?.email ?? '';
  feedbackElem.elements.message.value = data?.message ?? '';
});