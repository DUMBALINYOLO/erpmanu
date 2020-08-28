import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePaygrade } from '..//../actions/employeepaygrades';
import { getEmployeePayCommissionRules } from '..//../actions/employeepaycommissionrules';
import { getEmployeeAllowances } from '..//../actions/employeeallowances';
import { getEmployeePayDeductions } from '..//../actions/employeepaydeductions';
import { getEmployeePayrollTaxes } from '..//../actions/employeepayrolltaxes';
import { getEmployeePayFrequencies, getEmployeeLunchChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import {InputNumber} from 'primereact/inputnumber';


export class EmployeePaygradeForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        salary: '',
        pay_frequency: null,
        monthly_leave_days: '',
        hourly_rate: '',
        overtime_rate: '',
        overtime_two_rate: '',
        commission: null,
        allowances: null,
        deductions: null,
        payroll_taxes: null,
        subtract_lunch_time_from_working_hours: false,
        lunch_duration: null,
        maximum_leave_days: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onPayFrequency = this.onPayFrequency.bind(this);
      this.onCommission = this.onCommission.bind(this);
      this.onAllowances = this.onAllowances.bind(this);
      this.onDeductions = this.onDeductions.bind(this);
      this.onPayrollTaxes = this.onPayrollTaxes.bind(this);
      this.onLunchDuration = this.onLunchDuration.bind(this);
      this.onCheck = this.onCheck.bind(this);
    }

    onCheck() {
      this.setState({
        subtract_lunch_time_from_working_hours: !this.state.checked
      });
    }

    onPayFrequency (e){
      this.setState({pay_frequency: e.value})
    } 

    onCommission (e){
      this.setState({commission: e.value})
    } 

    onAllowances (e){
      this.setState({allowances: e.value})
    } 

    onDeductions (e){
      this.setState({deductions: e.value})
    } 

    onPayrollTaxes (e){
      this.setState({payroll_taxes: e.value})
    } 

    onLunchDuration (e){
      this.setState({lunch_duration: e.value})
    }      

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        name,
        salary,
        pay_frequency,
        monthly_leave_days,
        hourly_rate,
        overtime_rate,
        overtime_two_rate,
        commission,
        allowances,
        deductions,
        payroll_taxes,
        subtract_lunch_time_from_working_hours,
        lunch_duration,
        maximum_leave_days,
      } = this.state;
      const employeepaygrade = { 
        name,
        salary,
        pay_frequency,
        monthly_leave_days,
        hourly_rate,
        overtime_rate,
        overtime_two_rate,
        commission,
        allowances,
        deductions,
        payroll_taxes,
        subtract_lunch_time_from_working_hours,
        lunch_duration,
        maximum_leave_days,
      };
      this.props.addEmployeePaygrade(employeepaygrade);
      this.setState({
          name: '',
          salary: '',
          pay_frequency: '',
          monthly_leave_days: '',
          hourly_rate: '',
          overtime_rate: '',
          overtime_two_rate: '',
          commission: '',
          allowances: '',
          deductions: '',
          payroll_taxes: '',
          subtract_lunch_time_from_working_hours: true,
          lunch_duration: '',
          maximum_leave_days: '',
        });
      this.props.history.push('/employeepaygrades');

    };

    static propTypes = {
        addEmployeePaygrade: PropTypes.func.isRequired,
        getEmployeePayCommissionRules: PropTypes.func.isRequired,
        getEmployeeAllowances: PropTypes.func.isRequired,
        getEmployeePayDeductions: PropTypes.func.isRequired,
        getEmployeePayrollTaxes: PropTypes.func.isRequired,
        getEmployeePayFrequencies: PropTypes.func.isRequired,
        getEmployeeLunchChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployeePayCommissionRules()
      this.props.getEmployeeAllowances()
      this.props.getEmployeePayDeductions()
      this.props.getEmployeePayrollTaxes()
      this.props.getEmployeePayFrequencies()
      this.props.getEmployeeLunchChoices()
    }
    render() {
        const { 
          name,
          salary,
          pay_frequency,
          monthly_leave_days,
          hourly_rate,
          overtime_rate,
          overtime_two_rate,
          commission,
          allowances,
          deductions,
          payroll_taxes,
          subtract_lunch_time_from_working_hours,
          lunch_duration,
          maximum_leave_days,
        } = this.state;

        const {employeepaycommissionrules} = this.props;
        const {employeeallowances} = this.props;
        const {employeepaydeductions} = this.props;
        const {employeepayrolltaxes} = this.props;
        const {employeepayfrequencies} = this.props;
        const {employeelunchchoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Paygrades</h2>
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
                    <label>Salary</label>
                    <InputNumber
                      name="salary"
                      onChange={this.onChange}
                      value={salary}
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
                    <label>Monthly Leave Days</label>
                    <InputNumber
                      name="monthly_leave_days"
                      onChange={this.onChange}
                      value={monthly_leave_days}
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
                    <label>Hourly Rate</label>
                    <InputNumber
                      name="hourly_rate"
                      onChange={this.onChange}
                      value={hourly_rate}
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
                    <label>Over Time Rate</label>
                    <InputNumber
                      name="overtime_rate"
                      onChange={this.onChange}
                      value={overtime_rate}
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
                    <label>Over Time Two Rate</label>
                    <InputNumber
                      name="overtime_two_rate"
                      onChange={this.onChange}
                      value={overtime_two_rate}
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
                    <label>Maximum Leave Days</label>
                    <InputNumber
                      name="maximum_leave_days"
                      onChange={this.onChange}
                      value={maximum_leave_days}
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
                      placeholder ="SELECT PAY FREQUENCY"
                      value={pay_frequency}
                      onChange={this.onPayFrequency}
                      options={employeepayfrequencies}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
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
                      placeholder ="SELECT ALLOWANCES"
                      value={allowances}
                      onChange={this.onAllowances}
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
                      placeholder ="SELECT DEDUCTIONS"
                      value={deductions}
                      onChange={this.onDeductions}
                      options={employeepaydeductions}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT PAYROLL TAX"
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
                      placeholder ="SELECT LUNCH DURATION"
                      value={lunch_duration}
                      onChange={this.onLunchDuration}
                      options={employeelunchchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>SUBSTRACT LUNCH TIME FROM WORKING HOURS :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onCheck}
                      checked={this.state.subtract_lunch_time_from_working_hours}
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
    employeepaycommissionrules: state.employeepaycommissionrules.employeepaycommissionrules,
    employeeallowances: state.employeeallowances.employeeallowances,
    employeepaydeductions: state.employeepaydeductions.employeepaydeductions,
    employeepayrolltaxes: state.employeepayrolltaxes.employeepayrolltaxes,
    employeepayfrequencies: state.employeepayfrequencies.employeepayfrequencies,
    employeelunchchoices: state.employeelunchchoices.employeelunchchoices,
})

export default connect(
        mapStateToProps, 
        {
          getEmployeePayCommissionRules,
          getEmployeeAllowances,
          getEmployeePayDeductions,
          getEmployeePayrollTaxes,
          getEmployeePayFrequencies,
          getEmployeeLunchChoices, addEmployeePaygrade })
        (EmployeePaygradeForm);
