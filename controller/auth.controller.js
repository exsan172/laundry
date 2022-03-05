import moment from 'moment-timezone'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailer from 'nodemailer'
import {response} from '../config/response.config.js'
import authModels from '../model/auth.schema.js'

const authController = {
    login : async (req, res, next) => {
        try {
            const username = req.body.username
            const password = req.body.password
            
            const findUsername = await authModels.findOne({ username : username })
            if(findUsername !== null) {
                const comparePassword = await bcrypt.compare(password, findUsername.password)
                if(comparePassword) {
                    const token = await jwt.sign({
                        id_user : findUsername._id,
                        name : findUsername.name,
                        username : findUsername.username,
                        role : findUsername.role
                    }, process.env.TOKEN_KEY)

                    response(res, 200, "success", {
                        id_user : findUsername._id,
                        username: findUsername.username,
                        role    : findUsername.role,
                        token   : token
                    })
                } else {
                    response(res, 400, "username or password not match")    
                }
            } else {
                response(res, 400, "user not register")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    register : async (req, res, next) => {
        try {
            let name     = req.body.name
            let username = req.body.username
            let password = req.body.password
            let role     = req.body.role
            let idCabang = req.body.idCabang

            if(role !== "employe" && role !== "owner" && role !== "admin") {
                return response(res, 400, "role must employe, owner, or admin")
            }

            if(req.user.role !== "owner") {
                return response(res, 400, "your role must owner to register new user")
            }
            
            const findUsername = await authModels.findOne({ username : username })
            if(findUsername === null) {
                const salt   = await bcrypt.genSalt(10)
                password     = await bcrypt.hash(password, salt)
                const create = await authModels.create({
                    name     : name,
                    username : username,
                    password : password,
                    role     : role,
                    id_cabang: idCabang,
                    createdBy: req.user.id_user,
                    createdAt: moment().tz("Asia/Jakarta").utc(true)
                })
    
                if(create) {
                    response(res, 200, "success register")
                } else {
                    response(res, 400, "failed register")
                }
            } else {
                response(res, 400, "email already use")
            }

        } catch (error) {
            response(res, 400, error.message)
        }
    },

    forgot_password : async (req, res, next) => {
        try {
            const username = req.body.username
            const findUser = await authModels.findOne({username : username})

            if(findUser) {
                let transporter = mailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.USER_EMAIL,
                        pass: process.env.PASSWORD_EMAIL
                    }
                })
                
                const token = await jwt.sign({
                    id_user : findUser._id,
                    name : findUser.name,
                    username : findUser.username,
                    role : findUser.role
                }, process.env.TOKEN_KEY)

                const mailOptions = {
                    to      : findUser.username,
                    subject : 'confirm forgot password',
                    html    : `<p>hi, ${findUser.name} click <a href='${process.env.DOMAIN+"/public/confirm-password/"+token}'>here</a> to change new password`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        response(res, 400, error)
                    } else {
                        response(res, 200, "email sent")
                    }
                });
            } else {
                response(res, 400, "user not register")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    change_password : async (req, res, next) => {
        try {
            let newPassword        = req.body.newPassword
            let confirmNewPassword = req.body.confirmNewPassword
            
            if(newPassword === confirmNewPassword) {
                const salt   = await bcrypt.genSalt(10)
                newPassword  = await bcrypt.hash(newPassword, salt)
                const update = await authModels.updateOne({_id: req.user.id_user}, {password : newPassword})

                if(update) {
                    response(res, 200, "success change password")
                } else {
                    response(res, 400, "failed change password")
                }
            } else {
                response(res, 400, "new password and confirm password not match")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    getUser : async (req, res, next) => {
        try {
            const user = await authModels.find({createdBy : req.user.id_user}, { password : 0 })
            response(res, 200, "success", user)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    getUserCabang : async (req, res, next) => {
        try {
            const user = await authModels.find({id_cabang : req.params.id}, { password : 0 })
            response(res, 200, "success", user)
        } catch (error) {
            response(res, 400, error.message)
        }
    }
}

export default authController