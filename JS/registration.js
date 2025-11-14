document.getElementById("registrationForm").addEventListener("submit", function(event) {
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

  // Validation (เหมือนเดิม)
  if (fullname === "") {
    document.getElementById("fullname-error").textContent = "คุณยังไม่ได้กรอกชื่อจริง";
    valid = false;
  }
  if (email === "") {
    document.getElementById("email-error").textContent = "คุณยังไม่ได้กรอกอีเมล";
    valid = false;
  }
  if (age === "") {
    document.getElementById("age-error").textContent = "คุณยังไม่ได้กรอกอายุ";
    valid = false;
  }
  if (phone === "") {
    document.getElementById("phone-error").textContent = "คุณยังไม่ได้กรอกหมายเลขโทรศัพท์";
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phone-error").textContent = "คุณกรอกหมาเลขโทรศัพท์ไม่ครบ 10 หมายเลข";
    valid = false;
  }
  if (!gender) {
    document.getElementById("gender-error").textContent = "คุณยังไม่ได้กรอกเพศ";
    valid = false;
  }
  if (interests.length === 0) {
    document.getElementById("interests-error").textContent = "คุณยังไม่ได้กรอกบูธที่สนใจ";
    valid = false;
  }
  if (participationDate === "") {
    document.getElementById("date-error").textContent = "คุณยังไม่ได้กรอกวันที่ต้องการจะเข้าร่วม";
    valid = false;
  } else {
    const selectedDate = new Date(participationDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
      document.getElementById("date-error").textContent = "คุณไม่สามารถเลือกวันที่ผ่านไปแล้วได้";
      valid = false;
    }
  }
  if (!provided) {
    document.getElementById("provided-error").textContent = "คุณต้องยืนยันความถูกต้องของข้อมูลที่กรอกเข้ามา";
    valid = false;
  }

  // ถ้าฟอร์มถูกต้อง
  if (valid) {
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('phone', phone);
    formData.append('gender', gender.value);
    interests.forEach(i => formData.append('interests[]', i));
    formData.append('participation_date', participationDate);

  fetch('php/saveregistration.php', {
    method: 'POST',
    body: formData
  })

    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        document.getElementById("success").textContent = "แบบฟอร์มของคุณถูกบันทึกแล้ว";
        this.reset();
      } else {
        alert('เกิดข้อผิดพลาด: ' + (data.message || 'Cannot save data'));
      }
    })
    .catch(err => console.error(err));
  }
});
