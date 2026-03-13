const gallery = document.getElementById("gallery");

let images = [];

imageList.forEach((file, index) => {

    let img = document.createElement("img");

    img.loading = "lazy";

    img.src = `images/${file}`;

    img.onload = () => {
        img.classList.add("loaded");
    };

    gallery.appendChild(img);
    images.push(img);

});


// LIGHTBOX

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".nav.right");
const prevBtn = document.querySelector(".nav.left");

let currentIndex = 0;


// OPEN

images.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;
        showImage();

        lightbox.classList.add("active");

    });

});


function showImage(){

    lightboxImg.style.opacity = 0;

    setTimeout(() => {

        lightboxImg.src = images[currentIndex].src;

        lightboxImg.style.opacity = 1;

    },150);

}


// NEXT

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    showImage();

});


// PREVIOUS

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    showImage();

});


// CLOSE

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


// KEYBOARD

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "ArrowRight") nextBtn.click();
    if(e.key === "ArrowLeft") prevBtn.click();
    if(e.key === "Escape") lightbox.classList.remove("active");

});


// BACKGROUND CLICK

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){
        lightbox.classList.remove("active");
    }

});

function resizeGridItem(item){

const grid = document.querySelector(".gallery");

const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));

const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

item.style.gridRowEnd = "span " + rowSpan;

}

function resizeAllGridItems(){

document.querySelectorAll(".gallery img").forEach(item=>{
resizeGridItem(item);
});

}

window.addEventListener("load",resizeAllGridItems);
window.addEventListener("resize",resizeAllGridItems);

document.querySelectorAll(".gallery img").forEach(img=>{

img.addEventListener("load",()=>{
resizeGridItem(img);
});

});