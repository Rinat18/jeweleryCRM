import React, { useEffect, useState } from "react";
import "../addStaffModal/AddStaff.scss";
import { useStaff } from "../../context/StaffContext";

function EditEmployeeModal({ closeModal }) {
  const { oneStaff, editStaff, getPositions, positions } = useStaff();
  useEffect(() => {
    if (oneStaff) {
      setName(oneStaff.full_name);
      if (oneStaff.position) {
        setPosition(oneStaff.position.slug);
      }
      setPercent(oneStaff.percentage_of_the_sale);
      setPhone(oneStaff.phone);
      setAddress(oneStaff.address);
      setSalary(oneStaff.salary);
      setPassword(oneStaff.password);
    }
    getPositions();
  }, [oneStaff]);
  console.log(positions);
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [percent, setPercent] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [salary, setSalary] = useState();
  const [password, setPassword] = useState();

  console.log(oneStaff);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("phone", phone);
    formData.append("position", +position);
    formData.append("address", address);
    formData.append("salary", salary);
    formData.append("percentage_of_the_sale", percent);
    formData.append("password", "12345678");
    formData.append("confirm_password", "12345678");
    editStaff(46, formData);
    // closeModal();
  };
  console.log(positions);
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
                type="text"
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
              <select
                onChange={(e) => setPosition(e.target.value)}
                name=""
                id=""
              >
                <option value="">Выберите должность</option>

                {positions &&
                  positions.map((elem) => (
                    <option value={elem.id}>{elem.name}</option>
                  ))}
              </select>
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
