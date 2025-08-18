import { showToast } from "../scripts/toast.js";

function applyTheme(theme?: string) {
  if (theme) {
    localStorage.setItem("theme", theme);
  }
  theme = theme || localStorage.getItem("theme") || "light";
  if (
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  let newTheme;
  switch (currentTheme) {
    case "light":
      applyTheme("dark");
      newTheme = "dark";
      break;
    case "dark":
      applyTheme("system");
      newTheme = "system";
      break;
    case "system":
    default:
      applyTheme("light");
      newTheme = "light";
      break;
  }
  showToast(newTheme);
}

function setupTheme() {
  applyTheme();
  const themeToggle = document.querySelector(".btn-theme-toggle");
  themeToggle?.addEventListener("click", toggleTheme);
  themeToggle?.addEventListener("keydown", (event: Event) => {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === "Enter" || keyEvent.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  });
  window
    .matchMedia("(prefers-color-scheme: dark)")
    ?.addEventListener("change", () => {
      if (!localStorage.getItem("theme")) {
        applyTheme();
      }
    });
}
setupTheme();
