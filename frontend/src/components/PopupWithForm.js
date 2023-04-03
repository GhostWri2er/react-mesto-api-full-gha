import React from 'react';

function PopupWithForm({ name, isOpen, title, onClose, children, onSubmit }) {
  return (
    <section className={`popup ${name}-popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
          className={`popup__form-edit popup__form-edit-${name}`}
          method="post"
          name={name}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className={`popup__button-close popup__button-close-${name} popup__close`}
            onClick={onClose}
            type="button"></button>

          <button className={`popup__button-save popup__button-save-${name}`} type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
