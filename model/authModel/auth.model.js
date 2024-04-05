const mongoose = require('mongoose')

const openAccountSchema = new mongoose.Schema({
    company_name : {
        type : String,
        default : '',
    }
    ,
    owner_name : {
        type : String,
        default : '',
    }
    ,
    address : {
        type : String,
        default : '',
    }
    ,
    gstin : {
        type : String,
        default : '',
    }
    ,
    catagory : {
        type : String,
        default : '',
    }
    ,
    multi_single : {
        type : String,
        default : '',
    }
    ,
    reg_number : {
        type : String,
        default : '',
    }
    ,
    phone : {
        type : String,
        default : '',
    }
    ,
    email_id : {
        type : String,
        default : '',
    }
    ,
    store_Image : {
        type : String,
        default : '',
    }
    ,
    pin : {
        type : Number,
        default : 1234,
    }
    ,
    aadhar_card : {
        type : String,
        default : '',
    }
    ,
    pan_card : {
        type : String,
        default : '',
    }
    ,
    your_image : {
        type : String,
        default : '',
    }
    ,
    store_image_full : {
        type : String,
        default : '',
    }
    ,
    products : [{
        product_name : {
            type : String,
            default : ''
        }
        ,
        product_avalibility : {
            type : String,
            default : ''
        }
    }]
    ,
    Clients : [{
        client_name : {
            type : String,
            default : ''
        }
        ,
        client_address : {
            type : String,
            default : ''
        }
        ,
        client_business_name : {
            type : String,
            default : ''
        }
        ,
        client_phone : {
            type : Number,
            default : ''
        }
        ,
        client_items_price_fixed : {
            type : Array,
        }
        ,
        client_items_price_range : {
            type : Array,
        }
        ,

    }]
    ,
    storeUpiNumber : {
        type : Number,
        default : 0
    }
    ,
    storeUpiProvider : {
        type : String,
        default : '0'
    }
    ,
    storeUpiApp : {
        type : String,
        default : '0'
    }
    ,
    storeCOD : {
        type : String,
        default : '0'
    }
    ,
    storeDesign : {
        type : String,
        default : '0'
    }
    ,
    store_prices : {
        type : Array
    }
    ,
    purchase_order_vatt : {
        type : Number,
    }
    ,
    purchase_order_transportation : {
        type : Number,
    }
    ,
    purchase_order_packaging : {
        type : Number,
    }
    ,
    purchase_order_fuel : {
        type : Number,
    }
    ,
    purchase_order_labour : {
        type : Number,
    }
    ,
    purchase_order_food : {
        type : Number,
    }
    ,
    purchase_order_rent : {
        type : Number,
    }
    ,
    purchase_order_service : {
        type : Number,
    }
    ,
    purchase_order_mislaneous : {
        type : Number,
    }
    ,
    purchase_orders : [{
        purchaseOrders : [{
            purchase_order_name : {
                type : String
            }
            ,
            purchase_order_price : {
                type : String
            }
            ,
            purchase_order_quantity : {
                type : String
            }
            ,
            purchase_order_date : {
                type : String,
                default : new Date().toLocaleDateString()
            }
            ,
            purchase_order_time : {
                type : String,
                default : new Date().toLocaleTimeString()
            }
            ,
            sellerSelected : {
                type : String,
            }
        }]
        ,
        total_vatt : {
            type : Number
        }
        ,
        total_purchase_value : {
            type : Number
        }
        ,
        total_additional_cost : {
            type : Number
        }
        ,
        paymentStatus : {
            type : String
        }
    }]
    ,
    salesOrder : [{
        sales_item_list : {
            type : Array
        }
        ,
        discount : {
            type : Number
        }
        ,
        tax : {
            type : Number
        }
        ,
        transportation : {
            type : Number
        }
        ,
        delivery : {
            type : Number
        }
        ,
        total_sales_amount : {
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
    }]
    ,
    sellers : [{
        name : {
            type : String
        }
        ,
        phone : {
            type : String
        }
        ,
        catagory : {
            type : String
        }
    }]
})

const OpenAccount = mongoose.model('OpenAccount', openAccountSchema)

module.exports = OpenAccount