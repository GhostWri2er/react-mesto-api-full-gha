import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup-FullScreen ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container-FullScreen">
        <img className="popup__img-FullScreen" src={card.link} alt={card.name} />
        <h2 className="popup__title popup__name-FullScreen">{card.name}</h2>
        <button
          className="popup__button-close popup__close-FullScreen popup__close"
          onClick={onClose}
          type="button"></button>
      </div>
    </section>
  );
}

export default ImagePopup;
