const { Products } = require("../models/model");

const ProductsController = {
  addProducts: async (req, res) => {
    try {
      const newProducts = new Products(req.body);
      const saveProducts = await newProducts.save();
      res.status(200).json(saveProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      var productName = req.query?.productName;
      var page = req.query?.pageNumber;

      if (productName || page) {
        if (page) {
          page = parseInt(page);
          var SkipNumber = (page - 1) * 6;
          const result = await Products.find().skip(SkipNumber).limit(9);
          return res.status(200).json(result);
        }

        if (productName) {
          var condition = productName
            ? {
                NameProduct: { $regex: new RegExp(productName), $options: "i" },
              }
            : {};

          Products.find(condition)
            .then((data) => {
              return res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while retrieving products.",
              });
            });
        }
      } else {
        const allProducts = await Products.find();
        return res.status(200).json(allProducts);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnProducts: async (req, res) => {
    try {
      const Product = await Products.findById(req.params.id).populate(
        "comment"
      );
      res.status(200).json(Product);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  UpdateProducts: async (req, res) => {
    try {
      const IdProducts = await Products.findById(req.params.id);
      await IdProducts.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Succesfully !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductsController;