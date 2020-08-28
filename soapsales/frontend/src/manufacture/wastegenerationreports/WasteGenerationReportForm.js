import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWasteReport } from '..//../actions/wasteReports';
import PropTypes from 'prop-types';
import { getEmployees } from '..//../actions/employees';
import { getProcessProducts } from '..//../actions/processproducts';
import { getUnitmeasures } from '..//../actions/unitmeasure';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';

export class WasteGenerationReportForm extends Component{
    constructor(props){
      super(props);
      this.state = {
          product: null,
          unit: null,
          quantity: '',
          comments: '',
          recorded_by: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onUnit = this.onUnit.bind(this);
      this.onProduct = this.onProduct.bind(this);
      this.onRecordedBy = this.onRecordedBy.bind(this);
    }

    onUnit (e){
      this.setState({unit: e.value})
    }

    onProduct (e){
      this.setState({product: e.value})
    }

    onRecordedBy (e){
      this.setState({recorded_by: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { product, unit, quantity, comments, recorded_by } = this.state;
      const wasteReport = { product, unit, quantity, comments, recorded_by };
      this.props.addWasteReport(wasteReport);
      this.setState({
            product: '',
            unit: '',
            quantity: '',
            comments: '',
            recorded_by: '',
        });
      this.props.history.push('/wastereportgenerations');
    };

    static propTypes = {
        addWasteReport: PropTypes.func.isRequired,
        getProcessProducts: PropTypes.func.isRequired,
        getUnitmeasures: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getProcessProducts()
      this.props.getUnitmeasures()
      this.props.getEmployees()
    }


    render() {
        const { product, unit, quantity, comments, recorded_by } = this.state;
        const { processproducts } = this.props;
        const { unitmeasures } = this.props;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Waste Report</h2>
              <form onSubmit={this.onSubmit}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                    <label>QUANTITY</label>
                    <InputNumber
                      name="quantity"
                      onChange={this.onChange}
                      value={quantity}
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
                  <label>COMMNETS</label>
                  <InputTextarea
                    name="comments"
                    onChange={this.onChange}
                    value={comments}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT PRODUCT"
                    value={product}
                    onChange={this.onProduct}
                    options={processproducts}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT UNIT"
                    value={unit}
                    onChange={this.onUnit}
                    options={unitmeasures}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT RECORDED BY"
                    value={recorded_by}
                    onChange={this.onRecordedBy}
                    options={employees}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="employee_number" 
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
    unitmeasures: state.unitmeasures.unitmeasures,
    processproducts: state.processproducts.processproducts,
    employees: state.employees.employees
})

export default connect(mapStateToProps, { getUnitmeasures, getProcessProducts, getEmployees, addWasteReport })(WasteGenerationReportForm);
