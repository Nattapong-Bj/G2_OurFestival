document.addEventListener('DOMContentLoaded', () => {
  const members = [
    { name: 'Ariya Tangrojanakul', id: '6609520108', role: '', img: 'resources/member1.jpg' },
    { name: 'Pandhana Buranrat',   id: '6609612145', role: '', img: 'resources/member2.jpg' },
    { name: 'sorawit tansricharoen', id: '6609650673', role: '', img: 'resources/member4.jpg' },
    { name: 'Nattapong Boonjeen',  id: '6609652067', role: '', img: 'resources/member4.jpg' },
    { name: 'Paweethida Buadum',   id: '6609652117', role: '', img: 'resources/member5.jpg' },
    { name: 'Mintthita Jindarattananan', id: '6609652323', role: '', img: 'resources/member6.jpg' },
    { name: 'Siraphop Kitisrunya', id: '6609652349', role: '', img: 'resources/member7.jpg' },
    { name: 'Tula Lakul',          id: '6709650359', role: '', img: 'resources/member4.jpg' },
    { name: 'Chakriya Sudsaneh',   id: '6709620055', role: '', img: 'resources/member9.jpg' },
    { name: 'Teetapath Magroodin', id: '6709616558', role: '', img: 'resources/member10.jpg' },
  ];

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
