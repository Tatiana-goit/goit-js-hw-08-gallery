import gallery from './gallery-items.js';

const galleryContainer = document.querySelector('ul.js-gallery');
const modal = document.querySelector('div.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay')
const modalImage = document.querySelector('.lightbox__image');
const modalBtnClose = document.querySelector('button[data-action="close-lightbox"]');

const modalContent = document.querySelector('.lightbox__content');


const markup = createGallery();

galleryContainer.insertAdjacentHTML('beforeend', markup);

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
    `}).join("");
}

function onImageClick(evt) {
    if (evt.target.nodeName !== 'IMG') {
        return
    }

    const evtUrl = evt.target.getAttribute('data-source');

    addModal(evt, evtUrl);
    // console.log(evt);
    // console.log(evt.target);

    // console.log(evt.target.parentNode.parentNode);
    // console.log(this.index);
    // console.log(this.children);
    // console.log(this.indexOf);

}

function addModal(evt,url) {
    evt.preventDefault();
    modal.classList.add('is-open');
    modalImage.setAttribute('src', url);
    // ?!!!!!!!!!!!!!!!!!!


}

function closeModal() {
    modal.classList.remove('is-open');
    modalImage.removeAttribute('src');
}

function closeModalByEsc(evt) {
    if ((evt.keyCode === 27) & (modal.classList.contains('is-open'))) {
        closeModal();
    }
}


function changeImage(evt) {
    if ((evt.code === 'ArrowRight') & (evt.code === 'ArrowLeft')){
        return
    }

    if (evt.code === 'ArrowRight') {
        // const allSrc = gallery.map(({ original }) => original);
        const allSrc = gallery.map(({ li }) => li);

        let currentSrc = allSrc.indexOf(modalImage.src);
        
        console.log(currentSrc);
      


        modalImage.src = allSrc[currentSrc + 1];
        // if (currentSrc=8)

    }
    if (evt.code === 'ArrowLeft') {
        const allSrc = gallery.map(({ original }) => original);
        let currentSrc = allSrc.indexOf(modalImage.src);
        
        modalImage.src = allSrc[currentSrc-1]
    }

}



// window.addEventListener('click', function(e) {
//   const node = e.target.parentNode;

//   console.log([...node.children].indexOf(e.target));
// });