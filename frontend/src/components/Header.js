import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ userData, exit, loggedIn }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип" />
        <nav className="header__login">
          <p className="header__email">{loggedIn ? userData : userData}</p>

          <Switch>
            <Route exact path="/">
              <Link to="/sign-in" className="header__button" onClick={exit}>
                Выйти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="/sign-up" className="header__button">
                Регистрация
              </Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-in" className="header__button">
                Войти
              </Link>
            </Route>
          </Switch>
        </nav>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
