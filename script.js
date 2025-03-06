document.addEventListener("DOMContentLoaded", function () {
    let minCount = 2234;
    let maxCount = 3425;
    let count = parseInt(localStorage.getItem("signatureCount")) || Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const signatureCountElement = document.getElementById("signatureCount");
    const signButton = document.getElementById("signButton");

    signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;

    signButton.addEventListener("click", function () {
        if (count < 10000) {
            count++;
            localStorage.setItem("signatureCount", count);
            signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;
            alert("Thanks for signing! One more lane coming right up!");
        } else {
            alert("We've reached our goal! But... maybe just one more lane?");
        }
    });

    // Testimonial Rotator
    const testimonials = [
        { name: "Michael Stevenson", text: "If we just add ONE MORE LANE, I guarantee traffic will disappear overnight. Trust me, bro." },
        { name: "Linda Carter", text: "I need to drive 0.3 miles to pick up a latte. The bike lanes are in my way. Pave over them now!" },
        { name: "Brian Mitchell", text: "Adding roads never increases traffic, bro. That’s just a myth. More lanes = more freedom!" },
        { name: "Jessica Thompson", text: "Public transit? No thanks! I want to sit in my car for 2 hours a day like a normal person." },
        { name: "Robert Jenkins", text: "I don’t see traffic. I see opportunity! More lanes = more places for my lifted truck to roll coal!" },
        { name: "Emily Wilson", text: "Who cares about climate change? We need MORE asphalt! Just pave over the parks already!" }
    ];

    let currentTestimonial = 0;
    const testimonialName = document.getElementById("testimonialName");
    const testimonialText = document.getElementById("testimonialText");
    const prevButton = document.getElementById("prevTestimonial");
    const nextButton = document.getElementById("nextTestimonial");

    function updateTestimonial(index) {
        testimonialName.classList.add("fade-out");
        testimonialText.classList.add("fade-out");

        setTimeout(() => {
            testimonialName.textContent = testimonials[index].name;
            testimonialText.textContent = testimonials[index].text;

            testimonialName.classList.remove("fade-out");
            testimonialText.classList.remove("fade-out");
        }, 500);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }

    nextButton.addEventListener("click", nextTestimonial);
    prevButton.addEventListener("click", prevTestimonial);
    setInterval(nextTestimonial, 5000); // Auto-cycle every 5 seconds
});
