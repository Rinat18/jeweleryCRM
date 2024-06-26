import React, { useState } from "react";
import img from "../../images/photo library.png";
import { useProduct } from "../../context/ProductContext";

export default function AddProductModal({ isOpen, closeModal }) {
  const { categories, addProduct } = useProduct();

  const [category, setCategory] = useState("");
  const [barcode, setBarcode] = useState("");
  const [title, setTitle] = useState("");
  const [sample_number, setSample_number] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [cost_price, setCost_price] = useState("");
  const [used, setUsed] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [imm, setImm] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", 5);
    formData.append("barcode", barcode);
    formData.append("title", title);
    formData.append("sample_number", sample_number);
    formData.append("weight", weight);
    formData.append("size", size);
    formData.append("cost_price", cost_price);
    formData.append("used", used);
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
    console.log(imm);
    addProduct(formData);
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
    // if (files.length > 0) {
    //   // setSelectedImage(files[0]);
    //   setImm({
    //     ...imm, // Копируем предыдущее состояние
    //     image1: files[0], // Устанавливаем новое значение для image1
    //   });
    //   if (files.length > 1) {
    //     // setSelectedImage2(files[1]);
    //     setImm({
    //       ...imm, // Копируем предыдущее состояние
    //       image2: files[1], // Устанавливаем новое значение для image1
    //     });
    //     if (files.length > 2) {
    //       // setSelectedImage3(files[2]);
    //       setImm({
    //         ...imm, // Копируем предыдущее состояние
    //         image3: files[2], // Устанавливаем новое значение для image1
    //       });
    //       if (files.length > 3) {
    //         // setSelectedImage4(files[3]);
    //         setImm({
    //           ...imm, // Копируем предыдущее состояние
    //           image4: files[3], // Устанавливаем новое значение для image1
    //         });
    //         if (files.length > 4) {
    //           // setSelectedImage5(files[4]);
    //           setImm({
    //             ...imm, // Копируем предыдущее состояние
    //             image5: files[4], // Устанавливаем новое значение для image1
    //           });
    //         }
    //       }
    //     }
    //   }
    // }

    // Создаем функцию для обновления состояния
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
  console.log(selectedImage);

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Добавить товар</h2>
          <form className="addStaffModalForm" onSubmit={handleSubmit}>
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
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((elem) => (
                    <option value={elem.id}>{elem.name}</option>
                  ))}
                </select>
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
                <select
                  type="select"
                  value={used}
                  onChange={(e) => setUsed(e.target.value)}
                >
                  <option value="true">б/у</option>
                  <option value="false">новый</option>
                </select>
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
                    <div
                      onClick={() => setImm({ ...imm, image5: null })}
                      className="selectedImg"
                    >
                      <img
                        src={URL.createObjectURL(imm.image5)}
                        alt="Выбранное изображение"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <button onClick={handleSubmit} type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
