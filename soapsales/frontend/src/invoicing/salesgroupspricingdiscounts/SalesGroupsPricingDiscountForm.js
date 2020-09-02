import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSalesGroupsPricingDiscount } from '..//../actions/salesgroupspricingdiscounts';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';


class SalesGroupsPricingDiscountForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            group_name: '',
            product_name: '',
            group_discount_rate: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            group_name,
            product_name,
            group_discount_rate
        } = this.state;
        const salesgroupspricingdiscount = {
            group_name,
            product_name,
            group_discount_rate
        };
        this.props.addSalesGroupsPricingDiscount(salesgroupspricingdiscount);
        this.setState({
            group_name: '',
            product_name: '',
            group_discount_rate: ''
        });
        this.props.history.push('/salesgroupspricingdiscounts');
    };

    static propTypes = {
        addSalesGroupsPricingDiscount: PropTypes.func.isRequired,

    }

    render() {
        const {
            group_name,
            product_name,
            group_discount_rate
        } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Sales Groups Pricing Discount</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="group_name"
                                onChange={this.onChange}
                                value={group_name}
                            />
                            <label htmlFor="inputtext">Group Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="product_name"
                                onChange={this.onChange}
                                value={product_name}
                            />
                            <label htmlFor="inputtext">Product Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Group Discount Rate</label>
                         <InputNumber
                            name="group_discount_rate"
                            mode="decimal"
                            onChange={this.onChange}
                            value={group_discount_rate}
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

export default connect(null, { addSalesGroupsPricingDiscount})(SalesGroupsPricingDiscountForm);
