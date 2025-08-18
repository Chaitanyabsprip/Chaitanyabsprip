export function showToast(message: string) {
  let toast = document.getElementById("theme-toast");
  if (toast) toast.remove();

  // Create the toast container
  toast = document.createElement("div");
  toast.id = "theme-toast";
  toast.className =
    "fixed right-[50%] sm:right-[5%] translate-x-1/2 bottom-5 z-[1000] px-5 py-2 rounded-4xl \
    bg-surface-800 text-white dark:bg-surface-200 dark:text-gray-900 shadow-lg \
    transition-opacity duration-400 opacity-0";

  // Add accessibility attributes
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.setAttribute("aria-atomic", "true");

  // For screen readers, add more descriptive text
  let screenReaderMessage = "";
  if (message === "light" || message === "dark" || message === "system") {
    screenReaderMessage = `Theme changed to ${message} mode`;
  } else {
    screenReaderMessage = message;
  }

  // Create a visually hidden element for screen readers
  const srOnly = document.createElement("span");
  srOnly.className = "sr-only";
  srOnly.textContent = screenReaderMessage;

  // Create visible text element
  const visibleText = document.createElement("span");
  visibleText.textContent = message;

  // Append both to the toast
  toast.appendChild(srOnly);
  toast.appendChild(visibleText);

  const toastRoot = document.getElementById("toast-root");
  if (toastRoot) toastRoot.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
