// Mobile-first nice micro-interactions
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("letsGo");

  // micro ripple + redirect
  btn.addEventListener("click", (e) => {
    // small visual pop
    btn.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.98)" },
        { transform: "scale(1)" },  
      ],
      { duration: 220, easing: "ease-out" }
    );
 
    // navigate to dashboard (after short beat)
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 200);
  });

  // small entrance animation for cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((c, i) => {
    c.style.opacity = 0;
    c.style.transform = "translateY(14px)";
    setTimeout(() => {
      c.style.transition =
        "transform .6s cubic-bezier(.2,.9,.2,1), opacity .6s";
      c.style.opacity = 1;
      c.style.transform = "translateY(0)";
    }, 120 + i * 90);
  });

  // subtle parallax tilt on touch / mouse move for hero
  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (ev) => {
    const r = hero.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    hero.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${
      x * 6
    }deg)`;
  });
  hero.addEventListener("mouseleave", () => (hero.style.transform = ""));
});
