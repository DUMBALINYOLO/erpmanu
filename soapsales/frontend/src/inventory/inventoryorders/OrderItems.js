import React, { useEffect } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getUnitOfMeasureChoices } from '..//../actions/choices';
import {  getInventoryStockItems } from '..//../actions/inventorystockitems';


const OrderItems = (props) => {


  useEffect(() => {
        if(!props.fetched) {
            props.getUnitOfMeasureChoices();
            props.getInventoryStockItems()
        }
        console.log('mount it!');
    }, [props]);

  const { unitofmeasurechoices } = props;
  const { inventorystockitems } = props;


  let unitOfMeasures = unitofmeasurechoices.length > 0
    && unitofmeasurechoices.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.name}</option>
    )
  }, this);

  let inventoryItems = inventorystockitems.length > 0
    && inventorystockitems.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.name}</option>
    )
  }, this);

  return (
    props.lines.map((val, idx) => {
      let item = `item-${idx}`, quantity = `quantity-${idx}`, unit = `unit-${idx}`, order_price = `order_price-${idx}`, received = `received-${idx}`
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
            <input
              type="number"
              name="order_price"
              data-id={idx}
              id={order_price}
              className="form-control "
            />
          </td>
          <td>
            <input
              type="number"
              name="received"
              data-id={idx}
              id={received}
              className="form-control "
            />
          </td>
          <td>
            <select
              name="item"
              id={item}
              data-id={idx}
              className="form-control"
            >
               {inventoryItems}
            </select>
          </td>
          <td>
            <select
              name="unit"
              id={unit}
              data-id={idx}
              className="form-control"
            >
               {unitOfMeasures}
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
    inventorystockitems: state.inventorystockitems.inventorystockitems,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,

})

export default connect(mapStateToProps, {getInventoryStockItems,  getUnitOfMeasureChoices } ) (OrderItems);
