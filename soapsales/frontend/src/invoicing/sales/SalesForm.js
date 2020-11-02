import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInvoice } from '..//../actions/invoices';
import { getActiveCustomers } from '..//../actions/activecustomers';
import { getWarehouses } from '..//../actions/warehouses';
import { getEmployees } from '..//../actions/employees';
import { getInvoiceSalesChoices, getInvoiceSalesTypesChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from "primereact/calendar";
import {InputTextarea} from 'primereact/inputtextarea';
import Lines from './Lines';
import PropTypes from 'prop-types';
import {Dropdown} from 'primereact/dropdown';


export class SalesForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: null,
            customer: null,
            validated_by: null,
            cashier: null,
            due: '',
            terms: '',
            comments: '',
            ship_from: null,
            sale_type: null,
            lines: [{ index: Math.random(),discount: '', quantity:'', product: '',  tax: '' }],

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.clickOnDelete = this.clickOnDelete.bind(this);
        this.onStatus = this.onStatus.bind(this);
        this.onCustomer = this.onCustomer.bind(this);
        this.onInvoiceValidator = this.onInvoiceValidator.bind(this);
        this.onSale = this.onSale.bind(this);
        this.onShipFrom = this.onShipFrom.bind(this);
        this.onCashier = this.onCashier.bind(this);
    }

    onStatus (e){
      this.setState({status: e.value})
    }

    onCustomer (e){
      this.setState({customer: e.value})
    }

    onInvoiceValidator (e){
      this.setState({validated_by: e.value})
    }

    onCashier (e){
      this.setState({cashier: e.value})
    }

    onShipFrom (e){
      this.setState({ship_from: e.value})
    }

    onSale (e){
      this.setState({sale_type: e.value})
    }



    handleChange = (e) => {
        if (["discount", 'quantity', "product",  "tax"].includes(e.target.name)) {
          let lines = [...this.state.lines]
          lines[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
          this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            lines: [...prevState.lines, { index: Math.random(), discount: '', quantity:'', product: '',  tax: ''}],
        }));
    }

    deleteRow = (index) => {
        this.setState({
            lines: this.state.lines.filter((s, sindex) => index !== sindex),
        });
    }

    clickOnDelete(record) {
        this.setState({
          lines: this.state.lines.filter(r => r !== record)
        });
    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
          status,
          customer,
          validated_by,
          cashier,
          sale_type,
          due,
          terms,
          comments,
          ship_from,
          lines,

      } = this.state;


      const invoice = {
          status,
          customer,
          validated_by,
          cashier,
          sale_type,
          due,
          terms,
          comments,
          ship_from,
          lines,
      };

      this.props.addInvoice(invoice);
      console.log(invoice)
      this.setState({
          lines: [],
          status: "",
          customer: "",
          validated_by: "",
          cashier: "",
          sale_type: '',
          due: "",
          terms: "",
          comments: "",
          ship_from: "",

        });
        // this.props.history.push('/invoices');
    };

    static propTypes = {
        getWarehouses: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getInvoiceSalesChoices: PropTypes.func.isRequired,
        getInvoiceSalesTypesChoices: PropTypes.func.isRequired,
        getActiveCustomers: PropTypes.func.isRequired,
        addInvoice: PropTypes.func.isRequired,

    }

    componentDidMount() {
      this.props.getActiveCustomers();
      this.props.getWarehouses();
      this.props.getInvoiceSalesTypesChoices();
      this.props.getInvoiceSalesChoices();
      this.props.getEmployees();

    }


    render() {
        const {
          status,
          customer,
          validated_by,
          cashier,
          due,
          sale_type,
          terms,
          ship_from,
          comments,
          lines,
        } = this.state;


        const { activecustomers} = this.props;
        const { invoicesalestypeschoices } = this.props;
        const { invoicesaleschoices} = this.props;
        const { warehouses} = this.props;
        const { employees } = this.props;


        return (
            <div className="card card-body mt-4 mb-4">
              <h2>ADD INVOICE</h2>
              <form onSubmit={this.onSubmit} onChange={this.handleChange}>
                <div className="p-fluid p-formgrid p-grid">
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
                    <label>Terms</label>
                    <InputText
                      className="form-control"
                      type="text"
                      name="terms"
                      onChange={this.onChange}
                      value={terms}
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-12">
                    <label>Comments</label>
                    <InputTextarea
                      className="form-control"
                      type="text"
                      name="comments"
                      onChange={this.onChange}
                      value={comments}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="VALIDATED BY"
                      value={validated_by}
                      onChange={this.onInvoiceValidator}
                      options={employees}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="email" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT CUSTOMER"
                      value={customer}
                      onChange={this.onCustomer}
                      options={activecustomers}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT CASHIER"
                      value={cashier}
                      onChange={this.onCashier}
                      options={employees}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="email" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT SHIP FROM"
                      value={ship_from}
                      onChange={this.onShipFrom}
                      options={warehouses}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT STATUS"
                      value={status}
                      onChange={this.onStatus}
                      options={invoicesaleschoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT SALE TYPE"
                      value={sale_type}
                      onChange={this.onSale}
                      options={invoicesalestypeschoices}
                      filter={true} 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-12">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                  </div>
                  <table className="table">
                    <thead>
                        <tr>
                          
                          <th>DISCOUNT</th>
                          <th>QUANTITY</th>
                          <th>PRODUCT</th>
                          <th>TAX</th>
                        </tr>
                      </thead>
                      <tbody>
                        <Lines add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lines={lines} />
                      </tbody>
                      <tfoot>
                        <tr><td colSpan="4">
                            <Button onClick={this.addNewRow} type="button" icon='pi pi-plus' className="p-button-warning"/>
                        </td></tr>
                      </tfoot>
                  </table>
                </div>
             </form>
         </div>
        );
    }
}


const mapStateToProps = state =>({
    activecustomers: state.activecustomers.activecustomers,
    warehouses: state.warehouses.warehouses,
    invoicesaleschoices: state.invoicesaleschoices.invoicesaleschoices,
    employees: state.employees.employees,
    invoicesalestypeschoices: state.invoicesalestypeschoices.invoicesalestypeschoices,

})

export default connect(
      mapStateToProps, 
      { getActiveCustomers, getWarehouses, getInvoiceSalesTypesChoices, getInvoiceSalesChoices, getEmployees, addInvoice})
      (SalesForm);























