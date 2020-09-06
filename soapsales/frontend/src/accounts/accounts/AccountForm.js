import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAccount, getAccounts } from '..//../actions/accounts';
import PropTypes from 'prop-types';
import { getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {InputNumber} from 'primereact/inputnumber';


class AccountForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            balance: '',
            type: null,
            description: '',
            bank_account: false,
            control_account: false,
            parent_account: null,
            balance_sheet_category: null,
           active: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onParentAccount = this.onParentAccount.bind(this);
        this.onBalanceSheetCategory = this.onBalanceSheetCategory.bind(this);
        this.onControlAccount = this.onControlAccount.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onBankAccount = this.onBankAccount.bind(this)
    }

    onBankAccount() {
        this.setState({
            bank_account: !this.state.checked
        });
    }

    onControlAccount() {
        this.setState({
            control_account: !this.state.checked
        });
    }

    onActive() {
        this.setState({
            active: !this.state.checked
        });
    }

    onTypeChange (e){
        this.setState({type: e.value})
    }

    onParentAccount (e){
        this.setState({parent_account: e.value})
    }

    onBalanceSheetCategory (e){
        this.setState({balance_sheet_category: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            bank_account
        } = this.state;
        const account = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            bank_account
        };
        this.props.addAccount(account);
        this.setState({
            name: '',
            balance: '',
            type: '',
            description: '',
            control_account: true,
            parent_account: '',
            balance_sheet_category: '',
            active: true,
            bank_account: true
        });
        this.props.history.push('/accounts');
    };

    static propTypes = {
        addAccount: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getAccountTypeChoices: PropTypes.func.isRequired,
        getAccountBalanceSheetCategoriesChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAccounts()
        this.props.getAccountTypeChoices()
        this.props.getAccountBalanceSheetCategoriesChoices()
    }

    render() {
        const {
            name,
            balance,
            type,
            description,
            parent_account,
            balance_sheet_category,
        } = this.state;

        const { accounts } = this.props;
        const { accounttypechoices } = this.props;
        const {accountbalancesheetcategorieschoices} = this.props;

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
                        <label>Balance</label>
                        <InputNumber
                            name="balance"
                            mode="decimal"
                            onChange={this.onChange}
                            value={balance}
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                        />
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
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>BANK ACCOUNT :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onBankAccount}
                            checked={this.state.bank_account}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>CONTROL ACCOUT :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onControlAccount}
                            checked={this.state.control_account}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>ACTIVE :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onActive}
                            checked={this.state.active}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={type}
                            onChange={this.onType}
                            options={accounttypechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT TYPE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={balance_sheet_category}
                            onChange={this.onBalanceSheetCategory}
                            options={accountbalancesheetcategorieschoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT BALANCE SHEET CATEGORY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={parent_account}
                            onChange={this.onParentAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT CATEGORY</label>
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
    accounttypechoices: state.accounttypechoices.accounttypechoices,
    accountbalancesheetcategorieschoices: state.accountbalancesheetcategorieschoices.accountbalancesheetcategorieschoices
})

export default connect(mapStateToProps, {getAccounts, getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices, addAccount})(AccountForm);
