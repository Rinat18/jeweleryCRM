import React, { useEffect, useState } from "react";
import plus from "../../../images/plus.png";
import "../Cash.scss";
import SSearch from "../../../images/search-sm.png";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../../../images/photo library.png";
import AddIcon from "@mui/icons-material/Add";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";
import AddClient from "../../../components/addClientModal/AddClient";
import { useClient } from "../../../context/ClientContext";
import { useStaff } from "../../../context/StaffContext";
import { useProduct } from "../../../context/ProductContext";
import { useCash } from "../../../context/CashBoxContext";

export default function CashAddSale() {
  const { getClients, clients } = useClient();
  const { getStaffs, staffs } = useStaff();
  const { searchedProduct, searchProduct } = useProduct();
  const { getPaymentTypes, paymentTypes, postIncomeSale } = useCash();

  const navigate = useNavigate();

  useEffect(() => {
    getClients(1, 100);
    getStaffs(1, 100);
    getPaymentTypes();
  }, []);

  const [value, setValue] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // Состояние для хранения выбранного клиента
  const [suggestions, setSuggestions] = useState([]); // подсказки для клиентов
  const [chooseManager, setChooseManager] = useState(null); // Выбранный менеджер
  const [productSeach, setProductSearch] = useState(""); // для поиска товаров
  const [isOpen, setIsOpen] = useState(false); // модалка для добавление клиента
  const [productPrice, setProductPrice] = useState(0); //состояние для инпута суммы
  const [choosePayment, setChoosePayment] = useState(""); // выбранный способ оплаты

  // ! CHOOSE MANAGER

  let managers;
  if (staffs.results) {
    managers = staffs.results.filter((elem) => {
      if (elem.position.slug == "manager") {
        return elem;
      }
    });
  }

  // ! SEARCH PRODUCT

  useEffect(() => {
    searchedProduct(productSeach);
  }, [productSeach]);

  // ! PAYMENT TYPES

  const languages = clients.results;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter((lang) =>
          lang.full_name.toLowerCase().includes(inputValue)
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.full_name}</div>;

  const inputProps = {
    placeholder: "Введите имя клиента",
    value,
    onChange,
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setSelectedClient(suggestion); // Устанавливаем выбранный клиент в состояние
  };

  // ! ФУНКЦИЯ ДЛЯ ЗАКРЫТИЯ МОДАЛКИ ДОБАВЛЕНИЯ КЛИЕНТА
  const closeModal = () => {
    setIsOpen(false);
  };

  // ! ФУНКЦИЯ ДЛЯ ОЧИШНИЕ ВЫБРАННОГО ТОВАРА

  const clearChoosedProduct = () => {
    setProductSearch(null);
    setProductPrice(0);
    setProductSearch("");
  };

  // ! POST INCOME SALE
  const submitSale = () => {
    const formData = new FormData();
    // formData.append("id" , "")
    formData.append("operation", "sale");
    formData.append("operation_type", "income");
    formData.append("client", selectedClient?.id);
    formData.append("manager", +chooseManager);
    formData.append("payment_type", +choosePayment);
    formData.append("products[0]product", searchProduct.id);
    formData.append("products[0]price", +productPrice);
    postIncomeSale(formData);
    navigate(-1);
  };

  console.log(searchProduct.id);
  console.log(+chooseManager);
  console.log(searchProduct.id);
  console.log(+productPrice);
  console.log(selectedClient?.id);

  return (
    <div className="HomePage">
      <div className="HomePage__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Добавить расход</div>
        </div>
        <div className="forms">
          <div className="formToAddIncomee">
            <div className="formToAddIncome">
              <div className="formToAddIncome__types">
                <div className="formToAddIncome__types_sell formToAddIncome__types_Active ">
                  Выкуп
                </div>
                <div className="formToAddIncome__types_installment">Аванс</div>
                <div className="formToAddIncome__types_pay">Другое</div>
                <div className="formToAddIncome__types_exchange">Зарплата</div>
              </div>

              <div className="formToAddIncome__clientInputs">
                <div
                  className="formToAddIncome__clientInputs__manager"
                  style={{ marginLeft: 0 }}
                >
                  <p>Менеджер*</p>
                  <select
                    value={chooseManager}
                    onChange={(e) => setChooseManager(e.target.value)}
                    name=""
                    id=""
                  >
                    <option value="">Выберите менеджера</option>
                    {managers
                      ? managers.map((elem) => (
                          <option value={elem.id}>{elem.full_name}</option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="formToAddIncome__clientInputs__manager">
                  <p>Сумма*</p>
                  <input
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <div className="formToAddIncome__clientInputs">
                <div className="formToAddIncome__clientInputs__client">
                  <p>Проба*</p>
                  <div>
                    <input
                      style={{ paddingLeft: "10px" }}
                      value={productSeach}
                      onChange={(e) => setProductSearch(e.target.value)}
                      type="number"
                    />
                  </div>
                </div>
                <div
                  style={{ marginLeft: "40px" }}
                  className="formToAddIncome__clientInputs__client"
                >
                  <p>Товар*</p>
                  <div>
                    <input
                      style={{ paddingLeft: "10px" }}
                      value={productSeach}
                      onChange={(e) => setProductSearch(e.target.value)}
                      type="number"
                    />
                  </div>{" "}
                </div>

                <div className="formToAddIncome__clientInputs_delete">
                  <DeleteIcon
                    onClick={() => clearChoosedProduct()}
                    sx={{ color: "white", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="formToAddIncome__paymentType">
                <select
                  onChange={(e) => setChoosePayment(e.target.value)}
                  name=""
                  id=""
                >
                  <option value="">Способ оплаты</option>
                  {paymentTypes
                    ? paymentTypes.map((elem) => (
                        <option value={elem.id}>{elem.name}</option>
                      ))
                    : null}
                </select>
                <div>
                  <AddIcon sx={{ color: "#576ED0" }} />
                  Добавить
                </div>
              </div>
            </div>

            <div className="formTotalSum">
              <div className="formTotalSum_tovars">Количество товаров: </div>
              <div className="formTotalSum_cost">
                К оплате: {productPrice} сом
              </div>
            </div>

            <div onClick={submitSale} className="btnToSubmit">
              Подтвердить
            </div>
          </div>
          {selectedClient ? (
            <div className="blockToView">
              <div className="blockToView__Left">
                {selectedClient.images ? (
                  selectedClient.images[0] ? (
                    <>
                      <img src={selectedClient.images[0].image} alt="" />
                    </>
                  ) : (
                    <div className="notImage">
                      <img src={img} />
                      <span class="input-file-btn">Нет фото</span>
                    </div>
                  )
                ) : (
                  <div className="notImage">
                    <img src={img} />
                    <span class="input-file-btn">Нет фото</span>
                  </div>
                )}
                <div className="blockToView__Left__inn">
                  <p>ИНН:</p>
                  {selectedClient.inn ? (
                    <div>{selectedClient.inn}</div>
                  ) : (
                    <div>Отсутствует</div>
                  )}
                </div>
                <div className="blockToView__Left__inn">
                  <p>Платежеспособность:</p>
                  {selectedClient.solvency ? <div>Да</div> : <div>Нет</div>}
                </div>
                <div
                  onClick={() => navigate(`/detailClient/${selectedClient.id}`)}
                  className="btnToDetail"
                >
                  Просмотреть
                </div>
              </div>
              <div className="blockToView__Right">
                <div className="blockToView__Left__Name">
                  <p>ФИО:</p>
                  {selectedClient.full_name ? (
                    <div>{selectedClient.full_name}</div>
                  ) : (
                    <div>Нету</div>
                  )}
                </div>
                <div className="blockToView__Left__inn">
                  <p>Номер телефона:</p>
                  {selectedClient.phone ? (
                    <div>{selectedClient.phone}</div>
                  ) : (
                    <div>Нету</div>
                  )}
                </div>
                <div className="blockToView__Left__inn">
                  <p>Общая сумма долга:</p>
                  <div>50 0000</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {isOpen ? <AddClient closeModal={closeModal} /> : null}
      </div>
    </div>
  );
}
