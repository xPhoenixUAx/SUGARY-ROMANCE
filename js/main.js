(function () {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-mobile-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  const form = document.querySelector("[data-contact-form]");
  const faqCards = document.querySelectorAll(".faq-card");

  if (window.lucide) {
    window.lucide.createIcons();
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function openMenu() {
    if (!menu || !openButton) return;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");
    closeButton && closeButton.focus();
  }

  function closeMenu() {
    if (!menu || !openButton) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  function clearErrors(currentForm) {
    currentForm.querySelectorAll(".form-error").forEach((field) => {
      field.classList.remove("form-error");
    });
  }

  function setStatus(message, isError) {
    const status = form && form.querySelector("[data-form-status]");
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? "var(--color-error)" : "var(--color-muted)";
  }

  function validateForm(event) {
    if (!form) return;
    clearErrors(form);

    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    const honeypot = form.querySelector('input[name="website"]');
    const email = form.querySelector('input[type="email"]');
    const invalidFields = [];

    if (honeypot && honeypot.value.trim() !== "") {
      event.preventDefault();
      setStatus("Your message could not be sent. Please try again.", true);
      return;
    }

    requiredFields.forEach((field) => {
      const isCheckbox = field.type === "checkbox";
      const isEmpty = isCheckbox ? !field.checked : field.value.trim() === "";
      if (isEmpty) invalidFields.push(field);
    });

    if (email && email.value.trim() !== "" && !email.validity.valid) {
      invalidFields.push(email);
    }

    if (invalidFields.length > 0) {
      event.preventDefault();
      invalidFields.forEach((field) => field.classList.add("form-error"));
      invalidFields[0].focus();
      setStatus("Please complete the required fields before sending.", true);
      return;
    }

    setStatus("Sending your inquiry...", false);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  openButton && openButton.addEventListener("click", openMenu);
  closeButton && closeButton.addEventListener("click", closeMenu);

  if (menu) {
    menu.addEventListener("click", (event) => {
      if (event.target === menu) closeMenu();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (form) {
    form.addEventListener("submit", validateForm);
  }

  faqCards.forEach((card) => {
    const summary = card.querySelector("summary");
    const content = card.querySelector("p");
    if (!summary || !content) return;

    content.style.maxHeight = card.open ? `${content.scrollHeight}px` : "0px";

    summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (card.dataset.animating === "true") return;
      card.dataset.animating = "true";

      if (card.open) {
        content.style.maxHeight = `${content.scrollHeight}px`;
        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
          content.style.marginTop = "0";
          content.style.marginBottom = "0";
        });

        window.setTimeout(() => {
          card.open = false;
          card.dataset.animating = "false";
        }, 270);
      } else {
        card.open = true;
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        requestAnimationFrame(() => {
          content.style.maxHeight = `${content.scrollHeight}px`;
          content.style.opacity = "1";
          content.style.marginTop = "-4px";
          content.style.marginBottom = "24px";
        });

        window.setTimeout(() => {
          content.style.maxHeight = "none";
          card.dataset.animating = "false";
        }, 270);
      }
    });
  });
})();
