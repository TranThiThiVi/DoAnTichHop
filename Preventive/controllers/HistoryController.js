const { Users, Orderhistory } = require("../models/model");

const OrderhistoryController = {
  addToOrderhistory: async (req, res) => {
    try {
      const newOrderhistory = new Orderhistory(req.body);
      const save = await newOrderhistory.save();
      if (req.body.AccountUSer) {
        const idUser = Users.findById(req.body.AccountUSer);
        await idUser.updateOne({ $push: { history: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  UpdateHistory: async (req, res) => {
    try {
      const IdMovie = await Orderhistory.findById(req.params.id);
      await IdMovie.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnHistory: async (req, res) => {
    try {
      const History = await Orderhistory.findById(req.params.id);
      res.status(200).json(History);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllHistory: async (req, res) => {
    try {
      var codeOrders = req.query?.codeOrders;
      var page = req.query?.pageNumber;

      if (codeOrders || page) {
        if (page) {
          page = parseInt(page);
          var SkipNumber = (page - 1) * 6;
          const result = await Orderhistory.find().skip(SkipNumber).limit(6);
          return res.status(200).json(result);
        }
        if (codeOrders) {
          var condition = codeOrders
            ? { codeOrders: { $regex: new RegExp(codeOrders), $options: "i" } }
            : {};

          Orderhistory.find(condition)
            .then((data) => {
              return res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while retrieving history.",
              });
            });
        }
      } else {
        const allOrderhistory = await Orderhistory.find();
        return res.status(200).json(allOrderhistory);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  DeleteFromOrderhistory: async (req, res) => {
    try {
      await Users.updateMany(
        { history: req.params.id },
        { $pull: { history: req.params.id } }
      );
      await Orderhistory.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = OrderhistoryController;
