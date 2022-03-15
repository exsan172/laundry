import express from "express";
import {body} from "express-validator"
import checkToken from '../middleware/verifyToken.middleware.js'
import transactionRouter from "../controller/transaction.controller.js";
import {validatorMiddleware} from '../middleware/validator.middleware.js'
const router = express.Router()

router.get("/get-cabang", checkToken, [
    transactionRouter.getCabang
])

router.post("/input-cabang",
    body("cabang").notEmpty(),
    body("price").isNumeric(),
    validatorMiddleware,
    checkToken, [

    transactionRouter.createCabang
])

router.post("/edit-cabang",
    body("id").notEmpty(),
    body("cabang").notEmpty(),
    body("price").isNumeric(),
    validatorMiddleware,
    checkToken, [

    transactionRouter.updateCabang
])

router.get("/delete-cabang/:id", [
    transactionRouter.deleteCabang
])

router.get("/get-transaksi/:id/:fromDate/:toDate", checkToken, [
    transactionRouter.getTransaksi
])

router.get("/get-transaksi-owner/:id/:fromDate/:toDate", checkToken, [
    transactionRouter.getTransaksiOwner
])

router.get("/detail-transaksi/:id", checkToken, [
    transactionRouter.detailTransaksi
])

router.post("/input-transaksi",
    body("id_cabang").notEmpty(),
    body("name").notEmpty(),
    body("total_weight").isNumeric(),
    validatorMiddleware,
    checkToken, [

    transactionRouter.createTransaksi
])

router.post("/edit-transaksi",
    body("id_transaksi").notEmpty(),
    body("name").notEmpty(),
    body("id_cabang").notEmpty(),
    body("total_weight").isNumeric(),
    validatorMiddleware,
    checkToken, [

    transactionRouter.updateTransaksi
])

router.get("/delete-transaksi/:id", checkToken, [
    transactionRouter.deleteTransaksi
])

export default router