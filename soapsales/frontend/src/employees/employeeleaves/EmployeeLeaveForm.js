import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeLeave } from '..//../actions/employeeleaves';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeLeaveCategoryChoices, getEmployeeLeaveStatusChoices } from '..//../actions/choices';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar"
import {Checkbox} from 'primereact/checkbox';

export class EmployeeLeaveForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        start_date: '',
        end_date: '',
        employee: null,
        category: null,
        status: null,
        authorized_by: null,
        notes: '',
        recorded: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCategory = this.onCategory.bind(this);
      this.onEmployee = this.onEmployee.bind(this);
      this.onStatus = this.onStatus.bind(this);
      this.onAuthorizedBy = this.onAuthorizedBy.bind(this);
      this.onRecorded = this.onRecorded.bind(this);
    }

    onRecorded() {
      this.setState({
        recorded: !this.state.checked
      });
    }

    onCategory (e){
      this.setState({category: e.value})
    } 

    onEmployee (e){
      this.setState({employee: e.value})
    } 

    onStatus (e){
      this.setState({status: e.value})
    } 

    onAuthorizedBy (e){
      this.setState({authorized_by: e.value})
    }     

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        start_date,
        end_date,
        employee,
        category,
        status,
        authorized_by,
        notes,
        recorded,
      } = this.state;
      const employeeleave = { 
        start_date,
        end_date,
        employee,
        category,
        status,
        authorized_by,
        notes,
        recorded,
      };
      this.props.addEmployeeLeave(employeeleave);
      this.setState({
        start_date: '',
        end_date: '',
        employee: '',
        category: '',
        status: '',
        authorized_by: '',
        notes: '',
        recorded: true,
        });
      this.props.history.push('/employeeleaves');

    };

    static propTypes = {
        addEmployeeLeave: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeLeaveStatusChoices: PropTypes.func.isRequired,
        getEmployeeLeaveCategoryChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getEmployeeLeaveCategoryChoices()
      this.props.getEmployeeLeaveStatusChoices()
    }
    render() {
        const { 
          start_date,
          end_date,
          employee,
          category,
          status,
          authorized_by,
          notes,
          recorded,
        } = this.state;

        const {employeeleavecategorychoices} = this.props;
        const { employeeleavestatuschoices } = this.props;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Leave</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
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
                    <label>End Date</label>
                    <Calendar
                      showIcon={true}
                      name="end_date"
                      onChange={this.onChange}
                      value={end_date}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Notes</label>
                    <InputTextarea
                      name="notes"
                      onChange={this.onChange}
                      value={notes}
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
                      placeholder ="SELECT AUTHORIZED BY"
                      value={authorized_by}
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
                      placeholder ="SELECT CATEGORY"
                      value={category}
                      onChange={this.onCategory}
                      options={employeeleavecategorychoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT STATUS"
                      value={status}
                      onChange={this.onStatus}
                      options={employeeleavestatuschoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>RECORDED :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onRecorded}
                      checked={this.state.recorded}
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
    employeeleavestatuschoices: state.employeeleavestatuschoices.employeeleavestatuschoices,
    employeeleavecategorychoices: state.employeeleavecategorychoices.employeeleavecategorychoices,
    employees: state.employees.employees
})

export default connect(
        mapStateToProps, 
        {getEmployeeLeaveCategoryChoices, getEmployees, getEmployeeLeaveStatusChoices, addEmployeeLeave })
        (EmployeeLeaveForm);
