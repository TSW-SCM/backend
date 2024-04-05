const OpenAccount = require('./../../model/authModel/auth.model')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')



exports.addProduct = async (req, res, next)=>{
    const {name, avalable} = req.body
    console.log(name, avalable)
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.products.push({product_name : name,  product_avalibility : avalable})

    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'Product Added Successfully',
            // product : {product_name, product_avalibility}
        }
    })
}

exports.sendingExistingProducts = async(req, res, next)=>{
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    res.status(200).json({
        status : 'success',
        data : {
            id : findingUser._id,
            products : findingUser.products
        }
    })
}