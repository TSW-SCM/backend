const OpenAccount = require('./.././../model/authModel/auth.model')
const path = require('path')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken')
const {promisify} = require('util')


exports.addingSeller = async(req, res, next)=>{
    const {name, phone, catagory} = req.body;
    const token =localStorage.getItem('token')
    if(!token){
        return
    }
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.sellers.push({
        name,
        phone,
        catagory
    })
    findingUser.save()
    res.status(200).json({
        status : 'success',
        data : {
            message : 'seller added sucessfully'
        }
    })
}


exports.sendingSellersToUI = async(req, res, next)=>{
    const token =localStorage.getItem('token')
    if(!token){
        return
    }
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const sellers = findingUser.sellers
    res.status(200).json({
        status : 'success',
        data : {
            sellers
        }
    })
}


exports.updatingSeller = async(req, res, next)=>{
    const {identity, id, updatedValue} = req.body
    console.log(updatedValue)
    const token =localStorage.getItem('token')
    if(!token){
        return
    }
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    findingUser.sellers.forEach(el=>{
        if(String(el._id)===id){
            if(identity.split('-')[0].toLowerCase()==='name '){
                console.log('name')
                el.name = updatedValue

            }else if(identity.split('-')[0].toLowerCase()==='phone '){
                el.phone = updatedValue
            }
            else if(identity.split('-')[0].toLowerCase()==='catagory '){
                el.catagory = updatedValue
            }
        }
    })

    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'Seller updated sucessfully'
        }
    })
}