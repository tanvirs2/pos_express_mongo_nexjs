import {Col, Container, Form, Modal, Button, Row, Table} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useRef, useEffect} from "react";

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/products/';
const belongCategoriesHostApi = host+'/categories/';


function ModalComp(props) {

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
                description: form.current.description.value,
                category: form.current.category.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

        console.log('tncccccccccc', form.current.name)

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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" placeholder="Type product" name="name"/>
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


export default function Product() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('');

    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setProducts(data);
            });
    }, []);

    const updateProductList = () => {

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setProducts(data);
            });

    }


    const handleClose = () => setShow(false);

    const handleShow = (product = {}) => {
        setShow(true)
        setProduct(product)
    };

    const handleDeleteProduct = (product_id) => {

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

                fetch(hostApi+product_id, {
                    method: 'DELETE'
                })
                .then(res => res.json()) // or res.json()
                .then(res => {
                    console.log(res)
                    updateProductList();
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
            <ModalComp modalShowOrNot={show} handleClose={handleClose} productData={product} updateProductList={updateProductList}/>

            <Container>
                <Row>
                    <Col>
                        <h1>Product</h1>
                        <p>This is the product page.</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Action</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create product </span>

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

                                <header className="card-header"><h6 className="title">Product List</h6></header>

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

                                            {products.map(product=>{
                                                return (
                                                    <tr key={product._id}>
                                                        <td>0</td>
                                                        <td>{product.name}</td>

                                                        <td>1</td>
                                                        <td>{product.category ? <span className="text-danger">({product.category.name})</span>: ''}</td>

                                                        <td>
                                                        <span className="">

                                                            <Button variant={"success"} className="mx-1" onClick={()=>{
                                                                handleShow(product)
                                                            }}>Edit</Button>

                                                            <Button variant={"danger"} onClick={()=>{
                                                                handleDeleteProduct(product._id)
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
