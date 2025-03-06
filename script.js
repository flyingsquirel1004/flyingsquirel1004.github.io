document.addEventListener("DOMContentLoaded", function () {
    let count = parseInt(localStorage.getItem("signatureCount")) || 420069;
    const signatureCountElement = document.getElementById("signatureCount");
    const signButton = document.getElementById("signButton");

    signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;

    signButton.addEventListener("click", function () {
        count++;
        localStorage.setItem("signatureCount", count);
        signatureCountElement.textContent = `📜 ${count.toLocaleString()} Signatures`;
        alert("Thanks for signing! One more lane coming right up!");
    });
});
