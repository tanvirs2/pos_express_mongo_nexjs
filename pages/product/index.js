import {Col, Container, Form, Modal, Button, Row, Table} from "react-bootstrap";
import Swal from 'sweetalert2'
import React, {useState, useRef, useEffect} from "react";
import ModalComp from '../../components/product/Modal';

const host = process.env.NEXT_PUBLIC_HOSTNAME;
const hostApi = host+'/products/';



export default function Product() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('');

    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
               //console.log(data);
                setProducts(data);
            });
    }, []);

    const updateProductList = () => {

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
               //console.log(data);
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
                   //console.log(res)
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

                                                        <td>{product.price}</td>
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
