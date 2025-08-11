document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("planModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalList = document.getElementById("modalList");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalBottomCloseBtn = document.getElementById("modalBottomCloseBtn");

  document.querySelectorAll(".plan-card").forEach((planCard) => {
    const items = planCard.querySelectorAll(".plan-body ul li");
    items.forEach((li, index) => {
      if (index >= 5) {
        li.style.display = "none";
      }
    });
  });

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const planCard = e.target.closest(".plan-card");
      const planTitle = planCard.querySelector(".plan-header h2").textContent;
      const allItems = planCard.querySelectorAll(".plan-body ul li");

      modalTitle.textContent = planTitle;
      modalList.innerHTML = "";

      allItems.forEach((li) => {
        const clone = li.cloneNode(true);
        clone.style.display = "list-item";
        modalList.appendChild(clone);
      });

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  modalCloseBtn.addEventListener("click", closeModal);

  modalBottomCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
