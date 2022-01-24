import {Col, Container, Form, Modal, Button, Row, Table} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useRef, useEffect} from "react";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/stock/';
const belongProductsHostApi = host+'/products/';


function ModalComp(props) {

    const [stock, setStock] = useState('');
    const [products, setProducts] = useState([]);
    let form = useRef(null);

    useEffect(() => {

        //form.current.name.value = 'ddd'
        //console.log(form.current);

        fetch(belongProductsHostApi)
            .then(response=>response.json())
            .then(products=>{
                //console.log(data);
                setProducts(products); // get Products for Products select option
            });

        setStock(props.stockData);

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

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create stock</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Stock Name</Form.Label>
                            <Form.Control type="text" placeholder="Type stock" name="name"/>
                        </Form.Group>

                        <br/>

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
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {stocks.map(stock=>{
                                                return (
                                                    <tr key={stock._id}>
                                                        <td>0</td>
                                                        <td>{stock.name}</td>

                                                        <td>1</td>
                                                        <td>{stock.product ? <span className="text-danger">({stock.product.name})</span>: ''}</td>

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
