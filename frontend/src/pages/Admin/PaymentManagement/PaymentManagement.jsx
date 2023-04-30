import React, { useState, useEffect } from "react";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./PaymentManagement.scss";

const PaymentManagement = () => {
  const [data, setData] = useState([]);
  const [sumAll, setSumAll] = useState(0);
  const [val, setVal] = useState(0);
  //   const [total, setTotal] = useState([]);
  //   const [show, setShow] = useState(false);
  //   const [id, SetId] = useState("");
  //   const [pageNumber, setpageNumber] = useState(1);
  //   const [nameSearch, setNameSearch] = useState("");

  const onPress_ENTER = (event) => {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      keyPressed = null;
    } else {
      return false;
    }
  };

  const fetchData = () => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8000/api/TotalOrder/GetAllToOrder")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  useEffect(() => {
    setSumAll(
      data.map((item) => item?.total).reduce((prev, curr) => prev + curr, 0)
    );
  }, [data]);

  return (
    <div>
      <div className="container_PaymentManagement">
        <div className="container_PaymentManagement_menu">
          <MenuAdmin />
        </div>
        <div className="container_PaymentManagement_body">
          <div className="container_PaymentManagement_body_search">
            <p>Trang chủ</p>
            <div className="container_PaymentManagement_body_search_input">
              <input
                type="text"
                placeholder="Search . . ."
                // value={nameSearch}
                // onChange={(e)=>{setNameSearch(e.target.value)}}
                // onKeyDown={(e) => onPress_ENTER(e)}
              />{" "}
              <i class="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="container_PaymentManagement_body_main">
            <div className="container_PaymentManagement_user_right_table">
              <table>
                <tr>
                  <th>Name Account</th>
                  <th>Name Product</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Date Time</th>
                  <th>Total</th>
                </tr>
                {data.map((item) => (
                  <tr>
                    <td>{item.NameAccount}</td>
                    <td className="PaymentManagement_product">
                      {item.NameProduct}
                    </td>
                    <td>{item.size}</td>
                    <td>{item.color}</td>
                    <td>{item.price}</td>
                    <td>{item.Amount}</td>
                    <td>{item.dateTime}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </table>
            </div>

            <div className="PaymentManagement_total">
              <p>Tổng doanh thu: {sumAll}</p>
            </div>
            <div className="PaymentManagement_pagination">
              {/* <Stack>
                <Pagination
                  count={Math.floor(total.length / 4 + 0.5)}
                  variant="outlined"
                  shape="rounded"
                //   page={pageNumber}
                //   onChange={handleChangePageNumer}
                />
              </Stack> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default PaymentManagement;
