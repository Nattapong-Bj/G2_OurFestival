document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // ล้างข้อความ error และ success
  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.getElementById("success").textContent = "";

  let valid = true;

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const phoneInput = document.getElementById('phone');
  const phone = phoneInput.value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const interests = document.querySelectorAll('input[name="interests"]:checked');
  const participationDate = document.getElementById("participation-date").value.trim();


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

  if (phone === "") {
    document.getElementById("phone-error").textContent = "⚠️ Please enter your phone number.";
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phone-error").textContent = "⚠️ Phone number must be 10 digits.";
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
  if (participationDate === "") {
    document.getElementById("date-error").textContent = "⚠️ Please select a participation date.";
  valid = false;
  }else {
    const selectedDate = new Date(participationDate);
    const today = new Date();
    today.setHours(0,0,0,0); 
        if (selectedDate < today) {
            document.getElementById("date-error").textContent = "⚠️ You cannot select a past date.";
            valid = false;
    }
  }


  if (valid) {
    document.getElementById("success").textContent = "✅ Form submitted successfully!";
    this.reset();
  }
});
