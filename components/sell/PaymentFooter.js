import React, {forwardRef, useState} from "react";
import {Col} from "react-bootstrap";

const PaymentFooter = forwardRef((props, ref) => {

    const [sellingSummery, setSellingSummery] = useState({});

    return (
        <div className="bg-secondary text-white position-absolute w-100 fixed-bottom">
            <div className="row pt-3">

                <Col md={{ span: 2, offset: 1 }}>
                    Item: <br/>
                    <div id="summery-item">0</div>
                </Col>

                <Col md={2}>
                    Total: <br/>
                    <div id="summery-qty">0</div>
                </Col>

                <Col md={{ span: 3, offset: 4 }}>
                    Total Payable: <br/>
                    <div id="summery_line_total">0</div>
                </Col>

            </div>

            <hr/>

            <div className="row pb-3">



                <Col md={{span: 'auto', offset: 5}}>
                    <button className="btn btn-danger btn-lg">Paid</button>
                </Col>


            </div>
        </div>
    );
})

export default PaymentFooter;
