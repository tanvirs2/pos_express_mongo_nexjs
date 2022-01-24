import {Col, Container, Form, Modal, Button, Row} from "react-bootstrap";
import Swal from 'sweetalert2'
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";

import ModalComp from '../../components/sell/Modal';

const hostApi = process.env.NEXT_PUBLIC_HOSTNAME+'/sell/';





export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sell, setSell] = useState('');

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
                .then(res => console.log(res));

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


    fetch(hostApi)
        .then(response=>response.json())
        .then(data=>{
            //console.log(data);
            setCategories(data);
        });


    return (
        <>
            <ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={sell} />

            <Container>
                <Row>
                    <Col>
                        <h1>Sell</h1>
                        <p>This is the sell page.</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Action</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create sell </span>

                                    </div>
                                    {/*list-group .*/}
                                </div>
                            </article>
                            {/*card-group-item.*/}
                        </div>

                    </Col>

                    <Col>

                        <div className="card bg-info">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Sell List</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">

                                        {categories.map(sell=>{
                                            return (
                                                <div key={sell._id} >
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
                                                </div>

                                            )
                                        })}

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
