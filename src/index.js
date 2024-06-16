import "./index.css";
import { initialCards } from "./cards.js";
import { createCard, delCard, likeImg } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
    initData,
    editProfileRequest,
    newCardRequest,
    currentUser
} from "./components/api.js";

const cardContainer = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const popupImg = document.querySelector(".popup_type_image");
const bigImg = document.querySelector(".popup__image");
const popupImgText = popupImg.querySelector(".popup__caption");

const openPopupImg = (img) => {
    openModal(popupImg);
    bigImg.setAttribute("src", img.src);
    bigImg.setAttribute("alt", img.alt);
    popupImgText.textContent = img.alt;
};

const addCard = (card, delCard) => {
    const cardElement = createCard(card, delCard, likeImg, openPopupImg, currentUser);
    cardContainer.prepend(cardElement);
};

const profile = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfile.querySelector(".popup__close");

profile.addEventListener("click", () => {
    openModal(editProfile);
    clearValidation(formProfile);
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

const formProfile = document.forms["edit-profile"];
const nameInput = formProfile.elements["name"];
const jobInput = formProfile.elements["description"];

const title = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

formProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(editProfile);
    title.textContent = nameInput.value;
    description.textContent = jobInput.value;
    editProfileRequest(nameInput.value, jobInput.value);
});

const newCard = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCard.querySelector(".popup__close");

addButton.addEventListener("click", () => {
    openModal(newCard);
    clearValidation(newPlace);
    placeName.value = "";
    placeLink.value = "";
});

newCardCloseButton.addEventListener("click", () => {
    closeModal(newCard);
});

newCard.addEventListener("mousedown", (evt) => {
    if (
        newCard.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_new-card")
    ) {
        closeModal(newCard);
    }
});

const newPlace = document.forms["new-place"];
const placeName = newPlace.elements["place-name"];
const placeLink = newPlace.elements["link"];

placeName.setAttribute("value", "");
placeLink.setAttribute("value", "");

newPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(newCard);
    newCardRequest(placeName.value, placeLink.value).then((res) =>
        addCard({ name: res.name, link: res.link }, delCard)
    );
});

const closePopupImg = popupImg.querySelector(".popup__close");

closePopupImg.addEventListener("click", () => {
    closeModal(popupImg);
});

popupImg.addEventListener("mousedown", (evt) => {
    if (
        popupImg.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_image")
    ) {
        closeModal(popupImg);
    }
});

enableValidation();

initData((card) => addCard(card, delCard));
