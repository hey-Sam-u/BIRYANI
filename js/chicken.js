document.addEventListener("DOMContentLoaded", () => {
  const orbitItems = document.querySelectorAll(".orbit-item");
  const details = document.getElementById("details");
  const detailsImg = document.querySelector("#detailsMedia img");
  const dishName = document.getElementById("dishName");
  const dishPrice = document.getElementById("dishPrice");
  const dishIngr = document.getElementById("dishIngr");
  const closeBtn = document.getElementById("closeDetails");
  const backBtn = document.getElementById("backBtn");
  let startX = 0;

  const openDetails = (el) => {
    orbitItems.forEach((i) => i.classList.remove("active"));
    el.classList.add("active");
    document.body.classList.add("chosen");
    detailsImg.src = el.querySelector("img").src;
    dishName.textContent = el.dataset.name;
    dishPrice.textContent = el.dataset.price;
    dishIngr.textContent = el.dataset.ingredients;
    details.classList.add("show");
  };

  const closeAll = () => {
    document.body.classList.remove("chosen");
    orbitItems.forEach((i) => i.classList.remove("active"));
    details.classList.remove("show");
  };

  orbitItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetails(item);
    });
    if (window.matchMedia("(hover:hover)").matches) {
      item.addEventListener("mouseenter", () => openDetails(item));
      item.addEventListener("mouseleave", () => closeAll());
    }
  });

  closeBtn.addEventListener("click", closeAll);
  details.addEventListener("click", (e) => {
    if (e.target === details) closeAll();
  });
  backBtn.addEventListener("click", () => window.history.back());

  // drag right gesture to go back (mobile)
  document.addEventListener(
    "touchstart",
    (e) => (startX = e.touches[0].clientX)
  );
  document.addEventListener("touchmove", (e) => {
    if (e.touches[0].clientX - startX > 120) {
      window.history.back();
    }
  });
});
