import React, {forwardRef, useContext, useState} from "react";
import {Col} from "react-bootstrap";
import {SubmitContext} from "./context/context";

const PaymentFooter = forwardRef((props, ref) => {

    //const [sellingSummery, setSellingSummery] = useState({});
    let contextObject = useContext(SubmitContext);


    return (
        <div className="bg-secondary text-white position-absolute w-100">
            <div className="row pt-3">

                <Col md={{ span: 2, offset: 1 }}>
                    Item: <br/>
                    <div id="summery-item">0</div>
                </Col>

                <Col md={2}>
                    Total: <br/>
                    <div id="summery-qty">0</div>
                </Col>

                <Col md={2}>
                    PayAmount: <br/>
                    <div>
                        <input className="form-control" type="text" name="payment"/>
                    </div>
                </Col>

                <Col md={{ span: 3, offset: 2 }}>
                    Total Payable: <br/>
                    <input className="form-control" id="payable_field" type="hidden" name="payable"/>
                    <div id="summery_line_total">0</div>
                </Col>

            </div>

            <hr/>

            <div className="row pb-3">

                <Col md={{span: 'auto', offset: 5}}>
                    <button className="btn btn-danger btn-lg" onClick={()=>{
                        //contextObject.handleSubmitButton()
                    }}>Paid</button>
                </Col>


            </div>
        </div>
    );
})

export default PaymentFooter;
