import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, delCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const bigImg = document.querySelector(".popup__image");

const addCard = (card, delCard) => {
    const cardElement = createCard(card, delCard);
    cardContainer.prepend(cardElement);

    const img = cardElement.querySelector(".card__image");

    img.addEventListener("click", () => {
        openModal(popupImg);
        bigImg.setAttribute("src", img.src);
        bigImg.setAttribute("alt", img.alt);
    });
};

initialCards.forEach((card) => {
    addCard(card, delCard);
});

//открытие редактирования профиля
const profile = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup_type_edit");
const closed = document.querySelector(".popup__close");

profile.addEventListener("click", () => {
    openModal(editProfile);
    jobInput.value = description.textContent;
    nameInput.value = title.textContent;
});

closed.addEventListener("click", () => {
    closeModal(editProfile);
});

document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        closeModal(editProfile);
    }
});

document.addEventListener("click", (evt) => {
    if (
        editProfile.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_edit")
    ) {
        closeModal(editProfile);
    }
});

//редактирование профиля
const formProfile = document.forms["edit-profile"];
const nameInput = formProfile.elements["name"];
const jobInput = formProfile.elements["description"];

nameInput.setAttribute("value", "Жак-Ив Кусто");
jobInput.setAttribute("value", "Исследователь океана");

const title = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

console.log(title.textContent, description.textContent);

formProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(editProfile);
    title.textContent = nameInput.value;
    description.textContent = jobInput.value;
});

//открытие создания новой карточки
const newCard = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCard.querySelector(".popup__close");

addButton.addEventListener("click", () => {
    openModal(newCard);
});

newCardCloseButton.addEventListener("click", () => {
    closeModal(newCard);
});

document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        closeModal(newCard);
    }
});

document.addEventListener("click", (evt) => {
    if (
        newCard.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_new-card")
    ) {
        closeModal(newCard);
    }
});

//добавление новой карточки
const newPlace = document.forms["new-place"];
const placeName = newPlace.elements["place-name"];
const placeLink = newPlace.elements["link"];

placeName.setAttribute("value", "");
placeLink.setAttribute("value", "");

newPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(newCard);
    initialCards.unshift({ name: placeName.value, link: placeLink.value });
    addCard(initialCards[0], delCard);
});

//открытие картинки
const popupImg = document.querySelector(".popup_type_image");
const closePopupImg = popupImg.querySelector(".popup__close");

closePopupImg.addEventListener("click", () => {
    closeModal(popupImg);
});

document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        closeModal(popupImg);
    }
});

document.addEventListener("click", (evt) => {
    if (
        popupImg.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_image")
    ) {
        closeModal(popupImg);
    }
});
