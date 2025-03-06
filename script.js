document.addEventListener("DOMContentLoaded", function () {
    let initialCount = 3423;
    let count = parseInt(localStorage.getItem("signatureCount")) || initialCount;
    let hasSigned = localStorage.getItem("hasSigned") === "true";

    const signatureCountElement = document.getElementById("signatureCount");
    const signButton = document.getElementById("signButton");

    signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;

    if (hasSigned) {
        signButton.disabled = true;
        signButton.textContent = "You've already signed!";
    }

    signButton.addEventListener("click", function () {
        if (!hasSigned) {
            count++;
            localStorage.setItem("signatureCount", count);
            localStorage.setItem("hasSigned", "true");

            signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;
            signButton.disabled = true;
            signButton.textContent = "You've already signed!";
            
            alert("Thank you for supporting road expansion in Montgomery County!");
        }
    });

    // Professional Testimonials
    const testimonials = [
        { name: "Michael Stevenson", text: "As a local business owner, I believe road improvements will make commuting more efficient and attract more customers." },
        { name: "Linda Carter", text: "Traffic congestion has been a growing issue. We need smart infrastructure solutions to keep up with our county’s growth." },
        { name: "Brian Mitchell", text: "Expanding our highways and arterial roads will benefit both residents and businesses by reducing commute times." },
        { name: "Jessica Thompson", text: "I support roadway expansion because it will help emergency responders reach their destinations faster." },
        { name: "Robert Jenkins", text: "Montgomery County is growing, and our infrastructure must grow with it. Road expansion is a necessary investment." },
        { name: "Emily Wilson", text: "More efficient road networks mean less time stuck in traffic and more time spent with family." },
        { name: "Steve Walker", text: "Strategic road expansion will allow for better traffic flow and long-term economic benefits." },
        { name: "Megan Brooks", text: "Improved roads mean safer travel conditions for all. It's time to invest in modern infrastructure." },
        { name: "Michael Stevenson", text: "If we just add ONE MORE LANE, I guarantee traffic will disappear overnight. Trust me, bro." },
        { name: "Linda Carter", text: "I need to drive 0.3 miles to pick up a latte. The bike lanes are in my way. Pave over them now!" },
        { name: "Brian Mitchell", text: "Adding roads never increases traffic, bro. That’s just a myth. More lanes = more freedom!" },
        { name: "Jessica Thompson", text: "Public transit? No thanks! I want to sit in my car for 2 hours a day like a normal person." },
        { name: "Robert Jenkins", text: "I don’t see traffic. I see opportunity! More lanes = more places for my lifted truck to roll coal!" },
        { name: "Emily Wilson", text: "Who cares about climate change? We need MORE asphalt! Just pave over the parks already!" },
        { name: "Steve Walker", text: "Every time I see a bus lane, I cry a little inside. That could’ve been a car lane, bro." },
        { name: "Megan Brooks", text: "I’d rather be stuck in traffic for 3 hours than walk for 5 minutes. Walking is for losers." },
        { name: "John Anderson", text: "Traffic is only bad because we haven’t built enough highways yet. We’ll get it right eventually!" },
        { name: "Ashley Robinson", text: "My SUV takes up 3 lanes and I deserve all of them. Pedestrians can go somewhere else!" },
        { name: "Kevin Parker", text: "Why waste money on trains when we can just make roads wider? Problem solved." },
        { name: "Sarah Turner", text: "I once saw a cyclist in my neighborhood. It was the worst day of my life." },
        { name: "Matthew Green", text: "They say induced demand is real. But have they TRIED adding more lanes? Didn’t think so!" },
        { name: "Laura Evans", text: "We should convert every sidewalk into a right-turn lane. Think about the efficiency!" },
        { name: "Derek Harris", text: "The traffic isn’t the problem. It’s the people who complain about traffic!" },
        { name: "Rachel Lewis", text: "I should be able to drive my 5-ton pickup truck anywhere. Even inside the grocery store." },
        { name: "Nathan Adams", text: "Nothing says freedom like 10 lanes of bumper-to-bumper gridlock!" },
        { name: "Olivia Scott", text: "Wider roads mean faster speeds. Faster speeds mean less time in traffic. It’s just science!" },
        { name: "Samuel Wright", text: "Every time they add a bike lane, an angel loses its wings." },
        { name: "Victoria King", text: "Walking is unnatural. The human body was meant to sit in a car seat." },
        { name: "Christopher White", text: "Public transit is just socialism with wheels." },
        { name: "Sophia Hall", text: "I drove 2 hours to a meeting about adding more roads. Worth it." },
        { name: "Daniel Moore", text: "There’s no such thing as ‘too many roads.’ That’s anti-car propaganda!" },
        { name: "Emma Allen", text: "We could have fewer accidents if we just removed all speed limits!" },
        { name: "David Hill", text: "If everyone just drove alone in their own car, traffic wouldn’t exist." },
        { name: "Ava Young", text: "I don’t want my tax dollars going to sidewalks. Let them walk in the grass!" },
        { name: "James Nelson", text: "Why do buses exist? Everyone should just get a car." },
        { name: "Isabella Carter", text: "Bike lanes take up valuable space where more SUVs could be idling!" },
        { name: "Benjamin Baker", text: "Sure, traffic is bad. But imagine how much worse it would be with fewer lanes!" },
        { name: "Charlotte Adams", text: "Traffic is a sign of a healthy economy. The more congestion, the better!" },
        { name: "Henry Rodriguez", text: "Sidewalks are a waste of space. They should be turned into drive-thrus." },
        { name: "Mia Torres", text: "Walking is dangerous. We should expand roads so people never have to do it." },
        { name: "Jack Lopez", text: "If we just removed speed bumps and stoplights, traffic would flow perfectly." },
        { name: "Lily Ramirez", text: "I’ve never been on a train, and I never will. I trust my car more than I trust society." },
        { name: "Noah Martin", text: "Every time I get stuck in traffic, I think: ‘This could be solved with just one more lane.’" }
    ];

    let currentTestimonial = 0;
    const testimonialName = document.getElementById("testimonialName");
    const testimonialText = document.getElementById("testimonialText");
//    const prevButton = document.getElementById("prevTestimonial");
//    const nextButton = document.getElementById("nextTestimonial");

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

//    nextButton.addEventListener("click", nextTestimonial);
//    prevButton.addEventListener("click", prevTestimonial);
    setInterval(nextTestimonial, 5000); // Auto-cycle every 5 seconds
});