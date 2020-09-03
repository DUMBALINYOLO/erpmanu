import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addShift } from '..//../actions/shifts';
import {getEmployees} from "..//../actions/employees";
import {getManufacturingTeams} from "..//../actions/manufacturingteams";
import {getProcessMachines} from "..//../actions/processmachines";
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

export class ShiftForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        team: null,
        supervisor: null,
        employee: null,
        machine: null
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onTeam = this.onTeam.bind(this);
      this.onSupervisor = this.onSupervisor.bind(this);
      this.onEmployee = this.onEmployee.bind(this);
      this.onMachine = this.onMachine.bind(this);
    }

    onTeam(e){
      this.setState({team: e.value})
    }

    onSupervisor(e){
      this.setState({supervisor: e.value})
    }

    onEmployee(e){
      this.setState({employee: e.value})
    }

    onMachine(e){
      this.setState({machine: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
        name,
        team,
        supervisor,
        employee,
        machine
      } = this.state;
      const shift = {
        name,
        team,
        supervisor,
        employee,
        machine
      };
      this.props.addShift(shift);
      this.setState({
        name: '',
        team: '',
        supervisor: '',
        employee: '',
        machine: ''
      });
      this.props.history.push('/shifts');
    };

    static propTypes = {
        addShift: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getManufacturingTeams: PropTypes.func.isRequired,
        getProcessMachines: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getManufacturingTeams()
      this.props.getProcessMachines()
    }


    render() {
        const {
          name,
          team,
          supervisor,
          employee,
          machine
        } = this.state;

        const { employees } = this.props;
        const { manufacturingteams } = this.props;
        const { processmachines } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Shift</h2>
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
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT TEAM"
                      value={team}
                      onChange={this.onTeam}
                      options={manufacturingteams}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="name"
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT SUPERVISOR"
                      value={supervisor}
                      onChange={this.onSupervisor}
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
                      placeholder ="SELECT MACHINE"
                      value={machine}
                      onChange={this.onMachine}
                      options={processmachines}
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
    processmachines: state.processmachines.processmachines,
    manufacturingteams: state.manufacturingteams.manufacturingteams
})

export default connect(mapStateToProps, { getEmployees, getProcessMachines, getManufacturingTeams, addShift })(ShiftForm);
