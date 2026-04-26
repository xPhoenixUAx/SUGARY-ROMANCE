(function () {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-mobile-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  const searchButtons = document.querySelectorAll(".search-action");
  const form = document.querySelector("[data-contact-form]");
  const faqCards = document.querySelectorAll(".faq-card");
  const testimonial = document.querySelector("[data-testimonials]");

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

  const serviceLinks = [
    ["service-strategy.html", "Marketing Strategy", "Plan campaigns, channels, and launch priorities."],
    ["service-design.html", "Web Design", "Shape clear pages, flows, and conversion-focused interfaces."],
    ["service-development.html", "Website Development", "Build fast, maintainable websites and web systems."],
    ["service-detail.html", "Full-Cycle Partner", "Strategy, design, development, launch, and support together."],
  ];

  const searchIndex = [
    {
      title: "Home",
      url: "index.html",
      type: "Page",
      text: "Full-cycle digital partner for marketing strategy, web design, website development, landing pages, launch support, maintenance, process, FAQ, and project inquiry.",
    },
    {
      title: "Services",
      url: "services.html",
      type: "Page",
      text: "Service overview, strategy, web design, website development, full-cycle offer, pricing plan, monthly scope, and project process.",
    },
    {
      title: "Marketing Strategy",
      url: "service-strategy.html",
      type: "Service",
      text: "Marketing strategy, campaign systems, paid ads, audience, positioning, offer clarity, tracking plan, reporting, and campaign launch priorities.",
    },
    {
      title: "Web Design & Landing Pages",
      url: "service-design.html",
      type: "Service",
      text: "Web design, landing pages, page architecture, UX, conversion-focused sections, responsive layouts, content hierarchy, and campaign-ready pages.",
    },
    {
      title: "Development & Support",
      url: "service-development.html",
      type: "Service",
      text: "Website development, frontend development, backend essentials, forms, integrations, launch QA, maintenance, support, and post-launch improvements.",
    },
    {
      title: "Full-Cycle Digital Partner",
      url: "service-detail.html",
      type: "Service",
      text: "Complete digital partner for strategy, design, development, launch, analytics, ongoing support, and managed delivery.",
    },
    {
      title: "About",
      url: "about.html",
      type: "Page",
      text: "About Sugary Romance Media, studio structure, specialist network, working principles, delivery model, testimonials, and company address.",
    },
    {
      title: "Contact",
      url: "contact.html",
      type: "Page",
      text: "Contact form, project inquiry, service interest, budget range, project timeline, email support, and what happens after submission.",
    },
    {
      title: "Privacy Policy",
      url: "privacy.html",
      type: "Legal",
      text: "Privacy policy, personal data, contact form data, GDPR, data retention, user rights, cookies, analytics, and data processing.",
    },
    {
      title: "Terms of Service",
      url: "terms.html",
      type: "Legal",
      text: "Terms of service, service inquiries, proposals, project scope, fees, intellectual property, confidentiality, liability, and Czech law.",
    },
    {
      title: "Cookie Policy",
      url: "cookie.html",
      type: "Legal",
      text: "Cookie policy, essential cookies, analytics cookies, marketing cookies, Google Analytics, Google Ads, Meta Pixel, consent, and preferences.",
    },
  ];

  function isServicePath(path) {
    return path === "services.html" || serviceLinks.some(([href]) => href === path);
  }

  function ensureServicesDropdown() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".desktop-nav").forEach((nav) => {
      if (nav.querySelector(".nav-dropdown")) return;

      const servicesLink = Array.from(nav.querySelectorAll('a[href="services.html"]'))[0];
      if (!servicesLink) return;

      const dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";

      const trigger = servicesLink.cloneNode(true);
      trigger.className = "nav-dropdown-trigger";
      if (isServicePath(currentPath)) {
        trigger.setAttribute("aria-current", "page");
      }

      const panel = document.createElement("div");
      panel.className = "nav-dropdown-panel";

      serviceLinks.forEach(([href, title, description]) => {
        const item = document.createElement("a");
        item.className = "nav-dropdown-item";
        item.href = href;
        if (href === currentPath) item.setAttribute("aria-current", "page");

        const itemTitle = document.createElement("span");
        itemTitle.textContent = title;

        const itemDescription = document.createElement("small");
        itemDescription.textContent = description;

        item.append(itemTitle, itemDescription);
        panel.appendChild(item);
      });

      const overview = document.createElement("a");
      overview.className = "nav-dropdown-overview";
      overview.href = "services.html";
      overview.textContent = "View all services";
      panel.appendChild(overview);

      dropdown.append(trigger, panel);
      servicesLink.replaceWith(dropdown);
    });
  }

  function ensureMobileNavigation() {
    if (!menu || menu.querySelector(".mobile-nav")) return;

    const top = menu.querySelector(".mobile-menu-top");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = [
      ["index.html", "Home"],
      ["services.html", "Services"],
      ["about.html", "About"],
      ["contact.html", "Contact"],
    ];

    const nav = document.createElement("nav");
    nav.className = "mobile-nav";
    nav.setAttribute("aria-label", "Mobile navigation");

    links.forEach(([href, label]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (href === currentPath || (href === "services.html" && isServicePath(currentPath))) {
        link.setAttribute("aria-current", "page");
      }
      nav.appendChild(link);

      if (href === "services.html") {
        const serviceList = document.createElement("div");
        serviceList.className = "mobile-service-list";

        serviceLinks.forEach(([serviceHref, title]) => {
          const serviceLink = document.createElement("a");
          serviceLink.href = serviceHref;
          serviceLink.textContent = title;
          if (serviceHref === currentPath) serviceLink.setAttribute("aria-current", "page");
          serviceList.appendChild(serviceLink);
        });

        nav.appendChild(serviceList);
      }
    });

    const cta = document.createElement("a");
    cta.className = "btn btn-primary mobile-nav-cta";
    cta.href = "contact.html";
    cta.textContent = "Start a Project";
    nav.appendChild(cta);

    const note = document.createElement("p");
    note.className = "mobile-nav-support";
    note.textContent = "Plan your next digital project with strategy, design, development, and launch support in one place.";
    nav.appendChild(note);

    top ? top.insertAdjacentElement("afterend", nav) : menu.prepend(nav);
  }

  function getSearchResults(query) {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean);

    if (terms.length === 0) return searchIndex.slice(0, 6);

    return searchIndex
      .map((item) => {
        const title = item.title.toLowerCase();
        const text = item.text.toLowerCase();
        const score = terms.reduce((total, term) => {
          if (title.includes(term)) return total + 4;
          if (text.includes(term)) return total + 1;
          return total;
        }, 0);

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);
  }

  function ensureSiteSearch() {
    if (document.querySelector("[data-site-search]")) return;

    const overlay = document.createElement("div");
    overlay.className = "site-search";
    overlay.setAttribute("data-site-search", "");
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="site-search-panel" role="dialog" aria-modal="true" aria-labelledby="site-search-title">
        <button class="site-search-close" type="button" aria-label="Close search" data-search-close>
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
        <p class="eyebrow">Site search</p>
        <h2 id="site-search-title">Search Sugary Romance Media</h2>
        <label class="site-search-field">
          <span class="sr-only">Search the website</span>
          <i data-lucide="search" aria-hidden="true"></i>
          <input type="search" placeholder="Search services, pricing, contact, policies..." autocomplete="off" data-search-input>
        </label>
        <p class="site-search-help" data-search-help>Try “web design”, “pricing”, “contact form”, “cookies”, or “development support”.</p>
        <div class="site-search-results" data-search-results></div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector("[data-search-input]");
    const close = overlay.querySelector("[data-search-close]");
    const results = overlay.querySelector("[data-search-results]");
    const help = overlay.querySelector("[data-search-help]");

    function renderResults() {
      const query = input.value.trim();
      const matches = getSearchResults(query);

      help.textContent = query
        ? `${matches.length} result${matches.length === 1 ? "" : "s"} for "${query}".`
        : "Try “web design”, “pricing”, “contact form”, “cookies”, or “development support”.";

      if (matches.length === 0) {
        results.innerHTML = '<p class="site-search-empty">No results found. Try a broader service or project term.</p>';
        return;
      }

      results.innerHTML = matches
        .map((item) => `
          <a class="site-search-result" href="${item.url}">
            <span>${item.type}</span>
            <strong>${item.title}</strong>
            <small>${item.text}</small>
          </a>
        `)
        .join("");
    }

    function openSearch(event) {
      event && event.preventDefault();
      closeMenu();
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      body.classList.add("search-open");
      renderResults();
      window.setTimeout(() => input.focus(), 40);
    }

    function closeSearch() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      body.classList.remove("search-open");
    }

    searchButtons.forEach((button) => {
      button.setAttribute("aria-label", "Search the website");
      button.addEventListener("click", openSearch);
    });

    input.addEventListener("input", renderResults);
    close.addEventListener("click", closeSearch);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeSearch();
    });

    results.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeSearch();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeSearch();
    });

    renderResults();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function ensureCookieBanner() {
    const storageKey = "srm_cookie_consent";
    let savedConsent = null;

    try {
      savedConsent = window.localStorage.getItem(storageKey);
    } catch (error) {
      savedConsent = null;
    }

    if (savedConsent || document.querySelector("[data-cookie-banner]")) return;

    const banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("data-cookie-banner", "");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <div class="cookie-banner-copy">
        <p class="cookie-banner-title">Cookie preferences</p>
        <p>We use essential cookies for website functionality. Optional analytics and marketing cookies help us improve performance and campaign measurement.</p>
        <a href="cookie.html">Read the Cookie Policy</a>
      </div>
      <div class="cookie-banner-actions">
        <button class="btn btn-secondary" type="button" data-cookie-manage aria-expanded="false">Manage</button>
        <button class="btn btn-secondary" type="button" data-cookie-reject>Reject non-essential</button>
        <button class="btn btn-primary" type="button" data-cookie-accept>Accept all</button>
      </div>
      <div class="cookie-preferences" data-cookie-preferences hidden>
        <div class="cookie-preferences-head">
          <div>
            <strong>Manage cookies</strong>
            <p>Choose which optional cookies Sugary Romance Media may use.</p>
          </div>
          <button type="button" aria-label="Close cookie preferences" data-cookie-close-options>
            <i data-lucide="x" aria-hidden="true"></i>
          </button>
        </div>
        <label class="cookie-option">
          <input type="checkbox" checked disabled>
          <span><strong>Essential</strong><small>Required</small></span>
        </label>
        <label class="cookie-option">
          <input type="checkbox" data-cookie-analytics>
          <span><strong>Analytics</strong><small>Usage insights</small></span>
        </label>
        <label class="cookie-option">
          <input type="checkbox" data-cookie-marketing>
          <span><strong>Marketing</strong><small>Ad measurement</small></span>
        </label>
        <button class="btn btn-primary cookie-save" type="button" data-cookie-save>Save preferences</button>
      </div>
    `;

    document.body.appendChild(banner);

    const preferences = banner.querySelector("[data-cookie-preferences]");
    const analytics = banner.querySelector("[data-cookie-analytics]");
    const marketing = banner.querySelector("[data-cookie-marketing]");
    const save = banner.querySelector("[data-cookie-save]");
    const manage = banner.querySelector("[data-cookie-manage]");
    const closeOptions = banner.querySelector("[data-cookie-close-options]");

    function storeConsent(consent) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify({
          ...consent,
          essential: true,
          savedAt: new Date().toISOString(),
        }));
      } catch (error) {
        // If storage is unavailable, still hide the banner for the current page view.
      }

      banner.classList.add("is-hiding");
      window.setTimeout(() => banner.remove(), 180);
    }

    manage.addEventListener("click", () => {
      const isHidden = preferences.hasAttribute("hidden");
      preferences.toggleAttribute("hidden", !isHidden);
      manage.textContent = isHidden ? "Hide options" : "Manage";
      manage.setAttribute("aria-expanded", String(isHidden));
    });

    closeOptions.addEventListener("click", () => {
      preferences.setAttribute("hidden", "");
      manage.textContent = "Manage";
      manage.setAttribute("aria-expanded", "false");
      manage.focus();
    });

    banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      storeConsent({ analytics: true, marketing: true });
    });

    banner.querySelector("[data-cookie-reject]").addEventListener("click", () => {
      storeConsent({ analytics: false, marketing: false });
    });

    save.addEventListener("click", () => {
      storeConsent({
        analytics: analytics.checked,
        marketing: marketing.checked,
      });
    });
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
  ensureServicesDropdown();
  ensureMobileNavigation();
  ensureSiteSearch();
  ensureCookieBanner();

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

  if (testimonial) {
    const slides = Array.from(testimonial.querySelectorAll("[data-testimonial-slide]"));
    const dots = Array.from(testimonial.querySelectorAll("[data-testimonial-dot]"));
    const previous = testimonial.querySelector("[data-testimonial-prev]");
    const next = testimonial.querySelector("[data-testimonial-next]");
    let activeIndex = 0;
    let timer = null;

    function showTestimonial(index) {
      if (slides.length === 0) return;
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
      });
    }

    function stopTestimonialTimer() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function startTestimonialTimer() {
      stopTestimonialTimer();
      timer = window.setInterval(() => {
        showTestimonial(activeIndex + 1);
      }, 4500);
    }

    previous && previous.addEventListener("click", () => {
      showTestimonial(activeIndex - 1);
      startTestimonialTimer();
    });

    next && next.addEventListener("click", () => {
      showTestimonial(activeIndex + 1);
      startTestimonialTimer();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        showTestimonial(dotIndex);
        startTestimonialTimer();
      });
    });

    testimonial.addEventListener("mouseenter", stopTestimonialTimer);
    testimonial.addEventListener("mouseleave", startTestimonialTimer);
    testimonial.addEventListener("focusin", stopTestimonialTimer);
    testimonial.addEventListener("focusout", startTestimonialTimer);
    showTestimonial(0);
    startTestimonialTimer();
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
