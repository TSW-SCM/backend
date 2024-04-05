const mongoose = require('mongoose')

const RetailB2cSchema = new mongoose.Schema({
    name : {
        type : String,
        default : ''
    }
    ,
    email : {
        type : String,
        default : ''
    }
    ,
    password : {
        type : String,
        default : ''
    }
    ,
    phone : {
        type : String,
        default : ''
    }
    ,
    cart : [{
        item : {
            type : String,
            default : ''
        }
        ,
        price : {
            type : Number
        }
        ,
        quantity : {
            type : Number,
            default : 0
        }
    }]
    ,
    cart_count : {
        type : Number,
        default : 0
    }
    ,
    placed_orders : [{
        order : {
            type : Array
        }
        ,
        delivery_fees : {
            type : Number
        }
        ,
        tax_fees : {
            type : Number
        }
        ,
        date : {
            type : String,
            default : new Date().toLocaleDateString()
        }
        ,
        time : {
            type : String,
            default : new Date().toLocaleTimeString()
        }
        ,
        payment_total : {
            type : Number
        }
        ,
        payment_status : {
            default : 'not approved',
            type : String
        }
    }]
    ,
    
})

const Retial = mongoose.model('Retail', RetailB2cSchema)

module.exports = Retial