const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: 'd8afb53e-cccd-48cb-86a5-80d2affde1d3',
      'Content-Type': 'application/json'
    }
  };

  const handleResponse = res => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(handleResponse)
};

export const startingCardsArray = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization,
        },
    })
    .then(handleResponse)
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
    .then(handleResponse)
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
    .then(handleResponse)
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers.authorization,
        },
    }).then(handleResponse)
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
    .then(handleResponse)
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
    .then(handleResponse)
};

export const editProfileImgRequest = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    })
    .then(handleResponse)
};
