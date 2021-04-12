import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('ul.js-gallery');
const modal = document.querySelector('div.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const modalBtnClose = document.querySelector('button[data-action="close-lightbox"]');



const markup = createGallery();

galleryContainer.insertAdjacentHTML('beforeend', markup);

galleryContainer.addEventListener('click', onImageClick)

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
    `}).join("");
}

function onImageClick(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return
    }

    const evtUrl = evt.target.getAttribute('data-source');

    addModal(evt, evtUrl)
    
    modalBtnClose.addEventListener('click', console.log('1111'));
}

function addModal(evt,url) {
    evt.preventDefault();
    modal.classList.add('is-open');
    modalImage.setAttribute('src', url);
}

// function closeModal() {
//     console.log('1111111');
//     modal.classList.remove(is-open);
// }

