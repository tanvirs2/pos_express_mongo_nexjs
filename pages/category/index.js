import {Col, Container, Form, Modal, Button, Row} from "react-bootstrap";
import Swal from 'sweetalert2'
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";

const hostApi = process.env.NEXT_PUBLIC_HOSTNAME+'/categories/';


function ModalComp(props) {

    const [category, setCategory] = useState('');
    let form = useRef(null);

    useEffect(() => {

        //form.current.name.value = 'ddd'
        //console.log(form.current);

        setCategory(props.catagoryData);

    }, [category]);

    const handleClose = () => {
        props.handleClose();
    };


    const handleSubmitData = async (event) => {
        //alert('dsa');

        event.preventDefault()

        const res = await fetch(hostApi, {
            body: JSON.stringify({
                name: form.current.name.value,
                description: form.current.description.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const result = await res.json()

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

        console.log(props.catagoryData._id);

        const res = await fetch(hostApi+props.catagoryData._id, {
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
                       form.current.name.value = (props.catagoryData.name) ? props.catagoryData.name : '';
                       form.current.description.value = (props.catagoryData.description) ? props.catagoryData.description : '';

                   }}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Create category</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form ref={form}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control type="text" placeholder="Type category" name="name"/>
                        </Form.Group>
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
                        props.catagoryData._id ? <Button variant="warning" onClick={handleUpdateData}>
                            Update category
                        </Button> : <Button variant="primary" onClick={handleSubmitData}>
                            Save category
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
        </>
    );
}


export default function Category() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = (category = {}) => {
        setShow(true)
        setCategory(category)
    };

    const handleDeleteCategory = (category_id) => {

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

                fetch(hostApi+category_id, {
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
            title: 'Do you want to delete the Category?',
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
            <ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={category} />

            <Container>
                <Row>
                    <Col>
                        <h1>Category</h1>
                        <p>This is the category page.</p>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">Action</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">
                                        <span className="list-group-item mouse-pointer-cursor" onClick={handleShow}>Create category </span>

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
                                <header className="card-header"><h6 className="title">Category List</h6></header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">

                                        {categories.map(category=>{
                                            return (
                                                <div key={category._id} >
                                                    <div className="d-flex justify-content-between list-group-item">
                                                        <a href="#" className="">
                                                            {category.name}
                                                        </a>
                                                        <span className="">

                                                            <Button variant={"success"} className="mx-1" onClick={()=>{
                                                                handleShow(category)
                                                            }}>Edit</Button>

                                                            <Button variant={"danger"} onClick={()=>{
                                                                handleDeleteCategory(category._id)
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
