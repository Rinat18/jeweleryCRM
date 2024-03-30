import React, { useEffect, useState } from "react";
import img from "../../images/photo library.png";
import { useProduct } from "../../context/ProductContext";
import { useParams } from "react-router-dom";
import { convertImageUrlToFile } from "../../consts/const";

export default function EditProductModal({ isOpen, closeModal }) {
  const { categories, oneproduct, editProduct } = useProduct();
  const { id } = useParams();

  //! STATE
  const [category, setCategory] = useState("");
  const [barcode, setBarcode] = useState("");
  const [title, setTitle] = useState("");
  const [sample_number, setSample_number] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [cost_price, setCost_price] = useState("");
  const [used, setUsed] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [selectedImage5, setSelectedImage5] = useState(null);

  //! HOOKS
  useEffect(() => {
    if (oneproduct) {
      setCategory(oneproduct.category.id);
      setBarcode(oneproduct.barcode);
      setTitle(oneproduct.title);
      setSample_number(oneproduct.sample_number);
      setWeight(oneproduct.weight);
      setSize(oneproduct.size);
      setCost_price(oneproduct.cost_price);
      setUsed(oneproduct.used);
      setImages(oneproduct.images);
      if (oneproduct.images.length > 0) {
        const promises = oneproduct.images.map((imageData) => {
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
  }, [oneproduct]);

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
    editProduct(id, formData);
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

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setSelectedImage2(file);
  };

  const handleImageChange3 = (event) => {
    const file = event.target.files[0];
    setSelectedImage3(file);
  };

  const handleImageChange4 = (event) => {
    const file = event.target.files[0];
    setSelectedImage4(file);
  };

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
  console.log(selectedImage);
  const deleteImg = (id) => {
    if (selectedImage.id == id) {
      setSelectedImage(null);
      setImages([]);
    }
  };
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
                  <option value={oneproduct.category.id}>
                    {oneproduct.category.name}
                  </option>
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
                  <option value={used}>{used ? "новый" : "б/у"}</option>
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
              <label>
                Наличие
                <select
                  value={category}
                  onChange={(e) => setBarcode(e.target.value)}
                >
                  <option value={oneproduct.barcode}>
                    {oneproduct.barcode ? "В наличии" : "Нету в наличии"}
                  </option>
                  <option value={oneproduct.barcode}>В наличии</option>
                  <option value="false">Нету в наличии</option>
                </select>
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
          <button onClick={handleSubmit} type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
