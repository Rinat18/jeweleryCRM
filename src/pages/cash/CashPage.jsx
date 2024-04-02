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
import { useCash } from "../../context/CashBoxContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function CashPage() {
  const { list, getList } = useCash();
  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(4);
  const [in_stock, setIn_stock] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getList(page, limit);
  }, [page, limit]);

  console.log(list);
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

  if (list.results) {
    rows = list.results.map((elem) =>
      createData(
        elem.id ? elem.id : "Без номера",
        elem.operation.operation_type.name
          ? elem.operation.operation_type.name
          : "Без название",
        elem.created_at ? elem.created_at.slice(0, 10) : "Без даты",
        elem.operation.name ? elem.operation.name : "Без операции",
        elem.total_sum ? elem.total_sum : "Без суммы",
        elem.operation.operation_type.name
          ? elem.operation.operation_type.name
          : "Без название",
        <>Lorem ipsum dolor sit amet consectetur.</>
      )
    );
  }

  // !PAGINATION
  const count = Math.ceil(list.count / limit);
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <div className="HomePage">
      <div className="HomePage__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Касса</div>
          <div className="Staff__title_btns">
            {" "}
            <div
              onClick={() => navigate("/addIncome")}
              className="Staff__title_btn"
            >
              {" "}
              <img src={plus} alt="" /> Добавить приход
            </div>
            <div onClick={() => setIsopen(true)} className="Staff__title_btn">
              {" "}
              <img src={plus} alt="" /> Добавить расход
            </div>
          </div>
        </div>
        <div className="Staff__podTitle">
          <div className="Staff__podTitle__nal">
            <div className="Staff__podTitle__nal_text">Наличные</div>
            <div className="Staff__podTitle__nal_number">100 500 сом</div>
          </div>
          <div className="Staff__podTitle__bezNal">
            <div className="Staff__podTitle__nal_text">Безналичные</div>
            <div className="Staff__podTitle__nal_number">150 500 сом</div>
          </div>
        </div>
        <div className="Staff__filtration">
          <div className="Staff__filtration_select">
            <select className="Staff__filtration_select_select1" name="" id="">
              <option value="">Выберите категрию</option>
            </select>
            <select
              onChange={(e) =>
                e.target.value == "true"
                  ? setIn_stock(true)
                  : setIn_stock(false)
              }
              className="Staff__filtration_select_select2"
            >
              <option value="true">В наличии</option>
              <option value="false">Отсутствует</option>
            </select>
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
                    № операции
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
                    Тип операции
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
                    Дата{" "}
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
                    Операция
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
                    Сумма{" "}
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
                    Оплата
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
      </div>
    </div>
  );
}
