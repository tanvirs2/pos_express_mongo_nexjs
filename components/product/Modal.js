import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {Button, Form, Modal} from "react-bootstrap";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/products/';
const belongCategoriesHostApi = host+'/categories/';

export default function ModalComp(props) {

    const [product, setProduct] = useState('');
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

        setProduct(props.productData);

    }, [product]);

    const handleClose = () => {
        props.handleClose();
    };


    const handleSubmitData = async (event) => {
        //alert('dsa');

        //setProduct([]);
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

        props.updateProductList();
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

        console.log(props.productData._id);

        const res = await fetch(hostApi+props.productData._id, {
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
        props.updateProductList();

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
                       form.current.name.value = (props.productData.name) ? props.productData.name : '';
                       form.current.description.value = (props.productData.description) ? props.productData.description : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create product</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Type product" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="text" placeholder="Type Price" name="price"/>
                        </Form.Group>

                        <br/>

                        <Form.Label>Category</Form.Label>
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
                        props.productData._id ? <Button variant="warning" onClick={handleUpdateData}>
                            Update product
                        </Button> : <Button variant="primary" onClick={handleSubmitData}>
                            Save product
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
        </>
    );
}
