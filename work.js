import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('ul.js-gallery');

const modal = document.querySelector('div.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay')
const modalImage = document.querySelector('.lightbox__image');
const modalBtnClose = document.querySelector('button[data-action="close-lightbox"]');

let currentIndex = 0;

const markup = createGallery();


galleryContainer.insertAdjacentHTML('beforeend', markup.join(""));

galleryContainer.addEventListener('click', onImageClick);

modalBtnClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', closeModalByEsc);

document.addEventListener('keydown', changeImage)


function createGallery() {
    return gallery.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
    `});
}

function onImageClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
        return
    }


    currentIndex =gallery.findIndex(el => el.preview===evt.target.src)
  
    // markup.forEach((element, ind) => {
    //     if (element.includes(evt.target.src)) {
    //         currentIndex = ind;
    //     return;
    //     }
    // });
 
    
    modal.classList.add('is-open');
    changeAttribute (evt.target.dataset.source,evt.target.alt)
}

function closeModal() {
    modal.classList.remove('is-open');
    changeAttribute ("","")
}

function changeAttribute(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
}

function closeModalByEsc(evt) {
    if ((evt.code === "Escape") & (modal.classList.contains('is-open'))) {
        closeModal();
    }
}

function changeImage(evt) {
    const length = markup.length-1;
    const nextSrc = gallery[currentIndex].original;
    const alt = gallery[currentIndex].description;
     
    if (evt.code === 'ArrowRight') {
        if (currentIndex !== length) {
            currentIndex += 1;
            changeAttribute(nextSrc, alt)
         } else {
            currentIndex = 0;
            changeAttribute(nextSrc, alt);
        }
    }

    if (evt.code === 'ArrowLeft') {
        if (currentIndex !== 0) {
            currentIndex -= 1;
            changeAttribute(nextSrc, alt);
         } else {
            currentIndex = length;
            changeAttribute(nextSrc, alt);
         }
    }
}
