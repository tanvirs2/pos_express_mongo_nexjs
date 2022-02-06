const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const categoriesRoute = require('./routes/categories');
const productsRoute = require('./routes/products');
const stockRoute = require('./routes/stock');
const sellRoute = require('./routes/sell');
const customerRoute = require('./routes/customer');
const purchaseOrder = require('./routes/purchaseOrder');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json())

    const prefixApiRoute = (url, routeFile) => {
        server.use('/expr_api' + url, routeFile)
    }

    /*routes*/
    prefixApiRoute('/categories', categoriesRoute);
    prefixApiRoute('/products', productsRoute);
    prefixApiRoute('/stock', stockRoute);
    prefixApiRoute('/sell', sellRoute);
    prefixApiRoute('/customer', customerRoute);
    prefixApiRoute('/purchaseOrder', purchaseOrder);
    /*routes*/

    server.get('/api22', (req, res) => {

        //const actualPage = '/api2'
        //const queryParams = { id: 'dd' }
        //app.render('req', res, actualPage, queryParams)
        //return handle(req, res)

        res.send('we made ddddd')

    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    mongoose.connect("mongodb://localhost:27017/pos_test");

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
});
