const slider = document.querySelector('.slider');
const images = slider.querySelectorAll('img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentImageIndex = 0;

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSlider();
});

function updateSlider() {
    images.forEach((image, index) => {
        image.classList.remove('active');
        if (index === currentImageIndex) {
            image.classList.add('active');
        }
    });
}