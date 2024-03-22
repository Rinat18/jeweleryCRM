import React, { useEffect, useState } from "react";
import img from "../../images/photo library.png";
import { useProduct } from "../../context/ProductContext";
import { useParams } from "react-router-dom";

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
        setSelectedImage(oneproduct.images[0].image);
        if (oneproduct.images.length > 1) {
          setSelectedImage2(oneproduct.images[1].image);
        }
        if (oneproduct.images > 2) {
          setSelectedImage3(oneproduct.images[2].image);
        }
        if (oneproduct.images > 3) {
          setSelectedImage4(oneproduct.images[3].image);
        }
        if (oneproduct.images > 4) {
          setSelectedImage5(oneproduct.images[4].image);
        }
      }
    }
  }, [oneproduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", +category);
    formData.append("barcode", barcode);
    formData.append("title", title);
    formData.append("sample_number", sample_number);
    formData.append("weight", weight);
    formData.append("size", size);
    formData.append("cost_price", cost_price);
    formData.append("used", used);
    formData.append("images", images);
    // console.log(formData.barcode);
    console.log(images);
    editProduct(id, formData);
    // closeModal();
  };
  console.log(isOpen);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setImages(...images, {
        id: Math.random(),
        image: reader.result,
        product: Math.floor(Math.random() * 5),
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage2(reader.result);
      setImages(...images, {
        id: Math.random(),
        image: reader.result,
        product: Math.floor(Math.random() * 5),
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
  console.log(images);

  const deleteImg = (id) => {
    if (selectedImage.id == id) {
      setSelectedImage(null);
      setImages([])
    }
  };
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
                      name="file"
                      onChange={handleImageChange}
                    />
                    <img src={img} />
                    <span class="input-file-btn">Выберите файл</span>
                  </label>
                </form>
                {selectedImage && (
                  <div
                    onClick={() => deleteImg(selectedImage.id)}
                    className="selectedImg"
                  >
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
                    <div
                      onClick={() => deleteImg(selectedImage2.id)}
                      className="selectedImg"
                    >
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
                    <div
                      onClick={() => setSelectedImage3(null)}
                      className="selectedImg"
                    >
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
                    <div
                      onClick={() => setSelectedImage4(null)}
                      className="selectedImg"
                    >
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
                    <div
                      onClick={() => setSelectedImage5(null)}
                      className="selectedImg"
                    >
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
