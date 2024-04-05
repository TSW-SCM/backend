const express = require('express')

const router = express.Router()
const retail = require('./../controller/clients/storeAccountController')

router.route('/retail-open-acc').post(retail.openRetailAccount)
router.route('/retail-add-to-cart').post(retail.addToCartRetail)
router.route('/retail-added-cart').get(retail.fetchingClientRetailCart)
router.route('/retail-place-order').post(retail.placingOrdernAndGeneratingPay)
module.exports = router