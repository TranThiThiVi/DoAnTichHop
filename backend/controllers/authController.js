const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const authControllers = {
  register: async (req, res) => {
    const username = await Users.findOne({
      username: req.body.username,
    });
    const email = await Users.findOne({
      email: req.body.email,
    });
    if (username) return res.status(400).json({ msg: "Tên đã tồn tại" });
    if (email) return res.status(400).json({ msg: "Email đã tồn tại" });
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUSer = await new Users({
        image: req.body.image,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        numberPhone: req.body.numberPhone,
      });
      const accountUser = await newUSer.save();
      res.status(200).json(accountUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!user) {
        res.status(404).json("User not found !");
      }
      if (!password) {
        res.status(404).json("Wrong password !!!");
      }
      if (user && password) {
        const { password, ...orther } = user._doc;
        res.status(202).json({ ...orther });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authControllers;
