import React, { useEffect, useState } from "react";
import "../addStaffModal/AddStaff.scss";
import { useStaff } from "../../context/StaffContext";

function EditEmployeeModal({ isOpen, closeModal, onAdd }) {
  const { oneStaff, editStaff } = useStaff();
  useEffect(() => {
    if (oneStaff) {
      setName(oneStaff.full_name);
      setPosition(oneStaff.position);
      setPercent(oneStaff.percentage_of_the_sale);
      setPhone(oneStaff.phone);
      setAddress(oneStaff.address);
      setSalary(oneStaff.salary);
      setPassword(oneStaff.password);
    }
  }, [oneStaff]);
  console.log(oneStaff);
  const [name, setName] = useState(oneStaff ? oneStaff.full_name : "");
  const [position, setPosition] = useState(oneStaff ? oneStaff.position : "");
  const [percent, setPercent] = useState(
    oneStaff ? oneStaff.percentage_of_the_sale : ""
  );
  const [phone, setPhone] = useState(oneStaff ? oneStaff.phone : "");
  const [address, setAddress] = useState(oneStaff ? oneStaff.address : "");
  const [salary, setSalary] = useState(oneStaff ? oneStaff.salary : "");
  const [password, setPassword] = useState(oneStaff ? oneStaff.password : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("percentage_of_the_sale", percent);
    formData.append("password", password);
    editStaff(oneStaff.id,formData);
    closeModal();
  };
  console.log(isOpen);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Редактировать данные сотрудника</h2>
        <form className="addStaffModalForm" onSubmit={handleSubmit}>
          <div>
            <label>
              ФИО
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Номер телефона
              <input
                type="select"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label>
              Оклад
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </label>
            <label>
              Пароль
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Должность
              <input
                type="select"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </label>
            <label>
              Адрес
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              Процент за продажу
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
              />
            </label>
            <label>
              Подтвердить пароль
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </form>
        <button onClick={handleSubmit} type="submit">
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
