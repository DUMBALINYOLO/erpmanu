import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPayrollOfficer } from '..//../actions/payrollofficers';
import { getEmployees } from '..//../actions/employees';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';

export class PayrollOfficerForm extends Component{
    constructor(props){
        super(props);
            this.state = {
            employee: null,
            can_log_timesheets: false,
            can_run_payroll: false,
            can_create_payroll_elements: false,
            can_register_new_employees: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLogTimesheets = this.handleLogTimesheets.bind(this);
        this.handleRunPayroll = this.handleRunPayroll.bind(this);
        this.handlePayrollElements = this.handlePayrollElements.bind(this);
        this.handleRegisterNewEmployee = this.handleRegisterNewEmployee.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
    }

    handleLogTimesheets() {
      this.setState({
        can_log_timesheets: !this.state.checked
      });
    }

    handleRunPayroll(event) {
      this.setState({
        can_run_payroll: !this.state.checked
      });
    }

    handlePayrollElements(event) {
      this.setState({
        can_create_payroll_elements: !this.state.checked
      });
    }

    handleRegisterNewEmployee(event) {
      this.setState({
        can_register_new_employees: !this.state.checked
      });
    }

    onEmployee (e){
      this.setState({employee: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        employee, 
        can_log_timesheets, 
        can_run_payroll, 
        can_create_payroll_elements, 
        can_register_new_employees 
      } = this.state;

      const bookkeeper = { 
        employee, 
        can_log_timesheets, 
        can_run_payroll, 
        can_create_payroll_elements, 
        can_register_new_employees
      };

      this.props.addPayrollOfficer(bookkeeper);
      this.setState({
        employee: '', 
        can_log_timesheets: true, 
        can_run_payroll: true, 
        can_create_payroll_elements: true, 
        can_register_new_employees: true
      });
      this.props.history.push('/payrollofficers');


    };

    static propTypes = {
        addPayrollOfficer: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired
    }

    componentDidMount() {
      this.props.getEmployees();

    }


    render() {
        const {  
          employee, 
          can_log_timesheets, 
          can_run_payroll,  
          can_create_payroll_elements, 
          can_register_new_employees
        } = this.state;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Payroll Officer</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
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
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN LOG TIMESHEETS :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleLogTimesheets}
                      checked={this.state.can_log_timesheets}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN RUN PAYROLL :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleRunPayroll}
                      checked={this.state.can_run_payroll}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN CREATE PAYROLL ELEMENTS:</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handlePayrollElements}
                      checked={this.state.can_create_payroll_elements}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN REGISTER NEW EMPLOYEE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleRegisterNewEmployee}
                      checked={this.state.can_register_new_employees}
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
    employees: state.employees.employees

})

export default connect(mapStateToProps, { getEmployees, addPayrollOfficer })(PayrollOfficerForm);
