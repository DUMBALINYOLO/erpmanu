import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeContract } from '..//../actions/employeecontracts';
import { getEmployeeDepartments } from '..//../actions/employeedepartments';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeCategoryChoices, getNatureOfEmploymentChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar"

export class EmployeeContractForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        start_date: '',
        department: null,
        employee: null,
        job_position: '',
        end_of_probation: '',
        termination_date: '',
        employee_category: null,
        nature_of_employment: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onDepartment = this.onDepartment.bind(this);
      this.onEmployee = this.onEmployee.bind(this);
      this.onEmployeeCategory = this.onEmployeeCategory.bind(this);
      this.onNatureOfEmployment = this.onNatureOfEmployment.bind(this);
    }

    onDepartment (e){
      this.setState({department: e.value})
    } 

    onEmployee (e){
      this.setState({employee: e.value})
    } 

    onEmployeeCategory (e){
      this.setState({employee_category: e.value})
    } 

    onNatureOfEmployment (e){
      this.setState({nature_of_employment: e.value})
    }     

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        start_date,
        department,
        employee,
        job_position,
        end_of_probation,
        termination_date,
        employee_category,
        nature_of_employment,
      } = this.state;
      const employeecontract = { 
        start_date,
        department,
        employee,
        job_position,
        end_of_probation,
        termination_date,
        employee_category,
        nature_of_employment,
      };
      this.props.addEmployeeContract(employeecontract);
      this.setState({
        start_date: '',
        department: '',
        employee: '',
        job_position: '',
        end_of_probation: '',
        termination_date: '',
        employee_category: '',
        nature_of_employment: '',
        });
      this.props.history.push('/employeecontracts');

    };

    static propTypes = {
        addEmployeeContract: PropTypes.func.isRequired,
        getEmployeeDepartments: PropTypes.func.isRequired,
        getNatureOfEmploymentChoices: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeCategoryChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getNatureOfEmploymentChoices()
      this.props.getEmployeeCategoryChoices()
      this.props.getEmployeeDepartments()
    }
    render() {
        const { 
          start_date,
          department,
          employee,
          job_position,
          end_of_probation,
          termination_date,
          employee_category,
          nature_of_employment,
           } = this.state;

        const {employeedepartments} = this.props;
        const {natureofemploymentchoices} = this.props;
        const { employeecategorychoices } = this.props;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Contract</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Job Position</label>
                    <InputText
                      name="job_position"
                      onChange={this.onChange}
                      value={job_position}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Start Date</label>
                    <Calendar
                      showIcon={true}
                      name="start_date"
                      onChange={this.onChange}
                      value={start_date}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>End Of Probation</label>
                    <Calendar
                      showIcon={true}
                      name="end_of_probation"
                      onChange={this.onChange}
                      value={end_of_probation}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Termination Date</label>
                    <Calendar
                      showIcon={true}
                      name="termination_date"
                      onChange={this.onChange}
                      value={termination_date}
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
                      placeholder ="SELECT EMPLOYEE DEPARTMENT"
                      value={department}
                      onChange={this.onDepartment}
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
                      placeholder ="SELECT EMPLOYEE CATEGORY"
                      value={employee_category}
                      onChange={this.onEmployeeCategory}
                      options={employeecategorychoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT NATURE OF EMPLOYEE"
                      value={nature_of_employment}
                      onChange={this.onNatureOfEmployment}
                      options={natureofemploymentchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
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
    employeedepartments: state.employeedepartments.employeedepartments,
    natureofemploymentchoices: state.natureofemploymentchoices.natureofemploymentchoices,
    employeecategorychoices: state.employeecategorychoices.employeecategorychoices,
    employees: state.employees.employees
})

export default connect(
        mapStateToProps, 
        {
          getEmployeeDepartments, getEmployeeCategoryChoices, getEmployees, 
          getNatureOfEmploymentChoices, addEmployeeContract })
        (EmployeeContractForm);
