import {Col, Container, Button, Row} from "react-bootstrap";
import Swal from 'sweetalert2'
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";
import ModalComp from '../../components/category/Modal';

const hostApi = process.env.NEXT_PUBLIC_HOSTNAME+'/categories/';


export default function Category() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);

    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setCategories(data);
            });
    }, [])

    const updateCategoryList = () => {

        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                setCategories(data);
            });

    }

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
                .then(res => {
                    console.log(res)
                    updateCategoryList();
                });

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





    return (
        <>
            <ModalComp modalShowOrNot={show} handleClose={handleClose} catagoryData={category} updateCategoryList={updateCategoryList}/>

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
