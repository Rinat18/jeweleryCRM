import React from "react";
import Home from "../../images/Home.png";
import Tovari from "../../images/Tovari.png";
import Metals from "../../images/Metals.png";
import Staff from "../../images/Staff.png";
import Report from "../../images/Report.png";
import Clients from "../../images/Clients.png";
import Debtors from "../../images/debtors.png";
import Inventory from "../../images/Inventory.png";
import Cash from "../../images/Cash.png";
import Expenses from "../../images/Expenses.png";
import Salary from "../../images/Salary.png";
import "./SideBar.scss";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate()
  return (
    <div className="sideBar">
      <div className="sideBar__container">
        <div className="sideBar__container__logo">ЛОГО</div>
        <div className="sideBar__container__text">
          <div onClick={() => navigate("/")} className="sideBar__container__text__sites">
            <img src={Home} className="" />
            <div className="sideBar__container__text__sites__text">Главная</div>
          </div>
          <div onClick={() => navigate("/product")} className="sideBar__container__text__sites">
            <img src={Tovari} className="" />
            <div className="sideBar__container__text__sites__text">Товары</div>
          </div>
          <div onClick={() => navigate("/metal")} className="sideBar__container__text__sites">
            <img src={Metals} className="" />
            <div className="sideBar__container__text__sites__text">Металл</div>
          </div>
          <div onClick={() => navigate("/staff")} className="sideBar__container__text__sites">
            <img src={Staff} className="" />
            <div className="sideBar__container__text__sites__text">
              Сотрудники
            </div>
          </div>
          <div className="sideBar__container__text__sites">
            <img src={Report} className="" />
            <div className="sideBar__container__text__sites__text">
              Отчет по продажам
            </div>
          </div>
          <div onClick={() => navigate("/client")} className="sideBar__container__text__sites">
            <img src={Clients} className="" />
            <div className="sideBar__container__text__sites__text">Клиенты</div>
          </div>
          <div className="sideBar__container__text__sites">
            <img src={Debtors} className="" />
            <div className="sideBar__container__text__sites__text">
              Должники
            </div>
          </div>
          <div onClick={() => navigate("/inventory")} className="sideBar__container__text__sites">
            <img src={Inventory} className="" />
            <div className="sideBar__container__text__sites__text">
              Инвентаризация
            </div>
          </div>
          <div onClick={() => navigate("/cash")} className="sideBar__container__text__sites">
            <img src={Cash} className="" />
            <div className="sideBar__container__text__sites__text">Касса</div>
          </div>
          <div className="sideBar__container__text__sites">
            <img src={Expenses} className="" />
            <div className="sideBar__container__text__sites__text">Расходы</div>
          </div>
          <div className="sideBar__container__text__sites">
            <img src={Salary} className="" />
            <div className="sideBar__container__text__sites__text">
              Зарплата
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
