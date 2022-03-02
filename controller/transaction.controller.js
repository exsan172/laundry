
import moment from 'moment-timezone'
import {response} from '../config/response.config.js'
import cabangModels from '../model/cabang.schema.js'
import transaksiModels from '../model/transaksi.schema.js'

const transactionController = {
    getCabang : async (req, res, next) => {
        try {
            const get = await cabangModels.find({createdBy : req.user.id_user})
            response(res, 200, "success", get)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    deleteCabang : async (req, res, next) => {
        try {
            const deleteCabang = await cabangModels.deleteOne({_id:req.params.id})
            if(deleteCabang) {
                response(res, 200, "success")
            } else {
                response(res, 400, "failed")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    createCabang : async (req, res, next) => {
        try {
            const cabang = req.body.cabang
            const price  = req.body.price

            const create = await cabangModels.create({
                cabang    : cabang,
                price     : price,
                createdBy : req.user.id_user,
                createdAt : moment().tz("Asia/Jakarta")
            })

            if(create) {
                response(res, 201, "success create")
            } else {
                response(res, 400, "failed create")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    updateCabang : async (req, res, next) => {
        try {
            const idCabang = req.body.id
            const cabang   = req.body.cabang
            const price    = req.body.price

            const update = await cabangModels.updateOne({_id : idCabang}, {
                cabang : cabang,
                price  : price,
            })

            if(update) {
                response(res, 201, "success update")
            } else {
                response(res, 400, "failed update")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    getTransaksi : async (req, res, next) => {
        try {
            const get = await transaksiModels.find({id_cabang : req.params.id})
            response(res, 200, "success", get)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    createTransaksi : async (req, res, next) => {
        try {
            const idCabang     = req.body.id_cabang
            const totalWeight  = req.body.total_weight
            
            const getPrice = await cabangModels.findOne({_id : idCabang})
            const create = await transaksiModels.create({
                id_cabang    : idCabang,
                total_price  : totalWeight*getPrice.price,
                total_weight : totalWeight,
                createdAt    : moment().tz("Asia/Jakarta")
            })

            if(create) {
                response(res, 201, "success create")
            } else {
                response(res, 400, "failed create")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    updateTransaksi : async (req, res, next) => {
        try {
            const idTransaksi  = req.body.id_transaksi
            const idCabang     = req.body.id_cabang
            const totalWeight  = req.body.total_weight
            
            const getPrice = await cabangModels.findOne({_id : idCabang})
            const create = await transaksiModels.updateOne({_id : idTransaksi}, {
                id_cabang    : idCabang,
                total_price  : totalWeight*getPrice.price,
                total_weight : totalWeight,
            })

            if(create) {
                response(res, 201, "success update")
            } else {
                response(res, 400, "failed update")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    deleteTransaksi : async (req, res, next) => {
        try {
            const deleteTrans = await transaksiModels.deleteOne({_id:req.params.id})
            if(deleteTrans) {
                response(res, 200, "success")
            } else {
                response(res, 400, "failed")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },
}

export default transactionController