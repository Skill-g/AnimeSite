fetch("http://localhost:3000/anime/gogoanime/top-airing")
    .then((response) => response.json())
    .then((animelist) => console.log(animelist));