const cachedData = localStorage.getItem('animecache');
const apiUrl = "http://localhost:3000/anime/gogoanime/info/spy-x-family";
const apiUrl2 = "http://localhost:3000/anime/gogoanime/info/horimiya"
const apiUrl3 = "http://localhost:3000/anime/gogoanime/info/nierautomata-ver1-1a"
if (cachedData) {
    const animelist = JSON.parse(cachedData);
    const title = animelist.title;
    const image = animelist.image;
    const animebackground = document.getElementById("animetopimage");
    const animeTitle = document.getElementById("animetoptext");
    animeTitle.textContent = title;
    animebackground.style.backgroundImage = `url(${image})`;

    if (animelist.apiUrl !== apiUrl) {
        fetchData(apiUrl, "animetopimage", "animetoptext", 'animecache');
    }

    const cachedData2 = localStorage.getItem('animecache2');
    if (cachedData2) {
        const animelist2 = JSON.parse(cachedData2);
        const title2 = animelist2.title;
        const image2 = animelist2.image;
        const animebackground2 = document.getElementById("animetopimage2");
        const animeTitle2 = document.getElementById("animetoptext2");
        animeTitle2.textContent = title2;
        animebackground2.style.backgroundImage = `url(${image2})`;

        if (animelist2.apiUrl !== apiUrl2) {
            fetchData(apiUrl2, "animetopimage2", "animetoptext2", 'animecache2');
        }
    } else {
        fetchData(apiUrl2, "animetopimage2", "animetoptext2", 'animecache2');
    }
} else {
    fetchData(apiUrl, "animetopimage", "animetoptext", 'animecache');
    fetchData(apiUrl2, "animetopimage2", "animetoptext2", 'animecache2');
}

function fetchData(apiUrl, imageId, textId, cacheKey) {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((animelist) => {
            const title = animelist.title;
            const image = animelist.image;
            const animebackground = document.getElementById(imageId);
            const animeTitle = document.getElementById(textId);
            animeTitle.textContent = title;
            animebackground.style.backgroundImage = `url(${image})`;

            localStorage.setItem(cacheKey, JSON.stringify({ apiUrl, ...animelist }));
        });
}