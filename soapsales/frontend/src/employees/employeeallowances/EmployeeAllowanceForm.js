import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeeAllowance } from '..//../actions/employeeallowances';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';

export class EmployeeAllowanceForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        amount: '',
        taxable: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onTaxable = this.onTaxable.bind(this);
    }

    onTaxable() {
      this.setState({
        taxable: !this.state.checked
      });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { name, amount, taxable } = this.state;
      const employeeallowance = { name, amount, taxable};
      this.props.addEmployeeAllowance(employeeallowance);
      this.setState({
        name: '',
        amount: '',
        taxable: true,
      });
      this.props.history.push('/employeeallowances');
    };

    static propTypes = {
        addEmployeeAllowance: PropTypes.func.isRequired,
    }


    render() {
        const { name, amount } = this.state;
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
                    <label>Amount</label>
                     <InputNumber
                        name="amount"
                        mode="decimal"
                        onChange={this.onChange}
                        value={amount}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-danger"
                        incrementButtonClassName="p-button-success"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        step={1}
                      />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>TAXABLE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onTaxable}
                      checked={this.state.taxable}
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


export default connect(null, { addEmployeeAllowance })(EmployeeAllowanceForm);
