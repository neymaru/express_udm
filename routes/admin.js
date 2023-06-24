// 사용자가 보게 될 내용
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

const products = [];

// app.use랑 완전 동일
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)  // 라우터에 이 함수를 저장

// /admin/
router.get('/products', adminController.getProducts)

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)



module.exports = router;
