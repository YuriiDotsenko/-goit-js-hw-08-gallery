import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const modalRef = document.querySelector("div.lightbox");
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imageModalRef = document.querySelector(".lightbox__image");
const overlayRef = document.querySelector(".lightbox__overlay");
const leftArrowRef = document.querySelector(".lightbox__arrow-left");
const rightArrowRef = document.querySelector(".lightbox__arrow-right");

let number = 1;
let elementById;
let indexElement = 0;

galleryItems.forEach(({ preview, original, description }, index, i) => {
  const list = document.createElement("li");
  const imageElement = document.createElement("img");
  const imageLink = document.createElement("a");

  imageElement.setAttribute("src", preview);
  imageLink.setAttribute("href", original);
  imageElement.setAttribute("data-source", original);
  imageElement.setAttribute("alt", description);
  imageElement.setAttribute("data-id", index);

  galleryRef.append(list);
  list.append(imageLink);
  imageLink.append(imageElement);

  list.classList.add("gallery__item");
  imageElement.classList.add("gallery__image");
  imageLink.classList.add("gallery__link");

  galleryRef.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") {
      return;
    }

    event.preventDefault();

    modalRef.classList.add("is-open");

    imageModalRef.src = event.target.dataset.source;
    let indexElement = Number(event.target.dataset.id);

    window.addEventListener("keydown", onClickKeydownRightArrow);
    window.addEventListener("keydown", onClickKeydownLeftArrow);
    leftArrowRef.addEventListener("click", onClickLeftArrow);
    rightArrowRef.addEventListener("click", onCLickRightArrow);

    function onClickKeydownRightArrow(e) {
      if (e.code === "ArrowRight") {
        const arrayIndexElements = Number(imageElement.dataset.id);

        indexElement += number;
        // console.log(indexElement)
        if (indexElement >= galleryItems.length) {
          indexElement = galleryItems.length - 1;
        }

        if (indexElement === arrayIndexElements) {
          elementById = imageElement.dataset.source;
          imageModalRef.src = elementById;
        }
      }
    }
    function onClickKeydownLeftArrow(e) {
      if (e.code === "ArrowLeft") {
        const arrayIndexElements = Number(imageElement.dataset.id);

        indexElement -= number;
        // console.log(indexElement)

        if (indexElement <= 0) {
          indexElement = 0;
        }
        if (indexElement === arrayIndexElements) {
          elementById = imageElement.dataset.source;
          imageModalRef.src = elementById;
        }
      }
    }
    function onClickLeftArrow(e) {
      if (e.target.nodeName !== "BUTTON") {
        return;
      }
      const arrayIndexElements = Number(imageElement.dataset.id);

      indexElement -= number;

      if (indexElement <= 0) {
        indexElement = 0;
      }
      if (indexElement === arrayIndexElements) {
        elementById = imageElement.dataset.source;
        imageModalRef.src = elementById;
      }
    }
    function onCLickRightArrow(e) {
      if (e.target.nodeName !== "BUTTON") {
        return;
      }
      const arrayIndexElements = Number(imageElement.dataset.id);

      indexElement += number;

      if (indexElement >= galleryItems.length) {
        indexElement = galleryItems.length - 1;
      }

      if (indexElement === arrayIndexElements) {
        elementById = imageElement.dataset.source;
        imageModalRef.src = elementById;
      }
    }
  });

  overlayRef.addEventListener("click", onClickOverlay);
  window.addEventListener("keydown", onClickKeydownEscape);
  btnCloseRef.addEventListener("click", onClickCloseButton);

  function onClickOverlay(event) {
    if (event.target.nodeName !== "DIV") {
      return;
    }
    modalRef.classList.remove("is-open");
    imageModalRef.src = "";
  }
  function onClickCloseButton(event) {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }
    modalRef.classList.remove("is-open");
    imageModalRef.src = "";
  }
  function onClickKeydownEscape(event) {
    if (event.code === "Escape") {
      modalRef.classList.remove("is-open");
      imageModalRef.src = "";
    }
  }
});
