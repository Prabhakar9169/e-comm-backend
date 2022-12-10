import express from "express";
import {
  getPtoduct,
  createProduct,
  getAggregateProduct,
  getUniqueProduct,
  getProductById,
  updateProduct,
  updateProductAfterFiltring,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateUser  , authorizedUser} from "../controllers/authenticationController.js";
const router = express.Router();

router
  .route("/")
  .get(authenticateUser, getPtoduct)
  .post(authenticateUser, createProduct)
  .put(authenticateUser, updateProductAfterFiltring)
  .delete(authenticateUser, authorizedUser('admin') ,deleteProduct);
router.route("/unique").get(authenticateUser, getUniqueProduct);
router.route("/getAggregateProduct").get(authenticateUser, getAggregateProduct);
router
  .route("/:id")
  .get(authenticateUser, getProductById)
  .put(authenticateUser, updateProduct);

export default router;
