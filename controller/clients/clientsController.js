const OpenAccount = require('./../../model/authModel/auth.model')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const pdf = require('html-pdf')
exports.AddClients = async(req, res, next)=>{
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const {client_name, client_address, client_business_name, client_phone} = req.body;
    findingUser.Clients.push({
        client_name,
        client_address,
        client_business_name,
        client_phone
    })

    findingUser.save()
    res.status(200).json({
        status : 'success',
        data : {
            message : 'Client Added successfully'
        }
    })
}

exports.addFixedPricesForClient = async (req, res, next)=>{
    const {client_name, price_arr} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const netClientPriceToBeassigned = findingUser.Clients.filter(el=>{
        if(el.client_name=== client_name){
            return el;
        }
    })

    console.log(netClientPriceToBeassigned)

    netClientPriceToBeassigned[0].client_items_price_fixed.push(...price_arr)
    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'Fixed prices for client added successfully'
        }
    })

}


exports.addRangePricesForClient = async (req, res, next)=>{
    const {client_name, price_arr} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const netClientPriceToBeassigned = findingUser.Clients.filter(el=>{
        if(el.client_name=== client_name){
            return el;
        }
    })

    console.log(netClientPriceToBeassigned)

    netClientPriceToBeassigned[0].client_items_price_range.push(...price_arr)
    findingUser.save()

    res.status(200).json({
        status : 'success',
        data : {
            message : 'Range prices for client added successfully'
        }
    })

}


exports.formationOfQuotation = async (req, res, next)=>{
    const {client_name} = req.body;
    const token =localStorage.getItem('token')
    const decode = await promisify(jwt.verify)(token, process.env.STRING)
    const findingUser = await OpenAccount.findById(decode.id)
    const netClientPriceToBeassigned = findingUser.Clients.filter(el=>{
        if(el.client_name=== client_name){
            return el;
        }
    })
    let arrOfItems = netClientPriceToBeassigned[0].client_items_price_fixed
    let options = {
        format : 'a4',
        border: {
            "top": "0.5in",            // default is 0, units: mm, cm, in, px
            "right": "0.5in",
            "bottom": "0.5in",
            "left": "0.5in"
        }
        ,
        header: {
            "height": "14mm",
            "contents": `<div style="">
                    <p style='font-size:1.6rem' >The Supply Wheel</p> 
                </div>`
          }
        ,
        footer: {
            "height": "14mm",
            "contents": {
              first: 'The Supply Wheel - way to optimize',
              2: 'Second page', // Any page number is working. 1-based index
              default: '<span style="color: #444 , background-color: #287f70 ">{{page}}</span>/<span>{{pages}}</span>', // fallback value
              last: 'Last Page'
            }
        }
    }

    const arr = []
    const fruits = arrOfItems
    fruits.forEach(el=>{
        arr.push(
            `
            <tr>
                <td>1</td>
                <td>${el.name}</td>
                <td>per kg</td>
                <td>${el.price}</td>
            </tr>
            `
        )
    })

    const finalStr = arr.join()

    const html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- <link rel="stylesheet" href="style.css"> -->
    </head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poiret+One&family=Smooch&display=swap');
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html{
            font-size: 62.5%;
        }
        body{
            font-family: 'Montserrat';
            background-color: #fff;
        }
        .middle{
            align-items: center;

        }
        .flex{
            display: flex;
        }
        .flex-1{
            align-items: center;
            justify-content: center;
        }
       
        .top{
            color: #000 !important;
        }
        .flex-2{
            align-items: center;
            justify-content: space-between;
        }
        .pad16{
            padding: 1.6rem;
        }
        .head,.user{
            font-size: 2.4rem;
            color: #000;
            text-align : center;
            margin-bottom : 1rem;
            font-style : normal;
            text-decoration : underline;
        }
        .flex-dir{
            flex-direction: column;
        }
        .gap16{
            gap:1.6rem
        }
        .gap48{
            gap: 9.6rem
        }
        .des{
            color: #000;
            text-align : center;
            margin-bottom : 1rem;
            font-size : 1.2rem;
        }
        .gap08{
            gap: 0.8rem;
        }
        .user__{
            color: #000;
            text-align: center;
        }
        .user_{
            color: #000 !important;
            font-size: 1.4rem;
        }
        .credentials{
            border: 0.1rem solid #000;
        }
        .gen{
            font-size: 1.4rem;
            font-weight: 600;
        }
        .gen__{
            font-weight: 400;
            line-height: 1.5;
        }
        .grid{
            display: grid;
            grid-template-columns: repeat(2.1fr);
        }
        table {
            border: 0.1rem solid #000;
            margin : 0 auto;
            width : 220vh;
        }
        table thead th {
            border: 0.1rem solid #000;
            padding : 1rem;
            font-size : 1.6rem;
        }
        table tbody tr td {
            border: 0.1rem solid #000;
            text-align: center;
            padding : 1rem;
            font-size : 1.6rem;
        }
        table, th, td {
            border: 1px solid black !important;
            border-collapse: collapse;
        }
        
    </style>
    <body class="flex flex-1">
        <div class="body">
            <div class="top flex flex-1 pad16">
                <div class="cover flex flex-dir flex-1 gap08">
                    <h1 class="head">${findingUser.company_name}</h1>
                    <p class="des">${findingUser.address}</p>
                    <p class="des">Date - ${new Date().toLocaleDateString()}</p>
                    <h1 class="head">${netClientPriceToBeassigned[0].client_business_name}</h1>
                    <p class="des">${netClientPriceToBeassigned[0].client_address}</p>
                </div>
            </div>
            <div class="middle pad16 flex flex-dir gap16">
                <h2 class="user user__">Quotation</h2>
                <table>
                    <thead>
                        <th>S.no</th>
                        <th>Name of item</th>
                        <th>Quantity</th>
                        <th>Rates</th>
                    </thead>
                    <tbody>

                        ${finalStr}
                        
                    </tbody>

                </table>
            </div>
            <div class="bottom"></div>
        </div>
    </body>
</html>
    `
    pdf.create(html, options).toFile('pdf.pdf', (err,res)=>{
        console.log(res)
    })
    
    res.status(200).json({
        status : 'succes'
    })
}