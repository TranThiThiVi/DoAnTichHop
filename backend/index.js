const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const moongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const CommentRouter = require("./routes/cmt");
const CartRouter = require("./routes/cart");
const HistoryRouter = require("./routes/history");
const TotalRouter = require("./routes/total");
const StaticRouter = require("./routes/static");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(morgan("common"));

dotenv.config();

moongoose.connect(process.env.MOOGODB_CONNECT_DATABASE, (err) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Connect moogoosedb successfully !");
  }
});

app.listen(8000, () => {
  console.log("server is running.....");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/cart", CartRouter);
app.use("/api/History", HistoryRouter);
app.use("/api/TotalOrder", TotalRouter);
app.use("/api/TotalStatic", StaticRouter);
