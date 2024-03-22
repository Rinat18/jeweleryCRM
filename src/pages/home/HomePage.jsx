import React, { useState } from "react";
import "./HomePage.scss";
import card from "../../images/credit-card-minus.png";
import calendar from "../../images/calendar.png";

export default function HomePage() {
  // ! STATE
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [word, setWord] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно обработать отправку данных
    console.log("Отправлено:", word, before, after);
    // Закрываем модальное окно после отправки данных
    setIsOpen(false);
  };
  console.log(isOpen);
  return (
    <div className="HomePage">
      <div className="HomePage__container">
        <div className="HomePage__container__title">Главная</div>
        <div className="HomePage__container__cash">
          <div className="HomePage__container__cash__nal">
            <div className="HomePage__container__cash__nal__soms">
              <div className="HomePage__container__cash__nal__soms__text">
                Наличные (сом)
              </div>
              <div className="HomePage__container__cash__nal__soms__numbers">
                100 500
              </div>
            </div>
            <div className="HomePage__container__cash__nal__btn">
              <img src={card} alt="" />
              Снять
            </div>
          </div>
          <div className="HomePage__container__cash__cards">
            <div className="HomePage__container__cash__nal__soms">
              <div className="HomePage__container__cash__nal__soms__text">
                Безналичные (сом)
              </div>
              <div className="HomePage__container__cash__nal__soms__numbers numbers2">
                1 500 500
              </div>
            </div>
            <div className="HomePage__container__cash__cards__banks">
              <div className="HomePage__container__cash__cards__banks__optima">
                <div className="HomePage__container__cash__cards__banks__optima__text">
                  Оптима банк
                </div>
                <div className="HomePage__container__cash__cards__banks__optima__numbers">
                  50 500 сом
                </div>
                <div className="HomePage__container__cash__nal__btn HomePage__container__cash__nal__btn2">
                  <img src={card} alt="" />
                  Снять
                </div>
              </div>
              <div className="HomePage__container__cash__cards__banks__optima">
                <div className="HomePage__container__cash__cards__banks__optima__text">
                  МБанк
                </div>
                <div className="HomePage__container__cash__cards__banks__optima__numbers">
                  100 000 сом
                </div>
                <div className="HomePage__container__cash__nal__btn HomePage__container__cash__nal__btn2">
                  <img src={card} alt="" />
                  Снять
                </div>
              </div>
              <div className="HomePage__container__cash__cards__banks__optima">
                <div className="HomePage__container__cash__cards__banks__optima__text">
                  МБанк
                </div>
                <div className="HomePage__container__cash__cards__banks__optima__numbers">
                  100 000 сом
                </div>
                <div className="HomePage__container__cash__nal__btn HomePage__container__cash__nal__btn2">
                  <img src={card} alt="" />
                  Снять
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="HomePage__container__title__Statistik">Статистика</div>
        <div className="HomePage__container__statistik">
          <div className="HomePage__container__statistik__solds">
            <div className="HomePage__container__statistik__solds__title">
              Статистика по продажам
            </div>
            <div className="HomePage__container__statistik__solds__numbers">
              <div className="HomePage__container__statistik__numbers__solds">
                <div className="HomePage__container__statistik__numbers__solds__numbers">
                  10 000
                </div>
                <div className="HomePage__container__statistik__numbers__solds__text">
                  Количество продаж
                </div>
              </div>
              <div className="HomePage__container__statistik__numbers__cash">
                <div className="HomePage__container__statistik__numbers__cash__soms">
                  1 500 500
                </div>
                <div className="HomePage__container__statistik__numbers__cash__text">
                  Сумма (сом)
                </div>
              </div>
            </div>
            <div className="HomePage__container__statistik__solds__dates">
              <div className="HomePage__container__statistik__solds__dates__date">
                Дата
                <img onClick={() => setIsOpen(!isOpen)} src={calendar} alt="" />
                {isOpen ? (
                  <div className="modalHome">
                    <div className="modal__text">От</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                    />
                    <div className="modal__text">до</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={before}
                      onChange={(e) => setBefore(e.target.value)}
                    />
                    <button
                      className="modal__btn"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Отправить
                    </button>
                  </div>
                ) : null}
              </div>
              <select
                className="HomePage__container__statistik__solds__dates__category"
                name=""
                id=""
              >
                <option value="" disabled selected>
                  Категория
                </option>
                <option value="Necklace">Ожерелье</option>
                <option value="Rings">Кольца</option>
                <option value="Earrings">Серьги</option>
              </select>
              <select
                name=""
                id=""
                className="HomePage__container__statistik__solds__dates__category"
              >
                <option value="" disabled selected>
                  Проба
                </option>
              </select>
            </div>
          </div>
          <div className="HomePage__container__statistik__solds">
            <div className="HomePage__container__statistik__solds__title">
              Статистика по скупке
            </div>
            <div className="HomePage__container__statistik__solds__numbers">
              <div className="HomePage__container__statistik__numbers__solds">
                <div className="HomePage__container__statistik__numbers__solds__numbers">
                  10 000
                </div>
                <div className="HomePage__container__statistik__numbers__solds__text">
                  Сумма скупок (сом)
                </div>
              </div>
            </div>
            <div className="HomePage__container__statistik__solds__dates">
              <div className="HomePage__container__statistik__solds__dates__date">
                Дата
                <img
                  onClick={() => setIsOpen2(!isOpen2)}
                  src={calendar}
                  alt=""
                />
                {isOpen2 ? (
                  <div className="modalHome">
                    <div className="modal__text">От</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                    />
                    <div className="modal__text">до</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={before}
                      onChange={(e) => setBefore(e.target.value)}
                    />
                    <button
                      className="modal__btn"
                      onClick={() => setIsOpen2(!isOpen2)}
                    >
                      Отправить
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="HomePage__container__statistik__solds">
            <div className="HomePage__container__statistik__solds__title">
              Статистика по рассрочке
            </div>
            <div className="HomePage__container__statistik__solds__numbers">
              <div className="HomePage__container__statistik__numbers__solds">
                <div className="HomePage__container__statistik__numbers__solds__numbers">
                  10 000
                </div>
                <div className="HomePage__container__statistik__numbers__solds__text">
                  Сумма рассрочки (сом)
                </div>
              </div>
            </div>
            <div className="HomePage__container__statistik__solds__dates">
              <div className="HomePage__container__statistik__solds__dates__date">
                Дата
                <img
                  onClick={() => setIsOpen3(!isOpen3)}
                  src={calendar}
                  alt=""
                />
                {isOpen3 ? (
                  <div className="modalHome">
                    <div className="modal__text">От</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                    />
                    <div className="modal__text">до</div>
                    <input
                      className="modal__input"
                      type="text"
                      value={before}
                      onChange={(e) => setBefore(e.target.value)}
                    />
                    <button
                      className="modal__btn"
                      onClick={() => setIsOpen3(!isOpen3)}
                    >
                      Отправить
                    </button>
                  </div>
                ) : null}
                <select
                  className="HomePage__container__statistik__solds__dates__category HomePage__container__statistik__solds__dates__category2"
                  name=""
                  id=""
                >
                  <option value="" disabled selected>
                    Продажа
                  </option>
                  <option value="Necklace">Продажи</option>
                  <option value="Rings">Выплаты</option>
                  <option value="Earrings">Долги</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
