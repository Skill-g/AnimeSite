window.addEventListener("load", async function() {
    let sceneElement = document.querySelector(".scene");
    let cube = document.querySelector(".cube");
    let container = document.querySelector(".container");
    container.style.zIndex = "99999";

    await fetchData();

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

const fetchData = async() => {
    try {
        const data = localStorage.getItem('topData');
        if (data) {
            const animelist = JSON.parse(data);
            displayData(animelist);
        } else {
            const response = await fetch('http://localhost:3000/anime/gogoanime/top-airing');
            const animelist = await response.json();
            localStorage.setItem('topData', JSON.stringify(animelist));
            displayData(animelist);
        }
    } catch (error) {
        console.error(error);
    }
};

const displayData = (animelist) => {
    console.log(animelist);
    const { results } = animelist;

    const container = document.createElement('div');
    const block = document.createElement('div');
    block.className = 'block';
    container.className = 'grid-table';

    for (let i = 0; i < results.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'cardtop';
        cardContainer.id = `${i + 1}`;
        cardContainer.style.backgroundImage = `url(${results[i].image})`;

        const title = results[i].title;

        const titleElement = document.createElement('h3');
        titleElement.className = 'textanimeh3';
        titleElement.textContent = title;

        cardContainer.appendChild(titleElement);

        container.appendChild(cardContainer);
    }

    block.appendChild(container);

    const footer = document.querySelector('footer');
    if (footer) {
        footer.parentNode.insertBefore(block, footer);
    } else {
        document.body.appendChild(block);
    }
};