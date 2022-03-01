const mongoose = require('mongoose')

const cabangSchema = new mongoose.Schema({
    nama_cabang : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
})

module.exports = mongoose.model("cabang", cabangSchema)