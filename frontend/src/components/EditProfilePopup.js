import PopupWithForm from './PopupWithForm.js';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'profile'}
      title="Редактировать профиль"
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__block">
            <input
              onChange={handleNameChange}
              className="popup__input popup__input-name"
              id="name-error"
              type="text"
              name="name"
              value={name ?? ''}
              placeholder="Ваше имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error"></span>
          </div>
          <div className="popup__block">
            <input
              onChange={handleDescriptionChange}
              className="popup__input popup__input-description"
              id="description-error"
              type="text"
              name="description"
              value={description ?? ''}
              placeholder="Описание"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditProfilePopup;
