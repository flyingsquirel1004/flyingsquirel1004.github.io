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

    const testimonials = [
        {
            name: "Michael Stevenson · Definitely a real corridor expert",
            text: "If one more lane does not solve congestion, the responsible response is obviously one more lane after that."
        },
        {
            name: "Linda Carter · Drive-through urbanist",
            text: "A lane carrying fifty people on one bus could instead carry at least twelve very comfortable SUVs."
        },
        {
            name: "Brian Mitchell · Asphalt futures analyst",
            text: "The county has tried almost everything except turning the entire county into a county-sized interchange."
        },
        {
            name: "Jessica Thompson · Concerned motorist",
            text: "Every protected bike lane is a beautiful traffic lane being denied the opportunity to reach its full potential."
        },
        {
            name: "Noah Martin · Lifetime commuter",
            text: "I have spent years studying congestion through my windshield, often for two hours at a time."
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
        quoteIndex = (quoteIndex + direction + testimonials.length) % testimonials.length;
        quote.classList.add("is-changing");
        window.setTimeout(() => {
            quote.textContent = testimonials[quoteIndex].text;
            person.textContent = testimonials[quoteIndex].name;
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

    const initialCount = 3423;
    const storedCount = Number.parseInt(localStorage.getItem("signatureCount"), 10);
    let signatureCount = Number.isFinite(storedCount) ? storedCount : initialCount;
    let hasSigned = localStorage.getItem("hasSigned") === "true";
    const signatureElement = document.querySelector("[data-signature-count]");
    const progressElement = document.querySelector("[data-signature-progress]");
    const signButton = document.querySelector("[data-sign-button]");

    const renderPetition = () => {
        if (signatureElement) {
            signatureElement.textContent = signatureCount.toLocaleString();
        }
        if (progressElement) {
            progressElement.style.width = `${Math.min((signatureCount / 10000) * 100, 100)}%`;
        }
        if (signButton && hasSigned) {
            signButton.disabled = true;
            signButton.textContent = "Signature ceremonially recorded";
        }
    };

    if (signButton) {
        signButton.addEventListener("click", () => {
            if (hasSigned) return;
            signatureCount += 1;
            hasSigned = true;
            localStorage.setItem("signatureCount", String(signatureCount));
            localStorage.setItem("hasSigned", "true");
            renderPetition();
        });
    }

    renderPetition();
});
