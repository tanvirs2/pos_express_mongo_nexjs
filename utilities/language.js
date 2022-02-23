const selectedLanguage = process.env.NEXT_PUBLIC_APP_LANGUAGE;
const appLanguage = {
    english:{
        sellModule: {
            name: 'Sell',
            todaySells: 'Today Sells',
            pageNameDescription: 'This is the sell page.',
            pointOfSell: 'Point of Sell',
            productList: 'Product List',
            seeDetails: 'See Details',
            productName: 'Product Name',
            selectProduct: 'Select Product',
            customerName: 'Customer Name',
            selectCustomer: 'Select Customer',
        },
        customerModule: {
            name: 'Sell',
            todaySells: 'Today Sells',
            pageNameDescription: 'This is the sell page.',
            pointOfSell: 'Point of Sell',
            productList: 'Product List',
            seeDetails: 'See Details',
            productName: 'Product Name',
            selectProduct: 'Select Product',
            customerName: 'Customer Name',
            selectCustomer: 'Select Customer',
        },
        supplierModule: {
            name: 'Sell',
            todaySells: 'Today Sells',
            pageNameDescription: 'This is the sell page.',
            pointOfSell: 'Point of Sell',
            productList: 'Product List',
            seeDetails: 'See Details',
            productName: 'Product Name',
            selectProduct: 'Select Product',
            customerName: 'Customer Name',
            selectCustomer: 'Select Customer',
        }
    },

};

export default appLanguage[selectedLanguage];
