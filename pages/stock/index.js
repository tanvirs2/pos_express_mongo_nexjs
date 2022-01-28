import {Col, Container, Button, Row, Table} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useEffect} from "react";
import ModalComp from '../../components/stock/Modal';

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/stock/';


export default function Stock() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [stock, setStock] = useState('');

    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setStocks(data);
            });
    }, []);

    const updateStockList = () => {

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setStocks(data);
            });

    }


    const handleClose = () => setShow(false);

    const handleShow = (stock = {}) => {
        setShow(true)
        setStock(stock)
    };

    const handleDeleteStock = (stock_id) => {

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

                fetch(hostApi+stock_id, {
                    method: 'DELETE'
                })
                    .then(res => res.json()) // or res.json()
                    .then(res => {
                        console.log(res)
                        updateStockList();
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
            <ModalComp modalShowOrNot={show} handleClose={handleClose} stockData={stock} updateStockList={updateStockList}/>

            <Container>
                <Row>
                    <Col>
                        <h1>Stock</h1>
                        <p>This is the stock page.</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Action</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create stock </span>

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

                                <header className="card-header"><h6 className="title">Stock List</h6></header>

                                <div className="filter-content">

                                    <div className="list-group list-group-flush">



                                        <Table striped bordered hover className="mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>PurchaseFrom</th>
                                                <th>Product</th>
                                                <th>UnPrice</th>
                                                <th>Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {stocks.map(stock=>{
                                                return (
                                                    <tr key={stock._id}>
                                                        <td>0</td>
                                                        <td>{stock.name}</td>
                                                        <td>{stock.product.name}</td>

                                                        <td>{stock.unitPrice}</td>
                                                        <td>{stock.quantityPurchased ? <span className="text-danger">({stock.quantityPurchased})</span>: ''}</td>

                                                        <td>
                                                        <span className="">

                                                            <Button variant={"success"} className="mx-1" onClick={()=>{
                                                                handleShow(stock)
                                                            }}>Edit</Button>

                                                            <Button variant={"danger"} onClick={()=>{
                                                                handleDeleteStock(stock._id)
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
