import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import {Button, Form, Modal} from "react-bootstrap";
import appLanguage from "../../utilities/language";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/supplier/';

let moduleLang = appLanguage.supplierModule;

export default function ModalComp(props) {

    const [supplier, setCustomer] = useState('');
    let form = useRef(null);

    useEffect(() => {

        //form.current.name.value = 'ddd'
        //console.log(form.current);

        setCustomer(props.supplierData);

    }, [supplier]);

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
                phone: form.current.phone.value,
                email: form.current.email.value,
                organizationName: form.current.organizationName.value,
                address: form.current.address.value,
                description: form.current.description.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        //console.log('tncccccccccc', form.current.price.value)

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

        console.log(props.supplierData._id);

        const res = await fetch(hostApi+props.supplierData._id, {
            body: JSON.stringify({
                name: form.current.name.value,
                phone: form.current.phone.value,
                email: form.current.email.value,
                organizationName: form.current.organizationName.value,
                address: form.current.address.value,
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
                       form.current.name.value = (props.supplierData.name) ? props.supplierData.name : '';
                       form.current.phone.value = (props.supplierData.phone) ? props.supplierData.phone : '';
                       form.current.email.value = (props.supplierData.email) ? props.supplierData.email : '';
                       form.current.organizationName.value = (props.supplierData.organizationName) ? props.supplierData.organizationName : '';
                       form.current.address.value = (props.supplierData.address) ? props.supplierData.address : '';
                       form.current.description.value = (props.supplierData.description) ? props.supplierData.description : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create supplier</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control type="text" placeholder="Type supplier" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone number" name="phone"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Supplier Email</Form.Label>
                            <Form.Control type="email" placeholder="Type email" name="email"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Organization</Form.Label>
                            <Form.Control type="text" placeholder="Type Organization Name" name="organizationName"/>
                        </Form.Group>

                        <br/>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} name="address"/>
                        </Form.Group>

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
                        props.supplierData._id ? <Button variant="warning" onClick={handleUpdateData}>
                            Update supplier
                        </Button> : <Button variant="primary" onClick={handleSubmitData}>
                            Save supplier
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
        </>
    );
}
