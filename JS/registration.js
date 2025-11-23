// เมนูขีดสามขีด
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-active');
});

// Form submission
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // ล้างข้อความ error และ success
  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.getElementById("success").textContent = "";

  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = Array.from(document.querySelectorAll('input[name="interests[]"]:checked')).map(el => el.value);
  const participationDate = document.getElementById("participation_date").value.trim();
  const provided = document.getElementById("provided").checked;

  // Validation
  if (fullname === "") { document.getElementById("fullname-error").textContent = "กรุณากรอกชื่อจริง"; valid = false; }
  if (lastname === "") { document.getElementById("lastname-error").textContent = "กรุณากรอกนามสกุล"; valid = false; }
  if (email === "") {
    document.getElementById("email-error").textContent = "กรุณากรอกอีเมล"; valid = false;
  } else if (!/^[\w.-]+@dome\.tu\.ac\.th$/.test(email)) {
    document.getElementById("email-error").textContent = "กรุณากรอกอีเมล @dome.tu.ac.th เท่านั้น"; valid = false;
  }
  if (age === "") { document.getElementById("age-error").textContent = "กรุณากรอกอายุ"; valid = false; }
  if (phone === "") {
    document.getElementById("phone-error").textContent = "กรุณากรอกหมายเลขโทรศัพท์"; valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phone-error").textContent = "กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก"; valid = false;
  }
  if (!gender) { document.getElementById("gender-error").textContent = "กรุณาเลือกเพศ"; valid = false; }
  if (interests.length === 0) { document.getElementById("interests-error").textContent = "กรุณาเลือกบูทที่สนใจ"; valid = false; }
  if (participationDate === "") { document.getElementById("date-error").textContent = "กรุณาเลือกวันที่เข้าร่วม"; valid = false; } 
  else {
    const selectedDate = new Date(participationDate);
    const today = new Date(); today.setHours(0,0,0,0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      document.getElementById("date-error").textContent = "วันที่ต้องไม่เป็นอดีต"; valid = false;
    }
  }
  if (!provided) { document.getElementById("provided-error").textContent = "คุณต้องยืนยันความถูกต้องของข้อมูล"; valid = false; }

  // ส่ง form ถ้า valid
  if (valid) {
    const formData = new FormData(form);

    fetch('php/saveregistration.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        document.getElementById("success").textContent = "แบบฟอร์มของคุณถูกบันทึกแล้ว";
        form.reset();
      } else {
        alert('เกิดข้อผิดพลาด: ' + (data.message || 'ไม่สามารถบันทึกข้อมูลได้'));
      }
    })
    .catch(err => console.error(err));
  }
});
