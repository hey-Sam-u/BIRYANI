document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".veg-item");
  const popup = document.querySelector(".veg-popup");
  const vegName = document.querySelector(".veg-name");
  const vegDesc = document.querySelector(".veg-desc");
  const closeBtn = document.querySelector(".close-popup");

  const descs = {
    "Paneer Tikka": "Spicy, smoky grilled paneer with a tangy twist.",
    "Mix Veg Curry": "A colorful blend of seasonal vegetables in a rich curry.",
    "Palak Paneer": "Creamy spinach curry with soft paneer cubes.",
    "Veg Biryani": "Fragrant rice layered with perfectly cooked veggies.",
  };

  items.forEach((item) => {
    item.addEventListener("click", () => {
      vegName.textContent = item.dataset.name;
      vegDesc.textContent = descs[item.dataset.name] || "Delicious veg dish.";
      popup.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});

