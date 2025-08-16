export function showToast(message: string) {
  let toast = document.getElementById("theme-toast");
  if (toast) toast.remove();

  toast = document.createElement("div");
  toast.id = "theme-toast";
  toast.className =
    "fixed right-[50%] sm:right-[5%] translate-x-1/2 bottom-5 z-[1000] px-5 py-2 rounded-4xl \
    bg-surface-800 text-white dark:bg-surface-200 dark:text-gray-900 shadow-lg \
    transition-opacity duration-400 opacity-0";
  toast.setAttribute("aria-live", "polite");
  toast.innerText = message;
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
