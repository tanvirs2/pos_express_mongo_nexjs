import {Col, Container, Form, Modal, Button, Row, ListGroup, Badge} from "react-bootstrap";
import Swal from 'sweetalert2'
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";
import AsyncSelect from 'react-select/async';

import appLanguage from '../../utilities/language'

import ModalComp from '../../components/sell/Modal';

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/sell/';
const hostApiStock = host+'/stock/';
const hostApiCustomer = host+'/customer/';
const hostApiProduct = host+'/products/';

const selectedLanguage = process.env.NEXT_PUBLIC_APP_LANGUAGE;

let moduleLang = appLanguage[selectedLanguage].sellModule;


function PaymentFooter(props) {

    return (
        <div className="bg-secondary text-white position-absolute w-100 fixed-bottom">
            <div className="row pt-3">

                <Col md={{ span: 2, offset: 1 }}>
                    Item: <br/>
                    100
                </Col>

                <Col md={2}>
                    Total: <br/>
                    100
                </Col>

                <Col md={{ span: 3, offset: 4 }}>
                    Total Payable: <br/>
                    100
                </Col>

            </div>

            <hr/>

            <div className="row pb-3">



                <Col md={{span: 'auto', offset: 5}}>
                    <button className="btn btn-danger btn-lg">Paid</button>
                </Col>


            </div>
        </div>
    );
}

function POSRow(props){

    return (
        <div className="col">
            {/* Keeps count of product rows */}

            <table className="table table-condensed table-bordered table-striped table-responsive">
                <thead>
                <tr>
                    <th className="tex-center  col-md-4 ">
                        Product <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom" data-content="Click <i>product name</i> to edit price, discount & tax. <br/>Click <i>Comment Icon</i> to enter serial number / IMEI or additional note.<br/><br/>Click <i>Modifier Icon</i>(if enabled) for modifiers" data-html="true" data-trigger="hover" />									</th>
                    <th className="text-center">
                        Stock
                    </th>
                    <th className="text-center col-md-3">
                        Quantity
                    </th>
                    <th className="text-center col-md-2 ">
                        Unit Price
                    </th>
                    <th className="text-center col-md-2">
                        Subtotal
                    </th>
                    <th className="text-center"><i className="fa fa-close" />
                    </th>
                </tr>
                </thead>

                <tbody>

                <tr className="product_row" data-row_index={1}>
                    <td>
                        <div>
                            ddd
                        </div>
                    </td>
                    <td>198.00</td>
                    <td>

                        <div className="input-group input-number">
                            <input type="text" className="form-control pos_quantity input_number mousetrap input_quantity" />
                        </div>

                    </td>
                    <td>
                        <input type="text" name="products[1][unit_price_inc_tax]" className="form-control pos_unit_price_inc_tax input_number"/>
                    </td>
                    <td className="text-center v-center">
                        <span className="display_currency pos_line_total_text ">৳ 2,050.00</span>
                    </td>
                    <td className="text-center">
                        close
                    </td>
                </tr>


                </tbody>
            </table>
        </div>
    );
}

function ProductThumbnail(props){

    //console.log(props.stock.product)

    let stock = props.stock
    let product = props.stock.product

    return (
        <Col md={4} className="p-1">
            <div className="card" style={{height: '160px'}}>
                <img className="card-img-top p-1" style={{height: '70px'}} src="/prod.png" alt="Card image cap"/>
                <div className="card-body p-1">
                    <b>{product.name} (<small className="text-success">{stock.quantityPurchased}</small>)</b>
                    <small>{product.code}d</small>
                    <small>{stock.name}</small>
                </div>
            </div>
        </Col>
    );
};

export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);



    const [show, setShow] = useState(false);
    const [sells, setSells] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [sell, setSell] = useState('');


    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
                setSells(data);
            });

        fetch(hostApiStock)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
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


        /*Swal.fire({
            title: 'Do you want to delete the Sell?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /!* Read more about isConfirmed, isDenied below *!/
            if (result.isConfirmed) {


                Swal.fire('Delete!', '', 'error')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })*/
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





    return (
        <>
            <ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={sell} />

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
                                <header className="card-header"><h6 className="title">{moduleLang.todaySells}</h6></header>

                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create sell </span>
                                    </div>
                                </div>

                                <ListGroup as="ol" numbered>

                                    {sells.map(sell=>{
                                        return (
                                            <ListGroup.Item
                                                key={sell._id}
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">Subheading</div>
                                                    Cras justo odio
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
                                            <Form className="w-100">
                                                <div className="col-auto">
                                                    <label className="sr-only" >Username</label>
                                                    <div className="input-group mb-2">

                                                        {/*<input type="text" className="form-control" onClick={handleCustomerSearch} placeholder={moduleLang.customerName}/>*/}

                                                        <AsyncSelect
                                                            className="w-75"
                                                            instanceId={2}
                                                            cacheOptions
                                                            placeholder={moduleLang.selectCustomer}
                                                            loadOptions={loadCustomers}
                                                            isClearable
                                                        />

                                                        &nbsp;
                                                        <div className="input-group-prepend">
                                                            <div className="btn btn-danger">+</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-auto">
                                                    <label className="sr-only" >Username</label>
                                                    <div className="input-group mb-2">

                                                        {/*<input type="text" className="form-control" placeholder={moduleLang.productName}/>*/}

                                                        <AsyncSelect
                                                            className="w-75"
                                                            cacheOptions
                                                            placeholder={moduleLang.selectProduct}
                                                            instanceId={2}
                                                            loadOptions={loadProducts}
                                                            isClearable
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


                                            <POSRow/>
                                            <PaymentFooter/>


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
                                <header className="card-header"><h6 className="title">{moduleLang.productList}</h6></header>

                                <div className="filter-content">

                                    <div className="list-group list-group-flush">

                                        <div className="container py-2">
                                            <div className="row">

                                                {
                                                    stocks.map(stock=>{

                                                        //console.log('ddddddddd', stock)

                                                        return (
                                                            <React.Fragment key={stock._id}>
                                                                <ProductThumbnail stock={stock}/>
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
        </>
    );
}
