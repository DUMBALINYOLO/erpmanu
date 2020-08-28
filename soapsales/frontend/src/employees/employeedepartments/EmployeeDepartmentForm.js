import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeDepartment } from '..//../actions/employeedepartments';
import { getEmployees } from '..//../actions/employees';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';

export class EmployeeDepartmentForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        description: '',
        manager: null,
        employee: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onManager = this.onManager.bind(this);
      this.onEmployees = this.onEmployees.bind(this);
    }

    onManager (e){
      this.setState({manager: e.value})
    } 

    onEmployees (e){
      this.setState({employee: e.value})
    }      

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        name,
        description,
        manager,
        employee,
      } = this.state;
      const employeedepartment = { 
        name,
        description,
        manager,
        employee,
      };
      this.props.addEmployeeDepartment(employeedepartment);
      this.setState({
          name: '',
          description: '',
          manager: '',
          employee: '',
        });
      this.props.history.push('/employeedepartments');

    };

    static propTypes = {
        addEmployeeDepartment: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
    }
    render() {
        const { 
          name,
          description,
          manager,
          employee,
        } = this.state;

        const {employees} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Department</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Name</label>
                    <InputText
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Description</label>
                    <InputTextarea
                      name="description"
                      onChange={this.onChange}
                      value={description}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT MANAGER"
                      value={manager}
                      onChange={this.onManager}
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
})

export default connect(
        mapStateToProps, 
        {getEmployees, addEmployeeDepartment })
        (EmployeeDepartmentForm);
