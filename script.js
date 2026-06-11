document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (menuButton && siteNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "Close" : "Menu";
        });

        siteNav.addEventListener("click", (event) => {
            if (event.target.matches("a")) {
                siteNav.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "Menu";
            }
        });
    }

    const year = document.querySelector("[data-current-year]");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const campaignPrinciples = [
        {
            name: "Campaign principle 01 · Accountability",
            text: "Road capacity is public infrastructure. Removing it should require the same scrutiny as building it."
        },
        {
            name: "Campaign principle 02 · Reliability",
            text: "Residents should be able to reach work, school, shops, and medical care without unpredictable delays."
        },
        {
            name: "Campaign principle 03 · Transparency",
            text: "Every lane conversion should publish its expected effect on traffic, access, safety, and maintenance."
        },
        {
            name: "Campaign principle 04 · Fair investment",
            text: "Transportation funding should follow measurable demand and deliver benefits residents can clearly see."
        },
        {
            name: "Campaign principle 05 · Public voice",
            text: "Drivers and local businesses deserve a meaningful role before permanent street changes are approved."
        }
    ];

    const quote = document.querySelector("[data-quote]");
    const person = document.querySelector("[data-quote-person]");
    const previous = document.querySelector("[data-quote-previous]");
    const next = document.querySelector("[data-quote-next]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let quoteIndex = 0;
    let quoteTimer;

    const updateQuote = (direction = 1) => {
        if (!quote || !person) return;
        quoteIndex = (quoteIndex + direction + campaignPrinciples.length) % campaignPrinciples.length;
        quote.classList.add("is-changing");
        window.setTimeout(() => {
            quote.textContent = campaignPrinciples[quoteIndex].text;
            person.textContent = campaignPrinciples[quoteIndex].name;
            quote.classList.remove("is-changing");
        }, 180);
    };

    const startQuoteTimer = () => {
        window.clearInterval(quoteTimer);
        if (reducedMotion) return;
        quoteTimer = window.setInterval(() => updateQuote(1), 7000);
    };

    if (quote && person) {
        previous?.addEventListener("click", () => {
            updateQuote(-1);
            startQuoteTimer();
        });
        next?.addEventListener("click", () => {
            updateQuote(1);
            startQuoteTimer();
        });
        startQuoteTimer();
    }

    let hasSigned = localStorage.getItem("hasSigned") === "true";
    const signButton = document.querySelector("[data-sign-button]");

    const renderPetition = () => {
        if (signButton && hasSigned) {
            signButton.disabled = true;
            signButton.textContent = "Support pledged";
        }
    };

    if (signButton) {
        signButton.addEventListener("click", () => {
            if (hasSigned) return;
            hasSigned = true;
            localStorage.setItem("hasSigned", "true");
            renderPetition();
        });
    }

    renderPetition();
});
