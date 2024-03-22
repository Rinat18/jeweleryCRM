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
import "../product/ProductPage.scss";
import { useProduct } from "../../context/ProductContext";
import AddProductModal from "../../components/addProductModal/AddProductModal";
import { useNavigate } from "react-router-dom";
import { useClient } from "../../context/ClientContext";

export default function Client() {
  const { products, getProducts, getCategories, getOneProduct } = useProduct();
  const { getClients, clients } = useClient();
  useEffect(() => {
    getClients(page);
  }, []);

  console.log(clients);
  // ! HOOKS
  const [page, setPage] = useState(1);
  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  const navigate = useNavigate();
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
    address,
    phone,
    img,
    description,
    payment,
    inn,
    action
  ) {
    return {
      name,
      address,
      phone,
      img,
      description,
      payment,
      inn,
      action,
    };
  }

  const rows = clients.map((elem) =>
    createData(
      elem.name ? elem.name : "Без Имени",
      elem.address ? elem.address : "Без Адресса",
      elem.phone ? elem.phone : "Без Номера",
      elem.image ? elem.image : "Без Фото",
      elem.note ? elem.note : "Без Описания",
      elem.solvency ? elem.solvency : "Без данных",
      elem.inn ? elem.inn : "Без данных",
      <>
        <img src={Eye} onClick={() => getOnePage(elem.id)} alt="" />
      </>
    )
  );
  console.log(rows);
  const getOnePage = (id) => {
    navigate(`/detail/${id}`);
  };
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
          <div className="Staff__title_Text">Клиенты</div>
          <div onClick={() => setIsopen(true)} className="Staff__title_btn">
            {" "}
            <img src={plus} alt="" /> Добавить клиента
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
                    Фио
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
                    Адрес
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
                    Номер телефона
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
                    Фото
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
                    Примечание
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
                    Платежеспособность
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
                    ИНН{" "}
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
                      {row.address}
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
                      <img style={{ width: "50px" }} src={row.image} />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.payment ? "Да" : "Нет"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                      align="center"
                    >
                      {row.inn}
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
