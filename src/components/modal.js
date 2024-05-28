export const openModal = (el) => {
    el.classList.add("popup_is-opened", "popup_is-animated");
};

export const closeModal = (el) => {
    el.classList.remove("popup_is-opened");
};
