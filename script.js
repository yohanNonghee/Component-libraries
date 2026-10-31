    const iconMarkup = (name) => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
    const setPressed = (buttons, activeButton) => {
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button === activeButton)));
    };

    let toastTimer;
    const showToast = (message) => {
      const toast = document.getElementById("toast");
      document.getElementById("toast-message").textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
    };

    const buttonPreview = document.getElementById("button-preview");
    const buttonVariants = [...document.querySelectorAll("[data-button-variant]")];
    const buttonLabels = {
      primary: "Discover models",
      secondary: "Discover models",
      outline: "Discover models",
      disabled: "Unavailable"
    };
    buttonVariants.forEach((button) => {
      button.addEventListener("click", () => {
        const variant = button.dataset.buttonVariant;
        setPressed(buttonVariants, button);
        buttonPreview.className = `preview-button preview-button--${variant}`;
        buttonPreview.disabled = variant === "disabled";
        buttonPreview.innerHTML = `${buttonLabels[variant]} ${variant === "disabled" ? "" : iconMarkup("arrow")}`;
        document.getElementById("button-code").textContent = variant === "disabled"
          ? '<button class="button" disabled>Unavailable</button>'
          : `<button class="button button--${variant}">${buttonLabels[variant]}</button>`;
      });
    });

    const iconChoices = [...document.querySelectorAll("[data-icon]")];
    iconChoices.forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.icon;
        setPressed(iconChoices, button);
        document.getElementById("icon-preview").innerHTML = iconMarkup(name);
        document.getElementById("icon-name").textContent = `${name} · 24px`;
        document.getElementById("icon-code").textContent = `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
      });
    });

    const pictureData = {
      hero: {
        src: "https://yohannonghee.github.io/Yohan/img/PCGB25_0177_fine-1920x960.jpg",
        alt: "Porsche sports car on a scenic road"
      },
      gt3: {
        src: "https://yohannonghee.github.io/Yohan/img/Porsche%20911%20GT3%20RS.jpg",
        alt: "Porsche 911 GT3 RS"
      },
      taycan: {
        src: "https://yohannonghee.github.io/Yohan/img/Porsche%20Taycan%20Turbo%20S..jpg",
        alt: "Porsche Taycan Turbo S"
      }
    };
    const pictureImage = document.getElementById("picture-image");
    const pictureCaption = document.getElementById("picture-caption");
    const pictureCode = document.getElementById("picture-code");
    document.querySelectorAll("[data-picture-variant]").forEach((button) => {
      button.addEventListener("click", () => {
        const showCaption = button.dataset.pictureVariant === "caption";
        setPressed([...document.querySelectorAll("[data-picture-variant]")], button);
        pictureCaption.hidden = !showCaption;
        pictureCode.textContent = showCaption
          ? '<figure class="picture picture--caption">...<figcaption>...</figcaption></figure>'
          : '<figure class="picture"><img src="..." alt="..."></figure>';
      });
    });
    document.querySelectorAll("[data-picture]").forEach((button) => {
      button.addEventListener("click", () => {
        const picture = pictureData[button.dataset.picture];
        setPressed([...document.querySelectorAll("[data-picture]")], button);
        pictureImage.src = picture.src;
        pictureImage.alt = picture.alt;
      });
    });

    const cardPreview = document.getElementById("card-preview");
    const cardCode = document.getElementById("card-code");
    document.querySelectorAll("[data-card-variant]").forEach((button) => {
      button.addEventListener("click", () => {
        const variant = button.dataset.cardVariant;
        setPressed([...document.querySelectorAll("[data-card-variant]")], button);
        cardPreview.dataset.variant = variant;
        cardCode.textContent = `<article class="card card--${variant}">...</article>`;
      });
    });

    const alertVariants = {
      info: {
        title: "Information",
        message: "Your configuration has been saved. You can continue exploring the component library.",
        icon: "info"
      },
      success: {
        title: "Changes saved",
        message: "Your preferences were updated successfully.",
        icon: "check"
      },
      warning: {
        title: "Limited availability",
        message: "This model is in high demand. Contact a dealer for current availability.",
        icon: "warning"
      },
      error: {
        title: "Something went wrong",
        message: "We could not load the requested information. Please try again.",
        icon: "error"
      }
    };
    const alertPreview = document.getElementById("alert-preview");
    const alertVariantsButtons = [...document.querySelectorAll("[data-alert-variant]")];
    alertVariantsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const variant = button.dataset.alertVariant;
        const content = alertVariants[variant];
        setPressed(alertVariantsButtons, button);
        alertPreview.className = `alert alert--${variant}`;
        alertPreview.querySelector(":scope > .icon").innerHTML = `<use href="#icon-${content.icon}"></use>`;
        document.getElementById("alert-title").textContent = content.title;
        document.getElementById("alert-message").textContent = content.message;
        updateStatusCode();
      });
    });

    const badgePreview = document.getElementById("badge-preview");
    const badgeLabels = {
      info: "In progress",
      success: "Available",
      warning: "Limited",
      error: "Unavailable"
    };
    const badgeVariantsButtons = [...document.querySelectorAll("[data-badge-variant]")];
    const updateStatusCode = () => {
      const alertVariant = alertPreview.className.match(/alert--(info|success|warning|error)/)?.[1] || "info";
      const badgeVariant = badgePreview.className.match(/badge--(info|success|warning|error)/)?.[1] || "info";
      document.getElementById("status-code").textContent =
        `<div class="alert alert--${alertVariant}" role="status">...</div> <span class="badge badge--${badgeVariant}">${badgeLabels[badgeVariant]}</span>`;
    };
    badgeVariantsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const variant = button.dataset.badgeVariant;
        setPressed(badgeVariantsButtons, button);
        badgePreview.className = variant === "info" ? "badge" : `badge badge--${variant}`;
        badgePreview.textContent = badgeLabels[variant];
        updateStatusCode();
      });
    });

    document.querySelectorAll("[data-copy]").forEach((button) => {
      button.addEventListener("click", async () => {
        const target = document.getElementById(button.dataset.copy);
        if (!target) {
          showToast("Code snippet was not found");
          return;
        }

        try {
          await navigator.clipboard.writeText(target.textContent);
          showToast("Code copied to clipboard");
        } catch (error) {
          showToast("Clipboard access is unavailable in this browser");
        }
      });
    });

    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll(".component-section")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${visible.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    }, { rootMargin: "-100px 0px -65% 0px", threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
