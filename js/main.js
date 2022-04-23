let img = document.querySelectorAll(".main__img");
let bigImg = document.querySelector(".image");
let bigImgInner = document.querySelector(".image__inner");
let close = document.querySelector(".image__close");

let burger = document.querySelector(".header__burger");
let burger1 = document.querySelector(".header__burger span:first-child");
let burger2 = document.querySelector(".header__burger span:nth-child(2)");
let burger3 = document.querySelector(".header__burger span:last-child");
let menu = document.querySelector(".header__menu");

for (let i = 0; i < img.length; i++) {
    img[i]?.addEventListener("click", isOpen);
}

close?.addEventListener("click", isOpen);

bigImg?.addEventListener("click", isOpen);

bigImgInner?.addEventListener("click", function(e) {
    e.stopPropagation();
});

burger.addEventListener("click", () => {
    menu.classList.toggle("min-menu");
    burger1.classList.toggle("burger-1");
    burger2.classList.toggle("burger-2");
    burger3.classList.toggle("burger-3");
});

function isOpen() {
    bigImg.classList.toggle("is-open");
}