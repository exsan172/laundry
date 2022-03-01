import mongoose from "mongoose"

const cabangSchema = new mongoose.Schema({
    cabang : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
})

export default mongoose.model("cabang", cabangSchema)