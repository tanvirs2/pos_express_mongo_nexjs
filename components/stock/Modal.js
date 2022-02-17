import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {Button, Form, Modal} from "react-bootstrap";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/stock/';
const belongProductsHostApi = host+'/products/';

export default function ModalComp(props) {

    const [stock, setStock] = useState('');
    const [products, setProducts] = useState([]);
    let form = useRef(null);

    useEffect(() => {

        //form.current.name.value = 'ddd'
        console.log('before', form.current);

        fetch(belongProductsHostApi)
            .then(response=>response.json())
            .then(products=>{
                //console.log(data);
                setProducts(products); // get Products for Products select option
            });

        setStock(props.stockData);

        return () => {
            console.log('after', form.current);
        }

    }, [stock]);

    const handleClose = () => {
        props.handleClose();
    };


    const handleSubmitData = async (event) => {
        //alert('dsa');

        //setStock([]);

        event.preventDefault()

        const res = await fetch(hostApi, {
            body: JSON.stringify({
                name: form.current.name.value,
                description: form.current.description.value,
                quantityPurchased: form.current.quantityPurchased.value,
                unitPrice: form.current.unitPrice.value,
                product: form.current.product.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        props.updateStockList();
        handleClose()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })

        console.log(result);

    };

    const handleUpdateData = async (event) => {

        event.preventDefault()

        console.log(props.stockData._id);

        const res = await fetch(hostApi+props.stockData._id, {
            body: JSON.stringify({
                name: form.current.name.value,
                description: form.current.description.value,
                quantityPurchased: form.current.quantityPurchased.value,
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

        console.log(result);

    };



    return (
        <>
            <Modal show={props.modalShowOrNot} onHide={handleClose}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   onShow={()=>{
                       //console.log(form.current);
                       form.current.name.value = (props.stockData.name) ? props.stockData.name : '';
                       form.current.description.value = (props.stockData.description) ? props.stockData.description : '';
                       form.current.quantityPurchased.value = (props.stockData.quantityPurchased) ? props.stockData.quantityPurchased : '';
                       form.current.unitPrice.value = (props.stockData.unitPrice) ? props.stockData.unitPrice : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create stock</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control type="text" placeholder="Type Supplier name" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Type Quantity" name="quantityPurchased"/>
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
