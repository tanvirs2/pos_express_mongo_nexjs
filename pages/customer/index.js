import {Col, Container, Form, Modal, Button, Row, Table} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useRef, useEffect} from "react";
import ModalComp from '../../components/customer/Modal';

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/customer/';



export default function Customer() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');

    useEffect(()=>{
        console.log(hostApi)
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setCustomers(data);
            });
    }, []);

    const updateCustomerList = () => {

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setCustomers(data);
            });

    }


    const handleClose = () => setShow(false);

    const handleShow = (customer = {}) => {
        setShow(true)
        setCustomer(customer)
    };

    const handleDeleteCustomer = (customer_id) => {

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

                fetch(hostApi+customer_id, {
                    method: 'DELETE'
                })
                .then(res => res.json()) // or res.json()
                .then(res => {
                    console.log(res)
                    updateCustomerList();
                });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    };





    return (
        <>
            <ModalComp modalShowOrNot={show} handleClose={handleClose} customerData={customer} updateCustomerList={updateCustomerList}/>

            <Container>
                <Row>
                    <Col>
                        <h1>Customer</h1>
                        <p>This is the customer page.</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Action</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create customer </span>

                                    </div>
                                    {/*list-group .*/}
                                </div>
                            </article>
                            {/*card-group-item.*/}
                        </div>

                    </Col>

                    <Col>


                        <div className="card">

                            <article className="card-group-item">

                                <header className="card-header"><h6 className="title">Customer List</h6></header>

                                <div className="filter-content">

                                    <div className="list-group list-group-flush">



                                        <Table striped bordered hover className="mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {customers.map(customer=>{
                                                return (
                                                    <tr key={customer._id}>
                                                        <td>0</td>
                                                        <td>{customer.name}</td>

                                                        <td>{customer.price}</td>
                                                        <td>{customer.category ? <span className="text-danger">({customer.category.name})</span>: ''}</td>

                                                        <td>
                                                        <span className="">

                                                            <Button variant={"success"} className="mx-1" onClick={()=>{
                                                                handleShow(customer)
                                                            }}>Edit</Button>

                                                            <Button variant={"danger"} onClick={()=>{
                                                                handleDeleteCustomer(customer._id)
                                                            }}>Delete</Button>
                                                        </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                            </tbody>
                                        </Table>

                                    </div>
                                    {/*list-group .*/}
                                </div>
                            </article>
                            {/*card-group-item.*/}
                        </div>

                    </Col>
                </Row>



            </Container>
        </>
    );
}
