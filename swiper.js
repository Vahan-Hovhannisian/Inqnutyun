const slider = document.querySelector(".slider-ellipse");
const sliderContainer = document.querySelector(".slider-ellipse__container");
const slides = document.querySelectorAll(".slider-ellipse__slide");
const sliderNavigations = document.querySelectorAll(".slider-navigation");
const actionPrevious = document.querySelector(".action-prev");
const actionNext = document.querySelector(".action-next");

let activeOrder = 0;
// Обработчики свайпа
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", () => {
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Минимальное расстояние для срабатывания свайпа
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Свайп вправо (предыдущий слайд)
            activeOrder = Math.max(0, activeOrder - 1);
        } else {
            // Свайп влево (следующий слайд)
            activeOrder = Math.min(slides.length - 1, activeOrder + 1);
        }
        update(); // Обновляем слайдер
    }
}
init();

function init() {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        slide.dataset.order = i;
        slide.style.transform = `translate(-50%, -50%)`;
        slide.addEventListener("click", clickHandler);
    }
    for (const navigation of sliderNavigations) {
        navigation.addEventListener("click", navigationHandler);
    }

    activeOrder = Math.floor(slides.length / 2);

    update();
}

function update() {
    const { width, height } = sliderContainer.getBoundingClientRect();
    //const slideRect = slides[0].getBoundingClientRect();
    const a = width / 2;
    const b = height / 2;

    const delta = Math.PI / slides.length / 4;

    for (let i = 0; i < slides.length; i++) {
        const leftSlide = document.querySelector(
            `[data-order="${activeOrder - i}"]`,
        );
        if (leftSlide) {
            leftSlide.style.zIndex = slides.length - i;
            leftSlide.style.opacity = 1 - (4 * i) / slides.length;
            leftSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 - delta * i * 3)}px`;
            leftSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 - delta * i * 2)}px`;
            leftSlide.style.scale = 1 - (1 * i) / slides.length;
        }
        const rightSlide = document.querySelector(
            `[data-order="${activeOrder + i}"]`,
        );
        if (rightSlide) {
            rightSlide.style.zIndex = slides.length - i;
            rightSlide.style.opacity = 1 - (4 * i) / slides.length;
            rightSlide.style.left = `${width / 2 + a * Math.cos((Math.PI * 3) / 2 + delta * i * 2)}px`;
            rightSlide.style.top = `${-b * Math.sin((Math.PI * 3) / 2 + delta * i * 2)}px`;
            rightSlide.style.scale = 1 - (1 * i) / slides.length;
        }
    }
}

function clickHandler() {
    activeOrder = parseInt(this.dataset.order, 10);
    update();
}

function navigationHandler(e) {
    e.preventDefault();
    const { dir } = this.dataset;

    if (dir === "prev") {
        activeOrder = Math.max(0, activeOrder - 1);
    } else if (dir === "next") {
        activeOrder = Math.min(slides.length - 1, activeOrder + 1);
    }
    update();
}

window.addEventListener("resize", update);
