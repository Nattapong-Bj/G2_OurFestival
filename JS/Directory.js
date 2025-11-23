document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');

  if (!menuToggle || !nav) {
    return;
  }

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active');
  });
});
