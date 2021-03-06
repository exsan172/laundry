
import moment from 'moment-timezone'
import {response} from '../config/response.config.js'
import cabangModels from '../model/cabang.schema.js'
import transaksiModels from '../model/transaksi.schema.js'

const transactionController = {
    getCabang : async (req, res, next) => {
        try {
            const get = await cabangModels.find({createdBy : req.user.id_user}).sort({
                createdAt : -1
            })
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
                createdAt : moment().tz("Asia/Jakarta").utc(true)
            })

            if(create) {
                response(res, 201, "success create", create)
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
                response(res, 201, "success update", update)
            } else {
                response(res, 400, "failed update")
            }
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    getTransaksi : async (req, res, next) => {
        try {
            const fromDate = moment(req.params.fromDate).utc(true)
            const toDate   = moment(req.params.toDate).utc(true)
            const get      = await transaksiModels.find({id_cabang : req.params.id, createdAt: { $gte: new Date(fromDate), $lte :new Date(toDate) } }).sort({
                createdAt : -1
            })
            response(res, 200, "success", get)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    getTransaksiOwner : async (req, res, next) => {
        try {
            const fromDate = moment(req.params.fromDate).utc(true)
            const toDate   = moment(req.params.toDate).utc(true)
            const get      = await transaksiModels.find({id_owner : req.params.id, createdAt: { $gte: new Date(fromDate), $lte :new Date(toDate) } }).sort({
                createdAt : -1
            })
            response(res, 200, "success", get)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    detailTransaksi : async (req, res, next) => {
        try {
            const get = await transaksiModels.find({_id : req.params.id})
            response(res, 200, "success", get)
        } catch (error) {
            response(res, 400, error.message)
        }
    },

    createTransaksi : async (req, res, next) => {
        try {
            const idCabang     = req.body.id_cabang
            const totalWeight  = req.body.total_weight
            const name         = req.body.name
            
            const getPrice = await cabangModels.findOne({_id : idCabang})
            const create = await transaksiModels.create({
                id_cabang    : idCabang,
                id_owner     : getPrice.createdBy,
                cabang       : getPrice.cabang,
                name         : name,
                total_price  : totalWeight*getPrice.price,
                total_weight : totalWeight,
                createdAt    : moment().tz("Asia/Jakarta").utc(true)
            })

            if(create) {
                response(res, 201, "success create", create)
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
            const name         = req.body.name
            
            const getPrice = await cabangModels.findOne({_id : idCabang})
            const update = await transaksiModels.updateOne({_id : idTransaksi}, {
                id_cabang    : idCabang,
                name         : name,
                total_price  : totalWeight*getPrice.price,
                total_weight : totalWeight,
            })

            if(update) {
                response(res, 201, "success update", update)
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