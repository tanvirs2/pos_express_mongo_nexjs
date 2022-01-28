import {Col, Container, Form, Modal, Button, Row, ListGroup, Badge} from "react-bootstrap";
import Swal from 'sweetalert2'
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";

import appLanguage from '../../utilities/language'

import ModalComp from '../../components/sell/Modal';

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/sell/';
const hostApiStock = host+'/stock/';

const selectedLanguage = process.env.NEXT_PUBLIC_APP_LANGUAGE;



function ProductThumbnail(){
    return (
        <div className="card m-2" style={{width: "18rem"}}>
            <img className="card-img-top" src="/logo-ipsum.png" alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the
                    card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
};

export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);



    const [show, setShow] = useState(false);
    const [sells, setSells] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [sell, setSell] = useState('');

    let moduleLang = appLanguage[selectedLanguage].sellModule;

    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setSells(data);
            });

        fetch(hostApiStock)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
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





    return (
        <>
            <ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={sell} />

            <Container>
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

                                    <ListGroup.Item
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

                                </ListGroup>

                            </article>





                            {/*card-group-item.*/}
                        </div>

                    </Col>

                    <Col>

                        <div className="card bg-info">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">{moduleLang.pointOfSell}</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">


                                        {sells.map(sell=>{
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
                        </div>
                        <br/>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">{moduleLang.pointOfSell}</h6></header>

                                <div className="filter-content">

                                    <div className="list-group list-group-flush">

                                        <div className="container">
                                            <div className="row">

                                                {
                                                    stocks.map(stock=>{

                                                        return (
                                                            <ProductThumbnail/>
                                                        );
                                                    })
                                                }


                                            </div>
                                        </div>



                                        <br/>
                                        <br/>
                                        <br/>

                                        {sells.map(sell=>{
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
                        </div>


                    </Col>
                </Row>



            </Container>
        </>
    );
}
