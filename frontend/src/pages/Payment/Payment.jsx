import React, { useRef, useState, useEffect } from "react";
import "./Payment.scss";
import Navbar from "../../components/Navbar/Navbar";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [data, setData] = useState([]);
  const [Amount, setAmount] = useState(1);
  const [colorOption, setColorOption] = useState([]);
  const [sizeOption, setSizeOption] = useState([]);
  const [image, setImage] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [Address, setAddress] = useState("");
  const [NumberPhone, setNumberPhone] = useState(0);
  const [ship, setShip] = useState(30000);
  const [Check, setCheck] = useState(false);
  const [Check2, setCheck2] = useState(false);
  const [buttonPayCheck, setButtonPayCheck] = useState("option_one");
  const address = document.getElementById("address");
  const numberPhone = document.getElementById("numberPhone");
  const user = JSON.parse(localStorage.getItem("dataUser"));
  const refColor = useRef([]);
  const refSize = useRef([]);
  const location = useLocation();
  const navigation = useNavigate();
  const ProductID = location.pathname.split("/")[3];
  var objDataOrder = [];

  var a = false,
    b = false,
    c = false;

  const movePaymentOrder = () => {
    navigation(`/productDetail/order/payment/${ProductID}`);
    var min = 1000;
    var max = 9999;
    var rand = parseInt(min + Math.random() * (max - min));
    let objOrder = {
      codeOrders: rand,
      ProductID: ProductID,
      NameProduct: data.NameProduct,
      Image: image[0],
      price: data.price,
      Size: size,
      Color: color,
      Amount: Amount,
      Total: totalOrder,
      NameUser: user.username,
      AccountUSer: user._id,
    };
    var dataOrder = JSON.stringify(objOrder);
    objDataOrder.push(dataOrder);
    localStorage.setItem("dataOrder", objDataOrder);
  };

  const handleOnClickButtonGetInformation = () => {
    checkOption();
    if (a === true && b === true && c === true) {
      setCheck(true);
      toast.success("Đủ thông tin !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      document.getElementById("tablePayment").style.height = "570px";
      setTimeout(() => {
        setCheck(false);
      }, 2000);
    }
  };

  const checkOption = () => {
    if (Amount === "" || size === "" || color === "") {
      toast.error("Vui lòng chọn đầy đủ : (Màu) , (Kích Cở) !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      checkInput();
      a = true;
    }
  };

  const checkInput = () => {
    if (Address === "") {
      setErrorFor(address, "Address cannot be blank ");
    } else {
      setSuccessFor(address);
      b = true;
    }

    if (NumberPhone === "") {
      setErrorFor(numberPhone, "Number Phone cannot be blank ");
    } else {
      setSuccessFor(numberPhone);
      c = true;
    }
  };

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  };

  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  };

  const handleCheckColor = (item, indexOption) => {
    refColor.current.forEach((e, index) => {
      if (index === indexOption) {
        refColor.current[index].classList.add("accept");
      } else {
        refColor.current[index].classList.remove("accept");
      }
    });
  };

  const handleCheckSize = (item, indexOption) => {
    refSize.current.forEach((e, index) => {
      if (index === indexOption) {
        refSize.current[index].classList.add("accept");
      } else {
        refSize.current[index].classList.remove("accept");
      }
    });
  };

  var totalOrder = Amount * data.price + ship;

  const handleOrder = () => {
    setCheck2(true);
    if (Address === "" || NumberPhone === "") {
      toast.error("Vui lòng nhập địa chỉ và số điện thoại !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      var min = 1000;
      var max = 9000;
      var rand = parseInt(min + Math.random() * (max - min));
      axios
        .post("http://localhost:8000/api/History/addToHistory", {
          codeOrders: rand,
          ProductID: ProductID,
          NameProduct: data.NameProduct,
          Image: image[0],
          price: data.price,
          Size: size,
          Color: color,
          Amount: Amount,
          Total: totalOrder,
          Story: "Chờ xác nhận",
          NameUser: user.username,
          AccountUSer: user._id,
        })
        .then(function (response) {
          setCheck2(false);
          toast.success("Đặt hàng thành công !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setTimeout(() => {
            navigation("/home");
          }, 1000);

          if (user.address === "" && user.numberPhone === "") {
            axios
              .put(`http://localhost:8000/api/user/${user._id}`, {
                address: Address,
                numberPhone: NumberPhone,
              })
              .then(function (response) {
                toast.success(
                  "Đã cập nhật địa chỉ và số điện thoại cho bạn !",
                  {
                    position: toast.POSITION.BOTTOM_LEFT,
                  }
                );
                setTimeout(() => {
                  alert(
                    "Chúng tôi vừa cập nhật thông tin cho bạn. Bạn cần đăng nhập lại được đảm bảo dử liệu !!!"
                  );
                  localStorage.clear();
                  navigation("/login");
                }, 2000);
              })
              .catch(function (error) {
                toast.error(
                  "Không cập nhật được địa chỉ và số điện thoại cho bạn ! ",
                  {
                    position: toast.POSITION.BOTTOM_LEFT,
                  }
                );
              });
          }
        })
        .catch(function (error) {
          toast.error("Lỗi mất rồi, làm lại nha 😉", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.log(error);
        });
    }
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/product/${ProductID}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setColorOption(response.data.Color);
        setSizeOption(response.data.Size);
        setImage(response.data.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    setAddress(user.address);
    setNumberPhone(user.numberPhone);
    if (Address !== "" && NumberPhone !== "") {
      setSuccessFor(address);
      setSuccessFor(numberPhone);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_payment">
        <div className="container_payment_top">
          <div className="container_payment_top_content">
            <div className="container_payment_top_content_img">
              <img src={image[0]} alt="" />
            </div>

            <div className="container_payment_top_content_option">
              <p>{data.NameProduct}</p>
              <hr />
              <table>
                <tr>
                  <td>Số lượng : </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={Amount}
                      onClick={() => {
                        if (Amount >= 3) {
                          setShip(0);
                        } else if (Amount <= 2) {
                          setShip(30000);
                        }
                      }}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Màu : </td>
                  <td>
                    {colorOption.map((item, index) => (
                      <span
                        ref={(e) => {
                          refColor.current[index] = e;
                        }}
                        key={index}
                        onClick={() => {
                          setColor(item);
                          handleCheckColor(item, index);
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Kích cở: </td>
                  <td>
                    {sizeOption.map((item, index) => (
                      <span
                        ref={(e) => {
                          refSize.current[index] = e;
                        }}
                        key={index}
                        onClick={() => {
                          setSize(item);
                          handleCheckSize(item, index);
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Giá sản phẩm: </td>
                  <td style={{ color: "#d63031", fontWeight: "500" }}>
                    {data.price}₫
                  </td>
                </tr>
              </table>
              <div className="container_payment_top_content_choose">
                <img
                  style={{ Width: "100%" }}
                  src="https://martina.vn/wp-content/uploads/2020/07/thiet-ke-ao-dong-phuc-02.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="container_payment_body">
          <div className="container_payment_body_input">
            <div className="container_payment_body_input_information">
              <form id="form" class="form">
                <div class="form-control">
                  <label for="username">Tên Khách Hàng</label>
                  <p>{user.username}</p>
                </div>
                <div class="form-control">
                  <label for="username">Email</label>
                  <p>{user.email}</p>
                </div>
                <div class="form-control">
                  <label for="username">Địa Chỉ</label>
                  <input
                    type="address"
                    placeholder="221 Hà Huy Tưởng"
                    id="address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <i class="fas fa-check-circle"></i>
                  <i class="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
                <div class="form-control">
                  <label for="username">Số Điện Thoại</label>
                  <input
                    type="tel"
                    placeholder="0510123456"
                    id="numberPhone"
                    value={NumberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                  />
                  <i class="fas fa-check-circle"></i>
                  <i class="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
              </form>
              <LoadingButton
                className="buttonCheck"
                onClick={handleOnClickButtonGetInformation}
                loading={Check}
                variant="outlined"
              >
                Submit
              </LoadingButton>
            </div>
          </div>
          <div className="container_payment_body_order">
            <div className="container_payment_body_order_information">
              <div className="container_payment_body_order_information_text">
                <span>Đơn Hàng của bạn</span>
              </div>
              <div
                id="tablePayment"
                className="container_payment_body_order_information_table"
              >
                <table>
                  <tr>
                    <th>THÔNG TIN</th>
                    <th>CHI TIẾT</th>
                  </tr>
                  <tr>
                    <td>Tên Khách hàng</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Địa chỉ</td>
                    <td>{Address}</td>
                  </tr>
                  <tr>
                    <td>Số điện thoại</td>
                    <td>{NumberPhone}</td>
                  </tr>
                  <tr>
                    <td>Tên Sản phẩm</td>
                    <td>{data.NameProduct}</td>
                  </tr>
                  <tr>
                    <td>Số lượng </td>
                    <td>{Amount}</td>
                  </tr>
                  <tr>
                    <td>màu</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>{size}</td>
                  </tr>
                  <tr>
                    <td>giá sản phẩm</td>
                    <td style={{ color: "#d63031", fontWeight: "500" }}>
                      {data.price}₫
                    </td>
                  </tr>
                  <tr>
                    <td>Tiền vận chuyển</td>
                    <td style={{ color: "#d63031", fontWeight: "500" }}>
                      {ship}₫
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "700" }}>Tổng Tiền thanh toán</td>
                    <td style={{ color: "#e84118", fontWeight: "600" }}>
                      {totalOrder}₫
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: "15px" }}>
                      <input
                        type="radio"
                        name="pay"
                        onClick={() => {
                          setButtonPayCheck("option_one");
                        }}
                        checked
                      />{" "}
                      Thanh toán khi nhận hàng
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="pay"
                        accept=""
                        onClick={() => {
                          setButtonPayCheck("option_two");
                        }}
                      ></input>
                      Thanh toán qua ngân hàng
                    </td>
                  </tr>
                </table>
                <div className="container_payment_body_order_btn">
                  {buttonPayCheck === "option_one" ? (
                    <LoadingButton
                      className="buttonCheckOrder"
                      onClick={handleOrder}
                      loading={Check2}
                      variant="outlined"
                    >
                      Đặt hàng
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      className="buttonCheckOrder"
                      onClick={movePaymentOrder}
                      variant="outlined"
                    >
                      Thanh toán online
                    </LoadingButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
      <Footer />
    </div>
  );
};

export default Payment;
