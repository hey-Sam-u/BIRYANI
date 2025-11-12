// fish.js — lightweight, mobile-first interactions
document.addEventListener("DOMContentLoaded", () => {
  const fishes = Array.from(document.querySelectorAll(".fish"));
  const details = document.getElementById("details");
  const detailsImg = document.getElementById("detailsImg");
  const detailsName = document.getElementById("detailsName");
  const detailsPrice = document.getElementById("detailsPrice");
  const detailsIngr = document.getElementById("detailsIngr");
  const closeBtn = document.getElementById("closeDetails");
  const backBtn = document.getElementById("backBtn");
  let touchStartX = 0;
  let rafIds = [];

  // gentle floating via requestAnimationFrame for natural motion
  fishes.forEach((f, i) => {
    const base = getBase(i);
    const amplitude = 6 + i * 2;
    let t0 = performance.now();

    function loop(now) {
      const t = (now - t0) / 1000;
      const x = Math.cos(t * (0.6 + i * 0.05) + i) * (6 + i * 3);
      const y = Math.sin(t * (0.9 + i * 0.03) + i) * (4 + i * 2);
      if (!f.classList.contains("active")) {
        f.style.transform = `translate3d(${base.x + x}px, ${
          base.y + y
        }px, 0) scale(${base.s})`;
      }
      rafIds[i] = requestAnimationFrame(loop);
    }
    rafIds[i] = requestAnimationFrame(loop);
  });

  function getBase(i) {
    if (i === 0) return { x: -90, y: -200, s: 0.98 };
    if (i === 1) return { x: 170, y: -60, s: 0.95 };
    if (i === 2) return { x: 120, y: 140, s: 0.92 };
    return { x: -160, y: 100, s: 0.94 };
  }

  function openDetails(el) {
    fishes.forEach((f) => f.classList.remove("active"));
    el.classList.add("active");
    document.body.classList.add("chosen");
    detailsImg.src = el.querySelector("img").src;
    detailsName.textContent = el.dataset.name || "Item";
    detailsPrice.textContent = el.dataset.price || "₹0";
    detailsIngr.textContent = el.dataset.ingredients || "";
    details.classList.add("show");
  }
  function closeDetails() {
    fishes.forEach((f) => f.classList.remove("active"));
    document.body.classList.remove("chosen");
    details.classList.remove("show");
  }

  // interactions: click for mobile, hover for desktop (small delay)
  fishes.forEach((f) => {
    f.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetails(f);
    });

    if (window.matchMedia("(hover: hover)").matches) {
      let hTimer;
      f.addEventListener("mouseenter", () => {
        hTimer = setTimeout(() => openDetails(f), 240);
      });
      f.addEventListener("mouseleave", () => {
        clearTimeout(hTimer);
        setTimeout(() => {
          if (!details.classList.contains("show")) closeDetails();
        }, 260);
      });
    }
  });

  closeBtn.addEventListener("click", closeDetails);
  details.addEventListener("click", (e) => {
    if (e.target === details) closeDetails();
  });

  // back & swipe-right to go back
  backBtn.addEventListener("click", () => window.history.back());
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  document.addEventListener("touchmove", (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    if (dx > 120) window.history.back();
  });

  // collapse if click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fish") && !e.target.closest(".details-card"))     
      closeDetails();
  });

  // cleanup
  window.addEventListener("beforeunload", () =>
    rafIds.forEach((id) => cancelAnimationFrame(id))
  );
});
