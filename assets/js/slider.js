(() => {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const prevBtn = slider.querySelector(".slider-btn.prev");
  const nextBtn = slider.querySelector(".slider-btn.next");
  const dotsWrap = slider.querySelector(".slider-dots");
  const intervalMs = 4500;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slider-dot";
    btn.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
    btn.addEventListener("click", () => {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(btn);
    return btn;
  });

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }

  function goTo(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    render();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function start() {
    timer = window.setInterval(next, intervalMs);
  }

  function stop() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  }

  function restart() {
    stop();
    start();
  }

  prevBtn.addEventListener("click", () => {
    prev();
    restart();
  });

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  render();
  start();
})();
