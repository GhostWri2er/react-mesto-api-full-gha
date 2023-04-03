//Объект настроек
export const objectValidation = {
    formSelector: '.popup__form-edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: '.popup__input-error',
    errorClass: 'popup__input-error_active',
    popupSection: '.popup__block',
    inputLineRed: 'popup__input_line_red',
  };


//Получение селекторов для попапа редактировать информацию в профиле.
export const profilePopup = document.querySelector(".profile-popup");
export const popupEditButton = document.querySelector(".profile__edit-button");
export const nameElement = document.querySelector(".profile__name");
export const jobElement = document.querySelector(".profile__description");

//Получение селекторов для инпутов.
export const profileForm = document.querySelector(".popup__form-edit");
export const nameInput = profileForm.querySelector(".popup__input-name");
export const jobInput = profileForm.querySelector(".popup__input-description");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");

//Получение селекторов для попапа добавить.
export const popupAddButton = document.querySelector(".profile__add-button");
export const popupElementAdd = document.querySelector(".popup_add");
export const popupElementContainerAdd = popupElementAdd.querySelector(".popup__container_add");
export const nameElementAdd = popupElementContainerAdd.querySelector(".popup__input-name_add");
export const linkElementAdd = popupElementContainerAdd.querySelector(".popup__input-description_add");
export const addForm = popupElementContainerAdd.querySelector(".popup__form-edit_add");

//Получение селекторов для карточек(template)
export const template = document.querySelector(".template").content;
export const cardsElement = document.querySelector(".grid-cards");
export const popups = document.querySelectorAll(".popup");

export const popupImage = document.querySelector(".popup__img-FullScreen");
export const popupImageName = document.querySelector(".popup__name-FullScreen");
export const popupFullScreen = document.querySelector(".popup-FullScreen");

export const deletePopup = document.querySelector('.popup-type-delete-cards');
export const editAvatar = document.querySelector('.popup_edit_avatar');
export const editAvatarButton = document.querySelector('.profile__edit-button-avatar');
export const avatarForm = document.querySelector('.popup__form-edit-avatar');
export const profileAvatar = document.querySelector('.profile__avatar')
