import React, { useEffect, useState } from "react";
import plus from "../../images/plus.png";
import "./Cash.scss";
import SSearch from "../../images/search-sm.png";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../../images/photo library.png";
import AddIcon from "@mui/icons-material/Add";
import Autosuggest from "react-autosuggest";
import { useClient } from "../../context/ClientContext";
import { useNavigate } from "react-router-dom";

export default function CashAddIncomePage() {
  const { getClients, clients } = useClient();
  const navigate = useNavigate();

  useEffect(() => {
    getClients(1, 100);
  }, []);

  const [value, setValue] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // Состояние для хранения выбранного клиента
  const [suggestions, setSuggestions] = useState([]);
  const [clientss, setClientss] = useState([{ selectedClient }]);

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
  console.log(selectedClient);
  return (
    <div className="HomePage">
      <div className="HomePage__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Добавить приход</div>
        </div>
        <div className="forms">
          <div className="formToAddIncomee">
            <div className="formToAddIncome">
              <div className="formToAddIncome__types">
                <div className="formToAddIncome__types_sell formToAddIncome__types_Active ">
                  Продажа
                </div>
                <div className="formToAddIncome__types_installment">
                  Рассрочка
                </div>
                <div className="formToAddIncome__types_pay">Выплата</div>
                <div className="formToAddIncome__types_exchange">Обмен</div>
              </div>

              <div className="formToAddIncome__clientInputs">
                <div className="formToAddIncome__clientInputs__client">
                  <p>Клиент</p>
                  <div>
                    <img src={SSearch} alt="" />
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      getSuggestionValue={(suggestion) => suggestion.full_name}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                      onSuggestionSelected={onSuggestionSelected} // Добавляем обработчик выбора опции
                    />
                  </div>
                </div>
                <div className="formToAddIncome__clientInputs__manager">
                  <p>Менеджер*</p>
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </div>
              </div>

              <div className="Staff__title_btn formToAddIncome__addClient">
                {" "}
                <img src={plus} alt="" /> Добавить клиента
              </div>
              <div className="formToAddIncome__clientInputs">
                <div className="formToAddIncome__clientInputs__client">
                  <p>Товар*</p>
                  <div>
                    <img src={SSearch} alt="" />
                    <input type="text" />
                  </div>
                </div>
                <div className="formToAddIncome__clientInputs__manager">
                  <p>Сумма*</p>
                  <input type="text" />
                </div>
                <div className="formToAddIncome__clientInputs_delete">
                  <DeleteIcon sx={{ color: "white" }} />
                </div>
              </div>
              <div className="formToAddIncome__paymentType">
                <select name="" id="">
                  <option value="">Способ оплаты</option>
                  <option value="">Способ оплаты</option>
                  <option value="">Способ оплаты</option>
                </select>
                <div>
                  <AddIcon sx={{ color: "#576ED0" }} />
                  Добавить
                </div>
              </div>
            </div>

            <div className="formTotalSum">
              <div className="formTotalSum_tovars">Количество товаров: 16</div>
              <div className="formTotalSum_cost">К оплате: 16 350 сом</div>
            </div>

            <div className="btnToSubmit">Подтвердить</div>
          </div>
          {selectedClient ? (
            <div className="blockToView">
              <div className="blockToView__Left">
                {selectedClient ? (
                  selectedClient.images ? (
                    <>
                      <img src={selectedClient.images[0].image} alt="" />
                    </>
                  ) : null
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
      </div>
    </div>
  );
}
