import { useState } from 'react';
import * as auth from '../utils/auth';

function Login({ onLogin }) {
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
      if (!email || !password) {
        return;
      }
      onLogin({ email, password });
    }
  };

  return (
    <section className="register">
      <h2 className="register__name">Вход</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          onChange={handleChange}
          name="email"
          value={data.email}
          placeholder="Email"
          className="input register__input-email"></input>

        <input
          onChange={handleChange}
          value={data.password}
          name="password"
          placeholder="Пароль"
          className="input register__input-password"></input>

        <button type="submit" className="register__button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
