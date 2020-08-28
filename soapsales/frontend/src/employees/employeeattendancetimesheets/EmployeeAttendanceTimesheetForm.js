import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeAttendanceTimesheet } from '..//../actions/employeeattendancetimesheets';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeTimesheetMonthChoices, getEmployeeYearChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';

export class EmployeeAttendanceTimesheetForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        employee: null,
        month: null,
        year: null,
        recorded_by: null,
        complete: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this); 
      this.onEmployee = this.onEmployee.bind(this);
      this.onMonth = this.onMonth.bind(this);
      this.onYear = this.onYear.bind(this);
      this.onRecordedBy = this.onRecordedBy.bind(this);     
      this.onComplete = this.onComplete.bind(this);
    }

    onEmployee (e){
      this.setState({employee: e.value})
    } 

    onMonth (e){
      this.setState({month: e.value})
    } 

    onYear (e){
      this.setState({year: e.value})
    } 

    onRecordedBy (e){
      this.setState({recorded_by: e.value})
    } 

    onComplete() {
      this.setState({
        complete: !this.state.checked
      });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        employee,
        month,
        year,
        recorded_by,
        complete, 
      } = this.state;
      const employeeattendancetimesheet = { 
        employee,
        month,
        year,
        recorded_by,
        complete, 
      };
      this.props.addEmployeeAttendanceTimesheet(employeeattendancetimesheet);
      this.setState({
        employee: '',
        month: '',
        year: '',
        recorded_by: '',
        complete: true,
      });
      this.props.history.push('/employeeattendancetimesheets');
    };

    static propTypes = {
        addEmployeeAttendanceTimesheet: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeTimesheetMonthChoices: PropTypes.func.isRequired,
        getEmployeeYearChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getEmployeeTimesheetMonthChoices()
      this.props.getEmployeeYearChoices()
    }

    render() {
        const { 
          employee,
          month,
          year,
          recorded_by,
          complete,  
        } = this.state;

        const {employeetimesheetmonthchoices} = this.props;
        const {employeeyearchoices} = this.props;
        const {employees} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Attendance Timesheet</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
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
                    <Dropdown 
                      placeholder ="SELECT MONTH"
                      value={month}
                      onChange={this.onMonth}
                      options={employeetimesheetmonthchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT YEAR"
                      value={year}
                      onChange={this.onYear}
                      options={employeeyearchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>COMPLETE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onComplete}
                      checked={this.state.complete}
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
    employeetimesheetmonthchoices: state.employeetimesheetmonthchoices.employeetimesheetmonthchoices,
    employeeyearchoices: state.employeeyearchoices.employeeyearchoices,
    employees: state.employees.employees
})

export default connect(mapStateToProps, { getEmployees, getEmployeeTimesheetMonthChoices, getEmployeeYearChoices, addEmployeeAttendanceTimesheet })(EmployeeAttendanceTimesheetForm);
