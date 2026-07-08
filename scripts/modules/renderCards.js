// Fetches JSON from /data and renders repeatable card sections
// (Projects, Certifications, Experience, Education, Achievements, Skills, Blog).
import { fetchJSON, escapeHTML, formatMonthYear } from "./utils.js";

export function renderCards() {
  renderExperience();
  renderSkills();
  renderProjects();
  renderCertifications();
  renderEducation();
  renderAchievements();
  renderBlog();
}

async function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;

  try {
    const roles = await fetchJSON("data/experience.json");
    container.innerHTML = roles.map(renderExperienceItem).join("");
  } catch (error) {
    console.error(error);
  }
}

async function renderSkills() {
  const groups = document.querySelectorAll("[data-skills-group]");
  if (!groups.length) return;

  try {
    const skills = await fetchJSON("data/skills.json");
    groups.forEach((list) => {
      const items = skills[list.dataset.skillsGroup] || [];
      list.innerHTML = items.map((skill) => `<li class="skill-tag">${escapeHTML(skill)}</li>`).join("");
    });
  } catch (error) {
    console.error(error);
  }
}

async function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  try {
    const projects = await fetchJSON("data/projects.json");
    container.innerHTML = projects.map(renderProjectCard).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="fetch-error">Projects failed to load. Please refresh the page.</p>`;
  }
}

async function renderCertifications() {
  const container = document.getElementById("certifications-grid");
  if (!container) return;

  try {
    const certifications = await fetchJSON("data/certifications.json");
    container.innerHTML = certifications.map(renderCertificationCard).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="fetch-error">Certifications failed to load. Please refresh the page.</p>`;
  }
}

async function renderEducation() {
  const container = document.getElementById("education-timeline");
  if (!container) return;

  try {
    const education = await fetchJSON("data/education.json");
    container.innerHTML = education.map(renderEducationItem).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="fetch-error">Education failed to load. Please refresh the page.</p>`;
  }
}

async function renderAchievements() {
  const container = document.getElementById("achievements-grid");
  if (!container) return;

  try {
    const achievements = await fetchJSON("data/achievements.json");
    container.innerHTML = achievements.map(renderAchievementCard).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="fetch-error">Achievements failed to load. Please refresh the page.</p>`;
  }
}

async function renderBlog() {
  const container = document.getElementById("blog-grid");
  if (!container) return;

  try {
    const posts = await fetchJSON("data/blog.json");
    container.innerHTML = posts.map(renderBlogCard).join("");
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="fetch-error">Articles failed to load. Please refresh the page.</p>`;
  }
}

function renderExperienceItem({ role, company, startDate, endDate, highlights = [] }) {
  const dateRange = `${formatMonthYear(startDate)} – ${formatMonthYear(endDate)}`;

  return `
    <article class="timeline-item">
      <span class="timeline-marker"></span>
      <div class="timeline-content card">
        <p class="timeline-date">${escapeHTML(dateRange)}</p>
        <h3 class="timeline-role">${escapeHTML(role)}</h3>
        <p class="timeline-company">${escapeHTML(company)}</p>
        <ul class="timeline-highlights">
          ${highlights.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderProjectCard({ title, description, image, tags = [], demoUrl, repoUrl }) {
  const links = [
    demoUrl ? `<a href="${escapeHTML(demoUrl)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Live Demo</a>` : "",
    repoUrl ? `<a href="${escapeHTML(repoUrl)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">View Code</a>` : "",
  ].filter(Boolean).join("");

  return `
    <article class="card project-card">
      <img class="project-image" src="${escapeHTML(image)}" alt="" width="340" height="180" loading="lazy" />
      <h3 class="card-title">${escapeHTML(title)}</h3>
      <p class="project-description">${escapeHTML(description)}</p>
      <ul class="project-tags" aria-label="Technologies used">
        ${tags.map((tag) => `<li class="skill-tag">${escapeHTML(tag)}</li>`).join("")}
      </ul>
      ${links ? `<div class="project-links">${links}</div>` : ""}
    </article>
  `;
}

function renderCertificationCard({ name, issuer, date, credentialUrl, image }) {
  const nameMarkup = credentialUrl
    ? `<a href="${escapeHTML(credentialUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(name)}</a>`
    : escapeHTML(name);

  return `
    <article class="card cert-card">
      <img class="cert-badge" src="${escapeHTML(image)}" alt="" width="56" height="56" loading="lazy" />
      <div class="cert-details">
        <h3 class="card-title">${nameMarkup}</h3>
        <p class="cert-issuer">${escapeHTML(issuer)}</p>
        <p class="cert-date">${escapeHTML(date)}</p>
      </div>
    </article>
  `;
}

function renderEducationItem({ degree, institution, startYear, endYear }) {
  return `
    <article class="timeline-item">
      <span class="timeline-marker"></span>
      <div class="timeline-content card">
        <p class="timeline-date">${escapeHTML(startYear)} – ${escapeHTML(endYear)}</p>
        <h3 class="timeline-role">${escapeHTML(degree)}</h3>
        <p class="timeline-company">${escapeHTML(institution)}</p>
      </div>
    </article>
  `;
}

function renderAchievementCard({ title, description, date }) {
  return `
    <article class="card achievement-card">
      <p class="achievement-date">${escapeHTML(date)}</p>
      <h3 class="card-title">${escapeHTML(title)}</h3>
      <p class="achievement-description">${escapeHTML(description)}</p>
    </article>
  `;
}

function renderBlogCard({ title, excerpt, date, url }) {
  const titleMarkup = url
    ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)}</a>`
    : escapeHTML(title);

  return `
    <article class="card blog-card">
      <p class="blog-date">${escapeHTML(date)}</p>
      <h3 class="card-title">${titleMarkup}</h3>
      <p class="blog-excerpt">${escapeHTML(excerpt)}</p>
    </article>
  `;
}
