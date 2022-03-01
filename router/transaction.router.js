import express from "express";
import transactionRouter from "../controller/transaction.controller.js";
const router = express.Router()

router.get("/get-cabang", [
    transactionRouter.login
])

router.post("/input-cabang", [
    transactionRouter.login
])

router.post("/edit-cabang", [
    transactionRouter.login
])

router.get("/delete-cabang", [
    transactionRouter.login
])

router.get("/get-transaksi", [
    transactionRouter.login
])

router.post("/input-transaksi", [
    transactionRouter.login
])

router.post("/edit-transaksi", [
    transactionRouter.login
])

router.get("/delete-transaksi", [
    transactionRouter.login
])

export default router