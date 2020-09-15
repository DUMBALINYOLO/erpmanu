import React, { Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getProcessProducts } from '..//../actions/processproducts';
import { getTaxes} from '..//../actions/taxes';
import { getSalesGroupsPricingDiscounts } from '..//../actions/salesgroupspricingdiscounts';




class Lines extends Component{
  componentDidMount(){
    this.props.getTaxes();
    this.props.getProcessProducts();
    this.props.getSalesGroupsPricingDiscounts();
  }

  render(){
    const { processproducts } = this.props;
    const { taxes } = this.props;
    const { salesgroupspricingdiscounts } = this.props;

    let products = processproducts.length > 0
      && processproducts.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
      }, this);

    let discounts = salesgroupspricingdiscounts.length > 0
      && salesgroupspricingdiscounts.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.group_name}</option>
      )
      }, this);



    let Taxes = taxes.length > 0
      && taxes.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
      }, this);




    return (
      this.props.lines.map((val, idx) => {
        let discount = `discount-${idx}`, quantity = `quantity-${idx}`, product = `product-${idx}`, tax = `tax-${idx}`
        return (
          <tr key={val.index}>
            <td>
              <select
                name="discount"
                id={discount}
                data-id={idx}
                className="form-control"
              >
                 {discounts}
              </select>
            </td>

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
                name="product"
                id={product}
                data-id={idx}
                className="form-control"
              >
                 {products}
              </select>
            </td>
            <td>
              <select
                name="tax"
                id={tax}
                data-id={idx}
                className="form-control"
              >
                 {Taxes}
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
    processproducts: state.processproducts.processproducts,
    taxes: state.taxes.taxes,
    salesgroupspricingdiscounts: state.salesgroupspricingdiscounts.salesgroupspricingdiscounts
})

export default connect(
  mapStateToProps, 
  { getProcessProducts, getTaxes, getSalesGroupsPricingDiscounts } ) 
  (Lines);

