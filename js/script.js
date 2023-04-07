import { showAlert } from './alert.js';

const contactForm = async (name, email, message, mobile) => {
  try {
    formBtn.textContent = 'Sending.....';
    formBtn.style.pointerEvents = 'none';

    const response = await fetch('/.netlify/functions/nodemailer-send-msg', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, mobile }),
    });

    if (response.status === 200) {
      formBtn.textContent = 'Send';
      formBtn.style.pointerEvents = 'auto';
      showAlert('success', 'Message sent successfully');
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      document.getElementById('mobile').value = '';
      // const newDiv = document.createElement('div');
      // const text = document.createTextNode('Message sent successfully');
      // newDiv.appendChild(text);
      // newDiv.classList.add('email-response');
      // formEl.insertAdjacentElement('beforeend', newDiv);
    }
  } catch (err) {
    showAlert('error', 'Please try again!');
   
  }
};

const formEl = document.querySelector('.cta-form');
const formBtn = document.querySelector('.btn--form');

if (formEl) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mobile = document.getElementById('mobile').value;

    contactForm(name, email, message, mobile);
  });
}

const mobileNav = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.main-header');

if (mobileNav) {
  mobileNav.addEventListener('click', () => {
    headerEl.classList.toggle('nav-open');
  });
}

const sectionEl = document.querySelector('.hero-section');

const observer = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    // console.log(ent);
    if (!ent.isIntersecting) {
      document.body.classList.add('sticky');
      document.body.classList.remove('hidden');
      headerEl.classList.remove('nav-open');
    } else {
      document.body.classList.remove('sticky');
      document.body.classList.add('hidden');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-70px',
  }
);

observer.observe(sectionEl);
