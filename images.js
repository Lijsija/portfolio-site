// images.js

// Number of images in your portfolio
const totalPhotos = 112; // update if you add/remove images

// Optional: If you want a list of filenames explicitly
const imageList = [];

for (let i = 1; i <= totalPhotos; i++) {
    imageList.push(`foto${i}.jpg`);
}

// This array can be used by script.js if needed
// In this setup, script.js already generates images using totalPhotos
// So you can use imageList or totalPhotos — both work
