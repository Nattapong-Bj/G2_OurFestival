document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // ล้างข้อความ error และ success
  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.getElementById("success").textContent = "";

  let valid = true;
   // ดึงค่าจาก input 
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const phoneInput = document.getElementById('phone');
  const phone = phoneInput.value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = document.querySelectorAll('input[name="interests"]:checked');
  const participationDate = document.getElementById("participation-date").value.trim();

  // check ว่ากรอก Full Name แล้ว
  if (fullname === "") {
    document.getElementById("fullname-error").textContent = "⚠️ Please enter your full name.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }
// check ว่ากรอก Email แล้ว
  if (email === "") {
    document.getElementById("email-error").textContent = "⚠️ Please enter your email.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }
// check ว่ากรอก Age แล้ว
  if (age === "") {
    document.getElementById("age-error").textContent = "⚠️ Please enter your age.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }
// check ว่ากรอก Phone NUmber แล้ว
  if (phone === "") {
    document.getElementById("phone-error").textContent = "⚠️ Please enter your phone number.";//error massager เปลี่ยนข้อความได้
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {// check ว่า phonenumber มี 10 ตัว
    document.getElementById("phone-error").textContent = "⚠️ Phone number must be 10 digits.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }
// check ว่า เลือก Gender แล้ว
  if (!gender) {
    document.getElementById("gender-error").textContent = "⚠️ Please select your gender.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }
// check ว่าเลือก booth  แล้วอย่างน้อย 1 อัน
  if (interests.length === 0) {
    document.getElementById("interests-error").textContent = "⚠️ Please select at least one booth.";//error massager เปลี่ยนข้อความได้
    valid = false;
  }// check ว่ากรอก วันที่เข้าร่วม แล้ว
  if (participationDate === "") {
    document.getElementById("date-error").textContent = "⚠️ Please select a participation date.";//error massager เปลี่ยนข้อความได้
  valid = false;
  }else {// check ว่า วันที่ที่กรอกเข้ามาเป็นวันที่ผ่านมาแล้วหรือปล่าว
    const selectedDate = new Date(participationDate);
    const today = new Date();
    today.setHours(0,0,0,0); 
        if (selectedDate < today) {
            document.getElementById("date-error").textContent = "⚠️ You cannot select a past date.";//error massager เปลี่ยนข้อความได้
            valid = false;
    }
  }
//check  confirm information แล้ว
const provided = document.getElementById("provided").checked;
if (!provided) {
  document.getElementById("provided-error").textContent = "⚠️ You must confirm that the information provided is correct.";
  valid = false;
}

// ถ้าฟอร์มถูกต้องทุกช่อง
  if (valid) {
    document.getElementById("success").textContent = "✅ Form submitted successfully!";//success massage เปลี่ยนข้อความได้
    this.reset();
  }
});

// โค้ด Back-end (Node.js/Express)
// สมมติว่า database.getAllVisitors() ได้ถูกเขียนและพร้อมใช้งานแล้ว

app.get('/visitor-summary', async (req, res) => {
    try {
        // 1. ดึงข้อมูลผู้เยี่ยมชมทั้งหมดจากฐานข้อมูล
        const visitorsData = await database.getAllVisitors(); 
        
        // 2. *** ส่งข้อมูล (visitorsData) เข้าไปใน Template ***
        //    โดยกำหนดชื่อตัวแปรใน Template เป็น 'allVisitors'
        res.render('visitorsummary', { 
            allVisitors: visitorsData 
        }); 
        
    } catch (error) {
        console.error("Failed to load visitor summary:", error);
        res.status(500).send("Error loading data.");
    }
});

