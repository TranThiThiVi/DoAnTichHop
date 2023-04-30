const ProductController = require("../controllers/ProductsController")
const router = require("express").Router();

router.post("/addproduct",ProductController.addProducts)

router.get("/allproduct",ProductController.getAll)

router.get("/:id",ProductController.GetAnProducts)

router.put("/:id",ProductController.UpdateProducts)

router.delete("/:id",ProductController.deleteProducts)

module.exports = router