document.getElementById("feedbackForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const year = document.getElementById("year").value;
  const email = document.getElementById("email").value.trim();

  // ตรวจสอบความถูกต้องของอีเมลโดเมน
  if (!email.endsWith("@dome.tu.ac.th")) {
    alert("⚠️ กรุณาใช้อีเมล @dome.tu.ac.th เท่านั้น");
    return;
  }

  // ตรวจสอบช่องที่เว้นว่าง
  if (fname === "" || lname === "" || studentId === "" || year === "" || email === "") {
    alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  alert("✅ ขอบคุณสำหรับความคิดเห็นของคุณ!");
  this.reset();
});
