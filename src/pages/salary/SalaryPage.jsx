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
import { useProduct } from "../../context/ProductContext";
import AddProductModal from "../../components/addProductModal/AddProductModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalForItem from "../../components/ModalImageItem/ModalImageItem";
import { TextField } from "@mui/material";
import calendar from "../../images/calendar.png";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function SalaryPage() {
  const { salary, getSalary, getCategories, categories } = useProduct();

  // ! HOOKS
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [isOpen, setIsopen] = useState(false);

  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [word, setWord] = useState("");
  const [before, setBefore] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({
      page,
      limit,
    });
  }, [page, limit, ]);

  useEffect(() => {
    getSalary();
    getCategories();
  }, [page, limit ]);
  // !PAGINATION
  const count = Math.ceil(salary.count / limit);
  const handleChange = (e, value) => {
    setPage(value);
  };

  // !FUNCTIONS
  const staffs = [1];
  function createData(code, title, category, proba) {
    return {
      code,
      title,
      category,
      proba,
    };
  }
  let rows;

  if (salary.results) {
    rows = salary.results.map((elem) =>
      createData(
        elem.id ? elem.id : "Без баркода",
        elem.date_start ? elem.date_start : "Без название",
        elem.date_end ? elem.date_end : "Без категроии",
        <>
          <img
            src={Eye}
            style={{ cursor: "pointer" }}
            onClick={() => getOnePage(elem.id)}
            alt=""
          />

          <ModeOutlinedIcon sx={{color:"#576ED0", marginLeft:"5px"}} />

          <DeleteOutlinedIcon sx={{color:"#576ED0"}}/>
        </>
      )
    );
  }

  const getOnePage = (id) => {
    navigate(`/detail/${id}`);
  };

  const closeModal = () => {
    setIsopen(false);
  };

  console.log(rows);
  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Зарплатная ведомость</div>
          <div
            style={{ width: "350px" }}
            onClick={() => setIsopen(true)}
            className="Staff__title_btn"
          >
            <img src={plus} alt="" /> Добавить зарплатную ведомость
          </div>
        </div>
        <div className="Staff__filtration">
          <div className="Staff__filtration_select">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen3(!isOpen3)}
              className="HomePage__container__statistik__solds__dates__date"
            >
              Дата
              <img src={calendar} alt="" />
              {isOpen3 ? (
                <div className="modalHome">
                  <div className="modal__text">От</div>
                  <input
                    className="modal__input"
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                  <div className="modal__text">до</div>
                  <input
                    className="modal__input"
                    type="text"
                    value={before}
                    onChange={(e) => setBefore(e.target.value)}
                  />
                  <button
                    className="modal__btn"
                    onClick={() => setIsOpen3(!isOpen3)}
                  >
                    Отправить
                  </button>
                </div>
              ) : null}
            </div>
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
                    ID
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
                    Дата от
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
                    Дата до
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
        {isOpen ? (
          <AddProductModal isOpen={isOpen} closeModal={closeModal} />
        ) : null}
      </div>
    </div>
  );
}
