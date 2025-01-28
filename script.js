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
const videoPlayIcon = document.querySelectorAll(".slider-ellipse__slide svg");

document.body.addEventListener("click", (e) => {
  const parent = e.target.closest(".slider-ellipse__slide");
  const playIcon = e.target.closest(".slider-ellipse__slide svg");
  const parentPlayIcon = playIcon?.closest(".slider-ellipse__slide");
  const text = parentPlayIcon?.querySelector("span");
  const poster = parentPlayIcon?.querySelector(".slider-ellipse__slide-poster");
  const video = parentPlayIcon?.querySelector(".tab__video");

  if (playIcon) {
    playIcon.style.display = "none";
    poster.style.display = "none";
    text.style.display = "none";
    video.play();
  }

  const currentVideo = parent?.querySelector("video");
  currentVideo?.addEventListener("pause", function () {
    currentVideo.pause();
    parent.querySelector("svg").style.display = "block";
    parent.querySelector("span").style.display = "block";
    parent.querySelector(".slider-ellipse__slide-poster").style.display =
      "block";
  });

  currentVideo?.addEventListener("ended", function () {
    currentVideo.pause();
    parent.querySelector("svg").style.display = "block";
    parent.querySelector("span").style.display = "block";
    parent.querySelector(".slider-ellipse__slide-poster").style.display =
      "block";
  });
});

headerScroll.setAttribute("data-scroll", "");
header.before(headerScroll);

const headerObserver = new IntersectionObserver(
  (entries) => {
    header.classList.toggle("header__scroll", !entries[0].isIntersecting);
  },
  {
    rootMargin: "100px 0px 0px 0px",
  },
);

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
    header.classList.add("header_active");
    overlay.classList.add("main__overlay_active");
    nav.style.paddingTop = header.offsetHeight + "px";
  } else {
    overlay.classList.remove("main__overlay_active");
    nav.style.paddingTop = "";
    header.classList.remove("header_active");
  }
});

const mediaQueryMinWidth_1200 = window.matchMedia("(min-width: 992px)");
mediaQueryMinWidth_1200.addEventListener("change", (e) => {
  if (e.matches) {
    nav.style.paddingTop = "";
    overlay.classList.remove("main__overlay_active");
    return true;
  } else {
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

if (document.querySelector(".mySwiper")) {
  new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 3,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 80,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
    },
  });
}
