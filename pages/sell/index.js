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

let moduleLang = appLanguage[selectedLanguage].sellModule;


function PaymentFooter(props) {

    return (
        <div className="bg-secondary text-white">
            <div className="row pt-3">

                <Col md={{ span: 2, offset: 1 }}>
                    Item: <br/>
                    100
                </Col>

                <Col md={2}>
                    Total: <br/>
                    100
                </Col>

                <Col md={{ span: 3, offset: 4 }}>
                    Total Payable: <br/>
                    100
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
}

function POSRow(props){

    return (
        <div className="col">
            <input type="hidden" name="sell_price_tax" id="sell_price_tax" defaultValue="includes" />
            {/* Keeps count of product rows */}
            <input type="hidden" id="product_row_count" defaultValue={5} />
            <table className="table table-condensed table-bordered table-striped table-responsive" id="pos_table">
                <thead>
                <tr>
                    <th className="tex-center  col-md-4 ">
                        Product <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom" data-content="Click <i>product name</i> to edit price, discount & tax. <br/>Click <i>Comment Icon</i> to enter serial number / IMEI or additional note.<br/><br/>Click <i>Modifier Icon</i>(if enabled) for modifiers" data-html="true" data-trigger="hover" />									</th>
                    <th className="text-center">
                        Stock									</th>
                    <th className="text-center col-md-3">
                        Quantity									</th>
                    <th className="text-center col-md-2 ">
                        Unit Price									</th>
                    <th className="text-center col-md-2">
                        Subtotal									</th>
                    <th className="text-center"><i className="fa fa-close" aria-hidden="true" /></th>
                </tr>
                </thead>
                <tbody><tr className="product_row" data-row_index={1}>
                    <td>
                        <div data-toggle="tooltip" data-placement="bottom" title data-original-title="Edit product Unit Price and Tax">
            <span className="text-link text-info cursor-pointer" data-toggle="modal" data-target="#row_edit_product_price_modal_1">
              Dada 50kg<br />0001 Dada Agro Food
                &nbsp;<i className="fa fa-info-circle" />
            </span>
                        </div>
                        <input type="hidden" className="enable_sr_no" defaultValue={0} />
                        <div data-toggle="tooltip" data-placement="bottom" title data-original-title="Add Description">
                            <i className="fa fa-commenting cursor-pointer text-primary add-pos-row-description" data-toggle="modal" data-target="#row_description_modal_1" />
                        </div>
                        <div className="modal fade row_edit_product_price_model" id="row_edit_product_price_modal_1" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">Dada 50kg - 0001</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="form-group col-xs-12 ">
                                                <label>Unit Price</label>
                                                <input type="text" name="products[1][unit_price]" className="form-control pos_unit_price input_number mousetrap" defaultValue="2,050.00" />
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Type</label>
                                                <select className="form-control row_discount_type" name="products[1][line_discount_type]"><option value="fixed" selected="selected">Fixed</option><option value="percentage">Percentage</option></select>
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Amount</label>
                                                <input className="form-control input_number row_discount_amount" name="products[1][line_discount_amount]" type="text" defaultValue={0.00} />
                                            </div>
                                            <div className="form-group col-xs-12 ">
                                                <label>Tax</label>
                                                <input className="item_tax" name="products[1][item_tax]" type="hidden" defaultValue={0.00} />
                                                <select className="form-control tax_id" name="products[1][tax_id]"><option selected="selected" value>Select</option><option value selected="selected">None</option></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>		</div>
                        {/* Description modal start */}
                        <div className="modal fade row_description_modal" id="row_description_modal_1" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">Dada 50kg - 0001</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" name="products[1][sell_line_note]" rows={3} defaultValue={""} />
                                            <p className="help-block">Add product IMEI, Serial number or other informations here.</p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Description modal end */}
                        <select className="form-control lot_number input-sm" name="products[1][lot_no_line_id]">
                            <option value>Lot &amp; Expiry</option>
                            <option value={11} data-qty_available={100.0000} data-msg-max="Only 100.00 bg available in the selected Lot">10  </option>
                        </select>
                    </td>
                    <td>198.00</td>
                    <td>
                        <input type="hidden" name="products[1][product_id]" className="form-control product_id" defaultValue={1} />
                        <input type="hidden" defaultValue={1} name="products[1][variation_id]" className="row_variation_id" />
                        <input type="hidden" defaultValue={1} name="products[1][enable_stock]" />
                        <div className="input-group input-number">
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-down"><i className="fa fa-minus text-danger" /></button></span>
                            <input type="text" data-min={1} className="form-control pos_quantity input_number mousetrap input_quantity" defaultValue={1.00} name="products[1][quantity]" data-allow-overselling="false" data-decimal={0} data-rule-abs_digit="true" data-msg-abs_digit="Decimal value not allowed" data-rule-required="true" data-msg-required="This field is required" data-rule-max-value={198.0000} data-qty_available={198.0000} data-msg-max-value="Only 198.00 bg available" data-msg_max_default="Only 198.00 bg available" />
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-up"><i className="fa fa-plus text-success" /></button></span>
                        </div>
                        <input type="hidden" name="products[1][product_unit_id]" defaultValue={2} />
                        bg
                        <input type="hidden" className="base_unit_multiplier" name="products[1][base_unit_multiplier]" defaultValue={1} />
                        <input type="hidden" className="hidden_base_unit_sell_price" defaultValue={2050} />
                    </td>
                    <td className>
                        <input type="text" name="products[1][unit_price_inc_tax]" className="form-control pos_unit_price_inc_tax input_number" defaultValue="2,050.00" />
                    </td>
                    <td className="text-center v-center">
                        <input type="hidden" className="form-control pos_line_total " defaultValue="2,050.00" />
                        <span className="display_currency pos_line_total_text " data-currency_symbol="true">৳ 2,050.00</span>
                    </td>
                    <td className="text-center">
                        <i className="fa fa-close text-danger pos_remove_row cursor-pointer" aria-hidden="true" />
                    </td>
                </tr><tr className="product_row" data-row_index={4}>
                    <td>
                        <div data-toggle="tooltip" data-placement="bottom" title="Edit product Unit Price and Tax">
            <span className="text-link text-info cursor-pointer" data-toggle="modal" data-target="#row_edit_product_price_modal_4">
              cg<br />0009
                &nbsp;<i className="fa fa-info-circle" />
            </span>
                        </div>
                        <input type="hidden" className="enable_sr_no" defaultValue={1} />
                        <div data-toggle="tooltip" data-placement="bottom" title="Add Description">
                            <i className="fa fa-commenting cursor-pointer text-primary add-pos-row-description" data-toggle="modal" data-target="#row_description_modal_4" />
                        </div>
                        <div className="modal fade row_edit_product_price_model" id="row_edit_product_price_modal_4" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">cg - 0009</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="form-group col-xs-12 ">
                                                <label>Unit Price</label>
                                                <input type="text" name="products[4][unit_price]" className="form-control pos_unit_price input_number mousetrap" defaultValue={4.00} />
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Type</label>
                                                <select className="form-control row_discount_type" name="products[4][line_discount_type]"><option value="fixed" selected="selected">Fixed</option><option value="percentage">Percentage</option></select>
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Amount</label>
                                                <input className="form-control input_number row_discount_amount" name="products[4][line_discount_amount]" type="text" defaultValue={0.00} />
                                            </div>
                                            <div className="form-group col-xs-12 ">
                                                <label>Tax</label>
                                                <input className="item_tax" name="products[4][item_tax]" type="hidden" defaultValue={0.00} />
                                                <select className="form-control tax_id" name="products[4][tax_id]"><option selected="selected" value>Select</option><option value selected="selected">None</option></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>		</div>
                        {/* Description modal start */}
                        <div className="modal fade row_description_modal" id="row_description_modal_4" tabIndex={-1} role="dialog" style={{display: 'none'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">cg - 0009</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" name="products[4][sell_line_note]" rows={3} defaultValue={""} />
                                            <p className="help-block">Add product IMEI, Serial number or other informations here.</p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Description modal end */}
                    </td>
                    <td>66.00</td>
                    <td>
                        <input type="hidden" name="products[4][product_id]" className="form-control product_id" defaultValue={9} />
                        <input type="hidden" defaultValue={9} name="products[4][variation_id]" className="row_variation_id" />
                        <input type="hidden" defaultValue={1} name="products[4][enable_stock]" />
                        <div className="input-group input-number">
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-down"><i className="fa fa-minus text-danger" /></button></span>
                            <input type="text" data-min={1} className="form-control pos_quantity input_number mousetrap input_quantity" defaultValue={1.00} name="products[4][quantity]" data-allow-overselling="false" data-decimal={0} data-rule-abs_digit="true" data-msg-abs_digit="Decimal value not allowed" data-rule-required="true" data-msg-required="This field is required" data-rule-max-value={66.0000} data-qty_available={66.0000} data-msg-max-value="Only 66.00 bg available" data-msg_max_default="Only 66.00 bg available" />
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-up"><i className="fa fa-plus text-success" /></button></span>
                        </div>
                        <input type="hidden" name="products[4][product_unit_id]" defaultValue={2} />
                        bg
                        <input type="hidden" className="base_unit_multiplier" name="products[4][base_unit_multiplier]" defaultValue={1} />
                        <input type="hidden" className="hidden_base_unit_sell_price" defaultValue={4} />
                    </td>
                    <td className>
                        <input type="text" name="products[4][unit_price_inc_tax]" className="form-control pos_unit_price_inc_tax input_number" defaultValue={4.00} />
                    </td>
                    <td className="text-center v-center">
                        <input type="hidden" className="form-control pos_line_total " defaultValue={4.00} />
                        <span className="display_currency pos_line_total_text " data-currency_symbol="true">৳ 4.00</span>
                    </td>
                    <td className="text-center">
                        <i className="fa fa-close text-danger pos_remove_row cursor-pointer" aria-hidden="true" />
                    </td>
                </tr><tr className="product_row" data-row_index={5}>
                    <td>
                        <div data-toggle="tooltip" data-placement="bottom" title="Edit product Unit Price and Tax">
            <span className="text-link text-info cursor-pointer" data-toggle="modal" data-target="#row_edit_product_price_modal_5">
              kitkat 4 finger dark<br />KITKATUKDARK4FINGER Kitkat
                &nbsp;<i className="fa fa-info-circle" />
            </span>
                        </div>
                        <input type="hidden" className="enable_sr_no" defaultValue={1} />
                        <div data-toggle="tooltip" data-placement="bottom" title="Add Description">
                            <i className="fa fa-commenting cursor-pointer text-primary add-pos-row-description" data-toggle="modal" data-target="#row_description_modal_5" />
                        </div>
                        <div className="modal fade row_edit_product_price_model" id="row_edit_product_price_modal_5" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">kitkat 4 finger dark - KITKATUKDARK4FINGER</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="form-group col-xs-12 ">
                                                <label>Unit Price</label>
                                                <input type="text" name="products[5][unit_price]" className="form-control pos_unit_price input_number mousetrap" defaultValue={13.00} />
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Type</label>
                                                <select className="form-control row_discount_type" name="products[5][line_discount_type]"><option value="fixed" selected="selected">Fixed</option><option value="percentage">Percentage</option></select>
                                            </div>
                                            <div className="form-group col-xs-12 col-sm-6 ">
                                                <label>Discount Amount</label>
                                                <input className="form-control input_number row_discount_amount" name="products[5][line_discount_amount]" type="text" defaultValue={0.00} />
                                            </div>
                                            <div className="form-group col-xs-12 ">
                                                <label>Tax</label>
                                                <input className="item_tax" name="products[5][item_tax]" type="hidden" defaultValue={0.00} />
                                                <select className="form-control tax_id" name="products[5][tax_id]"><option selected="selected" value>Select</option><option value selected="selected">None</option></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>		</div>
                        {/* Description modal start */}
                        <div className="modal fade row_description_modal" id="row_description_modal_5" tabIndex={-1} role="dialog" style={{display: 'none'}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                        <h4 className="modal-title" id="myModalLabel">kitkat 4 finger dark - KITKATUKDARK4FINGER</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" name="products[5][sell_line_note]" rows={3} defaultValue={""} />
                                            <p className="help-block">Add product IMEI, Serial number or other informations here.</p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Description modal end */}
                        <select className="form-control lot_number input-sm" name="products[5][lot_no_line_id]">
                            <option value>Lot &amp; Expiry</option>
                            <option value={5} data-qty_available={144.0000} data-msg-max="Only 144.00 bg available in the selected Lot">1/2020  </option>
                        </select>
                    </td>
                    <td>144.00</td>
                    <td>
                        <input type="hidden" name="products[5][product_id]" className="form-control product_id" defaultValue={5} />
                        <input type="hidden" defaultValue={5} name="products[5][variation_id]" className="row_variation_id" />
                        <input type="hidden" defaultValue={1} name="products[5][enable_stock]" />
                        <div className="input-group input-number">
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-down"><i className="fa fa-minus text-danger" /></button></span>
                            <input type="text" data-min={1} className="form-control pos_quantity input_number mousetrap input_quantity" defaultValue={1.00} name="products[5][quantity]" data-allow-overselling="false" data-decimal={0} data-rule-abs_digit="true" data-msg-abs_digit="Decimal value not allowed" data-rule-required="true" data-msg-required="This field is required" data-rule-max-value={144.0000} data-qty_available={144.0000} data-msg-max-value="Only 144.00 bg available" data-msg_max_default="Only 144.00 bg available" />
                            <span className="input-group-btn"><button type="button" className="btn btn-default btn-flat quantity-up"><i className="fa fa-plus text-success" /></button></span>
                        </div>
                        <input type="hidden" name="products[5][product_unit_id]" defaultValue={2} />
                        bg
                        <input type="hidden" className="base_unit_multiplier" name="products[5][base_unit_multiplier]" defaultValue={1} />
                        <input type="hidden" className="hidden_base_unit_sell_price" defaultValue={13} />
                    </td>
                    <td className>
                        <input type="text" name="products[5][unit_price_inc_tax]" className="form-control pos_unit_price_inc_tax input_number" defaultValue={13.00} />
                    </td>
                    <td className="text-center v-center">
                        <input type="hidden" className="form-control pos_line_total " defaultValue={13.00} />
                        <span className="display_currency pos_line_total_text " data-currency_symbol="true">৳ 13.00</span>
                    </td>
                    <td className="text-center">
                        <i className="fa fa-close text-danger pos_remove_row cursor-pointer" aria-hidden="true" />
                    </td>
                </tr></tbody>
            </table>
        </div>
    );
}

function ProductThumbnail(props){

    //console.log(props.stock.product)

    let stock = props.stock
    let product = props.stock.product

    return (
        <Col md={4} className="p-1">
            <div className="card" style={{height: '160px'}}>
                <img className="card-img-top p-1" style={{height: '70px'}} src="/prod.png" alt="Card image cap"/>
                <div className="card-body p-1">
                    <b>{product.name} (<small className="text-success">{stock.quantityPurchased}</small>)</b>
                    <small>{product.code}d</small>
                    <small>{stock.name}</small>
                </div>
            </div>
        </Col>
    );
};

export default function Sell() {

    //console.log('tnv', process.env.NEXT_PUBLIC_HOSTNAME);



    const [show, setShow] = useState(false);
    const [sells, setSells] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [sell, setSell] = useState('');


    useEffect(()=>{
        fetch(hostApi)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
                setSells(data);
            });

        fetch(hostApiStock)
            .then(response=>response.json())
            .then(data=>{
                //console.log(data);
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
                .then(res => {
                    //console.log(res)
                });

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

            <Container fluid>
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

                                    {sells.map(sell=>{
                                        return (
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
                                            /*<div key={sell._id} >
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
                                            </div>*/

                                        )
                                    })}



                                </ListGroup>

                            </article>





                            {/*card-group-item.*/}
                        </div>

                    </Col>

                    <Col>

                        <div className="card">
                            <article className="card-group-item">
                                <header className="card-header">
                                    <h6 className="title">{moduleLang.pointOfSell}</h6>
                                </header>
                                <div className="filter-content">
                                    <div className="list-group list-group-flush">


                                        <div>
                                            <div className="d-flex justify-content-between list-group-item">
                                            <Form className="w-100">
                                                <div className="col-auto">
                                                    <label className="sr-only" >Username</label>
                                                    <div className="input-group mb-2">

                                                        <input type="text" className="form-control" placeholder={moduleLang.customerName}/>

                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">+</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-auto">
                                                    <label className="sr-only" >Username</label>
                                                    <div className="input-group mb-2">

                                                        <input type="text" className="form-control" placeholder={moduleLang.productName}/>

                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">+</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>


                                        </div>

                                            {/*zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz*/}


                                            <POSRow/>
                                            <PaymentFooter/>


                                            {/*zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz*/}

                                        </div>


                                    </div>
                                    {/*list-group .*/}
                                </div>
                            </article>
                        </div>
                        <br/>



                    </Col>

                    {/*3rd col*/}

                    <Col md={3}>
                        <div className="card mb-3">
                            <article className="card-group-item">
                                <header className="card-header"><h6 className="title">{moduleLang.productList}</h6></header>

                                <div className="filter-content">

                                    <div className="list-group list-group-flush">

                                        <div className="container py-2">
                                            <div className="row">

                                                {
                                                    stocks.map(stock=>{

                                                        //console.log('ddddddddd', stock)

                                                        return (
                                                            <React.Fragment key={stock._id}>
                                                                <ProductThumbnail stock={stock}/>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }

                                            </div>
                                        </div>

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
