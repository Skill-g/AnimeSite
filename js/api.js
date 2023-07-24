window.addEventListener("load", async function() {
    let sceneElement = document.querySelector(".scene");
    let cube = document.querySelector(".cube");
    let container = document.querySelector(".container");
    container.style.zIndex = "99999";

    const hasDataInCache = await fetchDataAndUI();

    cube.style.opacity = "0";
    sceneElement.style.opacity = "0";

    setTimeout(() => {
        sceneElement.style.zIndex = "0";
    }, 1000);

    function hideScene() {
        sceneElement.style.display = "none";
    }

    if (hasDataInCache) {
        console.log("cached")
    } else {
        sceneElement.addEventListener("transitionend", hideScene);
    }
});


async function fetchDataAndUI() {
    const apiUrl1 = "http://localhost:3000/anime/gogoanime/info/spy-x-family";
    const apiUrl2 = "http://localhost:3000/anime/gogoanime/info/horimiya";
    const apiUrl3 = "http://localhost:3000/anime/gogoanime/info/nierautomata-ver1-1a";
    const animeData = [
        { apiUrl: apiUrl1, cacheKey: 'animecache', imageId: '#animetopimage', textId: '#animetoptext' },
        { apiUrl: apiUrl2, cacheKey: 'animecache2', imageId: '#animetopimage2', textId: '#animetoptext2' },
        { apiUrl: apiUrl3, cacheKey: 'animecache3', imageId: '#continuewatchimage', textId: '#continuewatchTitle', textId2: '#continuewatchEpisodes' }
    ];

    const promises = animeData.map(data => fetchData(data));

    const results = await Promise.all(promises);

    const hasDataInCache = results.some(result => result);

    return hasDataInCache;
}

async function fetchData({ apiUrl, imageId, textId, textId2, cacheKey }) {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const animelist = JSON.parse(cachedData);
        updateUI(imageId, textId, textId2, animelist);
        console.log("Данные загружены из кеша.");
        return true;
    }

    try {
        const response = await fetch(apiUrl);
        const animelist = await response.json();

        updateUI(imageId, textId, textId2, animelist);
        localStorage.setItem(cacheKey, JSON.stringify({ apiUrl, ...animelist }));
        console.log("Аниме выгружено");
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }

    return false;
}

function updateUI(imageId, textId, textId2, { title, image, totalEpisodes }) {
    const animeBackground = document.querySelector(imageId);
    const animeTitle = document.querySelector(textId);
    animeTitle.textContent = title;
    animeBackground.style.backgroundImage = `url(${image})`;

    if (textId2) {
        const animeEpisodes = document.querySelector(textId2);
        animeEpisodes.textContent = `Количество серий: ${totalEpisodes}`;
    }
}