async function loadData() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbw6I1F4Rl5j77EwE6r8mzOUyUlZoupvXHrLSy3ro28RZCW1HVUfd_mKUozqtkWA9bfPLg/exec?achievements=true';
    const cacheKey = 'achievementData';
    const cacheExpiryKey = 'achievementDataExpiry';
    const cacheDuration = 3 * 60 * 60 * 1000; // 3 hours

    // Initialize Swiper before data is loaded
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 8,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        breakpoints: {
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 18 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 5, spaceBetween: 24 },
        },
    });

    // Pause autoplay on hover
    const swiperContainer = document.querySelector('.swiper-container');
    swiperContainer.addEventListener('mouseenter', () => swiper.autoplay.stop());
    swiperContainer.addEventListener('mouseleave', () => swiper.autoplay.start());

    // Check if cached data exists and is still valid
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpiry = localStorage.getItem(cacheExpiryKey);
    const now = new Date().getTime();

    let data;
    if (cachedData && cacheExpiry && now < cacheExpiry) {
        // Use cached data if available and not expired
        data = JSON.parse(cachedData);
    } else {
        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            data = await response.json();

            // Cache the data and set expiration
            localStorage.setItem(cacheKey, JSON.stringify(data));
            localStorage.setItem(cacheExpiryKey, now + cacheDuration);
        } catch (error) {
            console.error('Error loading data:', error);
            return;
        }
    }

    // Select all hardcoded slides
    const slides = document.querySelectorAll('.swiper-slide');

    // Loop through each slide and corresponding data item
    data.data.forEach((item, index) => {
        if (index < slides.length) { // Ensure we don't exceed available slides
            const slide = slides[index];
            const img = slide.querySelector('img');
            const skeleton = slide.querySelector('.skeleton');

            // Update the slide's image source, alt text, and title with data from API
            img.src = item['Image Link'];
            img.alt = item['Short Desc'];
            slide.title = item['Short Desc'];
            img.onload = () => skeleton.classList.add('hidden');  // remove the skeleton when the image is loaded
        }
    });
}

// Call loadData to fetch data and update slides
loadData();








let containers = document.querySelectorAll(".logo-cloud");
let isScrolling;

containers.forEach(container => {
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2; // Center the scroll for each container
    container.addEventListener('scrollend', snapBackToCenter);
    container.addEventListener('touchend', snapBackToCenter);
});

function snapBackToCenter(event) {
    let container = event.currentTarget;
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        container.scrollTo({
            left: (container.scrollWidth - container.clientWidth) / 2,
            behavior: 'smooth'
        });
    }, 100);
}
console.log("This site is made and deployed by a group of elite developers which includes:")
console.log("Saumy Sharma from IT Department 2025 Batch https://www.linkedin.com/in/saumy-sharma/ ")
console.log("Tanmay Sontakke from CSE Department 2025 Batch https://www.linkedin.com/in/tanmay-sontakke-3b99b4228/ ")
console.log("Anurag Singh from CSE Department 2025 Batch https://www.linkedin.com/in/anurag-singh-930899235/ ")
console.log("Shreyansh Goyal from IT Department 2025 Batch https://www.linkedin.com/in/shreyansh-goyal-11b131229/ ")
console.log("Surojit Mondal from IT Department 2026 Batch https://www.linkedin.com/in/surojitmondal/ ")
