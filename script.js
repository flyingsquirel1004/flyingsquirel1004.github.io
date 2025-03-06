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
});
