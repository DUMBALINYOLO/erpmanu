import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAccount } from '..//../actions/accounts';
import PropTypes from 'prop-types';
import { accounttypesURL } from '../../constants';
import { getAccountTypes} from '..//../actions/accounttypes';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';


class AccountForm extends Component{
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
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onParentAccount = this.onParentAccount.bind(this);
        this.onBalanceSheetCategory = this.onBalanceSheetCategory.bind(this);
        this.onControlAccount = this.onControlAccount.bind(this);
        this.onActive = this.onActive.bind(this)
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
        });
        this.props.history.push('/accounts');
    };

    static propTypes = {
        addAccount: PropTypes.func.isRequired,
        getAccountTypes: PropTypes.func.isRequired,

    }

    componentDidMount() {
      this.props.getAccountTypes()
    }

    render() {
        const {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
        } = this.state;

        const { inputValue } = this.state;

        const {accounttypes} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add An Account</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Name</label>
                    <InputText
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-6">
                    <label>Initial-Balance</label>
                    <InputText
                      className="form-control"
                      type="number"
                      name="initial_balance"
                      onChange={this.onChange}
                      value={initial_balance}
                    />
                  </div>


                  <div className="p-field p-col-12 p-md-12">
                    <label>Description</label>
                    <InputTextarea
                      row="3"
                      className="form-control"
                      type="text"
                      name="description"
                      onChange={this.onChange}
                      value={description}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>IS CONTRA :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onContra}
                      checked={this.state.is_contra}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>IS ACTIVE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onActive}
                      checked={this.state.is_active}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Order</label>
                    <InputText
                      className="form-control"
                      type="number"
                      name="order"
                      onChange={this.onChange}
                      value={order}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown
                      placeholder ="SELECT ACCOUNT TYPE"
                      value={account_type}
                      onChange={this.onTypeChange}
                      options={accounttypes}
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
    accounttypes: state.accounttypes.accounttypes
})

export default connect(mapStateToProps, {getAccountTypes, addAccount})(AccountForm);
