import {Col, Container, Form, Modal, Button, Row, ListGroup, Badge} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useEffect, createContext, useRef} from "react";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import { useFormik } from 'formik';

import appLanguage from '../../utilities/language'

import ModalComp from '../../components/sell/Modal';
import {sellingSummeryProcessFunc} from '../../components/sell/sellFunctionality';
import {POSRow} from '../../components/sell/POSRow';
import ProductThumbnail from '../../components/sell/ProductThumbnail';
import PaymentFooter from '../../components/sell/PaymentFooter';

import {SubmitContext} from "../../components/sell/context/context";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/sell/';
const hostApiPurchaseOrder = host+'/purchaseOrder/';
const hostApiStock = host+'/stock/';
const hostApiCustomer = host+'/customer/';
const hostApiProduct = host+'/products/';


let moduleLang = appLanguage.sellModule;

export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    let sellForm = useRef();

    const [selectedCustomerForSell, setSelectedCustomerForSell] = useState({});
    const [show, setShow] = useState(false);
    const [sells, setSells] = useState([]);
    const [purchaseOrders, setPurchaseOrder] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [itemRow, setItemRow] = useState([]);
    const [stocksProducts, setStocksProducts] = useState([]);
    const [sell, setSell] = useState('');


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
    }, [itemRow])

    useEffect(()=>{
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


    }, []);

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

                let customer = datas.map((data)=>{
                    return {id: data._id, value: data.name, label: data.name}
                });

                callback(customer);
            });
    };

    let contextObject = {
        handleSubmitButton: (e) => {
            e.preventDefault();
        },
        sellFormikForm
    };

    function handleSellSubmitButton(e) {
        e.preventDefault();
        let sellFormElm = sellForm.current;
        let sellFormRow = e.target;
        //console.log(sellFormRow.quantities.value, sellFormRow.prices);
        //console.log(sellFormRow.quantities.constructor.name)

        let quantityRow = [];
        let pricesRow = [];
        let productsRow = [];
        let stockRow = [];

        if (sellFormRow.quantities.constructor.name === 'RadioNodeList') {
            quantityRow = [...sellFormRow.quantities];
            pricesRow = [...sellFormRow.prices]
            productsRow = [...sellFormRow.products]
            stockRow = [...sellFormRow.stock]
        } else {
            quantityRow = [sellFormRow.quantities];
            pricesRow = [sellFormRow.prices]
            productsRow = [sellFormRow.products]
            stockRow = [sellFormRow.stock]
        }


        let customers = selectedCustomerForSell.id;

        let bodyData = quantityRow.map((data, index)=>{

            let prices = pricesRow[index].value
            let products = productsRow[index].value
            let quantities = data.value
            let stocks = stockRow[index].value

            return {
                customer: customers, // get customer from outside of this block

                product: products,
                quantity: quantities,
                price: prices,
                stock: stocks
            };
        });

        //console.log(JSON.stringify(bodyData))

        fetch(hostApi, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })

    }


    return (
        <>
            {/*<ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={sell}/>*/}

            <SubmitContext.Provider value={contextObject}>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>{moduleLang.name}</h1>
                            <p>{moduleLang.pageNameDescription}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <div className="card">
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <h6 className="title">{moduleLang.todaySells}</h6>
                                    </header>

                                    {/*<div className="filter-content">
                                        <div className="list-group list-group-flush">
                                            <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create sell </span>
                                        </div>
                                    </div>*/}

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
                                                /*<div key={sell._id} >
                                                    <div className="d-flex justify-content-between list-group-item">
                                                        <a href="#" className="">
                                                            {sell.name}
                                                        </a>
                                                        <span className="">

                                                                <Button variant={"success"} className="mx-1" onClick={()=>{
                                                                    handleShow(sell)
                                                                }}>Edit</Button>

                                                                <Button variant={"danger"} onClick={()=>{
                                                                    handleDeleteSell(sell._id)
                                                                }}>Delete</Button>
                                                            </span>
                                                    </div>
                                                </div>*/

                                            )
                                        })}


                                    </ListGroup>

                                </article>


                                {/*card-group-item.*/}
                            </div>

                        </Col>

                        <Col>

                            <div className="card" style={{minHeight: '75vh'}}>
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <h6 className="title">{moduleLang.pointOfSell}</h6>
                                    </header>
                                    <div className="filter-content">
                                        <div className="list-group list-group-flush">


                                            <div>
                                                <div className="d-flex justify-content-between list-group-item">
                                                    {/*sell form*/}
                                                    <Form className="w-100" ref={sellForm}>
                                                        <div className="col-auto">
                                                            <label className="sr-only">Username</label>
                                                            <div className="input-group mb-2">

                                                                {/*<input type="text" className="form-control" onClick={handleCustomerSearch} placeholder={moduleLang.customerName}/>*/}

                                                                <AsyncSelect
                                                                    className="w-75"
                                                                    instanceId={2}
                                                                    cacheOptions
                                                                    placeholder={moduleLang.selectCustomer}
                                                                    loadOptions={loadCustomers}
                                                                    isClearable
                                                                    name="customer"
                                                                    onChange={(customer)=>{
                                                                        setSelectedCustomerForSell(customer);
                                                                        //console.log(e);
                                                                    }}
                                                                />

                                                                &nbsp;
                                                                <div className="input-group-prepend">
                                                                    <div className="btn btn-danger">+</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-auto">
                                                            <label className="sr-only">Username</label>
                                                            <div className="input-group mb-2">

                                                                {/*<input type="text" className="form-control" placeholder={moduleLang.productName}/>*/}

                                                                {/*<AsyncSelect
                                                            className="w-75"
                                                            cacheOptions
                                                            placeholder={moduleLang.selectProduct}
                                                            instanceId={2}
                                                            loadOptions={loadProducts}
                                                            isClearable
                                                        />*/}

                                                                <Select
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
                                                    </Form>


                                                </div>

                                                {/*zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz*/}

                                                <Form onSubmit={handleSellSubmitButton}>

                                                    <POSRow itemRow={itemRow} setItemRow={setItemRow}/>
                                                    <PaymentFooter itemRows={itemRow}/>

                                                </Form>


                                                {/*zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz*/}

                                            </div>


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
            </SubmitContext.Provider>

        </>
    );
}
