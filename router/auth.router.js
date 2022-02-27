import express from "express";
import authController from "../controller/auth.controller";
const router = express.Router()

router.get("/login", [
    authController.login
])

module.exports = router