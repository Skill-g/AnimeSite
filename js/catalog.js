window.addEventListener("load", async function() {
    let sceneElement = document.querySelector(".scene");
    let cube = document.querySelector(".cube");
    let container = document.querySelector(".container");
    container.style.zIndex = "99999";

    const animelist = await fetchData();
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;

    cube.style.opacity = "0";
    sceneElement.style.opacity = "0";

    displayData(animelist);

    function hideScene() {
        sceneElement.style.display = "none";
    }

    sceneElement.addEventListener("transitionend", hideScene);
    let maxPages = 100;

    const updatePage = async(newPage) => {
        currentPage = newPage;
        const url = `http://localhost:3000/anime/gogoanime/top-airing?page=${currentPage}`;

        const response = await fetch(url);
        const animelist = await response.json();
        localStorage.setItem('topData', JSON.stringify(animelist));
        displayData(animelist);

        localStorage.setItem('currentPage', currentPage);
        document.getElementById('currentPage').textContent = currentPage;
    };

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < maxPages) {
            updatePage(currentPage + 1);
        }
    });
    document.getElementById('currentPage').textContent = currentPage;
});

const fetchData = async() => {
    try {
        const data = localStorage.getItem('topData');
        if (data) {
            const animelist = JSON.parse(data);
            return animelist;
        } else {
            const url = `http://localhost:3000/anime/gogoanime/top-airing`;
            const response = await fetch(url);
            const animelist = await response.json();
            localStorage.setItem('topData', JSON.stringify(animelist));
            console.log(animelist.totalPages);
            return animelist;
        }
    } catch (error) {
        console.error(error);
    }
};

const displayData = (animelist) => {
    const { results } = animelist;

    const oldBlock = document.querySelector('.block');
    if (oldBlock) {
        oldBlock.remove();
    }

    const container = document.createElement('div');
    const block = document.createElement('div');
    const pog = document.querySelector('.pagination')
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
        footer.parentNode.insertBefore(pog, footer);
    } else {
        document.body.appendChild(block);
        document.body.appendChild(pog);
    }

    setTimeout(() => {
        let sceneElement = document.querySelector(".scene");
        sceneElement.style.zIndex = "0";
    }, 1000);
};