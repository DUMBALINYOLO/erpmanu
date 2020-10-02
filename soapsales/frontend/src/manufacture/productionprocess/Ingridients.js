import React, { Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getWarehouses } from '..//../actions/warehouses';
import { getRawMaterials } from '..//../actions/rawmaterials';


class Ingridients extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         debit_account: null,

    //     }
                 
    //     this.onAccount = this.onAccount.bind(this);

    // }

    

    componentDidMount() {
        this.props.getWarehouses();
        this.props.getRawMaterials();
    }
    
    render(){
        const { rawmaterials } = this.props;
        const { warehouses } = this.props;

        let ingridients = rawmaterials.length > 0
            && rawmaterials.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);

        let locations = warehouses.length > 0
            && warehouses.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);

        return (
           this.props.ingridients.map((val, idx) => {
            let ship_from = `ship_from-${idx}`, quantity = `quantity-${idx}`, raw_material = `raw_material-${idx}`
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
                          name="ship_from"
                          id={ship_from}
                          data-id={idx}
                          className="form-control"
                        >
                           {locations}
                        </select>
                    </td> 
                    <td>
                        <select
                          name="raw_material"
                          id={raw_material}
                          data-id={idx}
                          className="form-control"
                        >
                           {ingridients}
                        </select>
                    </td>    

                    <td>
                        {
                        idx===0?<Button onClick={()=>this.props.add()} type="button" icon='pi pi-plus' className="p-button-warning" />
                        : <Button icon='pi pi-trash' className="p-button-danger" onClick={(() => this.props.delete(val))} />
                        }
                    </td>
                </tr>
            )
        }))
    }
}


const mapStateToProps = state =>({
    rawmaterials: state.rawmaterials.rawmaterials,
    warehouses: state.warehouses.warehouses,

})

export default connect(mapStateToProps, {getRawMaterials, getWarehouses} ) (Ingridients);



