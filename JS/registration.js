document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // ป้องกันไม่ให้ form ส่งก่อนตรวจสอบ

  // ล้างข้อความ error เดิมทั้งหมดก่อน
  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.getElementById("success").textContent = "";

  let valid = true;

  // ดึงค่าช่อง input
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = document.querySelectorAll('input[name="interests"]:checked');

  // ตรวจแต่ละช่อง
  if (fullname === "") {
    document.getElementById("fullname-error").textContent = "⚠️ Please enter your full name.";
    valid = false;
  }

  if (email === "") {
    document.getElementById("email-error").textContent = "⚠️ Please enter your email.";
    valid = false;
  }

  if (age === "") {
    document.getElementById("age-error").textContent = "⚠️ Please enter your age.";
    valid = false;
  }

  if (!gender) {
    document.getElementById("gender-error").textContent = "⚠️ Please select your gender.";
    valid = false;
  }

  if (interests.length === 0) {
    document.getElementById("interests-error").textContent = "⚠️ Please select at least one booth.";
    valid = false;
  }

  // ถ้าผ่านหมดทุกช่อง
  if (valid) {
    document.getElementById("success").textContent = "✅ Form submitted successfully!";
    this.reset(); // เคลียร์ค่าทั้งหมดในฟอร์ม
  }
});
