import mongoose from "mongoose"
const { DB_URL } = process.env

export const connect = () => {
    mongoose.connect( DB_URL, {
        
        useNewUrlParser     : true,
        useUnifiedTopology  : true,

    }).then(() => {
        console.log("database connection success...");
        
    }).catch(err => {
        console.log("database connection failed. exiting now...");
        console.error(err);
        process.exit(1);
    })
}