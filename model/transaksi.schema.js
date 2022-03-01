import mongoose from 'mongoose'

const transaksiSchema = new mongoose.Schema({
    id_cabang : {
        type : String,
        required : true
    },
    price_perkg : {
        type : Number,
        required : true
    },
    total_price : {
        type : Number,
        required : true
    },
    total_weight : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
})

module.exports = mongoose.model("transaksi", transaksiSchema)