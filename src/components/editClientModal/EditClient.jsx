import React, { useEffect, useState } from "react";
import img from "../../images/photo library.png";
import { useProduct } from "../../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useClient } from "../../context/ClientContext";
import { convertImageToBlob, convertImageUrlToFile } from "../../consts/const";

export default function EditClientModal({ oneClient, closeModal }) {
  const { editClient } = useClient();
  const navigate = useNavigate()

  // ! HOOKS

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [inn, setInn] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [note, setNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [imm, setImm] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  console.log(oneClient);

  useEffect(() => {
    if (oneClient) {
      setName(oneClient.full_name);
      setPhone(oneClient.phone);
      setAddress(oneClient.address);
      setPayment(oneClient.solvency);
      setNote(oneClient.note);
      setInn(oneClient.inn);

      if (oneClient.images.length > 0) {
        const promises = oneClient.images.map((imageData) => {
          return convertImageUrlToFile(imageData.image);
        });

        Promise.all(promises)
          .then((files) => {
            // files содержит массив файлов для всех изображений
            // Здесь вы можете обработать каждый файл, например, установить состояние
            // или выполнить другие действия с файлами
            setImm({
              ...imm,
              image1: files[0], // Устанавливаем первое изображение
              image2: files[1],
              image3: files[2],
              image4: files[3],
              image5: files[4],
            });
            // Если у вас есть другие изображения, обработайте их аналогичным образом
          })
          .catch((error) => {
            console.error("Ошибка при загрузке изображений:", error);
          });
      }
    }
  }, [oneClient]);


  console.log(imm);

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
    if (imm.image1 !== null) {
      formData.append("images[0]image", imm.image1);
      if (imm.image2 !== null) {
        formData.append("images[1]image", imm.image2);
        if (imm.image3 !== null) {
          formData.append("images[2]image", imm.image3);
          if (imm.image4 !== null) {
            formData.append("images[3]image", imm.image4);
            if (imm.image5 !== null) {
              formData.append("images[4]image", imm.image5);
            }
          }
        }
      }
    }
    editClient(oneClient.id, formData);
    navigate(-1)
    closeModal();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImm({
      ...imm, // Копируем предыдущее состояние
      image1: file, // Устанавливаем новое значение для image1
    });
    setSelectedImage(file);
  };

  const [selectedImage2, setSelectedImage2] = useState(null);

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setSelectedImage2(file);
  };
  const [selectedImage3, setSelectedImage3] = useState(null);

  const handleImageChange3 = (event) => {
    const file = event.target.files[0];
    setSelectedImage3(file);
  };
  const [selectedImage4, setSelectedImage4] = useState(null);

  const handleImageChange4 = (event) => {
    const file = event.target.files[0];
    setSelectedImage4(file);
  };
  const [selectedImage5, setSelectedImage5] = useState(null);

  const handleImageChange5 = (event) => {
    const file = event.target.files[0];
    setSelectedImage5(file);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setImm((prevState) => {
      const newState = { ...prevState };

      if (files.length > 0) {
        newState.image1 = files[0];

        if (files.length > 1) {
          newState.image2 = files[1];

          if (files.length > 2) {
            newState.image3 = files[2];
            if (files.length > 3) {
              newState.image4 = files[3];
              if (files.length > 4) {
                newState.image5 = files[4];
              }
            }
          }
        }
      }

      return newState;
    });

    console.log(files.length);
  };
  console.log(imm);
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Изменить клиента</h2>
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
                  <option value={payment}>{payment ? "Да" : "Нет"}</option>
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
                      name="files"
                      onChange={handleImageChange}
                    />
                    <img src={img} />
                    <span class="input-file-btn">Выберите файл</span>
                  </label>
                </form>
                {imm.image1 && (
                  <div
                    onClick={() => setImm({ ...imm, image1: null })}
                    className="selectedImg"
                  >
                    <img
                      src={URL.createObjectURL(imm.image1)}
                      alt="Выбранное изображение"
                    />
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
                  {imm.image2 && (
                    <div
                      onClick={() => setImm({ ...imm, image2: null })}
                      className="selectedImg"
                    >
                      <img
                        src={URL.createObjectURL(imm.image2)}
                        alt="Выбранное изображение"
                      />
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
                  {imm.image3 && (
                    <div
                      onClick={() => setImm({ ...imm, image3: null })}
                      className="selectedImg"
                    >
                      <img
                        src={URL.createObjectURL(imm.image3)}
                        alt="Выбранное изображение"
                      />
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
                  {imm.image4 && (
                    <div
                      onClick={() => setImm({ ...imm, image4: null })}
                      className="selectedImg"
                    >
                      <img
                        src={URL.createObjectURL(imm.image4)}
                        alt="Выбранное изображение"
                      />
                    </div>
                  )}
                </div>
                <div className="chooseImages__box1">
                  <form method="post" enctype="multipart/form-data">
                    <label class="input-file">
                      <input
                        type="file"
                        name="file"
                        multiple
                        onChange={handleFileChange}
                      />
                      <img src={img} />
                      <span class="input-file-btn">Выберите файлы</span>
                    </label>
                  </form>
                  {imm.image5 && (
                    <div className="selectedImg">
                      <img
                        onClick={() => setImm({ ...imm, image5: null })}
                        src={URL.createObjectURL(imm.image5)}
                        alt="Выбранное изображение"
                      />
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
