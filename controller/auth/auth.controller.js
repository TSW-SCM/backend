const OpenAccount = require('./../../model/authModel/auth.model')
const path = require('path')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const area = path.join(__dirname, "assets")

exports.createAccount = async (req, res, next)=>{
    const {company_name, owner_name, address, gst, catagory,multiSingle,regNum, phone,email, pin} = req.body;
    const {imageShop} = req.files
    const openingAccount = await OpenAccount.create({company_name, owner_name, address, gstin : gst, catagory,multi_single : multiSingle,reg_number: regNum, phone,email_id : email ,pin})
    const userShopLogoImageName = `business_logo_${openingAccount._id}.${imageShop.mimetype.split('/')[1]}`
    imageShop.mv(path.join('./public/business_logo', userShopLogoImageName))
    console.log(openingAccount)
    openingAccount.store_Image = userShopLogoImageName
    openingAccount.save()

    const token = await jwt.sign({id : openingAccount._id}, process.env.STRING)

    localStorage.setItem('token', token)


    res.status(200).json({
        status : 'success',
        data : {
            message : 'Congratulations your account is open!!',
            token : token,
            account : openingAccount
        }
    })
}


exports.KYCUpload = async (req, res, next)=>{
    const {aadhar_card, pan_card, your_image, store_image} = req.files;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    console.log(decode)
    const findingUser = await OpenAccount.findById(decode.id)
    console.log(findingUser)

    const aadharCardImageName = `aadhar_card_${findingUser._id}.${aadhar_card.mimetype.split('/')[1]}`
    findingUser.aadhar_card = aadharCardImageName
    aadhar_card.mv(path.join('./public/kyc/aadharCard', aadharCardImageName))

    const panCardImageName = `pan_card_${findingUser._id}.${pan_card.mimetype.split('/')[1]}`
    findingUser.pan_card = panCardImageName
    pan_card.mv(path.join('./public/kyc/panCard', panCardImageName))

    const yourImageName = `your_image_${findingUser._id}.${your_image.mimetype.split('/')[1]}`
    findingUser.your_image = yourImageName
    your_image.mv(path.join('./public/kyc/yourImage', yourImageName))
    
    const storeImageName = `store_image_${findingUser._id}.${store_image.mimetype.split('/')[1]}`
    findingUser.store_image_full = storeImageName
    store_image.mv(path.join('./public/kyc/storeImage', storeImageName))

    await findingUser.save()


    res.status(200).json({
        status : 'success',
        data : {
            message : 'KYC documents uploaded, it takes 24 hours to verify'
        }
    })
    
} 


exports.autoLogin = async (req, res, next)=>{
    const token =localStorage.getItem('token')
    if(!token){
        return
    }
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    if(findingUser){
        res.status(200).json({
            status : 'success', 
            data : {
                message : `Welcome back to dashboard ${findingUser.owner_name}`
            }
        })
    }else{
        res.status(200).json({
            status : 'success',
            data : {
                message : `Please Login or open new account`
            }
        })
    }
}