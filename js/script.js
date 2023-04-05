const contactForm = async (name, email) => {
  const response = await fetch('../netlify/functions/nodemailer-send-msg.js', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (response) {
    console.log(response);
  }
};

const formEl = document.querySelector('.cta-form');

if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    console.log(name, email);

    contactForm(name, email);
  });
}
