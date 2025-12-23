import "./style.css";

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

document.getElementById("year").textContent = new Date().getFullYear();