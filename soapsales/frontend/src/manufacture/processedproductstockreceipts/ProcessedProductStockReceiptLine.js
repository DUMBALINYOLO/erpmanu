import React, { Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getProcessProducts } from '..//../actions/processproducts';


class ProcessedProductStockReceiptLine extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         debit_account: null,

    //     }
                 
    //     this.onAccount = this.onAccount.bind(this);

    // }

    
    
    

    componentDidMount() {
        this.props.getProcessProducts();
    }
    
    render(){
        const { processproducts } = this.props;

        let ProductOptions = processproducts.length > 0
            && processproducts.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);

        return (
           this.props.lines.map((val, idx) => {
            let item = `item-${idx}`, quantity = `quantity-${idx}` 
            return (
                <tr key={val.index}>
                    <td>
                        <input
                          type="number"
                          name="quantity"
                          data-id={idx}
                          format="yy-mm-dd"
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
                           {ProductOptions}
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
    processproducts: state.processproducts.processproducts
})

export default connect(mapStateToProps, { getProcessProducts }) (ProcessedProductStockReceiptLine);













