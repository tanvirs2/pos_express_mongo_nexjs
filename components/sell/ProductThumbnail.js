import {Col} from "react-bootstrap";
import React from "react";

export default function ProductThumbnail(props){

    //console.log(props.stock.product)

    let stock = props.stock
    let product = props.stock.product

    const handleProductThumbnailClick = ()=>{
        //setItemRow(props.stock)
        props.itemRowForSales(props.stock)
    }

    return (
        <Col md={4} className="p-1" onClick={handleProductThumbnailClick}>
            <div className="card" style={{height: '160px', cursor: 'pointer', overflow: 'auto'}}>
                <img className="card-img-top p-1" style={{height: '70px'}} src="/prod.png" alt="Card image cap"/>
                <div className="card-body p-1">
                    <b>{product.name} (<small className="text-success">{stock.quantityPurchased}</small>)</b>
                    <small>{product.code}</small>
                    <small> {stock.name}</small>
                </div>
            </div>
        </Col>
    );
};
