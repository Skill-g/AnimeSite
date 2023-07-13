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
    fetchData(apiUrl3, "continuewatchTitle", "continuewatchEpisodes", 'animecache3');
}
const cachedData3 = localStorage.getItem('animecache3');
if (cachedData3) {
    const animelist3 = JSON.parse(cachedData3);
    const title3 = animelist3.title;
    const image3 = animelist3.image;
    const totalepisodes = animelist3.totalEpisodes;
    const continuewatchTitle = document.getElementById("continuewatchTitle");
    const continuewatchimage = document.getElementById("continuewatchimage");
    const continuewatchEpisodes = document.getElementById("continuewatchEpisodes");
    continuewatchTitle.textContent = title3;
    continuewatchEpisodes.textContent = `Количество серий: ${totalepisodes}`;
    continuewatchimage.style.backgroundImage = `url(${image3})`;

    if (animelist3.apiUrl !== apiUrl3) {
        fetchData(apiUrl3, "continuewatchimage", "continuewatchTitle", "continuewatchEpisodes", 'animecache3');
    }
} else {
    fetchData(apiUrl3, "continuewatchimage", "continuewatchTitle", "continuewatchEpisodes", 'animecache3');
}

function fetchData(apiUrl, imageId, textId, textid2, cacheKey) {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((animelist) => {
            const title = animelist.title;
            const image = animelist.image;
            const totalepisodes = animelist.totalEpisodes;
            const animebackground = document.getElementById(imageId);
            const animeTitle = document.getElementById(textId);
            const animeEpisodes = document.getElementById(textid2);
            animeTitle.textContent = title;
            animeEpisodes.textContent = `Количество серий: ${totalepisodes}`;
            animebackground.style.backgroundImage = `url(${image})`;

            localStorage.setItem(cacheKey, JSON.stringify({ apiUrl, ...animelist }));
        });
}