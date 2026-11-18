// ---------- Dark / light toggle ----------
const root = document.documentElement;
const btn = document.getElementById("themeToggle");

const saved = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", saved);
btn.textContent = saved === "dark" ? "☀️" : "🌙";

btn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next); // remember choice
  btn.textContent = next === "dark" ? "☀️" : "🌙";
});

// ---------- Load projects from the API ----------
async function loadProjects() {
  const res = await fetch("/api/projects");
  const projects = await res.json();
  document.getElementById("projectList").innerHTML = projects
    .map(
      (p) => `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <small>${p.tech}</small>
    </div>`,
    )
    .join("");
}
loadProjects();

// ---------- Contact form ----------
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks! Your message has been sent.");
  e.target.reset();
});
