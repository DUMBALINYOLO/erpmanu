import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTax, editTax } from '..//../actions/taxes';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';

export class TaxForm extends Component{
    state = {
        taxes: [],
        name: '',
        rate: '',
        editTax: false
    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { name, rate } = this.state;
        const tax = { name, rate};
        this.props.addTax(tax);
        this.setState({
            name: '',
            rate: '',
            editTax: false
        });
        this.props.history.push('/taxes');
    };

    handleEdit = id => {
        const filteredItems = this.state.taxes.filter(tax => tax.id !== id);
        const selectedItem = this.state.taxes.find(tax => tax.id ===id)
        this.setState({
            taxes: filteredItems,
            editTax: true,
            tax: selectedItem.
        })
    }

    static propTypes = {
        addTax: PropTypes.func.isRequired,
    }


    render() {
        const { name, rate } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Tax</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Name</label>
                    <InputText
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
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

                  <div className="p-field p-col-12 p-md-6">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                  </div>
                </div>
             </form>
         </div>
        );
    }
}


export default connect(null, { addTax })(TaxForm);
