// script.js

const galleryContainer = document.getElementById('gallery');

// TOTAL NUMBER OF PHOTOS
const totalPhotos = 117; // adjust if you have more or fewer images

const images = [];

// Generate all image paths automatically
for(let i = 1; i <= totalPhotos; i++){
    const img = document.createElement('img');
    img.src = `images/foto${i}.jpg`;
    img.alt = "Portfolio photo";
    img.loading = "lazy";
    img.classList.add("portfolio-image");

    // fade-in when loaded
    img.onload = () => {
        img.classList.add("loaded");
        resizeGridItem(img);
    }

    galleryContainer.appendChild(img);
    images.push(img);
}

// --- LIGHTBOX ---

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".nav.right");
const prevBtn = document.querySelector(".nav.left");

let currentIndex = 0;

// Open lightbox
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

// NEXT / PREV
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

// CLOSE
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
});
lightbox.addEventListener("click",(e)=>{
    if(e.target === lightbox) lightbox.classList.remove("active");
});

// KEYBOARD
document.addEventListener("keydown",(e)=>{
    if(!lightbox.classList.contains("active")) return;
    if(e.key==="ArrowRight") nextBtn.click();
    if(e.key==="ArrowLeft") prevBtn.click();
    if(e.key==="Escape") lightbox.classList.remove("active");
});

// --- GRID RESIZE ---
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

window.addEventListener("load", resizeAllGridItems);
window.addEventListener("resize", resizeAllGridItems);
