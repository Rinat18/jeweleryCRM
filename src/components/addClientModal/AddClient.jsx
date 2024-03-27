import React, { useState } from "react";
import img from "../../images/photo library.png";
import { useProduct } from "../../context/ProductContext";
import { useClient } from "../../context/ClientContext";

export default function AddClient({ isOpen, closeModal }) {
  const { addClient } = useClient();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setInn] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [note, setNote] = useState("");
  const [images, setImages] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("solvency", payment == "Да" ? true : false);
    formData.append("inn", inn);
    formData.append("note", note);
    formData.append("id", Math.floor(Math.random() * 100));
    formData.append("images", images);
    addClient(formData);
    closeModal();
  };
  console.log(isOpen);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setImages(...images, {
        id: Math.random(),
        image: reader.result,
        product: Math.random(),
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [selectedImage2, setSelectedImage2] = useState(null);

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage2(reader.result);
      setImages(...images, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const [selectedImage3, setSelectedImage3] = useState(null);

  const handleImageChange3 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage3(reader.result);
      setImages(...images, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const [selectedImage4, setSelectedImage4] = useState(null);

  const handleImageChange4 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage4(reader.result);
      setImages(...images, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const [selectedImage5, setSelectedImage5] = useState(null);

  const handleImageChange5 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage5(reader.result);
      setImages(...images, reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Добавить клиента</h2>
          <form className="addStaffModalForm" onSubmit={handleSubmit}>
            <div>
              <label>
                ФИО*
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                ИНН
                <input
                  type="text"
                  value={inn}
                  onChange={(e) => setInn(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Номер телефона*
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label>
                Платежеспособность
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="true">Да</option>
                  <option value="false">Нет</option>
                </select>
              </label>
              <label>
                Примечание
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>
            </div>
          </form>
          <div>
            <div className="chooseImage">
              <div className="chooseImage__box1">
                <form method="post" enctype="multipart/form-data">
                  <label class="input-file">
                    <input
                      type="file"
                      name="file"
                      onChange={handleImageChange}
                    />
                    <img src={img} />
                    <span class="input-file-btn">Выберите файл</span>
                  </label>
                </form>
                {selectedImage && (
                  <div className="selectedImg">
                    <img src={selectedImage} alt="Выбранное изображение" />
                  </div>
                )}
              </div>
              <div className="chooseImages">
                <div className="chooseImages__box1">
                  <form method="post" enctype="multipart/form-data">
                    <label class="input-file">
                      <input
                        type="file"
                        name="file"
                        onChange={handleImageChange2}
                      />
                      <img src={img} />
                      <span class="input-file-btn">Выберите файл</span>
                    </label>
                  </form>
                  {selectedImage2 && (
                    <div className="selectedImg">
                      <img src={selectedImage2} alt="Выбранное изображение" />
                    </div>
                  )}
                </div>
                <div className="chooseImages__box1">
                  <form method="post" enctype="multipart/form-data">
                    <label class="input-file">
                      <input
                        type="file"
                        name="file"
                        onChange={handleImageChange3}
                      />
                      <img src={img} />
                      <span class="input-file-btn">Выберите файл</span>
                    </label>
                  </form>
                  {selectedImage3 && (
                    <div className="selectedImg">
                      <img src={selectedImage3} alt="Выбранное изображение" />
                    </div>
                  )}
                </div>
                <div className="chooseImages__box1">
                  <form method="post" enctype="multipart/form-data">
                    <label class="input-file">
                      <input
                        type="file"
                        name="file"
                        onChange={handleImageChange4}
                      />
                      <img src={img} />
                      <span class="input-file-btn">Выберите файл</span>
                    </label>
                  </form>
                  {selectedImage4 && (
                    <div className="selectedImg">
                      <img src={selectedImage4} alt="Выбранное изображение" />
                    </div>
                  )}
                </div>
                <div className="chooseImages__box1">
                  <form method="post" enctype="multipart/form-data">
                    <label class="input-file">
                      <input
                        type="file"
                        name="file"
                        onChange={handleImageChange5}
                      />
                      <img src={img} />
                      <span class="input-file-btn">Выберите файл</span>
                    </label>
                  </form>
                  {selectedImage5 && (
                    <div className="selectedImg">
                      <img src={selectedImage5} alt="Выбранное изображение" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
