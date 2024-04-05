const OpenAccount = require('../../model/authModel/auth.model')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


exports.addSalesOrder = async(req, res, next)=>{
    const {sales_item_list, discount, tax, transportation, delivery, total_sales_amount} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.salesOrder.push({
        sales_item_list,
        discount,
        tax,
        transportation,
        delivery,
        total_sales_amount
    })

    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'sales added successfully'
        }
    })
}

exports.sendingSalesOrderHistory = async(req, res, next)=>{
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const salesOrders = findingUser.salesOrder
    res.status(200).json({
        status : 'success',
        data : {
           sales : salesOrders
        }
    })
}