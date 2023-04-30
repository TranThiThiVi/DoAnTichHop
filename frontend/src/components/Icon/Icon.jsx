import React, { useEffect, useState } from "react";
import "./Icon.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Icon = () => {
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem("dataUser"));

  return (
    <div>
      {user === null ? null : (
        <div className="container_icon">
          <div
            className="container_icon_cart"
            onClick={() => {
              navigation("/cart");
            }}
          >
            <i class="bx bx-cart-alt"></i>
          </div>

          <div
            className="container_icon_cart"
            onClick={() => {
              navigation("/history");
            }}
          >
            <i class="bx bx-history"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icon;
