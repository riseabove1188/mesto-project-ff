const cardTemplate = document.querySelector("#card-template").content;

export const createCard = (card, delCard, likeImg, openPopupImg) => {
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
