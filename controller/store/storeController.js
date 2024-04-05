const OpenAccount = require('./../../model/authModel/auth.model')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

exports.storePrimarySetup = async(req, res, next)=>{
    const {upiNumber, upiProvider, upiApp, COD, Design} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.storeUpiNumber = upiNumber
    findingUser.storeUpiProvider = upiProvider
    findingUser.storeUpiApp = upiApp
    findingUser.storeCOD = COD
    findingUser.storeDesign = Design    

    findingUser.save()
    res.status(200).json({
        status : 'success',
        data : {
            message : 'Store credentials are saved, proceed to price setting'
        }
    })


}

exports.storePricingSetting = async(req, res, next)=>{
    const {store_prices} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.store_prices.push(store_prices)
    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'prices added sucessfully'
        }
    })

}


exports.liveStore = async (req, res, next)=>{
    const {id} = req.body
    const user = await OpenAccount.findById({_id : id})

    res.status(200).json({
        status : 'success',
        data : {
            products_to_display : user.store_prices
        }
    })
}