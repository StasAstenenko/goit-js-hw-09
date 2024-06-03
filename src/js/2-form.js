const feedbackElem = document.querySelector('.feedback-form');
const textarea = feedbackElem.querySelector('textarea');

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

  const formData = new FormData(feedbackElem);
  const email = formData.get('email');
  const message = formData.get('message');
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