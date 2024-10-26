AOS.init({
    duration: 1000,
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 8,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        480: {    // Small mobile screens
            slidesPerView: 2,
            spaceBetween: 10,
        },
        640: {    // Mobile screens
            slidesPerView: 2,
            spaceBetween: 12,
        },
        768: {    // Small tablets
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1024: {   // Tablets
            slidesPerView: 4,
            spaceBetween: 18,
        },
        1280: {   // Laptops and small desktops
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1536: {   // Large desktops
            slidesPerView: 5,
            spaceBetween: 24,
        },
    },
});



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

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('max-h-[1000px]');
    console.log("clicked");
});
