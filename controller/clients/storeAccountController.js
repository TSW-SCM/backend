const Retail = require('./../../model/clientRetail/retialClientB2cModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

exports.openRetailAccount = async(req, res, next)=>{
    const {name, email, password, phone} = req.body;
    
    const accOpen = await Retail.create({name, email, password, phone})
    const token = jwt.sign({id : accOpen._id}, process.env.STRING)

    localStorage.setItem('retial', token)
    
    res.status(200).json({
        status : 'success',
        data : {
            message : 'Congratulations! account opened successfully'
        }
    })
}

exports.addToCartRetail = async(req, res, next)=>{
    const {quantity, name, price} = req.body
    const token =localStorage.getItem('retial')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await Retail.findById(decode.id)
    findingUser.cart.push({
        item : name,
        price,
        quantity
    })

    findingUser.cart_count = findingUser.cart.length

    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'Item added successfully'
        }
    })
}

exports.fetchingClientRetailCart = async(req, res, next)=>{
    const token =localStorage.getItem('retial')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await Retail.findById(decode.id)
    const cart = findingUser.cart;
    res.status(200).json({
        status : 'success',
        data : {
            cart : cart,
            message : 'Hey! here is your cart'
        }
    })
}

exports.placingOrdernAndGeneratingPay = async(req, res, next)=>{
    const {order, payment_total, delivery_fees, tax_fees} = req.body
    const token =localStorage.getItem('retial')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await Retail.findById(decode.id)
    const cart = findingUser.cart;
    findingUser.placed_orders.push({
        order,
        payment_total,
    })

    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'order placed successfully'
        }
    })

}