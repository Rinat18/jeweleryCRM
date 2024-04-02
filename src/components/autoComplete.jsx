import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { useClient } from "../context/ClientContext";

const AutocompleteComponent = () => {
  const { getClients, clients } = useClient();

  useEffect(() => {
    getClients(1, 100);
  }, []);

  const [value, setValue] = useState("");
  const [selectedClient, setSelectedClient] = useState(null); // Состояние для хранения выбранного клиента
  const [suggestions, setSuggestions] = useState([]);

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
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.full_name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected} // Добавляем обработчик выбора опции
      />
      {selectedClient && (
        <div>Выбранный клиент: {selectedClient.full_name}</div>
      )}
    </div>
  );
};

export default AutocompleteComponent;
