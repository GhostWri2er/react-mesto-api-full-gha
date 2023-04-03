import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateCards({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'add'}
      title="Добавить карточку"
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__block">
            <input
              className="popup__input popup__input-name popup__input-name_add"
              id="place-error"
              type="text"
              name="place"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              onChange={handleNameChange}
              value={name ?? ''}
              required
            />
            <span className="popup__input-error"></span>
          </div>
          <div className="popup__block">
            <input
              className="popup__input popup__input-description popup__input-description_add"
              id="link-error"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              onChange={handleLinkChange}
              value={link ?? ''}
              required
            />
            <span className="popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
