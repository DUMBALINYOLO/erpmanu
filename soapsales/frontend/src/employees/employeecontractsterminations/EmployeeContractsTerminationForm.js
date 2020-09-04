import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeContractsTermination } from '..//../actions/employeecontractsterminations';
import { getEmploymentContractTerminationReasons } from '..//../actions/choices';
import { getEmployeeContracts } from '..//../actions/employeecontracts';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar"

export class EmployeeContractsTerminationForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        date: '',
        reason_for_termination: null,
        contract: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onReasonForTermination = this.onReasonForTermination.bind(this);
      this.onContract = this.onContract.bind(this);
    }

    onReasonForTermination (e){
      this.setState({reason_for_termination: e.value})
    }

    onContract (e){
      this.setState({contract: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
        date,
        reason_for_termination,
        contract,
      } = this.state;
      const employeecontractstermination = {
        date,
        reason_for_termination,
        contract,
      };
      this.props.addEmployeeContractsTermination(employeecontractstermination);
      this.setState({
          date: '',
          reason_for_termination: '',
          contract: '',
        });
      this.props.history.push('/employeecontractsterminations');

    };

    static propTypes = {
        addEmployeeContractsTermination: PropTypes.func.isRequired,
        getEmployeeContracts: PropTypes.func.isRequired,
        getEmploymentContractTerminationReasons: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployeeContracts()
      this.props.getEmploymentContractTerminationReasons()
    }
    render() {
        const {
          date,
          reason_for_termination,
          contract,
        } = this.state;

        const {employeecontracts} = this.props;
        const {employmentcontractterminationreasons} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Contract Termination</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Date</label>
                    <Calendar
                      showIcon={true}
                      name="date"
                      onChange={this.onChange}
                      value={date}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT REASONS FOR TERMINATION"
                      value={reason_for_termination}
                      onChange={this.onReasonForTermination}
                      options={employmentcontractterminationreasons}
                      filter={true}
                      filterBy="id,name"
                      showClear={true}
                      optionLabel="value"
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT CONTRACT"
                      value={contract}
                      onChange={this.onContract}
                      options={employeecontracts}
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
    employeecontracts: state.employeecontracts.employeecontracts,
    employmentcontractterminationreasons: state.employmentcontractterminationreasons.employmentcontractterminationreasons,
})

export default connect(
        mapStateToProps,
        {getEmployeeContracts, getEmploymentContractTerminationReasons, addEmployeeContractsTermination })
        (EmployeeContractsTerminationForm);
