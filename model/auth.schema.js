import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    id_cabang : {
        type : String,
        required : true
    },
    cabang : {
        type : String,
        required : true
    },
    createdBy : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
})

export default mongoose.model("user", userSchema)