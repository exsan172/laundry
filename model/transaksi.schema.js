import mongoose from 'mongoose'

const transaksiSchema = new mongoose.Schema({
    id_cabang : {
        type : String,
        required : true
    },
    cabang : {
        type : String,
        required : true
    },
    total_price : {
        type : Number,
        required : true
    },
    name : {
        type : String,
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

export default mongoose.model("transaksi", transaksiSchema)