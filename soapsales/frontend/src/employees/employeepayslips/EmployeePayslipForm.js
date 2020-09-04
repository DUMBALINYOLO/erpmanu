import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePayslip } from '..//../actions/employeepayslips';
import { getEmployees } from '..//../actions/employees';
import { getEmployeePaygrades } from '..//../actions/employeepaygrades';
import { getEmployeePayslipStatusChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar"

export class EmployeePayslipForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        start_period: '',
        employee: null,
        normal_hours: '',
        overtime_one_hours: '',
        overtime_two_hours: '',
        pay_grade: null,
        pay_roll_id: '',
        status: null,
        pay_grade_version: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onEmployee = this.onEmployee.bind(this);
      this.onPayGrade = this.onPayGrade.bind(this);
      this.onStatus = this.onStatus.bind(this);
    }

    onEmployee (e){
      this.setState({employee: e.value})
    }

    onPayGrade (e){
      this.setState({pay_grade: e.value})
    }

    onStatus (e){
      this.setState({status: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
        start_period,
        employee,
        normal_hours,
        overtime_one_hours,
        overtime_two_hours,
        pay_grade,
        pay_roll_id,
        status,
        pay_grade_version,
      } = this.state;
      const employeepayslip = {
        start_period,
        employee,
        normal_hours,
        overtime_one_hours,
        overtime_two_hours,
        pay_grade,
        pay_roll_id,
        status,
        pay_grade_version,
      };
      this.props.addEmployeePayslip(employeepayslip);
      this.setState({
        start_period: '',
        employee: '',
        normal_hours: '',
        overtime_one_hours: '',
        overtime_two_hours: '',
        pay_grade: '',
        pay_roll_id: '',
        status: '',
        pay_grade_version: '',
      });
      this.props.history.push('/employeepayslips');
    };

    static propTypes = {
        addEmployeePayslip: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeePaygrades: PropTypes.func.isRequired,
        getEmployeePayslipStatusChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getEmployeePaygrades()
      this.props.getEmployeePayslipStatusChoices()
    }

    render() {
        const {
          start_period,
          employee,
          normal_hours,
          overtime_one_hours,
          overtime_two_hours,
          pay_grade,
          pay_roll_id,
          status,
          pay_grade_version,
        } = this.state;

        const {employees} = this.props;
        const {employeepaygrades} = this.props;
        const {employeepayslipstatuschoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Payslip</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Payroll ID</label>
                     <InputNumber
                        name="pay_roll_id"
                        mode="decimal"
                        onChange={this.onChange}
                        value={pay_roll_id}
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
                    <label>Pay Grade Version</label>
                     <InputNumber
                        name="pay_grade_version"
                        mode="decimal"
                        onChange={this.onChange}
                        value={pay_grade_version}
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
                    <label>Normal Hours</label>
                     <InputNumber
                        name="normal_hours"
                        mode="decimal"
                        onChange={this.onChange}
                        value={normal_hours}
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
                    <label>Overtime One Hours</label>
                     <InputNumber
                        name="overtime_one_hours"
                        mode="decimal"
                        onChange={this.onChange}
                        value={overtime_one_hours}
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
                    <label>Overtime Two Hours</label>
                     <InputNumber
                        name="overtime_two_hours"
                        mode="decimal"
                        onChange={this.onChange}
                        value={overtime_two_hours}
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
                    <label>Start Period</label>
                    <Calendar
                      showIcon={true}
                      name="start_period"
                      onChange={this.onChange}
                      value={start_period}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT EMPLOYEE"
                      value={employee}
                      onChange={this.onEmployee}
                      options={employees}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="employee_number"
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT STATUS"
                      value={status}
                      onChange={this.onStatus}
                      options={employeepayslipstatuschoices}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="value"
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT PAYGRADE"
                      value={pay_grade}
                      onChange={this.onPayGrade}
                      options={employeepaygrades}
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
    employeepaygrades: state.employeepaygrades.employeepaygrades,
    employeepayslipstatuschoices: state.employeepayslipstatuschoices.employeepayslipstatuschoices,
    employees: state.employees.employees
})

export default connect(mapStateToProps, { getEmployees, getEmployeePaygrades, getEmployeePayslipStatusChoices, addEmployeePayslip })(EmployeePayslipForm);
