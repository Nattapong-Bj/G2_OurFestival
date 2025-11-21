const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '0,0,0';
};

document.addEventListener('DOMContentLoaded', () => {
  const members = [
    { name: 'Ariya Tangrojanakul', id: '6609520108', role: 'Feedback Page', img: 'resources/member1.jpg', color: '#e02cc5ff' },
    { name: 'Pandhana Buranrat',   id: '6609612145', role: 'Registration Page', img: 'resources/member2.jpg', color: '#f3da4bff' },
    { name: 'sorawit tansricharoen', id: '6609650673', role: 'Booth4 Page', img: 'resources/member3.jpg', color: 'rgba(51, 105, 242, 1)' },
    { name: 'Nattapong Boonjeen',  id: '6609652067', role: 'Booth Directory Page', img: 'resources/member4.jpg', color: '#2bfe52ff' },
    { name: 'Paweethida Buadum',   id: '6609652117', role: 'Registration Page', img: 'resources/member5.jpg', color: '#f7a63dff' },
    { name: 'Mintthita Jindarattananan', id: '6609652323', role: 'Homepage', img: 'resources/member6.jpg', color: '#e02cc5ff' },
    { name: 'Siraphop Kitisrunya', id: '6609652349', role: 'Feedback Page', img: 'resources/member7.jpg', color: '#f3da4bff' },
    { name: 'Tula Lakul',          id: '6709650359', role: 'Booth4 Page', img: 'resources/member8.jpg', color: 'rgba(51, 105, 242, 1)' },
    { name: 'Chakriya Sudsaneh',   id: '6709620055', role: 'Homepage', img: 'resources/member9.jpg', color: '#2bfe52ff' },
    { name: 'Teetapath Magroodin', id: '6709616558', role: 'Booth Directory Page', img: 'resources/member10.jpg', color: '#f7a63dff' },
  ];

  const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active');
    });

  const wheel        = document.querySelector('.ferris-wheel-structure');
  const modal        = document.getElementById('memberModal');
  const modalImg     = document.getElementById('modalMemberPhoto');
  const modalName    = document.getElementById('modalMemberName');
  const modalId      = document.getElementById('modalMemberID');
  const modalRole    = document.getElementById('modalMemberRole');
  const closeModal   = document.querySelector('.modal-close');

  const numCabins = members.length;
  const stepAngle = 360 / numCabins;

  const cabins = [];

  members.forEach((member, i) => {
    const baseAngle = stepAngle * i; 

    const cabin = document.createElement('div');
    cabin.className = 'cabin';
    cabin.style.transform = `rotate(${baseAngle}deg) translateY(-200px)`;

    cabin.style.setProperty('--member-color', member.color);
    cabin.style.transform = `rotate(${baseAngle}deg) translateY(-200px)`;

    const memberPhoto = document.createElement('div');
    memberPhoto.className = 'member-photo';

    if (member.img) {
      memberPhoto.style.backgroundImage = `url('${member.img}')`;
    }

    cabin.appendChild(memberPhoto);
    wheel.appendChild(cabin);

    cabins.push({ cabin, memberPhoto, baseAngle, member });

    cabin.addEventListener('click', () => {
      modalName.textContent = member.name;
      modalId.textContent   = member.id;
      modalRole.textContent = member.role;

      if (member.img) {
        modalImg.style.backgroundImage = `url('${member.img}')`;
      } else {
        modalImg.style.backgroundImage = 'none';
      }

      modal.style.display = 'flex';
    });
  });

  let wheelAngle = 0;
  let spinning = true;

  function spin() {
    if (spinning) {
      wheelAngle = (wheelAngle + 0.1) % 360;
      wheel.style.transform = `rotate(${wheelAngle}deg)`;
      cabins.forEach(({ memberPhoto, baseAngle }) => {
        memberPhoto.style.transform = `rotate(${-baseAngle - wheelAngle}deg) scale(var(--cabin-scale))`;
      });
    }
    requestAnimationFrame(spin);
  }
  spin();

  const wheelContainer = document.querySelector('.ferris-wheel-container');
  wheelContainer.addEventListener('mouseenter', () => {
    spinning = false;
  });
  wheelContainer.addEventListener('mouseleave', () => {
    spinning = true;
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
});

