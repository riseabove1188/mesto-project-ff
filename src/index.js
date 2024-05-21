import './src/index.css';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
// @todo: Функция создания карточки
const createCard = (card, delCard) => {
    const cardElement = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    const img = cardElement.querySelector(".card__image");
    img.setAttribute("src", card.link);
    img.setAttribute("alt", card.name);

    const title = cardElement.querySelector(".card__title");
    title.textContent = card.name;

    const delButton = cardElement.querySelector(".card__delete-button");
    delButton.addEventListener("click", () => delCard(cardElement));

    return cardElement;
};

const addCard = (card, delCard) => {
    const cardElement = createCard(card, delCard);
    cardContainer.append(cardElement);
};
// @todo: Функция удаления карточки
const delCard = (el) => {
    el.remove();
};
// @todo: Вывести карточки на страницу
addButton.addEventListener("click", () => {
    const card = initialCards.shift();
    if (!card) return;
    addCard(card, delCard);
});
