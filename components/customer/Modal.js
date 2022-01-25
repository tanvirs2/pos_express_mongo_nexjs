import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {Button, Form, Modal} from "react-bootstrap";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/customer/';
const belongCategoriesHostApi = host+'/categories/';

export default function ModalComp(props) {

    const [customer, setCustomer] = useState('');
    const [categories, setCategories] = useState([]);
    let form = useRef(null);

    useEffect(() => {

        //form.current.name.value = 'ddd'
        //console.log(form.current);

        fetch(belongCategoriesHostApi)
            .then(response=>response.json())
            .then(categories=>{
                //console.log(data);
                setCategories(categories); // get Categories for Categories select option
            });

        setCustomer(props.customerData);

    }, [customer]);

    const handleClose = () => {
        props.handleClose();
    };


    const handleSubmitData = async (event) => {
        //alert('dsa');

        //setCustomer([]);
        //console.log(form.current.name.value)

        event.preventDefault()

        const res = await fetch(hostApi, {
            body: JSON.stringify({
                name: form.current.name.value,
                price: form.current.price.value,
                description: form.current.description.value,
                category: form.current.category.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        console.log('tncccccccccc', form.current.price.value)

        props.updateCustomerList();
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

        console.log(props.customerData._id);

        const res = await fetch(hostApi+props.customerData._id, {
            body: JSON.stringify({
                name: form.current.name.value,
                description: form.current.description.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })

        const result = await res.json()

        handleClose()
        props.updateCustomerList();

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
                       form.current.name.value = (props.customerData.name) ? props.customerData.name : '';
                       form.current.description.value = (props.customerData.description) ? props.customerData.description : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create customer</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control type="text" placeholder="Type customer" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Customer Price</Form.Label>
                            <Form.Control type="text" placeholder="Type Price" name="price"/>
                        </Form.Group>

                        <br/>

                        <Form.Select aria-label="Default select example" name="category">
                            <option>Open this select menu</option>

                            {
                                categories.map(category=>{
                                    return (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                })
                            }

                        </Form.Select>

                        <br/>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
                        props.customerData._id ? <Button variant="warning" onClick={handleUpdateData}>
                            Update customer
                        </Button> : <Button variant="primary" onClick={handleSubmitData}>
                            Save customer
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
        </>
    );
}
