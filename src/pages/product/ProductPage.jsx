import React, { useEffect, useState } from "react";
import plus from "../../images/plus.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Eye from "../../images/eyeBlue.png";
import SSearch from "../../images/search-sm.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../staff/Staff.scss";
import "./ProductPage.scss";
import { useProduct } from "../../context/ProductContext";
import AddProductModal from "../../components/addProductModal/AddProductModal";
import { useNavigate } from "react-router-dom";
import ModalForItem from "../../components/ModalImageItem/ModalImageItem";

export default function ProductPage() {
  const { products, getProducts, getCategories, categories } = useProduct();

  // console.log(categories);
  // ! HOOKS
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(4);
  const [inStock, setInStock] = useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts(page, limit, category, inStock, search);
    getCategories();
    console.log(search);
  }, [page, limit, category, inStock, search]);
  // !PAGINATION
  const count = Math.ceil(products.count / limit);
  const handleChange = (e, value) => {
    setPage(value);
  };

  // !FUNCTIONS
  const staffs = [1];
  function createData(
    code,
    title,
    category,
    proba,
    images,
    weight,
    size,
    cost,
    used,
    nalichii,
    action
  ) {
    return {
      code,
      title,
      category,
      proba,
      images,
      weight,
      size,
      cost,
      used,
      nalichii,
      action,
    };
  }

  console.log(inStock);
  console.log(products);
  let rows;

  if (products.results) {
    rows = products.results.map((elem) =>
      createData(
        elem.barcode ? elem.barcode : "Без баркода",
        elem.title ? elem.title : "Без название",
        elem.category.name ? elem.category.name : "Без категроии",
        elem.sample_number ? elem.sample_number : "Без пробы",
        elem.images ? elem.images : "Без фотографии",
        elem.weight ? elem.weight : "Без весса",
        elem.size ? elem.size : "Без размера",
        elem.cost_price ? elem.cost_price : "0",
        elem.used ? "б/у" : "новый",
        elem.in_stock ? "есть" : "нету",
        <>
          <img
            src={Eye}
            style={{ cursor: "pointer" }}
            onClick={() => getOnePage(elem.id)}
            alt=""
          />
        </>
      )
    );
  }

  console.log(rows);
  const getOnePage = (id) => {
    navigate(`/detail/${id}`);
  };

  const closeModal = () => {
    setIsopen(false);
  };
  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Товары</div>
          <div onClick={() => setIsopen(true)} className="Staff__title_btn">
            {" "}
            <img src={plus} alt="" /> Добавить товар
          </div>
        </div>
        <div className="Staff__filtration">
          <div className="Staff__filtration_select">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="Staff__filtration_select_select1"
              name=""
              id=""
            >
              <option value="">Выберите категрию</option>

              {categories.map((elem) => (
                <option value={elem.id}>{elem.slug}</option>
              ))}
              <option value="Necklace">Ожерелье</option>
              <option value="Earrings">Серьги</option>
            </select>
            <select
              onChange={(e) =>
                e.target.value == "true" ? setInStock(true) : setInStock(false)
              }
              className="Staff__filtration_select_select2"
            >
              <option value="true">В наличии</option>
              <option value="false">Отсутствует</option>
            </select>
          </div>
          <div className="Staff__filtration__input">
            <img
              src={SSearch}
              className="Staff__filtration__input_img"
              alt=""
            />
            <input
              type="text"
              placeholder="Поиск"
              onChange={(e) => setSearch(e.target.value)}
              className="Staff__filtration__input_input"
            />
          </div>
        </div>
        <div className="Staff__table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#3C3A38" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Код
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Наименование
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Категория{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Проба
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Фото{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Вес
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Размер{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Себестоимость
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Б/У
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    В наличии
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: "1px solid white",
                      color: "white",
                      fontFamily: "Manrope",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    Действия
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  ? rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.code}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.category}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.proba}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {/* {row.images.map((e) => (
                        <></>
                      ))} */}
                          <img
                            onClick={() => setIsopen2(true)}
                            style={{ width: "50px" }}
                            src={row.images.map((e) => e.image)}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.weight}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.size}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.cost}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.used}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.nalichii}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.action}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          {!rows ? <div className="rowsNOTdata">Нет данных</div> : null}
        </div>
        <div className="Staff__pagination">
          <div className="Staff__pagination_paginations">
            {" "}
            <Stack spacing={2}>
              <Pagination
                onChange={handleChange}
                count={count}
                color="primary"
              />
            </Stack>
          </div>
          <div className="Staff__pagination__page">
            <div className="Staff__pagination__page_text">
              Показать в таблице
            </div>
            <div className="Staff__pagination__page_number">
              <input
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                type="number"
              />
            </div>
          </div>
        </div>
        {isOpen ? (
          <AddProductModal isOpen={isOpen} closeModal={closeModal} />
        ) : null}
      </div>
    </div>
  );
}
