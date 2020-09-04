import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInterestBearingAccount } from '..//../actions/interestbearingaccounts';
import { getAccounts } from '..//../actions/accounts';
import PropTypes from 'prop-types';
import { getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices, getInterestIntervalAccountChoices, getAccountInterestMethodChoices } from '..//../actions/choices';
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
import {Calendar} from "primereact/calendar";

class InterestBearingAccountForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            balance: '',
            type: null,
            description: '',
            control_account: false,
            parent_account: null,
            balance_sheet_category: null,
            active: false,
            interest_rate: '',
            interest_interval: null,
            interest_method: null,
            last_interest_earned_date: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onParentAccount = this.onParentAccount.bind(this);
        this.onBalanceSheetCategory = this.onBalanceSheetCategory.bind(this);
        this.onControlAccount = this.onControlAccount.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onInterestInterval = this.onInterestInterval.bind(this);
        this.onInterestMethod = this.onInterestMethod.bind(this)
    }

    onControlAccount() {
        this.setState({
            control_account: !this.state.checked
        });
    }

    onActive() {
        this.setState({
            is_active: !this.state.checked
        });
    }

    onTypeChange (e){
        this.setState({type: e.value})
    }

    onInterestInterval (e){
        this.setState({interest_interval: e.value})
    }

    onInterestMethod (e){
        this.setState({interest_method: e.value})
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
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date,
        } = this.state;
        const interestbearingaccount = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date
        };
        this.props.addInterestBearingAccount(interestbearingaccount);
        this.setState({
            name: '',
            balance: '',
            type: '',
            description: '',
            control_account: true,
            parent_account: '',
            balance_sheet_category: '',
            active: true,
            interest_rate: '',
            interest_interval: '',
            interest_method: '',
            last_interest_earned_date: ''
        });
        this.props.history.push('/interestbearingaccounts');
    };

    static propTypes = {
        addInterestBearingAccount: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getAccountTypeChoices: PropTypes.func.isRequired,
        getAccountBalanceSheetCategoriesChoices: PropTypes.func.isRequired,
        getInterestIntervalAccountChoices: PropTypes.func.isRequired,
        getAccountInterestMethodChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAccounts()
        this.props.getAccountTypeChoices()
        this.props.getAccountBalanceSheetCategoriesChoices()
        this.props.getInterestIntervalAccountChoices()
        this.props.getAccountInterestMethodChoices()
    }

    render() {
        const {
            name,
            balance,
            type,
            description,
            parent_account,
            balance_sheet_category,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date
        } = this.state;

        const {accounts} = this.props;
        const {accounttypechoices} = this.props;
        const {accountbalancesheetcategorieschoices} = this.props;
        const {interestintervalaccountchoices} = this.props;
        const {accountinterestmethodchoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Interest Bearing Account</h2>
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
                    <div className="p-field p-col-12 p-md-6">
                        <label>Interest Rate</label>
                         <InputNumber
                            name="interest_rate"
                            mode="decimal"
                            onChange={this.onChange}
                            value={interest_rate}
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
                            name="last_interest_earned_date"
                            onChange={this.onChange}
                            value={last_interest_earned_date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Last Interest Earned Date</label>
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

                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>ACTIVE :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onActive}
                            checked={this.state.active}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>CONTROL ACCOUNT :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onControlAccount}
                            checked={this.state.control_account}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={type}
                            onChange={this.onTypeChange}
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
                            value={parent_account}
                            onChange={this.onParentAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT PARENT ACCOUNT</label>
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
                            value={interest_interval}
                            onChange={this.onInterestInterval}
                            options={interestintervalaccountchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT INTEREST INTERVAL</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={interest_method}
                            onChange={this.onInterestMethod}
                            options={accountinterestmethodchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT INTEREST METHOD</label>
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
    interestintervalaccountchoices: state.interestintervalaccountchoices.interestintervalaccountchoices,
    accountinterestmethodchoices: state.accountinterestmethodchoices.accountinterestmethodchoices,
    accounttypechoices: state.accounttypechoices.accounttypechoices,
    accountbalancesheetcategorieschoices: state.accountbalancesheetcategorieschoices.accountbalancesheetcategorieschoices
})

export default connect(mapStateToProps, {getAccounts, getAccountTypeChoices, getInterestIntervalAccountChoices, getAccountInterestMethodChoices, getAccountBalanceSheetCategoriesChoices, addInterestBearingAccount})(InterestBearingAccountForm);
