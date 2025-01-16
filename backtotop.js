const mainItems = document.querySelectorAll(".main__item");
const mainBtn = document.querySelector(".main__btn");
mainItems.forEach(item => {
    item.addEventListener('click', function () {
        const sectionId = item.dataset.goto;
        if (sectionId) {
            const title = document.querySelector('#' + sectionId);
            if (title) {
                const gotoBlockValue = title.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: gotoBlockValue,
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                console.error(`Section with ID '${sectionId}' not found.`);
            }
        } else {
            console.error('No data-goto attribute found for this item.');
        }
    });
});

document.addEventListener('scroll', function () {
    if (window.scrollY >= 700) {
        mainBtn.classList.remove('hidden');
    } else {
        mainBtn.classList.add('hidden');
    }
});

mainBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})