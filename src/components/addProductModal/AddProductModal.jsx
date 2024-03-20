import React, { useState } from "react";

export default function AddProductModal({ isOpen, closeModal }) {
  const [category, setCategory] = useState("");
  const [barcode, setBarcode] = useState("");
  const [title, setTitle] = useState("");
  const [sample_number, setSample_number] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [cost_price, setCost_price] = useState("");
  const [used, setUsed] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("barcode", barcode);
    formData.append("title", title);
    formData.append("sample_number", sample_number);
    formData.append("weight", weight);
    formData.append("size", size);
    formData.append("cost_price", cost_price);
    formData.append("used", used);
    formData.append("images", images);
    // Здесь можно отправить данные или выполнить другие действия
    // onAdd({ name, phone, address, salary, percent, password });
    closeModal();
  };
  console.log(isOpen);
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Добавить товар</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Наименование
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Категория
                <input
                  type="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
              <label>
                Вес
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
              <label>
                Б/У
                <input
                  type="select"
                  value={used}
                  onChange={(e) => setUsed(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Себестоимость
                <input
                  type="number"
                  value={cost_price}
                  onChange={(e) => setCost_price(e.target.value)}
                />
              </label>
              <label>
                Размер
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </label>
              <label>
                Проба
                <input
                  type="text"
                  value={sample_number}
                  onChange={(e) => setSample_number(e.target.value)}
                />
              </label>
            </div>
          </form>
          <div>
            <input type="file" />
          </div>
          <button onClick={handleSubmit} type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
