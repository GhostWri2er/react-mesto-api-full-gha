import PopupWithForm from './PopupWithForm.js';
import { useEffect, useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title="Редактировать аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__block">
            <input
              className="popup__input popup__input-description popup__input-description_add"
              type="url"
              placeholder="Ссылка на картинку"
              ref={avatarRef}
              required
            />
            <span className="popup__input-error"></span>
          </div>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
