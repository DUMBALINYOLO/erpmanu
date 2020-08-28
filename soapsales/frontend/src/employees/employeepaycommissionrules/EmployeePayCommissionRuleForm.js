import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployeePayCommissionRule } from '..//../actions/employeepaycommissionrules';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';

export class EmployeePayCommissionRuleForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        min_sales: '',
        rate: '',
        archived: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);      
      this.onArchived = this.onArchived.bind(this);
    }

    onArchived() {
      this.setState({
        archived: !this.state.checked
      });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { name, min_sales, rate, archived } = this.state;
      const employeepaycommissionrule = { name, min_sales, rate, archived};
      this.props.addEmployeePayCommissionRule(employeepaycommissionrule);
      this.setState({
        name: '',
        min_sales: '',
        rate: '',
        archived: true,
      });
      this.props.history.push('/employeepaycommissionrules');
    };

    static propTypes = {
        addEmployeePayCommissionRule: PropTypes.func.isRequired,
    }


    render() {
        const { name, min_sales, rate, archived } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Employee Pay Commission Rule</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Name</label>
                    <InputText
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Min Sales</label>
                     <InputNumber
                        name="min_sales"
                        mode="decimal"
                        onChange={this.onChange}
                        value={min_sales}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-danger"
                        incrementButtonClassName="p-button-success"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        step={1}
                      />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Rate</label>
                     <InputNumber
                        name="rate"
                        mode="decimal"
                        onChange={this.onChange}
                        value={rate}
                        showButtons
                        buttonLayout="horizontal"
                        decrementButtonClassName="p-button-danger"
                        incrementButtonClassName="p-button-success"
                        incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus"
                        step={1}
                      />
                  </div>
                  <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                    <label>ARCHIVED :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onArchived}
                      checked={this.state.archived}
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


export default connect(null, { addEmployeePayCommissionRule })(EmployeePayCommissionRuleForm);
