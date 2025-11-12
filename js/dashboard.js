document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // --- Category click navigation ---
  const categories = document.querySelectorAll(".cat-card");

  categories.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.querySelector("span").textContent.trim().toLowerCase();
      window.location.href = `${type}.html`;
      // Example: chicken.html, fish.html, egg.html, veg.html
    });
  });
});
