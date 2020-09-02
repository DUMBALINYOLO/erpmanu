import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addActiveSupplier } from '..//../actions/activesuppliers';
import PropTypes from 'prop-types';
import { getSupplierStatusChoices } from '..//../actions/choices';
import { getAccounts } from '..//../actions/accounts';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';


class ActiveSupplierForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
			is_organization: false,
            is_individual: false,
			website: '',
			bp_number: '',
			email: '',
			phone: '',
            status: null,
            account: null,
            supplier_number: '',
            contact_person: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStatus = this.onStatus.bind(this);
        this.onAccount = this.onAccount.bind(this);
        this.onIsOrganization = this.onIsOrganization.bind(this);
        this.onIsIndividual = this.onIsIndividual.bind(this)
    }

    onIsOrganization() {
        this.setState({
            is_organization: !this.state.checked
        });
    }

    onIsIndividual() {
        this.setState({
            is_individual: !this.state.checked
        });
    }

    onStatus (e){
        this.setState({status: e.value})
    }

    onAccount (e){
        this.setState({account: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
            supplier_number,
            contact_person
        } = this.state;
        const activesupplier = {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
            supplier_number,
            contact_person
        };
        this.props.addActiveSupplier(activesupplier);
        this.setState({
            name: '',
			is_organization: true,
            is_individual: true,
			banking_details: '',
			website: '',
			bp_number: '',
			email: '',
			phone: '',
            status: '',
            account: '',
            supplier_number: '',
            contact_person: ''
        });
        this.props.history.push('/activesuppliers');
    };

    static propTypes = {
        addActiveSupplier: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getSupplierStatusChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAccounts()
        this.props.getSupplierStatusChoices()
    }

    render() {
        const {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
            supplier_number,
            contact_person
        } = this.state;

        const {accounts} = this.props;
        const {supplierstatuschoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Account</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="name"
                                onChange={this.onChange}
                                value={name}
                            />
                            <label htmlFor="inputtext">Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="customer_number"
                                onChange={this.onChange}
                                value={customer_number}
                            />
                            <label htmlFor="inputtext">Customer Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="website"
                                onChange={this.onChange}
                                value={website}
                            />
                            <label htmlFor="inputtext">Website</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="bp_number"
                                onChange={this.onChange}
                                value={bp_number}
                            />
                            <label htmlFor="inputtext">Bp Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                            <label htmlFor="inputtext">Email</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="phone"
                                onChange={this.onChange}
                                value={phone}
                            />
                            <label htmlFor="inputtext">Phone</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="supplier_number"
                                onChange={this.onChange}
                                value={supplier_number}
                            />
                            <label htmlFor="inputtext">Supplier Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="contact_person"
                                onChange={this.onChange}
                                value={contact_person}
                            />
                            <label htmlFor="inputtext">Contact Person</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>IS ORGANIZATION :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onIsOrganization}
                            checked={this.state.is_organization}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>IS INDIVIDUAL :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onIsIndividual}
                            checked={this.state.is_individual}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={status}
                            onChange={this.onStatus}
                            options={supplierstatuschoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT STATUS</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={account}
                            onChange={this.onAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ACCOUNT</label>
                        </span>
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
    accounts: state.accounts.accounts,
    supplierstatuschoices: state.supplierstatuschoices.supplierstatuschoices,
})

export default connect(mapStateToProps, {getAccounts, getSupplierStatusChoices, addActiveSupplier})(ActiveSupplierForm);
