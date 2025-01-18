/**********************--------------*****************/
let copyright = document.getElementById("copyright");
copyright.innerHTML = new Date().getFullYear();
/************* */

const form = document.getElementById('form');
const result = document.getElementById('result');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    });
}

/*********************************/

function myMenuFunction() {

    let x = document.getElementById("videolibrary-content");

    if (x.style.display == "block") {
        x.style.display = "none";

    } else {
        x.style.display = "block";
    }
}

function myLanguageFunction() {

    let x = document.getElementById("language-content");

    if (x.style.display == "block") {
        x.style.display = "none";

    } else {
        x.style.display = "block";
    }
}


const header = document.querySelector(".header");
const headerScroll = document.createElement("div");
const nav = document.querySelector(".navbar");
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".main__overlay");
const donationForm = document.querySelector(".donation__form");
const coinsBtn = document.querySelectorAll(".donation__coins");
const idramBtn = document.querySelectorAll(".donation__button-idram");



headerScroll.setAttribute("data-scroll", "");
header.before(headerScroll);

const headerObserver = new IntersectionObserver((entries) => {
    header.classList.toggle("header__scroll", !entries[0].isIntersecting);
}, {
    rootMargin: "100px 0px 0px 0px",
});

headerObserver.observe(headerScroll);

document.body.addEventListener("click", (e) => {
    if (e.target === overlay) {
        burger.classList.remove("burger_active");
        nav.classList.remove("nav_active");
        header.classList.remove("header_active");
        overlay.classList.remove("main__overlay_active");
    }
});


burger.addEventListener("click", function () {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("nav_active");
    if (burger.classList.contains("burger_active")) {
        header.classList.add("header_active")
        overlay.classList.add("main__overlay_active");
        nav.style.paddingTop = header.offsetHeight + "px";
    } else {
        overlay.classList.remove("main__overlay_active");
        nav.style.paddingTop = "";
        header.classList.remove("header_active");
    }
});

const mediaQueryMinWidth_1200 = window.matchMedia('(min-width: 992px)');
mediaQueryMinWidth_1200.addEventListener("change", (e) => {
    if (e.matches) {
        nav.style.paddingTop = "";
        overlay.classList.remove("main__overlay_active");
        return true;
    }
    else {
        nav.style.paddingTop = header.offsetHeight + "px";
    }
    return false;
});

if (coinsBtn && idramBtn) {
    coinsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.add("donation__coins_active");
            coinsBtn.forEach((item) => {
                if (item !== btn) {
                    item.classList.remove("donation__coins_active");
                }
            });
        });
    });

    idramBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.add("donation__idram_active");
            idramBtn.forEach((item) => {
                if (item !== btn) {
                    item.classList.remove("donation__idram_active");
                }
            });
        });
    });
}


var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});