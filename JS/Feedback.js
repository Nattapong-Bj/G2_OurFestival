// Feedback.js (ปรับ path ให้ตรง C:/xampp/htdocs/CS100/php/)
(function () {
  const STORAGE_KEY = "feedback_list_v1";
  const statusEl = document.getElementById("feedbackStatus");

  function showTemporary(message, ms = 2500) {
    if (!statusEl) return;
    statusEl.style.display = "block";
    statusEl.textContent = message;
    clearTimeout(showTemporary._t);
    showTemporary._t = setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, ms);
  }

  async function loadExistingList() {
    // อ่านจาก /CS100/php/Feedback.json (ถ้าไฟล์มีอยู่บน server)
    try {
      const resp = await fetch('/CS100/php/Feedback.json', { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) return data.slice();
        if (data && typeof data === 'object') return [data];
      }
    } catch (e) { /* ignore */ }

    // fallback: localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.slice();
      }
    } catch (e) {}

    // fallback: user file input
    try {
      const fileInput = document.getElementById('existingFileInput');
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const text = await fileInput.files[0].text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed.slice();
        if (parsed && typeof parsed === 'object') return [parsed];
      }
    } catch (e) {}

    return [];
  }

  async function sendToServerSilent(mergedList) {
    try {
      const resp = await fetch('/CS100/php/save-feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedList)
      });
      // debug: log server response (DevTools console)
      try { const js = await resp.json(); console.log('save-feedback response', js); } catch (e) {}
    } catch (e) {
      console.error("Server save failed:", e);
    }
  }

  const form = document.getElementById("feedbackForm");
  if (!form) {
    console.warn("No #feedbackForm found — skipping Feedback.js initialization.");
    return;
  }

  const fileInput = document.getElementById('existingFileInput');
  const loadBtn = document.getElementById('loadExistingBtn');

  if (loadBtn && fileInput) loadBtn.addEventListener('click', () => fileInput.click());
  if (fileInput) fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      showTemporary("ไฟล์ถูกเลือกแล้ว — จะรวมเมื่อกดส่ง", 2000);
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (statusEl) statusEl.textContent = "";

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value.trim();

    if (!email.endsWith('@dome.tu.ac.th')) {
      showTemporary('⚠️ กรุณาใช้อีเมล @dome.tu.ac.th เท่านั้น');
      return;
    }
    if (!fname || !lname || !studentId || !year || !email) {
      showTemporary('⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    const newFeedback = {
      firstName: fname,
      lastName: lname,
      studentId: studentId,
      year: year,
      email: email,
      timestamp: new Date().toISOString()
    };

    let mergedList = [];
    try {
      mergedList = await loadExistingList();
    } catch (e) { mergedList = []; }

    // append ทุกครั้ง
    mergedList.push(newFeedback);

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList)); } catch (e) {}

    // ส่งไป PHP ที่ /CS100/php/save-feedback.php
    await sendToServerSilent(mergedList);

    showTemporary("✅ ขอบคุณสำหรับความคิดเห็นของคุณ!", 3000);

    this.reset();
  });

})();
