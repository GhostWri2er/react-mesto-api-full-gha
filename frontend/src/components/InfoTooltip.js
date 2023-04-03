import React from 'react';
import UnionOk from '../images/UnionOk.png';
import UnionError from '../images/UnionError.png';

function InfoTooltip({ isOpen, onClose, status }) {
  let text;
  let src;

  if (status === 'Ok') {
    text = 'Вы успешно зарегистрировались!';
    src = UnionOk;
  } else {
    text = `Что-то пошло не так!\nПопробуйте ещё раз.`;
    src = UnionError;
  }
  return (
    <section className={`InfoTooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="InfoTooltip__container">
        <img className="InfoTooltip__image" src={src} alt={src} />
        <p className="InfoTooltip__name">{text}</p>
        <button className="InfoTooltip__button-close" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
