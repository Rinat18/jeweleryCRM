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
import search from "../../images/search-sm.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../staff/Staff.scss";
import "./ProductPage.scss";
import { useProduct } from "../../context/ProductContext";
import AddProductModal from "../../components/addProductModal/AddProductModal";

export default function ProductPage() {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts(page);
  }, []);
  console.log(products);
  // ! HOOKS
  const [page, setPage] = useState(1);
  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  // !PAGINATION
  const tables = [1, 2, 3, 4];
  const itemPerPage = 1;

  const count = Math.ceil(tables.length / itemPerPage);
  // console.log(count);
  const currentData = () => {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return tables.slice(begin, end);
  };

  // !FUNCTIONS
  const staffs = [1];
  function createData(
    name,
    JobTitle,
    phone,
    adres,
    data,
    salary,
    percent,
    action
  ) {
    return { name, JobTitle, phone, adres, data, salary, percent, action };
  }
  const rows = products.map((elem) =>
    createData(
      elem.full_name ? elem.full_name : "Без именни",
      elem.position ? elem.position : "Без должности",
      elem.phone ? elem.phone : "Без номера",
      elem.address ? elem.address : "Без адресса",
      elem.date_joined ? elem.date_joined : "Нету данных",
      elem.salary ? elem.salary : "Без Оклада",
      elem.percentage_of_the_sale
        ? elem.percentage_of_the_sale
        : "Без процента",
      <>
        <img src={Eye} alt="" />
      </>
    )
  );

  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
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
            <select className="Staff__filtration_select_select1" name="" id="">
              <option value="" disabled selected>
                Кольца
              </option>
              <option value="Necklace">Ожерелье</option>
              <option value="Earrings">Серьги</option>
            </select>
            <select className="Staff__filtration_select_select2" name="" id="">
              <option value="" disabled selected>
                В наличии
              </option>
              <option value="none">Отсутствует</option>
            </select>
          </div>
          <div className="Staff__filtration__input">
            <img src={search} className="Staff__filtration__input_img" alt="" />
            <input
              type="text"
              placeholder="Поиск"
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.JobTitle}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.adres}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.data}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.salary}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.percent}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.percent}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.percent}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.percent}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="Staff__pagination">
          <div className="Staff__pagination_paginations">
            {" "}
            <Stack spacing={2}>
              <Pagination
                count={count}
                color="primary"
                onChange={handleChange}
              />
            </Stack>
          </div>
          <div className="Staff__pagination__page">
            <div className="Staff__pagination__page_text">
              Показать в таблице
            </div>
            <div className="Staff__pagination__page_number">{page}</div>
          </div>
        </div>
        {isOpen ? (
          <AddProductModal isOpen={isOpen} closeModal={closeModal} />
        ) : null}
      </div>
    </div>
  );
}
