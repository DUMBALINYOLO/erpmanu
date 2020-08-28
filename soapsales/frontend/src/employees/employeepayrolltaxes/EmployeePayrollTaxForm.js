import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePayrollTax } from '..//../actions/employeepayrolltaxes';
import {getEmployeePayrollTaxChoices} from "..//../actions/choices";
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';


export class EmployeePayrollTaxForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        paid_by: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);      
      this.onPaidBy = this.onPaidBy.bind(this);
    }

    onPaidBy(e){
      this.setState({paid_by: e.value})
    } 

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { name, paid_by } = this.state;
      const employeepayrolltax = { name, paid_by};
      this.props.addEmployeePayrollTax(employeepayrolltax);
      this.setState({
        name: '',
        paid_by: '',
      });
      this.props.history.push('/employeepayrolltaxes');
    };

    static propTypes = {
        addEmployeePayrollTax: PropTypes.func.isRequired,
        getEmployeePayrollTaxChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getEmployeePayrollTaxChoices()
    }


    render() {
        const { name, paid_by } = this.state;
        const { employeepayrolltaxchoices } = this.props;
        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Allowance</h2>
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
                    <Dropdown 
                      placeholder ="SELECT STATUS"
                      value={paid_by}
                      onChange={this.onPaidBy}
                      options={employeepayrolltaxchoices}
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
    employeepayrolltaxchoices: state.employeepayrolltaxchoices.employeepayrolltaxchoices
})

export default connect(mapStateToProps, { getEmployeePayrollTaxChoices, addEmployeePayrollTax })(EmployeePayrollTaxForm);
