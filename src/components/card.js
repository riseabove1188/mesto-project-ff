import { cardTemplate, popupImg } from "../index.js";
import { openModal } from "./modal.js";

export const createCard = (card, delCard) => {
    const cardElement = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    const img = cardElement.querySelector(".card__image");
    const bigImg = document.querySelector(".popup__image");

    img.setAttribute("src", card.link);
    img.setAttribute("alt", card.name);

    img.addEventListener("click", () => {
        openModal(popupImg);
        bigImg.setAttribute("src", img.src);
        bigImg.setAttribute("alt", img.alt);
    });

    const title = cardElement.querySelector(".card__title");
    title.textContent = card.name;

    const delButton = cardElement.querySelector(".card__delete-button");
    delButton.addEventListener("click", () => delCard(cardElement));

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    return cardElement;
};

export const delCard = (el) => {
    el.remove();
};
