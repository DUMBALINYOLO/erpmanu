import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAccountingConfiguration } from '..//../actions/accountingconfigurations';
import PropTypes from 'prop-types';
import { getAccountingPeriodsChoices } from '..//../actions/choices';
import { getCurrencies } from '..//../actions/currencies';
import { getEmployees } from '..//../actions/employees';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';

class AccountingConfigurationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            start_of_financial_year: '',
            default_accounting_period: null,
            default_bookkeeper: null,
            equipment_capitalization_limit: '',
            is_configured: false,
            active_currency: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onDefaultBookkeeper = this.onDefaultBookkeeper.bind(this);
        this.onActiveCurrency = this.onActiveCurrency.bind(this);
        this.onIsConfigured = this.onIsConfigured.bind(this);
    }

    onIsConfigured() {
        this.setState({
            is_configured: !this.state.checked
        });
    }

    onTypeChange (e){
        this.setState({default_accounting_period: e.value})
    }

    onDefaultBookkeeper (e){
        this.setState({default_bookkeeper: e.value})
    }

    onActiveCurrency (e){
        this.setState({active_currency: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            start_of_financial_year,
            default_accounting_period,
            default_bookkeeper,
            equipment_capitalization_limit,
            is_configured,
            active_currency
        } = this.state;
        const accountingconfiguration = {
            start_of_financial_year,
            default_accounting_period,
            default_bookkeeper,
            equipment_capitalization_limit,
            is_configured,
            active_currency
        };
        this.props.addAccountingConfiguration(accountingconfiguration);
        this.setState({
            start_of_financial_year: '',
            default_accounting_period: '',
            default_bookkeeper: '',
            equipment_capitalization_limit: '',
            is_configured: true,
            active_currency: ''
        });
    };

    static propTypes = {
        addAccountingConfiguration: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getAccountingPeriodsChoices: PropTypes.func.isRequired,
        getCurrencies: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getEmployees()
        this.props.getAccountingPeriodsChoices()
        this.props.getCurrencies()
    }

    render() {
        const {
            start_of_financial_year,
            default_accounting_period,
            default_bookkeeper,
            equipment_capitalization_limit,
            is_configured,
            active_currency
        } = this.state;

        const {accountingperiodschoices} = this.props;
        const {employees} = this.props;
        const {currencies} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Accounting Configuration</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label>Equipment Capitalization Limit</label>
                         <InputNumber
                            name="equipment_capitalization_limit"
                            mode="decimal"
                            onChange={this.onChange}
                            value={equipment_capitalization_limit}
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
                            name="start_of_financial_year"
                            onChange={this.onChange}
                            value={start_of_financial_year}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Start Of Financial Year</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>IS CONFIGURED :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onIsConfigured}
                            checked={this.state.is_configured}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={default_accounting_period}
                            onChange={this.onTypeChange}
                            options={accountingperiodschoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT DEFAULT ACCOUNTING PERIOD</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={default_bookkeeper}
                            onChange={this.onDefaultBookkeeper}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT DEFAULT BOOKKEEPER</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={active_currency}
                            onChange={this.onActiveCurrency}
                            options={currencies}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ACTIVE CURRENCIES</label>
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
    accountingperiodschoices: state.accountingperiodschoices.accountingperiodschoices,
    currencies: state.currencies.currencies,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {getEmployees, getAccountingPeriodsChoices, getCurrencies, addAccountingConfiguration})(AccountingConfigurationForm);
