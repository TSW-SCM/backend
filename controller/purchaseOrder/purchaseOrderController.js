const OpenAccount = require("./../../model/authModel/auth.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const pdf = require("html-pdf");

exports.purchaseOrderCredentialsSetting = async (req, res, next) => {
  const {
    purchase_order_vatt,
    purchase_order_transportation,
    purchase_order_packaging,
    purchase_order_fuel,
    purchase_order_labour,
    purchase_order_food,
    purchase_order_rent,
    purchase_order_service,
    purchase_order_mislaneous,
  } = req.body;
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  findingUser.purchase_order_vatt = purchase_order_vatt;
  findingUser.purchase_order_transportation = purchase_order_transportation;
  findingUser.purchase_order_packaging = purchase_order_packaging;
  findingUser.purchase_order_fuel = purchase_order_fuel;
  findingUser.purchase_order_labour = purchase_order_labour;
  findingUser.purchase_order_food = purchase_order_food;
  findingUser.purchase_order_rent = purchase_order_rent;
  findingUser.purchase_order_service = purchase_order_service;
  findingUser.purchase_order_mislaneous = purchase_order_mislaneous;
  findingUser.save();

  res.status(200).json({
    status: "success",
    data: {
      message: "Credentials Added successfully",
    },
  });
};

exports.sendingPurchaseCrenetials = async (req, res, next) => {
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  const credentialsArray = [
    {
      vatt: findingUser.purchase_order_vatt,
    },
    {
      transportation: findingUser.purchase_order_transportation,
    },
    {
      pack: findingUser.purchase_order_packaging,
    },
    {
      fuel: findingUser.purchase_order_fuel,
    },
    {
      labour: findingUser.purchase_order_labour,
    },
    {
      food: findingUser.purchase_order_food,
    },
    {
      rent: findingUser.purchase_order_rent,
    },
    {
      service: findingUser.purchase_order_service,
    },
    {
      mislaneous: findingUser.purchase_order_mislaneous,
    },
  ];

  res.status(200).json({
    status: "success",
    data: {
      credArray: credentialsArray,
    },
  });
};

exports.updatePurchaseOrderCredentials = async (req, res, next) => {
  const { credName, updateValue } = req.body;
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  if (credName === "vatt") {
    findingUser.purchase_order_vatt = updateValue;
  }
  if (credName === "transportation") {
    findingUser.purchase_order_transportation = updateValue;
  }
  if (credName === "pack") {
    findingUser.purchase_order_packaging = updateValue;
  }
  if (credName === "fuel") {
    findingUser.purchase_order_fuel = updateValue;
  }
  if (credName === "labour") {
    findingUser.purchase_order_labour = updateValue;
  }
  if (credName === "food") {
    findingUser.purchase_order_food = updateValue;
  }
  if (credName === "rent") {
    findingUser.purchase_order_rent = updateValue;
  }
  if (credName === "service") {
    findingUser.purchase_order_service = updateValue;
  }
  if (credName === "miss") {
    findingUser.purchase_order_mislaneous = updateValue;
  }
  findingUser.save();

  res.status(200).json({
    status: "success",
    data: {
      message: `${credName} updated sucessfully`,
    },
  });
};

exports.addingPurchaseOrder = async (req, res, next) => {
  const {
    purchaseOrderList,
    total_vatt,
    total_purchase_value,
    total_additional_cost,
    paymentStatus,
  } = req.body;
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  findingUser.purchase_orders.push({
    purchaseOrders: purchaseOrderList,
    total_vatt,
    total_purchase_value,
    total_additional_cost,
    paymentStatus,
  });

  findingUser.save();

  res.status(200).json({
    status: "success",
    data: {
      message: `Purchase added successfully`,
    },
  });
};

exports.sendingAllPurchaseOrderHistory = async (req, res, next) => {
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  const history_purchase_orders = findingUser.purchase_orders;

  res.status(200).json({
    status: "success",
    data: {
      history_purchase_orders: history_purchase_orders,
    },
  });
};

exports.downloadPurchaseOrders = async (req, res, next) => {
  const { from, to } = req.body;
  const token = localStorage.getItem("token");
  const decode = await promisify(jwt.verify)(token, process.env.STRING);
  const findingUser = await OpenAccount.findById(decode.id);
  const history_purchase_orders = findingUser.purchase_orders;
  const arr = [];
  const orders = history_purchase_orders;
  const allOrders = orders.map((el, index) => {
    return `<tr>
                    <td>${index + 1}</td>
                    <td>${el.purchase_order_name}</td>
                    <td>${el.purchase_order_quantity} kg</td>
                    <td>${el.purchase_order_price}</td>
                    <td>${el.total_additional_cost}</td>
                    <td>${el.total_purchase_value}</td>
                </tr>
            `;
  });
  const finalStr = allOrders.join();

  let options = {
    format: "a4",
    border: {
      top: "0.5in", // default is 0, units: mm, cm, in, px
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
    header: {
      height: "14mm",
      contents: `<div style="">
                    <p style='font-size:1.6rem' >The Supply Wheel - way to optimize</p> 
                </div>`,
    },
    footer: {
      height: "14mm",
      contents: {
        first: "The Supply Wheel - way to optimize",
        2: "Second page", // Any page number is working. 1-based index
        default:
          '<span style="color: #444 , background-color: #287f70 ">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last Page",
      },
    },
  };

  const html = `
    
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
                width : 260vh;
            }
            table thead th {
                border: 0.1rem solid #000;
                padding : 1rem;
                font-size : 1.6rem;
            }
            table tbody tr td {
                border: 0.1rem solid #000;
                text-align: center;
                padding : 0.5rem;
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
                        <h1 class="head">Tarsem Trading Company</h1>
                        <p class="des">mandi near jalandhar</p>
                        <p class="des">Date - ${new Date().toLocaleDateString()}</p>
                        <!-- <h1 class="head">Quotation for PVR jalandhar, near mandi 151001</h1> -->
                        <!-- <p class="des">mandi near jalandhar</p> -->
                    </div>
                </div>
                <div class="middle pad16 flex flex-dir gap16">
                    <h2 class="user user__">Puchase orders</h2>
                    <table>
                        <thead>
                            <th>S.no</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Amt per kg.</th>
                            <th>Additional cost</th>
                            <th>Total Amt</th>
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
    `;

  pdf
    .create(html, options)
    .toFile(
      "E:/wheelfront/wheel-front/wheel/src/purchaseOrders/purchase.pdf",
      (err, res) => {
        console.log(res);
      }
    );

  res.status(200).json({
    status: "succes",
  });
};
