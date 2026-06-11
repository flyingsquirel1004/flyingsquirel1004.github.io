document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile navigation
    const menuButton = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (menuButton && siteNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "Close" : "Menu";
        });

        siteNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "Menu";
            });
        });
    }

    // Footer year
    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    // Scroll reveal
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    // Animated statistic counters.
    // <span data-counter="74" data-prefix="$" data-suffix="B" data-decimals="0">$74B</span>
    const counters = document.querySelectorAll("[data-counter]");

    const renderCounter = (node, value) => {
        const decimals = Number(node.dataset.decimals || 0);
        const prefix = node.dataset.prefix || "";
        const suffix = node.dataset.suffix || "";
        node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    };

    const animateCounter = (node) => {
        const target = Number(node.dataset.counter);

        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1100;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            renderCounter(node, target * eased);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    };

    if (counters.length > 0) {
        if ("IntersectionObserver" in window && !prefersReducedMotion) {
            const counterObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            counters.forEach((node) => counterObserver.observe(node));
        } else {
            counters.forEach((node) => renderCounter(node, Number(node.dataset.counter) || 0));
        }
    }

    // Pledge button (stored locally only — see privacy.html)
    const signButton = document.querySelector("[data-sign-button]");

    if (signButton) {
        const markSigned = () => {
            signButton.disabled = true;
            signButton.textContent = "Support pledged";
        };

        let hasSigned = false;

        try {
            hasSigned = window.localStorage.getItem("hasSigned") === "true";
        } catch (error) {
            hasSigned = false;
        }

        if (hasSigned) {
            markSigned();
        }

        signButton.addEventListener("click", () => {
            try {
                window.localStorage.setItem("hasSigned", "true");
            } catch (error) {
                // Storage unavailable (private mode) — still acknowledge the click.
            }

            markSigned();
        });
    }
});
