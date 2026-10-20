
const trending = [
    {
        title: "Wednesday",
        year: 2022,
        image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        description: "Wednesday Addams investigates mysterious events at Nevermore Academy."
    },
    {
        title: "Stranger Things",
        year: 2016,
        image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        description: "Friends discover supernatural mysteries in their hometown."
    },
    {
        title: "Money Heist",
        year: 2017,
        image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        description: "A criminal mastermind plans an ambitious heist."
    },
    {
        title: "Squid Game",
        year: 2021,
        image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        description: "Contestants compete in dangerous games for a huge prize."
    },
    {
        title: "Dark",
        year: 2017,
        image: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
        description: "A missing child reveals secrets across generations."
    }
];

const popular = [
    {
        title: "Inception",
        year: 2010,
        image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        description: "A skilled thief enters dreams to steal secrets."
    },
    {
        title: "Interstellar",
        year: 2014,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "Explorers travel through space to find humanity a new home."
    },
    {
        title: "The Batman",
        year: 2022,
        image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        description: "Batman investigates corruption and crime in Gotham City."
    },
    {
        title: "Avatar",
        year: 2009,
        image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        description: "An adventure begins on the alien world of Pandora."
    },
    {
        title: "Joker",
        year: 2019,
        image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description: "A troubled man descends into chaos in Gotham."
    }
];

const series = [
    {
        title: "The Witcher",
        year: 2019,
        image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        description: "A monster hunter navigates a dangerous fantasy world."
    },
    {
        title: "Breaking Bad",
        year: 2008,
        image: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
        description: "A chemistry teacher enters the world of crime."
    },
    {
        title: "The Mandalorian",
        year: 2019,
        image: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
        description: "A lone bounty hunter travels through the galaxy."
    },
    {
        title: "Loki",
        year: 2021,
        image: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
        description: "Loki faces mysteries involving time and alternate realities."
    },
    {
        title: "Sherlock",
        year: 2010,
        image: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
        description: "Sherlock Holmes solves complex mysteries in London."
    }
];

const trendingContainer = document.getElementById("trendingMovies");
const popularContainer = document.getElementById("popularMovies");
const seriesContainer = document.getElementById("seriesMovies");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const modal = document.getElementById("movieModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

let allMovies = [...trending, ...popular, ...series];

function displayMovies(movies, container) {
    container.innerHTML = "";

    if (movies.length === 0) {
        container.innerHTML =
            '<p class="empty-message">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;
        img.loading = "lazy";

        img.onerror = () => {
            img.alt = movie.title + " poster unavailable";
            img.removeAttribute("src");
        };

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const year = document.createElement("p");
        year.textContent = "Release year: " + movie.year;

        card.append(img, title, year);

        card.addEventListener("click", () => {
            openModal(movie);
        });

        container.appendChild(card);
    });
}

function renderAllMovies() {
    displayMovies(trending, trendingContainer);
    displayMovies(popular, popularContainer);
    displayMovies(series, seriesContainer);
}

function openModal(movie) {
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.description;
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

function searchMovies() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        renderAllMovies();
        return;
    }

    const results = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );

    displayMovies(results, trendingContainer);
    popularContainer.innerHTML = "";
    seriesContainer.innerHTML = "";

    document.getElementById("trending")
        .scrollIntoView({ behavior: "smooth" });
}

searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchMovies();
    }
});

document.getElementById("playBtn").addEventListener("click", () => {
    openModal({
        title: "Stranger Things",
        description:
            "A group of friends uncover mysterious secrets and supernatural events in their small town."
    });
});

document.getElementById("infoBtn").addEventListener("click", () => {
    openModal({
        title: "Stranger Things",
        description:
            "A science-fiction mystery series featuring friendship, suspense, and supernatural adventures."
    });
});

renderAllMovies();
