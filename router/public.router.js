import express from "express";
import {body} from "express-validator"
import bcrypt from 'bcrypt'
import jwtDecode from "jwt-decode";
import authModels from '../model/auth.schema.js'
const router = express.Router()

router.get("/confirm-password/:token", (req, res, next) => {
    res.render("index.ejs", {
        token : req.params.token,
        msg : req.session.msg||""
    })
})

router.post("/change-password", 
    body("confirmNewPassword").isLength({min : 8}),
    body("newPassword").isLength({min : 8}),
    async (req, res, next) => {
    
        try {
            let newPassword        = req.body.newPassword
            let confirmNewPassword = req.body.confirmNewPassword
            
            const decode = jwtDecode(req.body.token)
            if(newPassword === confirmNewPassword) {
                const salt   = await bcrypt.genSalt(10)
                newPassword  = await bcrypt.hash(newPassword, salt)
                const update = await authModels.updateOne({_id: decode.id_user}, {password : newPassword})

                if(update) {
                    req.session.msg = "success change password"
                    res.redirect("/public/confirm-password/"+req.body.token)
                } else {
                    req.session.msg = "failed change password"
                    res.redirect("/public/confirm-password/"+req.body.token)
                }
            } else {
                req.session.msg = "new password and confirm password not match"
                res.redirect("/public/confirm-password/"+req.body.token)
            }
        } catch (error) {
            req.session.msg = "failed change password"
            res.redirect("/public/confirm-password/"+req.body.token)
        }
})

export default router