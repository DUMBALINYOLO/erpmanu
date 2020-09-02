import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeConfig } from '..//../actions/employeeconfig';
import PropTypes from 'prop-types';
import { getEmployees } from '..//../actions/employees';
import { getAccounts } from '..//../actions/accounts';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Calendar} from "primereact/calendar";


class EmployeeConfigForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            last_payroll_date: '',
            require_verification_before_posting_payslips: false
            salary_follows_profits: false,
            payroll_officer: null,
            payroll_account: null,
            payroll_counter: '',
            business_social_security_number: '',
            is_configured: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPayrollOfficer = this.onPayrollOfficer.bind(this);
        this.onPayrollAccount = this.onPayrollAccount.bind(this);
        this.onUsesTimesheet = this.onUsesTimesheet.bind(this)
        this.onSalaryFollowsProfits = this.onSalaryFollowsProfits.bind(this)
        this.onIsConfigured = this.onIsConfigured.bind(this)
    }

    onUsesTimesheet() {
        this.setState({
            require_verification_before_posting_payslips: !this.state.checked
        });
    }

    onSalaryFollowsProfits() {
        this.setState({
            salary_follows_profits: !this.state.checked
        });
    }

    onIsConfigured() {
        this.setState({
            is_configured: !this.state.checked
        });
    }

    onPayrollOfficer (e){
        this.setState({payroll_officer: e.value})
    }

    onPayrollAccount (e){
        this.setState({payroll_account: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            last_payroll_date,
            require_verification_before_posting_payslips,
            salary_follows_profits,
            payroll_officer,
            payroll_account,
            payroll_counter,
            business_social_security_number,
            is_configured
        } = this.state;
        const employeeconfig = {
            last_payroll_date,
            require_verification_before_posting_payslips,
            salary_follows_profits,
            payroll_officer,
            payroll_account,
            payroll_counter,
            business_social_security_number,
            is_configured
        };
        this.props.addEmployeeConfig(employeeconfig);
        this.setState({
            last_payroll_date: '',
            require_verification_before_posting_payslips: true,
            salary_follows_profits: true,
            payroll_officer: '',
            payroll_account: '',
            payroll_counter: '',
            business_social_security_number: '',
            is_configured: true
        });
    };

    static propTypes = {
        addEmployeeConfig: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getEmployees()
        this.props.getAccounts()
    }

    render() {
        const {
            last_payroll_date,
            require_verification_before_posting_payslips,
            salary_follows_profits,
            payroll_officer,
            payroll_account,
            payroll_counter,
            business_social_security_number,
            is_configured
        } = this.state;

        const { employees } = this.props;
        const { accounts } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Employee Config</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="business_social_security_number"
                                onChange={this.onChange}
                                value={business_social_security_number}
                            />
                            <label htmlFor="inputtext">Business Social Security Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Payroll Counter</label>
                        <InputNumber
                            name="payroll_counter"
                            mode="decimal"
                            onChange={this.onChange}
                            value={payroll_counter}
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
                            name="last_payroll_date"
                            onChange={this.onChange}
                            value={last_payroll_date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Last Payroll Date</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>REQUIRE VERIFICATION :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUsesTimesheet}
                            checked={this.state.require_verification_before_posting_payslips}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>SALARY FOLLOWS PROFITS :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onSalaryFollowsProfits}
                            checked={this.state.salary_follows_profits}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>IS CONFIGURED :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onIsConfigured}
                            checked={this.state.is_configured}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={payroll_officer}
                            onChange={this.onPayrollOfficer}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT PAYROLL OFFICER</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={payroll_account}
                            onChange={this.onPayrollAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="keDidy"
                        />
                        <label htmlFor="dropdown">SELECT PAYROLL ACCOUNT</label>
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
    employees: state.employees.employees,
    accounts: state.accounts.accounts,
})
export default connect(mapStateToProps, {getEmployees, getAccounts, addEmployeeConfig})(EmployeeConfigForm);
