import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, delCard, likeImg } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const bigImg = document.querySelector(".popup__image");

const openPopupImg = (el) => {
    openModal(popupImg);
    bigImg.setAttribute("src", el.src);
    bigImg.setAttribute("alt", el.alt);
    popupImg.querySelector(".popup__caption").textContent = el.alt;
};

const addCard = (card, delCard) => {
    const cardElement = createCard(card, delCard, likeImg, openPopupImg);
    cardContainer.prepend(cardElement);

    const img = cardElement.querySelector(".card__image");

    img.addEventListener("click", () => {
        openPopupImg(img);
    });
};

initialCards.forEach((card) => {
    addCard(card, delCard);
});

//открытие редактирования профиля
const profile = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfile.querySelector(".popup__close");

profile.addEventListener("click", () => {
    openModal(editProfile);
    jobInput.value = description.textContent;
    nameInput.value = title.textContent;
});

editProfileCloseButton.addEventListener("click", () => {
    closeModal(editProfile);
});

editProfile.addEventListener("click", (evt) => {
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

newCard.addEventListener("click", (evt) => {
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
    addCard({ name: placeName.value, link: placeLink.value }, delCard);
});

//открытие картинки
const popupImg = document.querySelector(".popup_type_image");
const closePopupImg = popupImg.querySelector(".popup__close");

closePopupImg.addEventListener("click", () => {
    closeModal(popupImg);
});

popupImg.addEventListener("click", (evt) => {
    if (
        popupImg.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_image")
    ) {
        closeModal(popupImg);
    }
});
