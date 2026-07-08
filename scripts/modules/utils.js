// Shared utility functions, kept separate from DOM-manipulation modules.

export async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => escapeMap[char]);
}

export function formatMonthYear(value) {
  if (!value || value.toLowerCase() === "present") return "Present";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
