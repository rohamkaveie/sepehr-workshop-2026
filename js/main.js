// js/main.js
document.addEventListener("DOMContentLoaded", async () => {
  const componentPlaceholders = document.querySelectorAll("[data-component]");

  for (const el of componentPlaceholders) {
    const componentName = el.getAttribute("data-component");
    try {
      const response = await fetch(`./components/${componentName}.html`);
      if (response.ok) {
        el.outerHTML = await response.text();
      } else {
        console.error(`خطا در بارگذاری کامپوننت: ${componentName}`);
      }
    } catch (error) {
      console.error(`عدم دسترسی به کامپوننت ${componentName}:`, error);
    }
  }
});
