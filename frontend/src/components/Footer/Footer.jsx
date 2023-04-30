import React, { useEffect } from "react";
import "./Footer.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigation = useNavigate();

  return (
    <div>
      <div className="container_footer">
        <div className="footer_Top">
          <h2>MAF<span>LINE</span></h2>
          <h4> THIẾT KẾ VÀ THỜI TRANG </h4>
        </div>
        <div className="footer_Main">
          <div className="footer_Main_left">
            <span>Contact</span>
            <ul>
              <li>Address : <span>137 Nguyễn Chí Thanh TP ĐN</span></li>
              <li>Email : <span>maflineclothing@gmail.com</span> </li>
              <li>Phone : <span>0386762927</span> </li>
            </ul>
          </div>
          <div className="footer_Main_container">
            <span>Useful Links</span>
            <ul>
              <li>
                <i class="fa-solid fa-reply"></i>
                <span
                  onClick={() => {
                    navigation("/home");
                  }}
                >Home</span>
              </li>
              <li>
                <i class="fa-solid fa-reply"></i>
                <span
                  onClick={() => {
                    navigation("/sale-product");
                  }}
                >Product</span>
              </li>
              <li>
                <i class="fa-solid fa-reply"></i>
                <span
                  onClick={() => {
                    navigation("/size-check");
                  }}
                >Size Check</span>
              </li>
              <li>
                <i class="fa-solid fa-reply"></i>
                <span
                  onClick={() => {
                    navigation("/about");
                  }}
                >About</span>
              </li>
            </ul>
          </div>
          <div className="footer_Main_right">
            <div className="icon1">
              <span>Our Social NetWorks</span>
              <ul>
                <li>
                  <p>MAFLINE tự hào là local đầu tiên đưa sản
                    phẩm về mức giá <br /> #SALE 99k</p>
                </li>
              </ul>

            </div>
            <div className="icon">
              <span>
                <i class="bx bxl-twitter"></i>
              </span>
              <span>
                <i class="bx bxl-facebook"></i>
              </span>
              <span>
                <i class="bx bxl-instagram"></i>
              </span>
              <span>
                <i class="bx bxl-skype"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="deSign">
          <p>Copyright © 2022 MAFLINE</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
