import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProcessedProductStockAdjustment } from '../../actions/processedproductstockadjustments';
import { getWarehouseItems } from '../../actions/warehouseitems';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';


export class ProcessedProductStockAdjustmentForm extends Component{
    constructor(props){
    super(props);
    this.state = {
        warehouse_item: null, 
        adjustment: '', 
        note: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onWarehouseItem = this.onWarehouseItem.bind(this);
    }

    onWarehouseItem (e){
      this.setState({warehouse_item: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        warehouse_item, 
        adjustment, 
        note, 
      } = this.state;
      const processedproductstockadjustment = { 
        warehouse_item, 
        adjustment, 
        note,  
      };
      this.props.addProcessedProductStockAdjustment(processedproductstockadjustment);
      this.setState({
        warehouse_item: '', 
        adjustment: '', 
        note: '',
      });
      this.props.history.push('/processedproductstockadjustments');
    };

    static propTypes = {
        addProcessedProductStockAdjustment: PropTypes.func.isRequired,
        getWarehouseItems: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getWarehouseItems()
    }


    render() {

        const { 
          warehouse_item, 
          adjustment, 
          note, 
        } = this.state;

        const { warehouseitems } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Processed Product Stock Adjustment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Note</label>
                    <InputTextarea
                      name="note"
                      onChange={this.onChange}
                      value={note}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Adjustment</label>
                    <InputNumber
                      name="adjustment"
                      onChange={this.onChange}
                      value={adjustment}
                      showButtons
                      buttonLayout="horizontal"
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      step={1}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <Dropdown 
                      placeholder ="SELECT WAREHOUSE ITEM"
                      value={warehouse_item}
                      onChange={this.onWarehouseItem}
                      options={warehouseitems}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                  </div>         
                </div>
             </form>
         </div>
        );
    }
}

const mapStateToProps = state =>({
    warehouseitems: state.warehouseitems.warehouseitems,
})

export default connect(mapStateToProps, { getWarehouseItems, addProcessedProductStockAdjustment })(ProcessedProductStockAdjustmentForm);
