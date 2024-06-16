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
        delButton.addEventListener("click", () => delCard(cardElement));
    } else {
        delButton.classList.remove("card__delete-button");
    }

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => likeImg(likeButton));

    const likesCounter = cardElement.querySelector(".counter");
    likesCounter.textContent = card.likes ? card.likes.length : 0;

    return cardElement;
};

export const delCard = (el) => {
    el.remove();
};

export const likeImg = (el) => {
    el.classList.toggle("card__like-button_is-active");
};
