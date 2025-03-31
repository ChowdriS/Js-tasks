const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = thumbnail.dataset.large;
        lightboxImg.onload = () => {
            lightboxImg.classList.add('loaded');
        };
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.classList.remove('loaded');
    lightboxImg.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});