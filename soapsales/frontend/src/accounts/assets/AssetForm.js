import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAsset } from '..//../actions/assets';
import PropTypes from 'prop-types';
import { getAssetTypesChoices, getAssetsDepriciationMethodChoices } from '..//../actions/choices';
import { getJournals } from '..//../actions/journals';
import { getEmployees } from '..//../actions/employees';
import { getAccounts } from '..//../actions/accounts';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Calendar} from "primereact/calendar";

class AssetForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            category: null,
            initial_value: '',
            credit_account: null,
            depreciation_period: '',
            init_date: '',
            depreciation_method: null,
            salvage_value: '',
            created_by: null,
            entry: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onCreditAccount = this.onCreditAccount.bind(this);
        this.onDepreciationMethod = this.onDepreciationMethod.bind(this);
        this.onCreatedBy = this.onCreatedBy.bind(this);
        this.onEntry = this.onEntry.bind(this);
    }

    onCategory (e){
        this.setState({category: e.value})
    }

    onCreditAccount (e){
        this.setState({credit_account: e.value})
    }

    onDepreciationMethod (e){
        this.setState({depreciation_method: e.value})
    }

    onCreatedBy (e){
        this.setState({created_by: e.value})
    }

    onEntry (e){
        this.setState({entry: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        } = this.state;
        const asset = {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        };
        this.props.addAsset(asset);
        this.setState({
            name: '',
            description: '',
            category: '',
            initial_value: '',
            credit_account: '',
            depreciation_period: '',
            init_date: '',
            depreciation_method: '',
            salvage_value: '',
            created_by: '',
            entry: ''
        });
        this.props.history.push('/assets');
    };

    static propTypes = {
        addAsset: PropTypes.func.isRequired,
        getAssetTypesChoices: PropTypes.func.isRequired,
        getAssetsDepriciationMethodChoices: PropTypes.func.isRequired,
        getJournals: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired

    }

    componentDidMount() {
        this.props.getAssetTypesChoices()
        this.props.getAssetsDepriciationMethodChoices()
        this.props.getJournals()
        this.props.getEmployees()
        this.props.getAccounts()
    }

    render() {
        const {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        } = this.state;

        const { assettypeschoices } = this.props;
        const { assetsdepriciationmethodchoices } = this.props;
        const { journals } = this.props;
        const { employees } = this.props;
        const { accounts } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Asset</h2>
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
                        <label>Initial Value</label>
                         <InputNumber
                            name="initial_value"
                            mode="decimal"
                            onChange={this.onChange}
                            value={initial_value}
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
                        <label>Depreciation Period</label>
                         <InputNumber
                            name="depreciation_period"
                            mode="decimal"
                            onChange={this.onChange}
                            value={depreciation_period}
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
                        <label>Salvage Value</label>
                         <InputNumber
                            name="salvage_value"
                            mode="decimal"
                            onChange={this.onChange}
                            value={salvage_value}
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
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="init_date"
                            onChange={this.onChange}
                            value={init_date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Init Date</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputTextarea
                                name="description"
                                onChange={this.onChange}
                                value={description}
                            />
                            <label htmlFor="inputtext">Description</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={category}
                            onChange={this.onCategory}
                            options={assettypeschoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT CATEGORY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={credit_account}
                            onChange={this.onCreditAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT CREDIT ACCOUNT</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={depreciation_method}
                            onChange={this.onDepreciationMethod}
                            options={assetsdepriciationmethodchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT DEPRECIATION METHOD</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={created_by}
                            onChange={this.onCreatedBy}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT CREATED BY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={entry}
                            onChange={this.onEntry}
                            options={journals}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ENTRY</label>
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
    assettypeschoices: state.assettypeschoices.assettypeschoices,
    assetsdepriciationmethodchoices: state.assetsdepriciationmethodchoices.assetsdepriciationmethodchoices,
    journals: state.journals.journals,
    employees: state.employees.employees,
    accounts: state.accounts.accounts,
})

export default connect(mapStateToProps, {getAssetTypesChoices, getAssetsDepriciationMethodChoices, getJournals, getEmployees, getAccounts, addAsset})(AssetForm);
