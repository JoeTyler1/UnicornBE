
const express = require('express');
const listController = require('../controllers/listController')

const router = express.Router();

router.param('id', listController.checkIdExists)

router
    .route("/")
    .get(listController.getAllShoppingLists)
    .post(listController.createShoppingList);

router
    .route("/:id")
    .get(listController.getList)
    .delete(listController.deleteShoppingList)
    .patch(listController.changeName)



module.exports = router;