const cardTemplate = document.querySelector("#card-template").content;
export const popupImg = document.querySelector(".popup_type_image");
const bigImg = document.querySelector(".popup__image");
const popupImgText = popupImg.querySelector(".popup__caption");

export const createCard = (card, delCard, likeImg, openPopupImg) => {
    const cardElement = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    const img = cardElement.querySelector(".card__image");

    img.addEventListener("click", () => {
        openPopupImg(img);
        bigImg.setAttribute("src", img.src);
        bigImg.setAttribute("alt", img.alt);
        popupImgText.textContent = img.alt;
    });

    img.setAttribute("src", card.link);
    img.setAttribute("alt", card.name);

    const title = cardElement.querySelector(".card__title");
    title.textContent = card.name;

    const delButton = cardElement.querySelector(".card__delete-button");
    delButton.addEventListener("click", () => delCard(cardElement));

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => likeImg(likeButton));

    return cardElement;
};

export const delCard = (el) => {
    el.remove();
};

export const likeImg = (el) => {
    el.classList.toggle("card__like-button_is-active");
};
