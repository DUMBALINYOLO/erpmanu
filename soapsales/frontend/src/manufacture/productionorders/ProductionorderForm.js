import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductionorder } from '../../actions/productionorders';
import { getCustomers } from '../../actions/customers';
import { getProcesses } from '../../actions/process';
import { getInventoryitems } from '../../actions/inventoryitems';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Calendar} from "primereact/calendar";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import PropTypes from 'prop-types';
import {Checkbox} from 'primereact/checkbox';

export class ProductionorderForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            customer: null,
            process: null,
            product: null,
            due: '',
            date: '',
            is_confirmed_order: false,
            finished: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCustomer = this.onCustomer.bind(this);
        this.onProcess = this.onProcess.bind(this);
        this.onProduct = this.onProduct.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
        this.handleIsConfirmedOrder = this.handleIsConfirmedOrder.bind(this);
    }

    handleFinished() {
      this.setState({
        finished: !this.state.checked
      });
    }

    handleIsConfirmedOrder() {
      this.setState({
        is_confirmed_order: !this.state.checked
      });
    }

    onCustomer (e){
      this.setState({customer: e.value})
    } 

    onProcess (e){
      this.setState({process: e.value})
    } 

    onProduct (e){
      this.setState({product: e.value})
    } 

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { customer, process, product, due, date } = this.state;
      const productionorders = { customer, product, process, due, date };
      this.props.addProductionorder(productionorders);
      this.setState({
            customer: '',
            process: '',
            product: '',
            due: '',
            date: '',

        });
      this.props.history.push('/productionorders');
    };

    static propTypes = {
        addProductionorder: PropTypes.func.isRequired,
        getCustomers: PropTypes.func.isRequired,
        getProcesses: PropTypes.func.isRequired,
        getInventoryitems: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getCustomers()
      this.props.getProcesses()
      this.props.getInventoryitems()

    }

    render() {
        const { customer, process, product, due, date } = this.state;
        const { customers } = this.props;
        const { processes } = this.props;
        const { inventoryitems } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Production Order</h2>
              <form onSubmit={this.onSubmit}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                <label>Date</label>
                    <Calendar
                      showIcon={true}
                      className="form-control"
                      name="date"
                      onChange={this.onChange}
                      value={date}
                      dateFormat="yy-mm-dd"
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                <label>Due</label>
                    <Calendar
                      showIcon={true}
                      className="form-control"
                      name="due"
                      onChange={this.onChange}
                      value={due}
                      dateFormat="yy-mm-dd"
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT CUSTOMER"
                    value={customer}
                    onChange={this.onCustomer}
                    options={customer}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT PROCESS"
                    value={process}
                    onChange={this.onProcess}
                    options={processes}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT PRODUCT"
                    value={product}
                    onChange={this.onProduct}
                    options={inventoryitems}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                  <label>FINISHED :</label>
                  <Checkbox
                    inputId="working"
                    onChange={this.handleFinished}
                    checked={this.state.finished}
                  /> 
                </div>
                <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                  <label>IS CONFIRMED ORDER :</label>
                  <Checkbox
                    inputId="working"
                    onChange={this.handleIsConfirmedOrder}
                    checked={this.state.is_confirmed_order}
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
    customers: state.customers.customers,
    processes: state.processes.processes,
    inventoryitems: state.inventoryitems.inventoryitems
})

export default connect(mapStateToProps, {getCustomers, getProcesses, getInventoryitems, addProductionorder })(ProductionorderForm);
