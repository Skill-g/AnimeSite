window.addEventListener("load", async function() {
    let sceneElement = document.querySelector(".scene");
    let cube = document.querySelector(".cube");

    cube.style.opacity = "0";
    sceneElement.style.opacity = "0";

    setTimeout(() => {
        sceneElement.style.zIndex = "0";
    }, 1000);

    function hideScene() {
        sceneElement.style.display = "none";
    }

    sceneElement.addEventListener("transitionend", hideScene);
});