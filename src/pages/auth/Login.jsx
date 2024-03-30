import React, { useState } from "react";
import "./Login.scss";
import eye from "../../images/eye.png";
import Removeeye from "../../images/remove eye.png";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, refreshAccessToken } = useAuth();
  // ! STATES
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleLogin = () => {
    console.log(phone);
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password);
    login(formData);
  };

  const refresh = () => {
    const formData = new FormData();
    formData.append("refresh", localStorage.getItem("refresh"));

    refreshAccessToken(formData);
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__modal">
          <div className="login__modal__container">
            <div className="login__modal__container__logo">Лого</div>
            <div className="login__modal__container__text">Авторизация</div>
            <div className="login__modal__container__inputs">
              <p className="login__modal__container__inputs__text">Ваш номер</p>
              <input
                inputmode="numeric"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+996 (_ _ _) - _ _ _ - _ _ _ "
                className="login__modal__container__inputs__input"
              />
              <p className="login__modal__container__inputs__text">Пароль</p>
              <div className="login__modal__container__inputs__image">
                <input
                  type={showPassword ? "password" : "text"}
                  className="login__modal__container__inputs__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="login__modal__container__inputs__img"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <img src={eye} /> : <img src={Removeeye} />}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleLogin()}
              className="login__modal__container__btn"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
