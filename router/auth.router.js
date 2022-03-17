import express from "express";
import {body} from "express-validator"
import authController from "../controller/auth.controller.js";
import {validatorMiddleware} from '../middleware/validator.middleware.js'
import checkToken from '../middleware/verifyToken.middleware.js'
const router = express.Router()

router.get("/get-user", checkToken, [
    authController.getUser
])

router.get("/delete-user/:id", checkToken, [
    authController.deleteUser
])

router.get("/get-user-cabang/:id", checkToken, [
    authController.getUserCabang
])

router.post("/login", 
    body("username").isEmail(), 
    body("password").isLength({min : 8}), 
    validatorMiddleware, [
    
    authController.login
])

router.post("/public-register",
    body("name").notEmpty(), 
    body("username").isEmail(),
    body("password").isLength({min : 8}),
    validatorMiddleware, [

    authController.publicRegister
])

router.post("/register",
    body("name").notEmpty(), 
    body("username").isEmail(),
    body("password").isLength({min : 8}),
    body("role").notEmpty(),
    validatorMiddleware,
    checkToken, [

    authController.register
])

router.post("/forgot-password", 
    body("username").isEmail(),
    validatorMiddleware, [

    authController.forgot_password
])

router.post("/change-password", 
    body("confirmNewPassword").isLength({min : 8}),
    body("newPassword").isLength({min : 8}),
    validatorMiddleware,
    checkToken, [

    authController.change_password
])

router.post("/update-user",
    body("name").notEmpty(), 
    body("username").isEmail(),
    body("role").notEmpty(),
    body("id").notEmpty(),
    body("idCabang").notEmpty(),
    validatorMiddleware,
    checkToken, [

    authController.updateUser
])

export default router