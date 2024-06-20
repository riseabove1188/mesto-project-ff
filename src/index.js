import "./index.css";
import {
    createCard,
    delCardHandler,
    likeImgHandler,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
    getUserInfo,
    startingCardsArray,
    editProfileRequest,
    newCardRequest,
    editProfileImgRequest
} from "./components/api.js";

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

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

const addCard = (card, delCardHandler) => {
    const cardElement = createCard(
        card,
        delCardHandler,
        likeImgHandler,
        openPopupImg,
        currentUser
    );
    cardContainer.prepend(cardElement);
};

const profileImg = document.querySelector(".profile__image");
const editProfileImg = document.querySelector(".popup_type_edit-avatar");
const editProfileImgCloseButton = editProfileImg.querySelector(".popup__close");

profileImg.addEventListener("click", () => {
    openModal(editProfileImg);
    clearValidation(formProfileImg, config);
});

editProfileImgCloseButton.addEventListener("click", () => {
    closeModal(editProfileImg);
});

editProfileImg.addEventListener("click", (evt) => {
    if (
        editProfileImg.classList.contains("popup_is-opened") &&
        evt.target.classList.contains("popup_type_edit-avatar")
    ) {
        closeModal(editProfileImg);
    }
});

const formProfileImg = document.forms["edit-avatar"];
const newAvatarLink = formProfileImg.elements["link-avatar"];

export const formProfileImgButton = formProfileImg.querySelector(".popup__button");

formProfileImg.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(editProfileImg);
    loading(true, formProfileImgButton);
    editProfileImgRequest(newAvatarLink.value).then((res) => {
        profileImg.src = res.avatar
    })
    .then((res) => loading(false, formProfileImgButton));;
    
});

const profile = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup_type_edit");
const editProfileCloseButton = editProfile.querySelector(".popup__close");

profile.addEventListener("click", () => {
    openModal(editProfile);
    clearValidation(formProfile, config);
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
export const formProfileButton = formProfile.querySelector(".popup__button");

formProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(editProfile);
    loading(true, formProfileButton); 
    editProfileRequest(nameInput.value, jobInput.value)
    .then((res) => {
        title.textContent = res.name;
        description.textContent = res.about;
    })
    .then((res) => loading(false, formProfileButton));
});

const newCard = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCard.querySelector(".popup__close");

addButton.addEventListener("click", () => {
    openModal(newCard);
    clearValidation(newPlace, config);
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

export const newPlaceButton = newPlace.querySelector('.popup__button');

placeName.setAttribute("value", "");
placeLink.setAttribute("value", "");

newPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();
    closeModal(newCard);
    loading(true, newPlaceButton);
    newCardRequest(placeName.value, placeLink.value).then((res) =>
        addCard(res, delCardHandler)
    )
    .then(() => loading(false, newPlaceButton));
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

enableValidation(config); 

const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
let currentUser;

const initData = (fn) => {
    Promise.all([getUserInfo(), startingCardsArray()]).then((res) => {
        const user = res[0];
        const cardsArray = res[1];

        currentUser = user;

        userName.textContent = user.name;
        userAbout.textContent = user.about;
        userAvatar.src = user.avatar;

        cardsArray.forEach((card) => {
            fn(card);
        });
    });
};

initData((card) => addCard(card, delCardHandler));

export const loading = (isLoading, buttonForm) => {
    if(isLoading) {
        buttonForm.textContent = "Сохранение...";
    } else {
        buttonForm.textContent = "Сохранить";
    }
};