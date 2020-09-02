import React, { useEffect } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getInvoicelines } from '..//../actions/invoicelines';
import {InputNumber} from 'primereact/inputnumber';



const CreditNoteLines = (props) => {


  useEffect(() => {
        if(!props.fetched) {
            props.getInvoicelines();
        }
        console.log('mount it!');
    }, []);

  const { invoicelines } = props;



  let invoiceLines = invoicelines.length > 0
    && invoicelines.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.line_type} | {item.id}</option>
    )
  }, this);

  return (
    props.lines.map((val, idx) => {
      let line = `line-${idx}`, quantity = `quantity-${idx}`
      return (
        <tr key={val.index}>
          <td>
            <input
              type="number"
              name="quantity"
              data-id={idx}
              id={quantity}
              className="form-control "
            />
          </td>
          <td>
            <select
              name="line"
              id={line}
              data-id={idx}
              className="form-control"
            >
               {invoiceLines}
            </select>
          </td>

          <td>
            {
            idx===0?<Button onClick={()=>props.add()} type="button" icon='pi pi-plus' className="p-button-warning" />
            : <Button icon='pi pi-trash' className="p-button-danger" onClick={(() => props.delete(val))} />
            }
          </td>
        </tr >
      )
    })
  )
}


const mapStateToProps = state =>({
    invoicelines: state.invoicelines.invoicelines
})

export default connect(mapStateToProps, {getInvoicelines} ) (CreditNoteLines);
