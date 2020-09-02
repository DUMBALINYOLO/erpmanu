import React, { useEffect } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getOrderItems} from '..//../actions/orderitems';
import {InputNumber} from 'primereact/inputnumber';


const DebitNoteLines = (props) => {
  useEffect(() => {
        if(!props.fetched) {
            props.getOrderItems();
        }
        console.log('mount it!');
    }, []);

  const { orderitems } = props;

  console.log(orderitems)


  let orderItems = orderitems.length > 0
    && orderitems.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.item}</option>
    )
  }, this);

  return (
    props.lines.map((val, idx) => {
      let item = `item-${idx}`, quantity = `quantity-${idx}`
      return (
        <tr key={val.index}>
          <td>
            <input
              type="number"
              name="quantity"
              data-id={idx}
              id={quantity}
              className="form-control"
            />
          </td>
          <td>
            <select
              name="item"
              id={item}
              data-id={idx}
              className="form-control"
            >
               {orderItems}
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
    orderitems: state.orderitems.orderitems
})

export default connect(mapStateToProps, {getOrderItems} ) (DebitNoteLines);
