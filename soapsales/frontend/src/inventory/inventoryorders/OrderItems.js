import React, { Fragment, Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getUnitOfMeasureChoices } from '..//../actions/choices';
import {  getInventoryItems } from '..//../actions/inventoryitems';


class OrderItems extends Component{


  componentDidMount(){
    this.props.getUnitOfMeasureChoices();
    this.props.getInventoryItems();

  }


  render(){
    const { unitofmeasurechoices } = this.props;
    const { inventoryitems } = this.props;


    let unitOfMeasures = unitofmeasurechoices.length > 0
      && unitofmeasurechoices.map((item, i) => {
      return (
        <option key={i} value={item.key}>{item.value}</option>
      )
    }, this);


   let inventoryItems = inventoryitems.length > 0
    && inventoryitems.map((item, i) => {
    return (
      <option key={i} value={item.id}>{item.name}</option>
    )
  }, this);

    

    return (
      this.props.items.map((val, idx) => {
        let item = `item-${idx}`, quantity = `quantity-${idx}`, unit = `unit-${idx}`, order_price = `order_price-${idx}`
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
              idx===0?<Button onClick={()=>this.props.add()} type="button" icon='pi pi-plus' className="p-button-warning" />
              : <Button icon='pi pi-trash' className="p-button-danger" onClick={(() => this.props.delete(val))} />
              }
            </td>
          </tr >
        )
      })
    )
  }
}


const mapStateToProps = state =>({
    inventoryitems: state.inventoryitems.inventoryitems,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,

})

export default connect(mapStateToProps, {getInventoryItems,  getUnitOfMeasureChoices } ) (OrderItems);





