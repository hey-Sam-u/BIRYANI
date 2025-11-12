document.addEventListener("DOMContentLoaded", () => {
  const eggs = document.querySelectorAll(".egg");
  const details = document.getElementById("details");
  const img = document.getElementById("dishImg");
  const name = document.getElementById("dishName");
  const price = document.getElementById("dishPrice");
  const ing = document.getElementById("dishIng");
  const close = document.getElementById("closeDetails");
  const back = document.getElementById("backBtn");

  eggs.forEach((e) => {
    e.addEventListener("click", () => {
      img.src = e.querySelector("img").src;
      name.textContent = e.dataset.name;
      price.textContent = e.dataset.price;
      ing.textContent = e.dataset.ing;
      details.classList.add("show");
    });
  });

  close.addEventListener("click", () => details.classList.remove("show"));
  details.addEventListener("click", (ev) => {
    if (ev.target === details) details.classList.remove("show");
  });
  back.addEventListener("click", () => window.history.back());
});
