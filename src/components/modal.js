function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModal(openedPopup);
    }
};

export const openModal = (el) => {
    el.classList.add("popup_is-opened", "popup_is-animated");
    document.addEventListener("keydown", closeByEscape);
};

export const closeModal = (el) => {
    el.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeByEscape);
};


