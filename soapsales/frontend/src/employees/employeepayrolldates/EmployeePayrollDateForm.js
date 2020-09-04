import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePayrollDate } from '..//../actions/employeepayrolldates';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeDepartments } from '..//../actions/employeedepartments';
import { getEmployeePaygrades } from '..//../actions/employeepaygrades';
import { getEmployeePayrollSchedules } from '..//../actions/employeepayrollschedules';
import { getEmployeePayrollDateChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

export class EmployeePayrollDateForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        date: null,
        employee: null,
        departments: null,
        pay_grades: null,
        schedule: null
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.onDate = this.onDate.bind(this);
      this.onDepartments = this.onDepartments.bind(this);
      this.onPayGrades = this.onPayGrades.bind(this);
      this.onSchedule = this.onSchedule.bind(this);
    }

    onDate (e){
      this.setState({date: e.value})
    }

    onDepartments (e){
      this.setState({departments: e.value})
    }

    onPayGrades (e){
      this.setState({pay_grades: e.value})
    }

    onSchedule (e){
      this.setState({schedule: e.value})
    }

    onSubmit = (e) => {
      e.preventDefault();
      const { date, employee, departments, pay_grades, schedule } = this.state;
      const employeepayrolldate = { date, employee, departments, pay_grades, schedule };
      this.props.addEmployeePayrollDate(employeepayrolldate);
      this.setState({
        date: '',
        employee: '',
        departments: '',
        pay_grades: '',
        schedule: ''
      });
      this.props.history.push('/employeepayrolldates');
    };

    static propTypes = {
      getEmployees: PropTypes.func.isRequired,
      getEmployeeDepartments: PropTypes.func.isRequired,
      getEmployeePaygrades: PropTypes.func.isRequired,
      getEmployeePayrollSchedules: PropTypes.func.isRequired,
      getEmployeePayrollDateChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getEmployeeDepartments()
      this.props.getEmployeePaygrades()
      this.props.getEmployeePayrollSchedules()
      this.props.getEmployeePayrollDateChoices()
    }
    render() {
        const { date, employee, departments, pay_grades, schedule } = this.state;
        const { employees } = this.props;
        const { employeedepartments } = this.props;
        const { employeepaygrades } = this.props;
        const { employeepayrollschedules } = this.props;
        const { employeepayrolldatechoices } = this.props;


        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Payroll Dates</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT EMPLOYEE"
                      value={employee}
                      onChange={this.onEmployees}
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
                      placeholder ="SELECT DATE"
                      value={date}
                      onChange={this.onDate}
                      options={employeepayrolldatechoices}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="value"
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT DEPARTMENTS"
                      value={departments}
                      onChange={this.onDepartments}
                      options={employeedepartments}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="name"
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT EMPLOYEE"
                      value={pay_grades}
                      onChange={this.onPayGrades}
                      options={employeepaygrades}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="name"
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT SCHEDULE"
                      value={schedule}
                      onChange={this.onSchedule}
                      options={employeepayrollschedules}
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
  employees: state.employees.employees,
  employeedepartments: state.employeedepartments.employeedepartments,
  employeepaygrades: state.employeepaygrades.employeepaygrades,
  employeepayrollschedules: state.employeepayrollschedules.employeepayrollschedules,
  employeepayrolldatechoices: state.employeepayrolldatechoices.employeepayrolldatechoices
})
export default connect( mapStateToProps, { getEmployees, getEmployeeDepartments, getEmployeePaygrades, getEmployeePayrollSchedules, getEmployeePayrollDateChoices, addEmployeePayrollDate })(EmployeePayrollDateForm);
