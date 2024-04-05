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
import calendar from "../../images/calendar.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

export default function MetalPage() {
  const { getMetall, metal } = useProduct();

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(4);
  const [isOpen3, setIsOpen3] = useState(false);
  const [word, setWord] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({
      page,
      limit,
    });
    getMetall();
  }, [page, limit, category, search]);

  // !PAGINATION
  const count = Math.ceil(metal.count / limit);
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
  let rows;

  if (metal.results) {
    rows = metal.results.map((elem) =>
      createData(
        elem.id ? elem.id : "Без ID",
        elem.cash.created_at ? elem.cash.created_at : "Без даты",
        elem.sample_number ? elem.sample_number : "Без пробы",
        elem.total_sum ? elem.total_sum : "Без цены",
        elem.total_quantity ? elem.total_quantity : "Без название",
        elem.lost_items ? elem.lost_items : "Без категроии",
        elem.lost_items ? elem.lost_items : "Без категроии"
      )
    );
  }

  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Металл</div>
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
                    Проба{" "}
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
                    Сумма
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
                    Вес{" "}
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
                    Менеджер
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
      </div>
    </div>
  );
}
