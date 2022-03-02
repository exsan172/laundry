import 'dotenv/config'
import {connect} from './config/db.config.js'
import express from "express";
import morgan from 'morgan';
import session from 'express-session'
import authRouter from './router/auth.router.js'
import transactionRouter from './router/transaction.router.js'
import publicRouter from './router/public.router.js'

connect()
const app  = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.set('view engine', 'ejs');
app.use("/auth", authRouter)
app.use("/transaction", transactionRouter)
app.use("/public", publicRouter)
app.use((req,res) => {
    res.status(404).json({
        statusCode : 404,
        message : "Path Not Found !"
    })
});

app.listen(port, () => {
    console.log(`App run on port ${port} !`);
})
