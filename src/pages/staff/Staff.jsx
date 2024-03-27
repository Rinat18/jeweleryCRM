import React, { useEffect, useState } from "react";
import "./Staff.scss";
import plus from "../../images/plus.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AddEmployeeModal from "../../components/addStaffModal/AddStaff";
import EditEmployeeModal from "../../components/editStaffModal/EditStaff";
import { useStaff } from "../../context/StaffContext";

export default function Staff() {
  const { staffs, getStaffs, deleteStaff, getOneStaff } = useStaff();

  // ! HOOKS
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const [isOpen, setIsopen] = useState(false);
  const [isOpen2, setIsopen2] = useState(false);
  const [isOpen3, setIsopen3] = useState(false);

  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [id2, setId2] = useState(null);

  useEffect(() => {
    getStaffs(page, limit);
  }, []);
  //   useEffect(() => {
  //     getStaffs(page);
  //   }, [staffs]);

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

  // ! FUNCTIONS

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
  const rows = staffs.map((elem) =>
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
        <ModeOutlinedIcon
          sx={{ color: "#576ED0", cursor: "pointer" }}
          onClick={() => getUser(elem.id)}
        />{" "}
        <DeleteOutlinedIcon
          sx={{ color: "#576ED0", cursor: "pointer" }}
          onClick={() => infForDelete(elem.full_name, elem.id)}
        />
      </>
    )
  );

  console.log(rows);

  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
  };

  const [value, setValue] = useState("");

  const handleChangeCount = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) <= 100) {
      setValue(inputValue);
    }
  };

  // ! MODALS

  const closeModal = () => {
    setIsopen(false);
  };
  const closeModal2 = () => {
    setIsopen2(false);
  };
  const closeModal3 = () => {
    setIsopen3(false);
  };

  // ! DELETE
  const infForDelete = (elemName, elemId) => {
    setIsopen3(true);
    setName(elemName);
    setId(elemId);
  };
  const deleteStafff = () => {
    deleteStaff(id);
    setIsopen3(false);
  };

  // ! EDIT
  const getUser = (elemId2) => {
    getOneStaff(elemId2);
    setIsopen2(true);
  };
  return (
    <div className="Staff">
      <div className="Staff__container">
        <div className="Staff__title">
          <div className="Staff__title_Text">Сотрудники</div>
          <div onClick={() => setIsopen(true)} className="Staff__title_btn">
            {" "}
            <img src={plus} alt="" /> Добавить сотрудника
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
                    ФИО
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
                    Должность
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
                    Дата приема на работу
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
                    Оклад
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
                    Процент за продажу
                  </TableCell>
                  <TableCell
                    sx={{
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
            <div
              style={{ overflow: "hidden" }}
              className="Staff__pagination__page_number"
            >
              <input
                value={value}
                onChange={handleChangeCount}
                style={{ width: "29px" }}
                type="number"
              />
            </div>
          </div>
        </div>
        {isOpen ? (
          <AddEmployeeModal isOpen={isOpen} closeModal={closeModal} />
        ) : null}
        {isOpen2 ? (
          <EditEmployeeModal isOpen={isOpen2} closeModal={closeModal2} />
        ) : null}
        {isOpen3 ? (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Удалить сотрудника {name}?</h2>
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
