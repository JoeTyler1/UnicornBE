const express = require('express');
const itemController = require('../controllers/itemController')

const router = express.Router();

router
    .route("/")
    .post(itemController.addItem)

router
    .route("/:id")
    .patch(itemController.editItemName)
    .delete(itemController.deleteItem)

module.exports = router;