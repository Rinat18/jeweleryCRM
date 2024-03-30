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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useClient } from "../../context/ClientContext";
import AddClient from "../../components/addClientModal/AddClient";
import ModalForItem from "../../components/ModalImageItem/ModalImageItem";

export default function Client() {
  const { getClients, clients, getOneClient } = useClient();

  console.log(clients.results);
  // ! HOOKS
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  const [imagess, setImagess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getClients(page, limit);
  }, [page, limit]);

  // !PAGINATION
  const count = Math.ceil(clients.count / limit);
  const handleChange = (e, value) => {
    setPage(value);
  };

  // !FUNCTIONS
  function createData(
    full_name,
    address,
    phone,
    images,
    note,
    solvency,
    inn,
    action
  ) {
    return {
      full_name,
      address,
      phone,
      images,
      note,
      solvency,
      inn,
      action,
    };
  }

  let rows;

  if (clients.results) {
    rows = clients.results.map((elem) =>
      createData(
        elem.full_name ? elem.full_name : "Без Имени",
        elem.address ? elem.address : "Без Адресса",
        elem.phone ? elem.phone : "Без Номера",
        elem.images ? elem.images : "Без Фото",
        elem.note ? elem.note : "Без Описания",
        elem.solvency ? "Да" : "Нет",
        elem.inn ? elem.inn : "Без данных",
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
    console.log(rows);
  }

  const getOnePage = (id) => {
    navigate(`/detailClient/${id}`);
  };

  const closeModal = () => {
    setIsopen(false);
  };
  const closeModal2 = () => {
    setIsopen2(false);
  };

  const openModal2 = (i) => {
    setIsopen2(true);
    setImagess(i);
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
                {rows
                  ? rows.map((row) => (
                      <TableRow
                        key={row.full_name}
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
                          {row.full_name}
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
                          {row.images[0] ? (
                            <img
                              onClick={() => openModal2(row.images)}
                              style={{ width: "50px" }}
                              src={row.images[0].image}
                            />
                          ) : (
                            <div>Нету фотографии</div>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.note}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Manrope",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                          align="center"
                        >
                          {row.solvency}
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
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          {rows ? (
            rows.length == 0 ? (
              <div className="rowsNOTdata">Нет данных</div>
            ) : null
          ) : null}
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
        {isOpen ? <AddClient isOpen={isOpen} closeModal={closeModal} /> : null}
        {isOpen2 ? (
          <ModalForItem imagess={imagess} closeModal2={closeModal2} />
        ) : null}
      </div>
    </div>
  );
}
