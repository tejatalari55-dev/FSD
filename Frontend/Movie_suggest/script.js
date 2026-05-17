document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const banner = document.getElementById('banner');
    const bannerTitle = document.getElementById('banner_title');
    const bannerDescription = document.getElementById('banner_description');
    const rowsContainer = document.getElementById('rows_container');

    // Handle Scroll for Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav_black');
        } else {
            nav.classList.remove('nav_black');
        }
    });

    // Set Banner (Featured Movie)
    const featuredMovie = MOVIES_DATA.trending[Math.floor(Math.random() * MOVIES_DATA.trending.length)];
    banner.style.backgroundImage = `url(${featuredMovie.backdrop_path})`;
    bannerTitle.textContent = featuredMovie.title;
    bannerDescription.textContent = featuredMovie.overview;

    // Create Rows
    function createRow(title, movies, isLarge = false) {
        const row = document.createElement('div');
        row.className = 'row';

        const rowTitle = document.createElement('h2');
        rowTitle.className = 'row_title';
        rowTitle.textContent = title;
        row.appendChild(rowTitle);

        const rowPosters = document.createElement('div');
        rowPosters.className = 'row_posters';

        movies.forEach(movie => {
            const poster = document.createElement('img');
            poster.className = `row_poster ${isLarge ? 'row_posterLarge' : ''}`;
            poster.src = movie.poster_path;
            poster.alt = movie.title;

            // Smart Fallback for broken images
            poster.onerror = () => {
                poster.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500&auto=format&fit=crop';
                poster.style.objectFit = 'cover';
            };

            // Click event for "Details"
            poster.onclick = () => {
                alert(`Movie: ${movie.title}\n\nOverview: ${movie.overview}`);
            };

            rowPosters.appendChild(poster);
        });

        row.appendChild(rowPosters);
        rowsContainer.appendChild(row);
    }

    // Initialize Rows
    createRow('Trending Now', MOVIES_DATA.trending, true);
    createRow('Blockbuster Indian Movies', MOVIES_DATA.indian);
    createRow('Marvel Cinematic Universe', MOVIES_DATA.marvel);
    createRow('DC Extended Universe', MOVIES_DATA.dc);
});
