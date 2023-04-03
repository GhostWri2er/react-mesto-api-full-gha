import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password) {
      const { email, password } = data;
      onRegister({ email, password });
    }
  };
  return (
    <section className="register">
      <h2 className="register__name">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          placeholder="Email"
          className="input register__input-email"
          name="email"
          value={data.email}
          onChange={handleChange}></input>

        <input
          placeholder="Пароль"
          className="input register__input-password"
          name="password"
          value={data.password}
          onChange={handleChange}></input>

        <button type="submit" className="register__button">
          Зарегистироваться
        </button>
      </form>
      <p className="register__paragraph">
        Уже зарегистрированы?
        <Link to="/sign-in" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
