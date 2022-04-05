import {Col, Container, Form, Button, Row, ListGroup, Badge, Alert} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useEffect, useRef} from "react";

import AsyncSelect from 'react-select/async';
import Select from "react-select";
import { useFormik } from 'formik';
import collect from "collect.js";

import appLanguage from '../../utilities/language'

import {sellingSummeryProcessFunc} from '../../components/rexineSell/sellFunctionality';
import {POSRow} from '../../components/rexineSell/POSRow';
import ProductThumbnail from '../../components/rexineSell/ProductThumbnail';
import PaymentFooter from '../../components/rexineSell/PaymentFooter';

import {PoundCalculatingContext} from "../../components/rexineSell/context/context";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/rexine-sell/';
const hostApiStock = host+'/rexine-stock/';
const hostApiPurchaseOrder = host+'/purchaseOrder/';
const hostApiCustomer = host+'/customer/';
const hostApiProduct = host+'/products/';
const hostApiCustomerTransaction = host+'/customerTransaction/';
const todayInformation = host+'/day-by-day-information/';
const todayInformationLatestOne = host+'/day-by-day-information/latest-one';



let moduleLang = appLanguage.sellModule;

let refreshCount = 0;
export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    //let sellForm = useRef();

    const [selectedCustomerForSell, setSelectedCustomerForSell] = useState(null);
    const [selectedCustomerDue, setSelectedCustomerDue] = useState(null);
    const [purchaseOrders, setPurchaseOrder] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [itemRow, setItemRow] = useState([]);
    const [stocksProducts, setStocksProducts] = useState([]);
    const [refreshPage, setRefreshPage] = useState('');
    const [show, setShow] = useState(false);
    const [showTodayPrice, setShowTodayPrice] = useState(true);
    const [todayPrice, setTodayPrice] = useState(0);
    const [oneOunchPrice, setOneOunchPrice] = useState(0);
    const [sells, setSells] = useState([]);
    const [sell, setSell] = useState('');

    let selectRef = useRef();
    let selectRef2 = useRef();

    const refreshComponent = () => {
        setPurchaseOrder([])
        setStocks([]);
        setItemRow([]);
        setStocksProducts([]);
        selectRef.current.clearValue()
        selectRef2.current.clearValue()
        setSelectedCustomerDue(null);
        setRefreshPage(++refreshCount);
    }



    const sellFormikForm = useFormik({
        initialValues: {
            prices: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    useEffect(()=>{
        sellingSummeryProcessFunc();
    }, [itemRow, refreshPage])

    useEffect(()=>{

        getTodayPriceFromDB();

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
                setSells(data);
            });

        fetch(hostApiPurchaseOrder)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
                setPurchaseOrder(data);
            });

        fetch(hostApiStock)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
                setStocksProducts(
                    data.map(stock=>{
                        return {
                            ...stock,
                            id: stock.product._id,
                            label: `${stock.product.name} - ${stock.quantityPurchased}`,
                            value: stock.product.name
                        };
                    })
                );
                setStocks(data);
            });


    }, [refreshPage]);

    const getTodayPriceFromDB = () => {
      //todayInformationLatestOne
        fetch(todayInformationLatestOne)
            .then(response=> response.json())
            .then(datas=>{
                setTodayPrice(datas.todayPrice)
                setOneOunchPrice(datas.todayPrice / 16)
                setShowTodayPrice(false);
                //console.log('todayInformationLatestOne---', datas)
            });
    }

    const handleClose = () => setShow(false);

    const handleShow = (sell = {}) => {
        setShow(true)
        setSell(sell)
    };

    const handleDeleteSell = (sell_id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(hostApi+sell_id, {
                    method: 'DELETE'
                })
                .then(res => res.json()) // or res.json()
                .then(res => {
                    //console.log(res)
                });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };


    const itemRowForSales = (stock) => {
        //console.log('stock->', stock, '<-stock');
        setItemRow([...itemRow, stock])
    };

    const loadProducts = (inputValue, callback) => {

        fetch(hostApiProduct+'/productName/'+inputValue)
            .then(response=> response.json())
            .then(datas=>{

                let product = datas.map((data)=>{
                    return {id: data._id, value: data.name, label: data.name}
                });

                callback(product);
            });

    };

    const loadCustomers = (inputValue, callback) => {

        fetch(hostApiCustomer+'/customerName/'+inputValue)
            .then(response=> response.json())
            .then(datas=>{

                //console.log('------->', datas)

                let customer = datas.map((data)=>{
                    return {id: data._id, value: data.name, address: data.address, label: data.name +' - ['+ (data.organizationName ? data.organizationName: 'No Organization') +']'}
                });

                callback(customer);
            });
    };

    const customerTransaction = (customer) => {
        //console.log(customer.id);
        fetch(hostApiCustomerTransaction+customer.id)
            .then(response=> response.json())
            .then(customerTransactionDatas=>{

                //console.log('------->', collect(customerTransactionDatas).sum('due'), customerTransactionDatas)

                let due = collect(customerTransactionDatas).sum('due')

                setSelectedCustomerDue(due);

            });
    }

    let contextObject = {
        todayPriceFromContext: todayPrice,
        oneOunchPriceFromContext: oneOunchPrice,
    };

    async function handleSellSubmitButton(e) {
        //let sellFormElm = sellForm.current;
        let sellFormRow = e.target;
        //console.log(sellFormRow.pound, sellFormRow.prices);
        //console.log(sellFormRow.quantities.constructor.name)


        //sellFormRow.payment.value

        let quantityRow = [];
        let pricesRow = [];
        let productsRow = [];
        let stockRow = [];
        let poundAmountRow = [];
        let stockQtyRow = [];//stockQty

        if (sellFormRow.quantities) {
            if (sellFormRow.quantities.constructor.name === 'RadioNodeList') {
                quantityRow = [...sellFormRow.quantities];
                pricesRow = [...sellFormRow.prices];
                poundAmountRow = [...sellFormRow.pound];
                productsRow = [...sellFormRow.products];
                stockRow = [...sellFormRow.stock];
                stockQtyRow = [...sellFormRow.stockQty];
            } else {
                quantityRow = [sellFormRow.quantities];
                pricesRow = [sellFormRow.prices];
                poundAmountRow = [sellFormRow.pound];
                productsRow = [sellFormRow.products];
                stockRow = [sellFormRow.stock];
                stockQtyRow = [sellFormRow.stockQty];
            }
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Product not added',
                showConfirmButton: false,
                //timer: 1500
            })
        }

        let customers = selectedCustomerForSell.id;
        let payment = sellFormRow.payment.value;
        let payable = sellFormRow.payable.value;

        let bodyData = quantityRow.map((data, index)=>{

            let prices = pricesRow[index].value
            let pounds = poundAmountRow[index].value
            let products = productsRow[index].value
            let quantities = data.value
            let stocks = stockRow[index].value
            let stockQtys = stockQtyRow[index].value

            return {
                customer: customers, // get customer from outside of this block
                payment, // get payment from outside of this block
                payable,
                product: products,
                quantity: quantities,
                price: prices,
                pound: pounds,
                stock: stocks,
                stockQty: Number(stockQtys)
            };
        });

        /*const collection = collect(bodyData).groupBy('stock');


        collection.each((item) => {
            //console.log(item.sum('quantity'));
            let stObj = {id: item['items'][0].stock, qty: item.sum('quantity')};
           //console.log('->',stObj);
        });*/

        //console.log(collection, collection['items']['61f6369bf06c0abf945b671a'].sum('quantity'));

        //console.log((bodyData))

        //return 0;

        let sellDone = await fetch(hostApi, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })

        if (sellDone.status === 200) {
            Swal.fire(
                'Sold!',
                'Product sold.',
                'success'
            )
            refreshComponent();
            sellFormRow.payment.value = '';
            sellFormRow.payable.value = '';
        }

        //console.log('---->',sellDone);
    }

    let handleTodayPriceInformation = event => {
        //console.log(event);
        //todayInformation
        if (event.key === 'Enter') {

            fetch(todayInformation, {
                body: JSON.stringify({
                    todayPrice: event.target.value
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
                .then(response => response.json())
                .then(res=>console.log(res));

            setTodayPrice(event.target.value)
            setOneOunchPrice(event.target.value / 16)
            setShowTodayPrice(false);
        }
    }


    return (
        <>
            {/*<ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={sell}/>*/}

            <PoundCalculatingContext.Provider value={contextObject}>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>{moduleLang.name}</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <div className="card">
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <h6 className="title">{moduleLang.todaySells}</h6>
                                    </header>

                                    <ListGroup as="ol" numbered>

                                        {purchaseOrders.map(purchaseOrder => {

                                            //console.log(sell)

                                            return (
                                                <ListGroup.Item
                                                    key={purchaseOrder._id}
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start"
                                                >
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{purchaseOrder.customer.name}</div>
                                                        {/*{purchaseOrder.product.name}*/}
                                                    </div>
                                                    <Badge variant="primary" pill>
                                                        14
                                                    </Badge>
                                                </ListGroup.Item>
                                            )
                                        })}


                                    </ListGroup>

                                </article>


                                {/*card-group-item.*/}
                            </div>

                        </Col>

                        <Col>

                            <Row>
                                <Col>
                                    <Alert variant="danger" >
                                        {
                                            showTodayPrice ?
                                                <input type="text" className="form-control" style={{width: "100%"}} placeholder="Set today price" onKeyUp={handleTodayPriceInformation}/>
                                                :
                                                <Button style={{width: "100%"}} variant="danger" onClick={()=>setShowTodayPrice(true)}>Set New Price</Button>
                                        }

                                    </Alert>

                                </Col>
                                <Col>
                                    <Alert variant="dark" >
                                        <Alert.Heading>Today Price - {todayPrice} </Alert.Heading>
                                    </Alert>
                                </Col>
                                <Col>
                                    <Alert variant="info" >
                                        <Alert.Heading>One ounch - {oneOunchPrice} </Alert.Heading>
                                    </Alert>
                                </Col>
                            </Row>


                            <div className="card" style={{minHeight: '75vh'}}>
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <h6 className="title">{moduleLang.pointOfSell}</h6>
                                    </header>
                                    <div className="filter-content">
                                        <div className="list-group list-group-flush">
                                            <Form onSubmit={event => {
                                                event.preventDefault();
                                                if (selectedCustomerForSell) {
                                                    handleSellSubmitButton(event);
                                                    //console.log(event.target.quantities[1].value);
                                                } else {
                                                    Swal.fire({
                                                        position: 'top-end',
                                                        icon: 'error',
                                                        title: 'Customer not select',
                                                        showConfirmButton: false,
                                                        //timer: 1500
                                                    })
                                                }

                                            }}>

                                                <div>
                                                    <div className="d-flex justify-content-between list-group-item">
                                                        {/*sell form*/}
                                                        {/*<Form className="w-100" ref={sellForm}>*/}
                                                        <div className="w-100" >
                                                            <div className="row">
                                                                <div className="col-6 pe-0 ps-0">
                                                                    <label className="sr-only">Username</label>
                                                                    <div className="input-group mb-2">

                                                                        {/*<input type="text" className="form-control" onClick={handleCustomerSearch} placeholder={moduleLang.customerName}/>*/}

                                                                        <AsyncSelect
                                                                            ref={selectRef}
                                                                            className="w-100"
                                                                            instanceId={2}
                                                                            cacheOptions
                                                                            placeholder={moduleLang.selectCustomer}
                                                                            loadOptions={loadCustomers}
                                                                            isClearable
                                                                            name="customer"
                                                                            onChange={(customer)=>{
                                                                                setSelectedCustomerForSell(customer);
                                                                                if (customer) {
                                                                                    customerTransaction(customer);
                                                                                }
                                                                                //console.log('-->',customer);
                                                                            }}
                                                                        />

                                                                        {/*&nbsp;
                                                                        <div className="input-group-prepend">
                                                                            <div className="btn btn-danger">+</div>
                                                                        </div>*/}

                                                                        {
                                                                            !selectedCustomerForSell ? <div className="alert alert-danger mt-1 w-100 ">
                                                                                <strong>Customer!</strong> need to select
                                                                                a customer.
                                                                            </div> : ''
                                                                        }

                                                                    </div>
                                                                </div>

                                                                <div className="col pe-0 ps-1">


                                                                    <table className="table border table-hover">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th className=" bg-dark text-white px-1" style={{width: "10px"}}>Area:</th>
                                                                                <td className=" ps-1">{selectedCustomerForSell?.address}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                                <div className="col-2 px-1">

                                                                    <table className="table border table-hover ">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th className="bg-dark text-white px-1" style={{width: "10px"}}>Due:</th>
                                                                                <td className="ps-1">{selectedCustomerDue}</td>
                                                                            </tr>

                                                                        </tbody>

                                                                    </table>


                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col pe-0 ps-0">
                                                                    <label className="sr-only">Username</label>
                                                                    <div className="input-group mb-2">

                                                                        <Select
                                                                            ref={selectRef2}
                                                                            instanceId={2}
                                                                            className="w-75"
                                                                            classNamePrefix="select"
                                                                            isClearable
                                                                            isSearchable
                                                                            placeholder={moduleLang.selectProduct}
                                                                            name="product"
                                                                            options={stocksProducts}
                                                                            onChange={(stockObject) => {

                                                                                if (stockObject) {
                                                                                    itemRowForSales(stockObject);
                                                                                }

                                                                                //console.log(itemRow, '||||', stockObject);
                                                                            }}
                                                                        />

                                                                        &nbsp;
                                                                        <div className="input-group-prepend">
                                                                            <div className="btn btn-danger">+</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {/*</Form>*/}

                                                    </div>

                                                        <POSRow itemRow={itemRow} setItemRow={setItemRow}/>
                                                        <PaymentFooter itemRows={itemRow}/>

                                                </div>

                                            </Form>


                                        </div>
                                        {/*list-group .*/}
                                    </div>
                                </article>
                            </div>
                            <br/>


                        </Col>

                        {/*3rd col*/}

                        <Col md={3}>
                            <div className="card mb-3">
                                <article className="card-group-item">
                                    <header className="card-header"><h6 className="title">{moduleLang.productList}</h6>
                                    </header>

                                    <div className="filter-content">

                                        <div className="list-group list-group-flush">

                                            <div className="container py-2">
                                                <div className="row">

                                                    {
                                                        stocks.map(stock => {

                                                            //console.log('ddddddddd', stock)

                                                            return (
                                                                <React.Fragment key={stock._id}>
                                                                    <ProductThumbnail stock={stock} itemRowForSales={itemRowForSales}/>
                                                                </React.Fragment>
                                                            );
                                                        })
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                        {/*list-group .*/}
                                    </div>
                                </article>
                            </div>

                        </Col>

                    </Row>


                </Container>
            </PoundCalculatingContext.Provider>

        </>
    );
}
