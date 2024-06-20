import { loading, formProfileButton, formProfileImgButton, newPlaceButton } from '../index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: 'd8afb53e-cccd-48cb-86a5-80d2affde1d3',
      'Content-Type': 'application/json'
    }
  };

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
              }
        })
        .catch((err) => console.log(err));
};

export const startingCardsArray = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
              }
        })
        .catch((err) => console.log(err));
};

export const editProfileRequest = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
          }
    })
    .catch((err) => console.log(err))
};

export const newCardRequest = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
              }
        })
        .catch((err) => console.log(err))        
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers.authorization,
        },
    }).then((res) => res.ok)
    .catch((err) => console.log(err));
};

export const activeLike = (id) => {
    return fetch(
        `${config.baseUrl}/cards/likes/${id}`,
        {
            method: "PUT",
            headers: {
                authorization: config.headers.authorization,
            },
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
              }
        })
        .catch((err) => console.log(err));
};

export const removeLike = (id) => {
    return fetch(
        `${config.baseUrl}/cards/likes/${id}`,
        {
            method: "DELETE",
            headers: {
                authorization: config.headers.authorization,
            },
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
              }
        })
        .catch((err) => console.log(err));
};

export const editProfileImgRequest = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
          }
    })
    .catch((err) => console.log(err))
    .finally(() => {
        loading(false, formProfileImgButton);
      });
};
