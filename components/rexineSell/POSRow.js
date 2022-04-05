import React, {Fragment, useContext, useEffect, useState} from "react";
import {sellingSummeryProcessFunc} from "./sellFunctionality";
import {RiCloseCircleFill} from "react-icons/ri";
import {PoundCalculatingContext} from "./context/context";

function ChildTR(props) {

    let contextObject = useContext(PoundCalculatingContext) //


    let itemRow = props.itemRow;

    //console.log('---------',itemRow);

    const [inpPrice, setInpPrice] = useState(contextObject.todayPriceFromContext);
    const [inpPound, setInpPound] = useState(1);
    const [inpQuantity, setInpQuantity] = useState(1);
    //const [inpQuantity, setInpQuantity] = useState(1);

    useEffect(()=>{

        sellingSummeryProcessFunc();

        handlePoundFunctionality(inpPound);

        //console.log('---------');

    }, [inpQuantity, inpPound, contextObject.todayPriceFromContext]);



    const closeThisRow = (index) => {

        let removedRow = props.itemRows.filter((row, ind) => {
            return index !== ind;
        })

        props.setItemRow(removedRow)

    }

    const handlePriceChange = (e) => {
        //console.log('handlePriceChange', e.target.value);
        sellingSummeryProcessFunc()

        //contextObject.sellFormikForm.handleChange(e); //from context object

        let price = e.target.value;
        //setInpPrice(price)
    }

    const handlePoundFunctionality = (poundValue) => {
        //let poundValue = e.target.value;

        let priceWithEveryOunch = (parseInt(poundValue) * 16);

        let onlyDecimalValue = (poundValue + "").split(".")[1];


        let sumForPoundResult = 0;


        if (onlyDecimalValue) {
            sumForPoundResult = priceWithEveryOunch + parseInt(onlyDecimalValue);
        } else {
            sumForPoundResult = priceWithEveryOunch;
        }

        //console.log('handlePoundChange',  sumForPoundResult * contextObject.oneOunchPriceFromContext);
        setInpPrice(sumForPoundResult * contextObject.oneOunchPriceFromContext);

        //contextObject
        //todayPriceFromContext
        //oneOunchPriceFromContext
    }

    const handlePoundChange = (e) => {

        handlePoundFunctionality(e.target.value);

        sellingSummeryProcessFunc()

        //contextObject.sellFormikForm.handleChange(e); //from context object

        let pound = e.target.value;
        setInpPound(pound)
    }


    const handleQuantityChange = (e, index) => {
        let qty = e.target.value;

        sellingSummeryProcessFunc();
        setInpQuantity(qty)
        props.itemRows[index].fromRowQty = qty;
        props.setItemRow(props.itemRows)
        //console.log(e.target.value, index, props.itemRows);
    }


    return (
        <tr className="product_row">
            <td>
                <div>
                    {itemRow.product.name} - <small className="text-danger">{itemRow.name}</small>
                </div>
            </td>
            <td>{itemRow.quantityPurchased}</td>
            <td>{itemRow.quantityStock}</td>
            <td>

                <div className="input-group input-number">
                    <input type="text" name="quantities"  value={inpQuantity} onChange={(e )=>{
                        handleQuantityChange(e, props.itemIndex)
                    }} className="form-control pos_quantity input_number mousetrap input_quantity" />

                    <input type="hidden" name="products" value={itemRow.product._id} readOnly/>
                    <input type="hidden" name="stock" value={itemRow._id} readOnly/>
                    <input type="hidden" name="stockQty" value={itemRow.quantityStock} readOnly/>

                </div>

            </td>
            <td>
                <input type="text" name="pound" value={inpPound} onChange={handlePoundChange} className="form-control pos_unit_price input_number"/>
            </td>
            <td>
                <input type="text" name="prices" value={contextObject.todayPriceFromContext} onChange={handlePriceChange} className="form-control pos_unit_price input_number"/>
            </td>
            <td className="text-center v-center">
                ৳<span className="display_currency pos_line_total_text "> { inpPrice }</span>
            </td>
            <td className="text-center">
                <RiCloseCircleFill color="FireBrick" onClick={()=>{
                    closeThisRow(props.itemIndex)
                }}/>

            </td>
        </tr>
    );
}

export function POSRow(props){

    return (
        <div className="col overflow-auto" style={{height: '49vh'}}>

            {/* Keeps count of product rows */}

            <table className="table table-condensed table-bordered table-striped table-responsive">
                <thead>
                <tr>
                    <th className="tex-center  col-md-4 ">
                        Product <i className="fa fa-info-circle text-info hover-q no-print " aria-hidden="true" data-container="body" data-toggle="popover" data-placement="auto bottom" data-content="Click <i>product name</i> to edit price, discount & tax. <br/>Click <i>Comment Icon</i> to enter serial number / IMEI or additional note.<br/><br/>Click <i>Modifier Icon</i>(if enabled) for modifiers" data-html="true" data-trigger="hover" />									</th>
                    <th className="text-center">
                        P.Stock
                    </th>
                    <th className="text-center">
                        B.Stock
                    </th>
                    <th className="text-center col-md-3">
                        Roll Qty
                    </th>
                    <th className="text-center col-md-2 ">
                        Amount
                        <br/>
                        (Pound)
                    </th>
                    <th className="text-center col-md-2 ">
                        Unit Price
                    </th>
                    <th className="text-center col-md-2">
                        Subtotal
                    </th>
                    <th className="text-center">
                        x
                    </th>
                </tr>
                </thead>

                <tbody>

                {props.itemRow.map((itemRow, index)=>{

                    return (
                        <Fragment key={index}>
                            <ChildTR itemRow={itemRow} itemRows={props.itemRow} itemIndex={index} setItemRow={props.setItemRow}/>
                        </Fragment>
                    );
                })}



                </tbody>
            </table>
        </div>
    );
}

