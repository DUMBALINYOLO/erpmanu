import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePayDeduction } from '..//../actions/employeepaydeductions';
import { getEmployeeAllowances } from '..//../actions/employeeallowances';
import { getEmployeePayCommissionRules } from '..//../actions/employeepaycommissionrules';
import { getEmployeePayrollTaxes } from '..//../actions/employeepayrolltaxes';
import { getAccounts } from '..//../actions/accounts';
import { getEmployeeDeductionMethods } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar"
import {Checkbox} from 'primereact/checkbox';
import {InputNumber} from 'primereact/inputnumber';

export class EmployeePayDeductionForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        deduction_method: null,
        name: '',
        tax_deductable: false,
        basic_income: false,
        hourly_income: false,
        overtime_income: false,
        benefits: null,
        commission: null,
        payroll_taxes: null,
        rate: '',
        fixed_amount: '',
        employer_contribution: '',
        liability_account: null,
        account_paid_into: null,
        archived: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onDeductionMethods = this.onDeductionMethods.bind(this);
      this.onBenefits = this.onBenefits.bind(this);
      this.onCommission = this.onCommission.bind(this);
      this.onPayrollTaxes = this.onPayrollTaxes.bind(this);
      this.onLiabilityAccount = this.onLiabilityAccount.bind(this);
      this.onAccountPaidInto = this.onAccountPaidInto.bind(this);
      this.onTaxDeductable = this.onTaxDeductable.bind(this);
      this.onBasicIncome = this.onBasicIncome.bind(this);
      this.onHourlyIncome = this.onHourlyIncome.bind(this);
      this.onOvertimeIncome = this.onOvertimeIncome.bind(this);
      this.onArchived = this.onArchived.bind(this);
    }

    onTaxDeductable() {
      this.setState({
        tax_deductable: !this.state.checked
      });
    }

    onBasicIncome() {
      this.setState({
        basic_income: !this.state.checked
      });
    }

    onHourlyIncome() {
      this.setState({
        hourly_income: !this.state.checked
      });
    }

    onOvertimeIncome() {
      this.setState({
        overtime_income: !this.state.checked
      });
    }

    onArchived() {
      this.setState({
        archived: !this.state.checked
      });
    }

    onDeductionMethods (e){
      this.setState({deduction_method: e.value})
    } 

    onBenefits (e){
      this.setState({benefits: e.value})
    } 

    onCommission (e){
      this.setState({commission: e.value})
    } 

    onPayrollTaxes (e){
      this.setState({payroll_taxes: e.value})
    }

    onLiabilityAccount (e){
      this.setState({liability_account: e.value})
    } 

    onAccountPaidInto (e){
      this.setState({account_paid_into: e.value})
    }      

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        deduction_method,
        name,
        tax_deductable,
        basic_income,
        hourly_income,
        overtime_income,
        benefits,
        commission,
        payroll_taxes,
        rate,
        fixed_amount,
        employer_contribution,
        liability_account,
        account_paid_into,
        archived
      } = this.state;
      const employeepaydeduction = { 
        deduction_method,
        name,
        tax_deductable,
        basic_income,
        hourly_income,
        overtime_income,
        benefits,
        commission,
        payroll_taxes,
        rate,
        fixed_amount,
        employer_contribution,
        liability_account,
        account_paid_into,
        archived
      };
      this.props.addEmployeePayDeduction(employeepaydeduction);
      this.setState({
          deduction_method: '',
          name: '',
          tax_deductable: true,
          basic_income: true,
          hourly_income: true,
          overtime_income: true,
          benefits: '',
          commission: '',
          payroll_taxes: '',
          rate: '',
          fixed_amount: '',
          employer_contribution: '',
          liability_account: '',
          account_paid_into: '',
          archived: true

        });
      this.props.history.push('/employeepaydeductions');

    };

    static propTypes = {
        addEmployeePayDeduction: PropTypes.func.isRequired,
        getEmployeeAllowances: PropTypes.func.isRequired,
        getEmployeePayCommissionRules: PropTypes.func.isRequired,
        getEmployeePayrollTaxes: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getEmployeeDeductionMethods: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployeeAllowances()
      this.props.getEmployeePayCommissionRules()
      this.props.getEmployeePayrollTaxes()
      this.props.getAccounts()
      this.props.getEmployeeDeductionMethods()

    }
    render() {
        const { 
          deduction_method,
          name,
          tax_deductable,
          basic_income,
          hourly_income,
          overtime_income,
          benefits,
          commission,
          payroll_taxes,
          rate,
          fixed_amount,
          employer_contribution,
          liability_account,
          account_paid_into,
          archived
        } = this.state;

        const {employeeallowances} = this.props;
        const {employeepaycommissionrules} = this.props;
        const {employeepayrolltaxes} = this.props;
        const {employeedeductionmethods} = this.props;
        const {accounts} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Pay Deduction</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Name</label>
                    <InputText
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Rate</label>
                     <InputNumber
                        name="rate"
                        mode="decimal"
                        onChange={this.onChange}
                        value={rate}
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
                    <label>Fixed Amount</label>
                     <InputNumber
                        name="fixed_amount"
                        mode="decimal"
                        onChange={this.onChange}
                        value={fixed_amount}
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
                    <label>Employer Contribution</label>
                     <InputNumber
                        name="employer_contribution"
                        mode="decimal"
                        onChange={this.onChange}
                        value={employer_contribution}
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
                    <Dropdown 
                      placeholder ="SELECT DEDUCTION METHOD"
                      value={deduction_method}
                      onChange={this.onDeductionMethods}
                      options={employeedeductionmethods}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT BENEFITS"
                      value={benefits}
                      onChange={this.onBenefits}
                      options={employeeallowances}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT COMMISSION"
                      value={commission}
                      onChange={this.onCommission}
                      options={employeepaycommissionrules}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT PAYROLL TAXES"
                      value={payroll_taxes}
                      onChange={this.onPayrollTaxes}
                      options={employeepayrolltaxes}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT LIABILITY ACCOUNT"
                      value={liability_account}
                      onChange={this.onLiabilityAccount}
                      options={accounts}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT ACCOUNT PAID INTO"
                      value={account_paid_into}
                      onChange={this.onAccountPaidInto}
                      options={accounts}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>TAX DEDUCTABLE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onTaxDeductable}
                      checked={this.state.tax_deductable}
                    /> 
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>BASIC INCOME :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onBasicIncome}
                      checked={this.state.basic_income}
                    /> 
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>HOURLY INCOME :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onHourlyIncome}
                      checked={this.state.hourly_income}
                    /> 
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>OVERTIME INCOME :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onOvertimeIncome}
                      checked={this.state.overtime_income}
                    /> 
                  </div>
                  <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                    <label>ARCHIVED :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onArchived}
                      checked={this.state.archived}
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
    employeeallowances: state.employeeallowances.employeeallowances,
    employeepaycommissionrules: state.employeepaycommissionrules.employeepaycommissionrules,
    employeepayrolltaxes: state.employeepayrolltaxes.employeepayrolltaxes,
    employeedeductionmethods: state.employeedeductionmethods.employeedeductionmethods,
    accounts: state.accounts.accounts,
})

export default connect(
        mapStateToProps, 
        {
          getEmployeeAllowances,
          getEmployeePayCommissionRules,
          getEmployeePayrollTaxes,
          getAccounts,
          getEmployeeDeductionMethods, 
          addEmployeePayDeduction })
        (EmployeePayDeductionForm);
