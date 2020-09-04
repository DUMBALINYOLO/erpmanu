import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPayment } from '..//../actions/payments';
import { getEmployees} from '..//../actions/employees';
import { getInvoices} from '..//../actions/invoices';
import { getCustomerPaymentMethodsChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';


export class PaymentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            amount_tendered: '',
            amount_to_pay: '',
            date: '',
            invoice: null,
            method: null,
            cashier: null,
            comments: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onMethod = this.onMethod.bind(this);
        this.onCashier = this.onCashier.bind(this);
        this.onInvoice = this.onInvoice.bind(this);
    }

    onMethod (e){
      this.setState({method: e.value})
    }

    onInvoice (e){
      this.setState({invoice: e.value})
    }

    onCashier (e){
      this.setState({cashier: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
          amount_tendered,
          amount_to_pay,
          date,
          invoice,
          method,
          cashier,
          comments,
      } = this.state;

      const payment = {
          amount_tendered,
          amount_to_pay,
          date,
          invoice,
          method,
          cashier,
          comments,
      };

      this.props.addPayment(payment);
      this.setState({
          amount_tendered: '',
          amount_to_pay: '',
          date: '',
          invoice: '',
          method: '',
          cashier: '',
          comments: ''
      });
      this.props.history.push('/payments');

    };

    static propTypes = {
        addPayment: PropTypes.func.isRequired,
        getCustomerPaymentMethodsChoices: PropTypes.func.isRequired,
        getInvoices: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getCustomerPaymentMethodsChoices()
      this.props.getInvoices()
      this.props.getEmployees()
    }


    render() {
        const {
            amount_tendered,
            amount_to_pay,
            date,
            invoice,
            method,
            cashier,
            comments,
        } = this.state;

        const { customerpaymentmethodschoices } = this.props;
        const { invoices } = this.props;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Payment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label>Amount Tendered</label>
                        <InputNumber
                            className="form-control"
                            name="amount_tendered"
                            onChange={this.onChange}
                            value={amount_tendered}
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Amount To Pay</label>
                        <InputNumber
                            className="form-control"
                            name="amount_to_pay"
                            onChange={this.onChange}
                            value={amount_to_pay}
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="date"
                            onChange={this.onChange}
                            value={date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">DATE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputTextarea
                                name="comments"
                                onChange={this.onChange}
                                value={comments}
                            />
                            <label htmlFor="inputtext">COMMENTS</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown
                                value={invoice}
                                onChange={this.onInvoice}
                                options={invoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="inputtext">SELECT INVOICE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown
                                value={cashier}
                                onChange={this.onCashier}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="id_number"
                                optionValue="id"
                            />
                            <label htmlFor="inputtext">SELECT CASHIER</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown
                                value={method}
                                onChange={this.onMethod}
                                options={customerpaymentmethodschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="inputtext">SELECT METHOD</label>
                        </span>
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
    customerpaymentmethodschoices: state.customerpaymentmethodschoices.customerpaymentmethodschoices,
    invoices: state.invoices.invoices,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {getCustomerPaymentMethodsChoices, getEmployees, getInvoices, addPayment })(PaymentForm);
