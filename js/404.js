const countdownEl = document.querySelector("#countdown");
let countdown = 10;
const countdownInterval = setInterval(() => {

    countdown--;

    countdownEl.textContent = `${countdown}`;
    if (countdown === 0) {
        window.location.href = "index";
        clearInterval(countdownInterval);
    }
}, 1000);