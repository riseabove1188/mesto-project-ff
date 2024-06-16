const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");
export let currentUser;

const getUserInfo = () => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me", {
        headers: {
            authorization: "d8afb53e-cccd-48cb-86a5-80d2affde1d3",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

const startingCardsArray = () => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-16/cards", {
        headers: {
            authorization: "d8afb53e-cccd-48cb-86a5-80d2affde1d3",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

export const initData = (fn) => {
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

export const editProfileRequest = (name, about) => {
    fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me", {
        method: "PATCH",
        headers: {
            authorization: "d8afb53e-cccd-48cb-86a5-80d2affde1d3",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            about,
        }),
    });
};

export const newCardRequest = (name, link) => {
    return fetch("https://nomoreparties.co/v1/wff-cohort-16/cards", {
        method: "POST",
        headers: {
            authorization: "d8afb53e-cccd-48cb-86a5-80d2affde1d3",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            link,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};

