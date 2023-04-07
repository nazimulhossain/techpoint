export const hideAlert = () => {
  const alertEl = document.querySelector('.alert');
  if (alertEl) alertEl.parentElement.removeChild(alertEl);
};

export const showAlert = (type, msg, time = 10) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('.cta-form').insertAdjacentHTML('beforeend', markup);

  window.setTimeout(hideAlert, time * 1000);
};
