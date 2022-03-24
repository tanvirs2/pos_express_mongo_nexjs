import React, {Fragment, useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {Button, Col, Form, Modal, Nav, Row} from "react-bootstrap";
import Cookies from 'js-cookie'

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/rexine-stock/';
const belongProductsHostApi = host+'/products/';
const belongSupplierHostApi = host+'/suppliers/';

export default function ModalComp(props) {

    const [stock, setStock] = useState('');
    const [products, setProducts] = useState([]);
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [dynamicInputFields, setDynamicInputFields] = useState([{quantityPurchased: '', unitPrice: '', product: '', selectText: '', amountPurchased: ''}]);
    const [cooKiePanelType, setCooKiePanelType] = useState( Cookies.get('panelType') );
    let form = useRef(null);

    useEffect(() => {

        //console.log('before', form.current);

        fetch(belongProductsHostApi)
            .then(response=>response.json())
            .then(products=>{
                //console.log(data);
                setProducts(products); // get Products for Products select option
            });

        fetch(belongSupplierHostApi)
            .then(response=>response.json())
            .then(suppliers=>{
                //console.log('---suppliers--->', suppliers);
                setAllSuppliers(suppliers); // get Products for Products select option
            });

        setStock(props.stockData);

        if (Cookies.get('panelType') === undefined) {

            handleInputPanel({panelType: 'single'});

        }

        return () => {
            //console.log('after', form.current);
        }

    }, [stock]);

    const handleClose = () => {
        props.handleClose();
    };


    const handleSubmitData = async (event) => {
        //alert('dsa');

        //setStock([]);

        event.preventDefault();

        //console.log(dynamicInputFields);

        //return;

        let formObject = [];

        if (Cookies.get('panelType') === 'multi') {

            formObject = dynamicInputFields.map(dynamicInputField=>{
                return {
                    supplier: form.current.supplier.value,
                    description: form.current.description.value,

                    quantityPurchased: dynamicInputField.quantityPurchased,
                    amountPurchased: dynamicInputField.amountPurchased,
                    unitPrice: dynamicInputField.unitPrice,
                    product: dynamicInputField.product,
                };
            });

        } else {

            formObject = [
                {
                    supplier: form.current.supplier.value,
                    description: form.current.description.value,
                    quantityPurchased: form.current.quantityPurchased.value,
                    amountPurchased: form.current.amountPurchased.value,
                    unitPrice: form.current.unitPrice.value,
                    product: form.current.product.value,
                }
            ];
        }

        //console.log(formObject);
        //return;


        const res = await fetch(hostApi, {
            body: JSON.stringify(formObject),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const result = await res.json();




        props.updateStockList();
        handleClose()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        //console.log(result);

    };

    const handleUpdateData = async (event) => {

        event.preventDefault()

        //console.log(props.stockData._id);

        const res = await fetch(hostApi+props.stockData._id, {
            body: JSON.stringify({
                name: form.current.name.value,
                supplier: form.current.supplier.value,
                description: form.current.description.value,
                quantityPurchased: form.current.quantityPurchased.value,
                amountPurchased: form.current.amountPurchased.value,
                unitPrice: form.current.unitPrice.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })

        const result = await res.json()

        handleClose()
        props.updateStockList();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        });

        //console.log(result);

    };


    const handleInputPanel = (panel) => {
        //console.log(Cookies.get('panelTypes'))
        setCooKiePanelType(panel.panelType);
        Cookies.set('panelType', panel.panelType)
    }

    const handleQuantityPurchasedChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...dynamicInputFields];

        //console.log(dynamicInputFields);

        list[index][name] = value;
        setDynamicInputFields(list);
    }

    const handleAmountPurchasedChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...dynamicInputFields];

        //console.log(dynamicInputFields);

        list[index][name] = value;
        setDynamicInputFields(list);
    }

    const handleUnitPriceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...dynamicInputFields];
        list[index][name] = value;
        setDynamicInputFields(list);
    }

    const handleProductChange = (e, index) => {

        //console.dir(e.target[e.target.selectedIndex].text);

        const { name, value } = e.target;
        const list = [...dynamicInputFields];
        //console.log(name, value);
        list[index][name] = value;
        list[index]['selectText'] = e.target[e.target.selectedIndex].text;
        setDynamicInputFields(list);
    }

    //console.log('dd');

    return (
        <>
            <Modal show={props.modalShowOrNot} onHide={handleClose}
                   size="xl"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   onShow={()=>{
                       //console.log(form.current);
                       //form.current.name.value = (props.stockData.name) ? props.stockData.name : '';
                       form.current.supplier.value = (props.stockData.supplier) ? props.stockData.supplier : '';
                       form.current.description.value = (props.stockData.description) ? props.stockData.description : '';
                       form.current.quantityPurchased.value = (props.stockData.quantityPurchased) ? props.stockData.quantityPurchased : '';
                       form.current.amountPurchased.value = (props.stockData.amountPurchased) ? props.stockData.amountPurchased : '';
                       form.current.unitPrice.value = (props.stockData.unitPrice) ? props.stockData.unitPrice : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create stock</Modal.Title> &nbsp;&nbsp;&nbsp;

                    <Nav variant="pills" defaultActiveKey={Cookies.get('panelType')}>

                        <Nav.Item>
                            <Nav.Link eventKey="single" onClick={()=>{
                                handleInputPanel({panelType: 'single'})
                            }}>Single</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="multi" onClick={()=>{
                                handleInputPanel({panelType: 'multi'})
                            }}>Multi</Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>

                            <Form.Select aria-label="Default select example" name="supplier">
                                <option>Open this select menu</option>

                                {
                                    allSuppliers.map(supplier=>{
                                        return (
                                            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>


                        {cooKiePanelType === 'single' ? (<Fragment>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="number" placeholder="Type Quantity" name="quantityPurchased"/>
                                    </Form.Group>

                                   <Form.Group className="mb-3">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" placeholder="Type Amount" name="amountPurchased"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Type Price" name="unitPrice"/>
                                    </Form.Group>


                                    <Form.Label>Product</Form.Label>
                                    <Form.Select aria-label="Default select example" name="product">
                                        <option>Open this select menu</option>

                                        {
                                            products.map(product=>{
                                                return (
                                                    <option key={product._id} value={product._id}>{product.name}</option>
                                                )
                                            })
                                        }

                                    </Form.Select>
                            </Fragment>)
                            :
                            (<div>

                                {/* dynamic */}

                                <Button variant="info" onClick={()=>{
                                    setDynamicInputFields([...dynamicInputFields, {quantityPurchased: '', unitPrice: '', amountPurchased: ''}])
                                }}>+</Button>

                                {
                                    dynamicInputFields.map((fields, index,thisArray)=>{

                                        //console.log(fields);

                                        return <div key={index}>


                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Product</Form.Label>
                                                        <Form.Select aria-label="Default select example" name="product" onChange={e=>{
                                                            handleProductChange(e, index)
                                                        }
                                                        }>
                                                            <option>Open this select menu</option>

                                                            {
                                                                products.map(product => {
                                                                    return (
                                                                        <option key={product._id} value={ (fields.product) ? fields.product : product._id}>
                                                                            { (fields.selectText) ? fields.selectText : product.name}
                                                                        </option>
                                                                    )
                                                                })
                                                            }

                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>

                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Quantity</Form.Label>
                                                        <Form.Control value={fields.quantityPurchased} onChange={e=>{
                                                            handleQuantityPurchasedChange(e, index)
                                                        }
                                                        } type="number" placeholder="Type Quantity"
                                                                      name="quantityPurchased"/>
                                                    </Form.Group>

                                                </Col>

                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Amount</Form.Label>
                                                        <Form.Control value={fields.amountPurchased} onChange={e=>{
                                                            handleAmountPurchasedChange(e, index)
                                                        }
                                                        } type="number" placeholder="Type Amount" name="amountPurchased"/>
                                                    </Form.Group>

                                                </Col>

                                                <Col>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Price</Form.Label>
                                                        <Form.Control value={fields.unitPrice} onChange={e=>{
                                                            handleUnitPriceChange(e, index)
                                                        }
                                                        } type="number" placeholder="Type Price"
                                                                      name="unitPrice"/>
                                                    </Form.Group>

                                                </Col>

                                                {dynamicInputFields.length !== 1 && <Col md={1}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Action</Form.Label>
                                                        <Button className="px-3" variant="danger" onClick={(e) => {


                                                                thisArray.splice(index, 1);
                                                                setDynamicInputFields([...thisArray])
                                                            }
                                                        }
                                                        >
                                                            -
                                                        </Button>
                                                    </Form.Group>
                                                </Col>}


                                            </Row>
                                        </div>;

                                    })
                                }

                                {/* dynamic */}

                            </div>)
                        }



                        <br/>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description"/>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        props.stockData._id ? <Button variant="warning" onClick={handleUpdateData}>
                            Update stock
                        </Button> : <Button variant="primary" onClick={handleSubmitData}>
                            Save stock
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
        </>
    );
}
