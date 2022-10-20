const mongoose = require('mongoose')
const validator = require('validator')

const BillSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'       
    },
    group: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Group'       
    },
    tAmount: {
        type: Number,
        required: true
    },
    pPAmount: {
        type: String,
        required: true
    },
    debtors:[{type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
}, { timestamps: true })

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill;