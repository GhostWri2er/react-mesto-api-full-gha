import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  };

  useEffect(() => {
    api
      .getProfile()
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((err) => console.log('error', err));
  }, []);

  function handleUpdateUser(data) {
    const { name, about } = data;
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log('error', err));
  }

  function handleUpdateAvatar(data) {
    const { avatar } = data;
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log('error', err));
  }

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(
          res.data.map((card) => ({
            _id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes,
            owner: card.owner,
          })),  
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)

      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log('error', err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log('error', err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log('error', err));
  }

  function handleLogin(data) {
    auth
      .login(data)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setEmail(email);
          setLoggedIn(true);
          tokenCheck();
        } else {
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setIsInfoToolTipOpen(true);
        console.log(`Ошибка авторизации: ${err}`);
      });
  }
  const handleRegister = (data) => {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setStatus('Ok');
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setStatus('error');
        console.log('Ошибка регистрации', err);
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  };

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          setIsInfoToolTipOpen(true);
          console.log('error', err);
        });
    }
  };

  const exit = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/signin');
  };

  return (
    <div className="page">
      <Switch>
        <CurrentUserContext.Provider value={currentUser}>
          <Header userData={email} exit={exit} loggedIn={loggedIn} />
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              handleCardDelete={handleCardDelete}
              handleCardLike={handleCardLike}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
            />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={status} />
        </CurrentUserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
