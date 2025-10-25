document.addEventListener('DOMContentLoaded', () => {
  const members = [
    { name: 'ชื่อสมาชิก 1', role: '', img: '' },
    { name: 'ชื่อสมาชิก 2', role: '', img: '' },
    { name: 'ชื่อสมาชิก 3', role: '', img: '' },
    { name: 'ชื่อสมาชิก 4', role: '', img: '' },
    { name: 'ชื่อสมาชิก 5', role: '', img: '' },
    { name: 'ชื่อสมาชิก 6', role: '', img: '' },
    { name: 'ชื่อสมาชิก 7', role: '', img: '' },
    { name: 'ชื่อสมาชิก 8', role: '', img: '' },
    { name: 'ชื่อสมาชิก 9', role: '', img: '' },
    { name: 'ชื่อสมาชิก 10', role: '', img: '' },
  ];

  const wheel = document.querySelector('.ferris-wheel-structure');
  const modal = document.getElementById('memberModal');
  const modalImg = document.getElementById('modalMemberPhoto');
  const modalName = document.getElementById('modalMemberName');
  const modalRole = document.getElementById('modalMemberRole');
  const closeModal = document.querySelector('.modal-close');

  const numCabins = members.length;
  const angle = 360 / numCabins;

  members.forEach((member, i) => {
    const cabin = document.createElement('div');
    cabin.className = 'cabin';
    cabin.style.transform = `rotate(${angle * i}deg) translateY(-200px)`;

    const memberPhoto = document.createElement('div');
    memberPhoto.className = 'member-photo';
    memberPhoto.style.transform = `rotate(-${angle * i}deg)`;

    cabin.appendChild(memberPhoto);
    wheel.appendChild(cabin);

    cabin.addEventListener('click', () => {
      modalName.textContent = member.name;
      modalRole.textContent = member.role;
      modal.style.display = 'flex';
    });
  });

  const wheelContainer = document.querySelector('.ferris-wheel-container');
  wheelContainer.addEventListener('mouseenter', () => {
    wheel.style.animationPlayState = 'paused';
    document.querySelectorAll('.cabin .member-photo').forEach(photo => {
      photo.style.animationPlayState = 'paused';
    });
  });

  wheelContainer.addEventListener('mouseleave', () => {
    wheel.style.animationPlayState = 'running';
    document.querySelectorAll('.cabin .member-photo').forEach(photo => {
      photo.style.animationPlayState = 'running';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});