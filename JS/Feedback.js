// Feedback.js (ครบทุกฟิลด์ + ส่งไป XAMPP)
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
    try {
      const resp = await fetch("http://localhost/CS100/php/Feedback.json", { cache: "no-store" });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data)) return data.slice();
        if (typeof data === "object") return [data];
      }
    } catch (e) {}

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    return [];
  }

  async function sendToServerSilent(mergedList) {
    try {
      const resp = await fetch("http://localhost/CS100/php/save-feedback.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mergedList)
      });

      try {
        const js = await resp.json();
        console.log("save-feedback response", js);
      } catch (e) {}
    } catch (e) {
      console.error("Server save failed:", e);
    }
  }

  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    statusEl.textContent = "";

    // ฟิลด์หลัก
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const year = document.getElementById("year").value;
    const email = document.getElementById("email").value.trim();

    // ฟิลด์ใหม่
    const satisfaction = document.querySelector('input[name="satisfaction"]:checked')?.value || "";
    const comment = document.getElementById("comment").value.trim();

    // Validate email
    if (!email.endsWith("@dome.tu.ac.th")) {
      showTemporary("⚠️ กรุณาใช้อีเมล @dome.tu.ac.th เท่านั้น");
      return;
    }

    if (!fname || !lname || !studentId || !year || !email || !satisfaction) {
      showTemporary("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const newFeedback = {
      firstName: fname,
      lastName: lname,
      studentId: studentId,
      year: year,
      email: email,
      satisfaction: satisfaction,
      comment: comment,
      timestamp: new Date().toISOString()
    };

    let mergedList = [];
    try {
      mergedList = await loadExistingList();
    } catch (e) {}

    mergedList.push(newFeedback);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList));
    } catch (e) {}

    await sendToServerSilent(mergedList);

    showTemporary("✅ ขอบคุณสำหรับความคิดเห็นของคุณ!", 3000);
    form.reset();
  });
})();
