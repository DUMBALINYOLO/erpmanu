import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBillPayment } from '..//../actions/billpayments';
import PropTypes from 'prop-types';
import { getAccounts} from '..//../actions/accounts';
import { getBills} from '..//../actions/bills';
import { getEmployees} from '..//../actions/employees';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';


class BillPaymentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: '',
            account: null,
            bill: null,
            amount: '',
            memo: '',
            paid_by: null,

      }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAccount = this.onAccount.bind(this);
        this.onBill = this.onBill.bind(this);
        this.onPaidBy = this.onPaidBy.bind(this);
    }

    onAccount (e){
      this.setState({account: e.value})
    }

    onPaidBy (e){
      this.setState({paid_by: e.value})
    }

    onBill (e){
      this.setState({bill: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
        date,
        account,
        bill,
        amount,
        memo,
        paid_by

      } = this.state;

      const billpayment = {
        date,
        account,
        bill,
        amount,
        memo,
        paid_by
      };

      this.props.addBillPayment(billpayment);
      this.setState({
        date: '',
        account: '',
        bill: '',
        amount: '',
        memo: '',
        paid_by
        });
      this.props.history.push('/billpayments');
    };

    static propTypes = {
        addBillPayment: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getBills: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getAccounts()
      this.props.getBills()
      this.props.getEmployees()

    }

    render() {
        const {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by
        } = this.state;


        const {accounts} = this.props;
        const {bills} = this.props;
        const {employees} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Bill Payment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
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
                        <label htmlFor="inputtext">Date</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Amount</label>
                        <InputNumber
                          name="amount"
                          onChange={this.onChange}
                          value={amount}
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
                        <span className="p-float-label">
                            <InputTextarea
                                name="memo"
                                onChange={this.onChange}
                                value={memo}
                            />
                            <label htmlFor="inputtext">Memo</label>
                      </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={account}
                            onChange={this.onAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ACCOUNT</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={bill}
                            onChange={this.onBill}
                            options={bills}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="vendor"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT BILLS</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={paid_by}
                            onChange={this.onPaidBy}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT EMPLOYEES</label>
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
    accounts: state.accounts.accounts,
    bills: state.bills.bills,
    employees: state.employees.employees
})


export default connect(mapStateToProps, {getAccounts, getBills, getEmployees, addBillPayment})(BillPaymentForm);
