import React, { useEffect, useState } from "react";
import "./Detailproduct.scss";
import item from "../../images/Item.png";
import stick from "../../images/sticker-circle.svg";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useProduct } from "../../context/ProductContext";
import usePagination from "@mui/material/usePagination/usePagination";
import { useNavigate, useParams } from "react-router-dom";
import EditProductModal from "../editProductModal/EditProduct";
export default function DetailProduct() {
  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);
    const navigate = useNavigate()
  const { id } = useParams();
  const { oneproduct, getOneProduct, deleteProduct, getCategories } =
    useProduct();
  useEffect(() => {
    getOneProduct(id);
    getCategories();
  }, []);
  console.log(oneproduct.images);

  const closeModal = () => {
    setIsopen(false);
  };
  const closeModal3 = () => {
    setIsopen3(false);
  };
  const deleteStafff = () => {
    deleteProduct(id);
    navigate("/product")
    setIsopen3(false);
  };
  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Просмотр товара</div>
        </div>
        <div className="Staff__info">
          <div className="Staff__info_images">
            <div className="Staff__info_images1">
              {oneproduct.images > [] ? (
                oneproduct.images.map((elem) => <img src={elem.image} alt="" />)
              ) : (
                <>
                  <img src={item} alt="" />
                  <img src={item} alt="" />
                  <img src={item} alt="" />
                </>
              )}
            </div>
            <div className="Staff__info_images2">
              {/* {oneproduct.images && (
              )} */}
              {oneproduct.images > [] ? (
                <img src={oneproduct.images[0].image} alt="" />
              ) : (
                <img src={item} alt="" />
              )}
            </div>
          </div>
          <div className="Staff__info_detail">
            <div className="Staff__info_detail__title">Наименование</div>
            <div className="Staff__info_detail__BigTItleBox">
              <div className="Staff__info_detail__BigTItleBox_text">
                {oneproduct.title}
              </div>
              {oneproduct ? (
                <div className="Staff__info_detail__BigTItleBox_btn">
                  В наличии
                </div>
              ) : (
                <div className="Staff__info_detail__BigTItleBox_btn">
                  Нет в наличии
                </div>
              )}
            </div>
            <div className="Staff__info_detail__kods">
              <div className="Staff__info_detail__kods__item">
                <div className="Staff__info_detail__kods__item_text">
                  Код товара
                </div>
                <div className="Staff__info_detail__kods__item_kod">
                  {oneproduct.barcode}
                </div>
              </div>
              <div className="Staff__info_detail__kods__item2">
                <div className="Staff__info_detail__kods__item_text">
                  Себестоимость
                </div>
                <div className="Staff__info_detail__kods__item_kod">
                  {oneproduct.cost_price} сом
                </div>
              </div>
            </div>
            <div className="Staff__info__details">
              <div className="Staff__info__details__keys">
                <span className="Staff__info__details__keys_key">
                  Категория
                </span>
                <span className="Staff__info__details__keys_key">Проба</span>
                <span className="Staff__info__details__keys_key">Размер</span>
                <span className="Staff__info__details__keys_key">Вес</span>
                <span className="Staff__info__details__keys_key">Б/У</span>
              </div>
              <div className="Staff__info__details__dots">
                <div className="Staff__info__details__dots__dot">
                  ...............................................
                </div>
                <div className="Staff__info__details__dots__dot">
                  ...............................................
                </div>
                <div className="Staff__info__details__dots__dot">
                  ...............................................
                </div>
                <div className="Staff__info__details__dots__dot">
                  ...............................................
                </div>
                <div className="Staff__info__details__dots__dot">
                  ...............................................
                </div>
              </div>
              <div className="Staff__info__details__datas">
                <div className="Staff__info__details__datas_data">
                  {oneproduct.category ? oneproduct.category.name : "nnn"}
                </div>
                <div className="Staff__info__details__datas_data">
                  {oneproduct ? oneproduct.sample_number : "nnn"}
                </div>
                <div className="Staff__info__details__datas_data">
                  {oneproduct ? oneproduct.size : "nnn"}
                </div>
                <div className="Staff__info__details__datas_data">
                  {oneproduct ? oneproduct.weight : "nnn"}
                </div>
                <div className="Staff__info__details__datas_data">
                  {oneproduct ? (oneproduct.used ? "Да" : "Нет") : "nnn"}
                </div>
              </div>
            </div>
            <div className="Staff__info_detail__btn">
              <img src={stick} alt="" />
              Распечатать наклейку
            </div>{" "}
          </div>
          <div className="Staff__info_btns">
            <div
              onClick={() => setIsopen(true)}
              className="Staff__info_btns_btn1"
            >
              <ModeOutlinedIcon /> Редактировать
            </div>
            <div onClick={() => setIsopen3(true)} className="Staff__info_btns_btn2">
              {" "}
              <DeleteOutlinedIcon /> Удалить
            </div>
          </div>
        </div>
      </div>
      {isOpen ? <EditProductModal closeModal={closeModal} /> : null}
      {isOpen3 ? (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Удалить сотрудника {oneproduct.title}?</h2>
              <div className="btns">
                <button onClick={closeModal3}>Отменить</button>
                <button onClick={deleteStafff} type="submit">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  );
}
