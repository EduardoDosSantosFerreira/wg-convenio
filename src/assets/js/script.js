const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isActive = button.classList.contains("active");

    faqButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.maxHeight = null;
    });

    if (!isActive) {
      button.classList.add("active");
      const content = button.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
