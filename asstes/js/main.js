let inputserach = document.querySelector("#inputserach");
let iconsearch = document.querySelector("#iconsearch");


iconsearch.addEventListener("click", () => {
    inputserach.classList.toggle("none");
});


new WOW().init();

$("body").niceScroll();