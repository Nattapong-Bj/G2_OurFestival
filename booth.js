// ตะกร้าแบบง่าย เก็บใน localStorage + โปรลด 10% เมื่อซื้อครบ 3 ชิ้นใน "บูทเดียวกัน"
const CART_KEY = "festivalCart";

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
};
const saveCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));

const calcTotalByBooth = (cart, booth) => {
  const items = cart.filter(x => x.booth === booth);
  const sum = items.reduce((s, x) => s + x.price, 0);
  const discount = items.length >= 3 ? Math.round(sum * 0.10) : 0; // ลด 10% ถ้าครบ 3 ชิ้น
  return { sum, discount, net: sum - discount, count: items.length };
};

document.addEventListener("DOMContentLoaded", () => {
  let cart = loadCart();

  const toastEl = document.querySelector('.toast');
  const modalEl = document.querySelector('.image-modal');

  // show toast using existing element if present, fallback to temporary element
  const showToast = (msg) => {
    try {
      if (toastEl) {
        toastEl.textContent = msg;
        toastEl.classList.add('visible');
        setTimeout(() => toastEl.classList.remove('visible'), 3000);
        return;
      }
      const t = document.createElement('div');
      t.className = 'toast';
      t.textContent = msg;
      document.body.appendChild(t);
      requestAnimationFrame(() => t.classList.add('visible'));
      setTimeout(() => { t.classList.remove('visible'); setTimeout(()=> t.remove(), 300); }, 3000);
    } catch (e) { console.warn('toast error', e); }
  };

  const updateCartCount = () => {
    cart = loadCart();
    const count = cart.length || 0;
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
  };

  updateCartCount();

  document.querySelectorAll(".product .btn-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const card  = btn.closest(".product");
      const id    = card?.dataset.id || "";
      const booth = card?.dataset.booth || "";
      const name  = card?.querySelector("h3")?.textContent?.trim() || "สินค้า";
      const price = Number(card?.dataset.price || 0);

      cart.push({ id, name, price, booth, ts: Date.now() });
      saveCart(cart);

      const { sum, discount, net, count } = calcTotalByBooth(cart, booth);
      let msg = `เพิ่มแล้ว: ${name} — ${price} บาท — ในบูทนี้: ${count} ชิ้น ยอดย่อย: ${sum} บาท`;
      if (discount) msg += ` — ลดคอมโบ: -${discount} บาท (สุทธิ ${net} บาท)`;
      showToast(msg);
      updateCartCount();
    });
  });

  // Image lightbox using existing modal element if present
  document.querySelectorAll('.product .product-image img, .intro-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      if (modalEl) {
        const modalImg = modalEl.querySelector('.image-modal__content img');
        modalImg.src = src;
        modalImg.alt = alt;
        modalEl.classList.add('active');
        // close handlers (ensure single listener)
        const close = () => modalEl.classList.remove('active');
        modalEl.querySelector('.image-modal__close')?.addEventListener('click', close, { once: true });
        modalEl.querySelector('.image-modal__bg')?.addEventListener('click', close, { once: true });
        return;
      }

      // fallback: create a temporary modal
      const tmp = document.createElement('div');
      tmp.className = 'image-modal';
      tmp.innerHTML = `<div class="image-modal__bg"></div><div class="image-modal__content"><img src="${src}" alt="${alt}"><button class="image-modal__close" aria-label="ปิด">×</button></div>`;
      document.body.appendChild(tmp);
      tmp.querySelector('.image-modal__close').addEventListener('click', () => tmp.remove());
      tmp.querySelector('.image-modal__bg').addEventListener('click', () => tmp.remove());
    });
  });

  // Close modal via Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalEl?.classList.remove('active');
    }
  });
});
