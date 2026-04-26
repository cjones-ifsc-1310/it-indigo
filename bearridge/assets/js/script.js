"use strict";

/* =========================
   CABIN CALCULATOR
========================= */

const TAX_RATE = 1.095;

function setupCalculator(config) {
  const select = document.getElementById(config.selectId);
  const output = document.getElementById(config.outputId);
  const box = document.getElementById(config.boxId);

  if (!select || !output || !box) return;

  select.addEventListener("change", () => {
    const value = parseInt(select.value);

    if (!value) {
      box.classList.remove("active");
      output.textContent = "$0.00";
      return;
    }

    const total = config.calculate(value);
    output.textContent = `$${total.toFixed(2)}`;
    box.classList.add("active");
  });
}

setupCalculator({
  selectId: "days",
  outputId: "cabin-total",
  boxId: "cabin-result",
  calculate: (days) => {
    const base = (days === 7) ? 1195 : days * 195;
    return base * TAX_RATE;
  }
});


/* =========================
   CAROUSEL STATE
========================= */

const track = document.getElementById("carouselTrack");
const images = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let index = 0;
const total = images.length;

if (!track || images.length === 0) {
  console.warn("Carousel not found or no images.");
}


/* =========================
   GO TO SLIDE
========================= */

function goToSlide(i) {
  index = (i + total) % total;

  const slideWidth = track.clientWidth; 
  // IMPORTANT: avoids offset bugs from image width + gaps

  track.scrollTo({
    left: slideWidth * index,
    behavior: "smooth"
  });

  updateDots();
}


/* =========================
   DOT UPDATE
========================= */

function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}


/* =========================
   AUTOPLAY (SAFE)
========================= */

let autoplay = setInterval(() => {
  goToSlide(index + 1);
}, 4000);


/* =========================
   PAUSE ON INTERACTION
========================= */

track.addEventListener("mouseenter", () => clearInterval(autoplay));
track.addEventListener("mouseleave", () => {
  autoplay = setInterval(() => goToSlide(index + 1), 4000);
});


/* =========================
   DOT NAVIGATION
========================= */

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const i = parseInt(dot.dataset.index);
    goToSlide(i);
  });
});


/* =========================
   MANUAL SCROLL SYNC
========================= */

track.addEventListener("scroll", () => {
  const slideWidth = track.clientWidth;
  const newIndex = Math.round(track.scrollLeft / slideWidth);

  if (newIndex !== index && newIndex < total) {
    index = newIndex;
    updateDots();
  }
});


/* =========================
   LIGHTBOX (FIXED)
========================= */

images.forEach(img => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;

    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

if (lightbox) {
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}