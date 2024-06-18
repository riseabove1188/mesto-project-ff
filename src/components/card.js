import { deleteCard, activeLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (
    card,
    delCard,
    likeImg,
    openPopupImg,
    currentUser
) => {
    const cardElement = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    const img = cardElement.querySelector(".card__image");

    img.addEventListener("click", () => {
        openPopupImg(img);
    });

    img.setAttribute("src", card.link);
    img.setAttribute("alt", card.name);

    const title = cardElement.querySelector(".card__title");
    title.textContent = card.name;

    const delButton = cardElement.querySelector(".card__delete-button");

    if (currentUser._id === card.owner._id) {
        delButton.addEventListener("click", () => delCard(cardElement, card));
    } else {
        delButton.style.display = "none";
    }

    const likesCounter = cardElement.querySelector(".counter");
    likesCounter.textContent = card.likes ? card.likes.length : 0;

    const likeButton = cardElement.querySelector(".card__like-button");

    const userLikeIds = card.likes.map((user) => user._id);

    if (userLikeIds.includes(currentUser._id)) {
        likeButton.classList.add("card__like-button_is-active");
    }
    likeButton.addEventListener("click", () =>
        likeImg(likeButton, likesCounter, card)
    );

    return cardElement;
};

export const delCardHandler = (el, card) => {
    deleteCard(card._id).then((res) => {
        if (res) {
            el.remove();
        }
    });
};

export const likeImgHandler = (el, counterEl, card) => {
    if (el.classList.contains("card__like-button_is-active")) {
        removeLike(card._id).then((res) => {
            counterEl.textContent = res.likes.length;
            el.classList.toggle("card__like-button_is-active");
        });
    } else {
        activeLike(card._id).then((res) => {
            counterEl.textContent = res.likes.length;
            el.classList.toggle("card__like-button_is-active");
        });
    }
};
