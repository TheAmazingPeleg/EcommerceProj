const express = require("express");

const {
    index,
    createAdminsForm,
    manageAdminsForm,
    createAdmin,
    deleteAdmin,
    updateAdmin,
    manageUsersForm,
    deleteUser,
    updateUser,
    changeUserPassword,
    createProductForm,
    createProduct,
    deleteProduct,
    manageProductsForm,
    deleteCategory,
    manageCategoriesForm,
    createCategoryForm,
    createCategory,
    manageOrdersForm,
    updateOrder,
    viewOrder
} = require("../controllers/admin");

const { requireAdminLogin } = require("./modularLogin");

const router = express.Router();

router.get("/", requireAdminLogin('/admin'), index);

router.route("/createAdminForm")
    .get(requireAdminLogin('/admin'), createAdminsForm)
    .post(createAdmin);
router.route("/manageAdminsForm")
    .get(requireAdminLogin('/admin'), manageAdminsForm)
    .post(updateAdmin)
    .delete(deleteAdmin);
router.route("/manageUsersForm")
    .get(requireAdminLogin('/admin'), manageUsersForm)
    .post(updateUser)
    .put(changeUserPassword)
    .delete(deleteUser);
router.route("/createProductForm")
    .get(requireAdminLogin('/admin'), createProductForm)
    .post(createProduct);
router.route("/manageProductsForm")
    .get(requireAdminLogin('/admin'), manageProductsForm)
    .delete(deleteProduct);
router.route("/createCategoryForm")
    .get(requireAdminLogin('/admin'), createCategoryForm)
    .post(createCategory);
router.route("/manageCategoriesForm")
    .get(requireAdminLogin('/admin'), manageCategoriesForm)
    .delete(deleteCategory);
router.route("/manageOrdersForm")
    .get(requireAdminLogin('/admin'), manageOrdersForm)
    .post(updateOrder);
router.route("/manageOrdersForm/:id")
    .get(requireAdminLogin('/admin'), viewOrder);
router.route("*").get(requireAdminLogin('/admin'), index);
module.exports = router;