const carousel = document.getElementById("bad1-carousel");

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  const AUTO_ROTATE_MS = 3555;
  let currentIndex = 0;
  let autoRotateTimer = null;

  if (slides.length < 2) {
    // No carousel behavior needed when there is only one slide.
  } else {
    const getVisibleCount = () => {
      if (window.matchMedia("(max-width: 620px)").matches) return 1;
      if (window.matchMedia("(max-width: 900px)").matches) return 2;
      return 3;
    };

    const getMaxStartIndex = () => {
      return Math.max(0, slides.length - getVisibleCount());
    };

    const getSlideStep = () => {
      const firstSlide = slides[0];
      if (!firstSlide) return 0;
      const slideWidth = firstSlide.getBoundingClientRect().width;
      const trackStyles = window.getComputedStyle(track);
      const gapValue = parseFloat(trackStyles.gap || "0");
      return slideWidth + gapValue;
    };

    const setPosition = (animate = true) => {
      const step = getSlideStep();
      if (!step) return;
      track.style.transition = animate ? "transform 560ms ease" : "none";
      track.style.transform = `translateX(${-step * currentIndex}px)`;
    };

    const moveNext = () => {
      const maxStartIndex = getMaxStartIndex();
      currentIndex = currentIndex >= maxStartIndex ? 0 : currentIndex + 1;
      setPosition(true);
    };

    const startAutoRotate = () => {
      if (autoRotateTimer) return;
      autoRotateTimer = window.setInterval(moveNext, AUTO_ROTATE_MS);
    };

    const stopAutoRotate = () => {
      if (!autoRotateTimer) return;
      window.clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    };

    track.addEventListener("click", (event) => {
      const slide = event.target.closest(".carousel-slide");
      if (!slide) return;
      moveNext();
    });

    window.addEventListener("resize", () => {
      currentIndex = Math.min(currentIndex, getMaxStartIndex());
      setPosition(false);
    });

    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);
    carousel.addEventListener("focusin", stopAutoRotate);
    carousel.addEventListener("focusout", startAutoRotate);

    setPosition(false);
    startAutoRotate();
  }
}
