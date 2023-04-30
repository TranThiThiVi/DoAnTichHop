import React, { useState, useEffect } from "react";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import "./CatalogManagement.scss";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const CatalogManagement = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, SetId] = useState("");
  const [sowadd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const [nameproduct, setNameProduct] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [story, setStory] = useState("");
  const [warehouse, setWarehouse] = useState(1000);
  const [sowupdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const [sowupdatetb, setShowUpdateTB] = useState(false);
  const handleCloseUpdateTB = () => setShowUpdateTB(false);
  const handleShowUpdateTB = () => setShowUpdateTB(true);
  const [sowaddtb, setShowAddTB] = useState(false);
  const handleCloseAddTB = () => setShowAddTB(false);
  const handleShowAddTB = () => setShowAddTB(true);
  const navigation = useNavigate();

  const onPress_ENTER = (event) => {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      handleSearch();
      keyPressed = null;
    } else {
      return false;
    }
  };

  const handleSearch = () => {
    let url = `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${search}`;
    fetchData(url);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/product/${id}`)
      .then(function (response) {
        toast.success("Delete product successfully !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Xóa sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleAdd = (e) => {
    axios
      .post(`http://localhost:8000/api/product/addproduct`, {
        Color: color.split(","),
        NameProduct: nameproduct,
        Size: size.split(","),
        image: image.split(","),
        price: price,
        story: story,
        warehouse: warehouse,
      })
      .then(function (response) {
        toast.success("Thêm sản phẩm thành công !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseAdd();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
        handleCloseAddTB();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Thêm sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseAddTB();
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/api/product/${id}`, {
        Color: color.split(","),
        NameProduct: nameproduct,
        Size: size.split(","),
        image: image.split(","),
        price: price,
        story: story,
        warehouse: warehouse,
      })
      .then(function (response) {
        toast.success("Chỉnh sửa sản phẩm thành công !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseUpdate();
        handleCloseUpdateTB();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        console.log(error);
        handleCloseUpdateTB();
        toast.error("Chỉnh sửa sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const getLength = () => {
    axios
      .get("http://localhost:8000/api/product/allproduct")
      .then(function (response) {
        setTotal(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChangePageNumer = (event, value) => {
    setpageNumber(value);
    let url = `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${value}`;
    fetchData(url);
  };

  const handleGetApiUpdate = (ProductId) => {
    axios
      .get(`http://localhost:8000/api/product/${ProductId}`)
      .then(function (response) {
        setNameProduct(response.data.NameProduct);
        setImage(response.data.image.toString());
        setSize(response.data.Size.toString());
        setColor(response.data.Color.toString());
        setPrice(response.data.price);
        setWarehouse(response.data.warehouse);
        setStory(response.data.story);
        handleShowUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let url =
      "http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=1";
    fetchData(url);
    getLength();
  }, []);

  return (
    <div>
      <div className="container_catalog">
        <div className="container_catalog_menu">
          <MenuAdmin />
        </div>
        <div className="container_catalog_body">
          <div className="container_catalog_body_search">
            <p
              onClick={() => {
                navigation("/home");
              }}
            >
              Trang chủ
            </p>
            <div className="container_catalog_body_search_input">
              <input
                type="text"
                placeholder="Search . . ."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => onPress_ENTER(e)}
              />{" "}
              <i class="bx bx-search-alt-2" onClick={handleSearch}></i>
            </div>
          </div>
          <div className="container_catalog_body_main">
            <div className="btn_add">
              <button onClick={handleShowAdd}>Thêm mới</button>
            </div>
            <div className="container_catalog_user_right_table">
              <table>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Các Size</th>
                  <th>Các Màu</th>
                  <th>Giá bán</th>
                  <th>Loại</th>
                  <th>Tổng kho</th>
                  <th>Chức năng</th>
                </tr>
                {data.map((item) => (
                  <tr>
                    <td className="catalog_product">
                      <img src={item.image[0]} />
                    </td>
                    <td> {item.NameProduct}</td>
                    <td>
                      {item.Size.map((item) => (
                        <span>{item},</span>
                      ))}
                    </td>
                    <td>
                      {item.Color.map((item) => (
                        <span> {item},</span>
                      ))}
                    </td>
                    <td style={{ color: "#d63031", fontWeight: "600" }}>
                      {item.price}
                    </td>
                    <td>{item.story}</td>
                    <td>{item.warehouse}</td>
                    <td className="catalog_btn">
                      <button
                        onClick={() => {
                          handleShow();
                          SetId(item._id);
                        }}
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => {
                          // handleShowUpdate();
                          handleGetApiUpdate(item._id);
                          SetId(item._id);
                        }}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            <div className="navigation_page">
              <Stack>
                <Pagination
                  count={Math.floor(total.length / 4 + 1)}
                  variant="outlined"
                  shape="rounded"
                  page={pageNumber}
                  onChange={handleChangePageNumer}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      {/* modle xóa */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* module thông báo thêm */}
      <Modal
        show={sowaddtb}
        onHide={handleCloseAddTB}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn thêm sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddTB}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      {/*module thêm mới */}

      <Modal show={sowadd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mới Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tên Sản Phẩm Cần Thêm</Form.Label>
            <Form.Control
              type="text"
              value={nameproduct}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Màu Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Loại Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={story}
                onChange={(e) => {
                  setStory(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tổng Kho Sản Phẩm Cần Thêm</Form.Label>
              <Form.Control
                type="text"
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleShowAddTB();
              handleCloseAdd();
            }}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modle thông báo */}
      <Modal
        show={sowupdatetb}
        onHide={handleCloseUpdateTB}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn cập nhật không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateTB}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* module update  */}

      <Modal show={sowupdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Thông Tin Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tên Sản Phẩm Cần Cập Nhật</Form.Label>
            <Form.Control
              type="text"
              value={nameproduct}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Màu Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Loại Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={story}
                onChange={(e) => {
                  setStory(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tổng Kho Sản Phẩm Cần Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleShowUpdateTB();
              handleCloseUpdate();
            }}
          >
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default CatalogManagement;
