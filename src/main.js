import "./style.css";

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

document.getElementById("year").textContent = new Date().getFullYear();


const slider = document.querySelector("[data-slider]");
const track = document.querySelector("[data-track]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const counter = document.querySelector("[data-counter]");
const total = document.querySelector("[data-total]");

if (slider && track && prevBtn && nextBtn) {
  const slides = Array.from(track.children);
  let index = 0;

  if (total) total.textContent = String(slides.length);

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (counter) counter.textContent = String(index + 1);
  };

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  // Support clavier (gauche / droite)
  slider.setAttribute("tabindex", "0");
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });

  update();
}
