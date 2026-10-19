import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./style.css";

// Année du footer
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// Header : fond flouté dès qu'on scrolle
const header = document.querySelector("[data-header]");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobile
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

const setMenu = (open) => {
  if (!menuToggle || !menu) return;
  menu.classList.toggle("hidden", !open);
  header?.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  menuToggle.querySelector("[data-icon-open]")?.classList.toggle("hidden", open);
  menuToggle.querySelector("[data-icon-close]")?.classList.toggle("hidden", !open);
};

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});
menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// Lien actif dans la navigation selon la section visible
const navLinks = document.querySelectorAll("[data-nav]");
const sections = document.querySelectorAll("main section[id]");

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  // Une section est « active » quand elle traverse le milieu de l'écran
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((section) => spy.observe(section));

// Apparition au scroll
const reveal = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

// Bouton « Copier l'email »
const copyBtn = document.querySelector("[data-copy]");
const copyStatus = document.querySelector("[data-copy-status]");

copyBtn?.addEventListener("click", async () => {
  const label = copyBtn.querySelector("[data-copy-label]");
  const icon = copyBtn.querySelector("[data-copy-icon] use");
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.copy);
    label.textContent = "Copié !";
    icon?.setAttribute("href", "#i-check");
    if (copyStatus) copyStatus.textContent = "Adresse email copiée dans le presse-papiers.";
  } catch {
    label.textContent = "Échec de la copie";
  }
  setTimeout(() => {
    label.textContent = "Copier";
    icon?.setAttribute("href", "#i-copy");
    if (copyStatus) copyStatus.textContent = "";
  }, 2000);
});
