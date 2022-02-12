import React, {forwardRef, useState} from "react";
import {Col} from "react-bootstrap";

export function sellingSummeryProcessFunc() {
    let product_rows = document.querySelectorAll('.product_row');

    let summeryItem = [...product_rows].reduce((sum, product_row) => {
        return sum + Number(product_row.querySelector('.pos_quantity').value)
    }, 0);

    document.querySelector('#summery-item').innerHTML = summeryItem;

    let summeryPrice = [...product_rows].reduce((sum, product_row) => {
        return sum + Number(product_row.querySelector('.pos_unit_price').value)
    }, 0);

    document.querySelector('#summery-qty').innerHTML = summeryPrice;

    let pos_line_total = [...product_rows].reduce((sum, product_row) => {
        return sum + Number(product_row.querySelector('.pos_line_total_text').childNodes[1].wholeText)
    }, 0);


    document.querySelector('#summery_line_total').innerHTML = pos_line_total;
    document.querySelector('#payable_field').value = pos_line_total;

}






