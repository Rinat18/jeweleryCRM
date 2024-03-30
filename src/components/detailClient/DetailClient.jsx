import React, { useEffect, useState } from "react";
import "./DetailClient.scss";
import { useClient } from "../../context/ClientContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import img from "../../images/photo library.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useProduct } from "../../context/ProductContext";
import Modal from "../ModalImage/ModalImage";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditClientModal from "../editClientModal/EditClient";

export default function DetailClient() {
  const { id } = useParams();
  const { getOneClient, clients, oneClient, deleteClient } = useClient();
  const { products } = useProduct();
  const navigate = useNavigate()
  // ! HOOKS

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  useEffect(() => {
    getOneClient(id);
  }, []);
  console.log(clients);
  const [page, setPage] = useState(1);

  //! TABLE 1

  const staffs = [1];
  function createData1(full_name, address, phone) {
    return {
      full_name,
      address,
      phone,
    };
  }

  console.log(oneClient);

  const rows1 = [
    // createData1(121212, "12/12/23", "10 000 сом"),
    // createData1(121212, "12/12/23", "10 000 сом"),
    // createData1(121212, "12/12/23", "10 000 сом"),
  ];
  //! TABLE 2
  function createData(
    code,
    title,
    category,
    proba,
    images,
    weight,
    size,
    cost
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
    };
  }

  const rows = [
    createData(
      "Toi Et Moi",
      "Кольца",
      "15 000 сом",
      925,
      "01/01/23",
      "3 месяца",
      "01/01/23",
      "01/01/23"
    ),
    createData(
      "Toi Et Moi",
      "Кольца",
      "15 000 сом",
      925,
      "01/01/23",
      "3 месяца",
      "01/01/23",
      "01/01/23"
    ),
    createData(
      "Toi Et Moi",
      "Кольца",
      "15 000 сом",
      925,
      "01/01/23",
      "3 месяца",
      "01/01/23",
      "01/01/23"
    ),
    createData(
      "Toi Et Moi",
      "Кольца",
      "15 000 сом",
      925,
      "01/01/23",
      "3 месяца",
      "01/01/23",
      "01/01/23"
    ),
    createData(
      "Toi Et Moi",
      "Кольца",
      "15 000 сом",
      925,
      "01/01/23",
      "3 месяца",
      "01/01/23",
      "01/01/23"
    ),
  ];
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

  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen2(false);
  };

  const closeModal3 = () => {
    setIsopen3(false);
  };

  const deleteStafff = () => {
    deleteClient(id);
    navigate(-1);
    setIsopen3(false);
  };
  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Просмотр информации клиента</div>
          <div className="Staff__info_btns">
            <div
              onClick={() => setIsOpen2(true)}
              className="Staff__info_btns_btn1"
            >
              <ModeOutlinedIcon /> Редактировать
            </div>
            <div
              onClick={() => setIsopen3(true)}
              className="Staff__info_btns_btn2"
            >
              <DeleteOutlinedIcon /> Удалить
            </div>
          </div>
          <div></div>
        </div>
        <div class="client-card">
          <div class="client-photo">
            {oneClient.images > [] ? (
              <img
                onClick={() => setIsOpen(true)}
                src={oneClient.images[0].image}
                alt="Client"
              />
            ) : (
              <div className="notImage">
                <img src={img} />
                <span class="input-file-btn">Нет фото</span>
              </div>
            )}
          </div>
          <div class="client-info">
            <div class="info-column">
              <p>ФИО:</p>
              <span id="name">{oneClient.full_name}</span>
            </div>
            <div class="info-column">
              <p>Платежеспособность:</p>
              <span>{oneClient.solvency ? "Да" : "Нет"}</span>
            </div>
            <div class="info-column">
              <p>ИНН:</p>
              <span>{oneClient.inn}</span>
            </div>
            <div class="info-column">
              <p>Номер телефона:</p>
              <span>{oneClient.phone}</span>
            </div>
            <div class="info-column">
              <p>Адрес:</p>
              <span>{oneClient.address}</span>
            </div>
          </div>
        </div>
        <div class="client-bio">
          <div class="info-column">
            <p>Примечание:</p>
            <span>{oneClient.note ? oneClient.note : ""}</span>
          </div>
        </div>
        <div className="HomePage__container__title__Statistik DetailPage__container__title2 ">
          Статистика
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
                    Дата
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
                    Цена
                  </TableCell>
                </TableRow>
              </TableHead>
              {rows1.length > 0 ? (
                <TableBody>
                  {rows1.map((row) => (
                    <TableRow
                      key={row.full_name}
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
                    </TableRow>
                  ))}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          {rows1.length == 0 ? (
            <div className="rowsNOTdata">Нет данных</div>
          ) : null}
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

        <div className="HomePage__container__title__Statistik DetailPage__container__title2 ">
          История покупок в рассрочку
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
                    Цена
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
                    Дата покупки
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
                    Срок
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
                    Дата последней оплаты
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
                    Дата окончания
                  </TableCell>
                </TableRow>
              </TableHead>
              {rows.length > 0 ? (
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
                        {row.images}
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
                    </TableRow>
                  ))}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          {rows.length == 0 ? (
            <div className="rowsNOTdata">Нет данных</div>
          ) : null}
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
        {isOpen ? <Modal onClose={onClose} oneClient={oneClient} /> : null}
        {isOpen2 ? (
          <EditClientModal oneClient={oneClient} closeModal={closeModal} />
        ) : null}
        {isOpen3 ? (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Удалить сотрудника {oneClient.full_name}?</h2>
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
    </div>
  );
}
