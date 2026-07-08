function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = String(str ?? "");
  return div.innerHTML;
}

function formatMonthYear(value) {
  if (!value || value === "Present") return "Present";
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

function renderExperienceItem(item) {
  const highlights = (item.highlights || [])
    .map((h) => `<li>${escapeHTML(h)}</li>`)
    .join("");
  return `
    <li class="timeline-item">
      <span class="timeline-marker" aria-hidden="true"></span>
      <span class="timeline-date">${escapeHTML(formatMonthYear(item.startDate))} — ${escapeHTML(formatMonthYear(item.endDate))}</span>
      <h3 class="timeline-role">${escapeHTML(item.role)}</h3>
      <p class="timeline-company">${escapeHTML(item.company)}</p>
      <ul class="timeline-highlights">${highlights}</ul>
    </li>
  `;
}

async function renderExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;
  try {
    const items = await fetchJSON("data/experience.json");
    container.innerHTML = items.map(renderExperienceItem).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load experience data.</p>`;
    console.error(err);
  }
}

function renderSkillGroup(title, tags) {
  const items = tags.map((t) => `<li class="skill-tag">${escapeHTML(t)}</li>`).join("");
  return `
    <div class="skills-group">
      <h3 class="skills-group-title">${escapeHTML(title)}</h3>
      <ul class="skill-tags">${items}</ul>
    </div>
  `;
}

async function renderSkills() {
  const container = document.getElementById("skills-groups");
  if (!container) return;
  try {
    const data = await fetchJSON("data/skills.json");
    container.innerHTML =
      renderSkillGroup("Technical Skills", data.technical || []) +
      renderSkillGroup("Leadership Skills", data.leadership || []);
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load skills data.</p>`;
    console.error(err);
  }
}

function renderProjectCard(project) {
  const tags = (project.tags || []).map((t) => `<li>${escapeHTML(t)}</li>`).join("");
  const links = [];
  if (project.demoUrl) {
    links.push(`<a class="btn btn-secondary" href="${escapeHTML(project.demoUrl)}" target="_blank" rel="noopener">Live Demo</a>`);
  }
  if (project.repoUrl) {
    links.push(`<a class="btn btn-secondary" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener">Repository</a>`);
  }
  return `
    <article class="card project-card">
      <img class="project-image" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" loading="lazy" />
      <div class="project-body">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.description)}</p>
        <ul class="project-tags">${tags}</ul>
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      </div>
    </article>
  `;
}

async function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;
  try {
    const items = await fetchJSON("data/projects.json");
    container.innerHTML = items.map(renderProjectCard).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load project data.</p>`;
    console.error(err);
  }
}

function renderCertificationCard(cert) {
  return `
    <article class="card cert-card">
      <img class="cert-badge" src="${escapeHTML(cert.icon)}" alt="" aria-hidden="true" />
      <div class="cert-details">
        <h3>${escapeHTML(cert.name)}</h3>
        <p class="cert-issuer">${escapeHTML(cert.issuer)}</p>
        <p class="cert-date">${escapeHTML(cert.date)}</p>
      </div>
    </article>
  `;
}

async function renderCertifications() {
  const container = document.getElementById("certifications-grid");
  if (!container) return;
  try {
    const items = await fetchJSON("data/certifications.json");
    container.innerHTML = items.map(renderCertificationCard).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load certification data.</p>`;
    console.error(err);
  }
}

function renderEducationItem(item) {
  return `
    <li class="timeline-item">
      <span class="timeline-marker" aria-hidden="true"></span>
      <span class="timeline-date">${escapeHTML(item.startDate)} — ${escapeHTML(item.endDate)}</span>
      <h3 class="timeline-role">${escapeHTML(item.degree)}</h3>
      <p class="timeline-company">${escapeHTML(item.institution)}</p>
    </li>
  `;
}

async function renderEducation() {
  const container = document.getElementById("education-timeline");
  if (!container) return;
  try {
    const items = await fetchJSON("data/education.json");
    container.innerHTML = items.map(renderEducationItem).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load education data.</p>`;
    console.error(err);
  }
}

function renderAchievementCard(item) {
  return `
    <article class="card achievement-card">
      <span class="achievement-date">${escapeHTML(item.date)}</span>
      <h3 class="achievement-title">${escapeHTML(item.title)}</h3>
      <p class="achievement-description">${escapeHTML(item.description)}</p>
    </article>
  `;
}

async function renderAchievements() {
  const container = document.getElementById("achievements-grid");
  if (!container) return;
  try {
    const items = await fetchJSON("data/achievements.json");
    container.innerHTML = items.map(renderAchievementCard).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load achievements data.</p>`;
    console.error(err);
  }
}

function renderBlogCard(post) {
  return `
    <article class="card blog-card">
      <span class="blog-date">${escapeHTML(post.date)}</span>
      <h3 class="blog-title">${escapeHTML(post.title)}</h3>
      <p class="blog-excerpt">${escapeHTML(post.excerpt)}</p>
      <a class="blog-link" href="${escapeHTML(post.url)}" target="_blank" rel="noopener">Read more &rarr;</a>
    </article>
  `;
}

async function renderBlog() {
  const container = document.getElementById("blog-grid");
  if (!container) return;
  try {
    const items = await fetchJSON("data/blog.json");
    container.innerHTML = items.map(renderBlogCard).join("");
  } catch (err) {
    container.innerHTML = `<p class="fetch-error">Unable to load blog data.</p>`;
    console.error(err);
  }
}

export function renderCards() {
  renderExperience();
  renderSkills();
  renderProjects();
  renderCertifications();
  renderEducation();
  renderAchievements();
  renderBlog();
}
