import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAccountingAdjustment } from '..//../actions/accountingadjustments';
import { getJournals } from '..//../actions/journals';
import { getEmployees } from '..//../actions/employees';
import { getWorkbooks } from '..//../actions/workbooks';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";


class AccountingAdjustmentsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            entry: null,
			adjusting_entry: null,
			workbook: null,
			description: '',
			created_by: null,
			date_created: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEntry = this.onEntry.bind(this);
        this.onAdjustingEntry = this.onAdjustingEntry.bind(this);
        this.onWorkbook = this.onWorkbook.bind(this);
        this.onCreatedBy = this.onCreatedBy.bind(this);
    }

    onEntry (e){
        this.setState({entry: e.value})
    }

    onAdjustingEntry (e){
        this.setState({adjusting_entry: e.value})
    }

    onWorkbook (e){
        this.setState({workbook: e.value})
    }

    onCreatedBy (e){
        this.setState({created_by: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        } = this.state;
        const accountingadjustment  = {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        };
        this.props.addAccountingAdjustment( accountingadjustment );
        this.setState({
            entry: '',
			adjusting_entry: '',
			workbook: '',
			description: '',
			created_by: '',
			date_created: ''
        });
        this.props.history.push('/accountingadjustments');
    };

    static propTypes = {
        addAccountingAdjustment: PropTypes.func.isRequired,
        getJournals: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getWorkbooks: PropTypes.func.isRequired

    }

    componentDidMount() {
        this.props.getJournals()
        this.props.getEmployees()
        this.props.getWorkbooks()
    }

    render() {
        const {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        } = this.state;

        const {journals} = this.props;
        const {workbooks} = this.props;
        const {employees} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Accounting Adjustment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="date_created"
                            onChange={this.onChange}
                            value={date_created}
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
                        <span className="p-float-label">
                        <Dropdown
                            value={adjusting_entry}
                            onChange={this.onAdjustingEntry}
                            options={journals}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ADJUSTING ENTRY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={workbook}
                            onChange={this.onWorkbook}
                            options={workbooks}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT WORKBOOK</label>
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
                        <Button label="Submit" className="p-button-success p-button-rounded" />
                    </div>
                </div>
             </form>
         </div>
        );
    }
}


const mapStateToProps = state =>({
    journals: state.journals.journals,
    workbooks: state.workbooks.workbooks,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {getEmployees, getJournals, getWorkbooks, addAccountingAdjustment})(AccountingAdjustmentsForm);
