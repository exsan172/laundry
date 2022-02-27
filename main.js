import 'dotenv/config'
import express from "express";
import morgan from 'morgan';
import authRouter from './router/auth.router'

const app  = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use("/auth", authRouter)

app.listen(port, () => {
    console.log(`app run on port ${port} !`);
})
