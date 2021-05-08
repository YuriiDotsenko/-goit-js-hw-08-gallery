import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const btnCloseRef = document.querySelector(
  'button[data-action ="close-lightbox"]'
);
const divModalEl = document.querySelector(".lightbox__content");
const overlayRef = document.querySelector(".lightbox__overlay");

const imagesCardMurkup = galleryItems.reduce(
  (acc, { preview, description, original }) => {
    return (acc += `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
  <img loading="lazy" class="gallery__image"
  src="${preview}"
  alt="${description}"
  />
  </a>
  </li>`);
  },
  ""
);
galleryRef.innerHTML = imagesCardMurkup;

const imgEl = document.querySelector(".gallery__image");

galleryRef.addEventListener("click", e);

let element;
function e(eve) {
  eve.preventDefault();
  if (eve.target.className !== imgEl.className) {
    return;
  }
  const bigImgEl = eve.target.alt;
  for (let i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].description === bigImgEl) {
      element = galleryItems[i].original;
    }
  }

  modalRef.classList.add("is-open");
  divModalEl.innerHTML = `<img class="lightbox__image"
    src="${element}"
    alt="${bigImgEl}"
  />`;
}

btnCloseRef.addEventListener("click", () => {
  modalRef.classList.remove("is-open");
});

// Очистка пути после закрытия модалки//

function isOpen() {
  const divCloseModal = document.querySelector(".lightbox__image");
  modalRef.classList.remove("is-open");
  divCloseModal.alt = "";
  divCloseModal.src = "";
}
const closeModalEl = document.querySelector('[data-action="close-lightbox"]');
closeModalEl.addEventListener("click", isOpen);

overlayRef.addEventListener("click", isOpen);

// Управление кнопками //

document.addEventListener("keydown", (eve) => {
  const divCloseModal = document.querySelector(".lightbox__image");

  // Кнопка Esc //
  if (eve.code === "Escape") {
    isOpen();
  }
  if (modalRef.className.includes("is-open")) {
    const mapDefEl = galleryItems.map((value) => value.original);
    const indElNum = Number(mapDefEl.indexOf(divCloseModal.src));

    // Кнопка влево //
    const mapDelLight = Number(mapDefEl.length) - 1;
    if (eve.code === "ArrowLeft") {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indLeftEl = indElNum - 1;
      divCloseModal.src = mapDefEl[indLeftEl];
      if (indElNum === 0) {
        divCloseModal.src = mapDefEl[mapDelLight];
      }
    }
    // Кнопка вправо //
    if (eve.code === "ArrowRight" || eve.code === "Space") {
      if (eve.target.className === imgEl.className) {
        return;
      }
      const indEl = indElNum + 1;
      divCloseModal.src = mapDefEl[indEl];
      if (indEl === mapDefEl.length) {
        divCloseModal.src = mapDefEl[0];
      }
    }
  }
});
