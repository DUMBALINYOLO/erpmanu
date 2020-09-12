import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component, Fragment } from 'react';
import {Growl} from 'primereact/growl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {ProgressBar} from 'primereact/progressbar';
import { getEmployeePaygrades, addEmployeePaygrade, editEmployeePaygrade, deleteEmployeePaygrade } from '..//../actions/employeepaygrades';
import { getEmployeePayCommissionRules } from '..//../actions/employeepaycommissionrules';
import { getEmployeeAllowances } from '..//../actions/employeeallowances';
import { getEmployeePayDeductions } from '..//../actions/employeepaydeductions';
import { getEmployeePayrollTaxes } from '..//../actions/employeepayrolltaxes';
import { getEmployeePayFrequencies, getEmployeeLunchChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";

class EmployeePaygrades extends Component {

    emptyEmployeePaygrade = {
        name: '',
        salary: '',
        pay_frequency: null,
        monthly_leave_days: '',
        hourly_rate: '',
        overtime_rate: '',
        overtime_two_rate: '',
        commission: null,
        allowances: null,
        deductions: null,
        payroll_taxes: null,
        subtract_lunch_time_from_working_hours: false,
        lunch_duration: null,
        maximum_leave_days: '',
    };


    constructor() {
        super();
        this.state = {
            employeepaygrades: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePaygrades: null,
            employeepaygradeDialog: false,
            deleteEmployeePaygradeDialog: false,
            deleteEmployeePaygradesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                salary: '',
                pay_frequency: null,
                monthly_leave_days: '',
                hourly_rate: '',
                overtime_rate: '',
                overtime_two_rate: '',
                commission: null,
                allowances: null,
                deductions: null,
                payroll_taxes: null,
                subtract_lunch_time_from_working_hours: false,
                lunch_duration: null,
                maximum_leave_days: '',
            },
            newData: {
                name: '',
                salary: '',
                pay_frequency: null,
                monthly_leave_days: '',
                hourly_rate: '',
                overtime_rate: '',
                overtime_two_rate: '',
                commission: null,
                allowances: null,
                deductions: null,
                payroll_taxes: null,
                subtract_lunch_time_from_working_hours: false,
                lunch_duration: null,
                maximum_leave_days: '',
            },
            submitted: false,
        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this)
        this.onDateFilterChange = this.onDateFilterChange.bind(this)
        this.formatDate = this.formatDate.bind(this)

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveEmployeePaygrade = this.saveEmployeePaygrade.bind(this);
        this.editEmployeePaygrade = this.editEmployeePaygrade.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeePaygrade = this.confirmDeleteEmployeePaygrade.bind(this);
        this.deleteEmployeePaygrade = this.deleteEmployeePaygrade.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePaygrades = this.deleteSelectedEmployeePaygrades.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePaygradeDialog = this.hideDeleteEmployeePaygradeDialog.bind(this);
        this.hideDeleteEmployeePaygradesDialog = this.hideDeleteEmployeePaygradesDialog.bind(this);
        this.onPayFrequency = this.onPayFrequency.bind(this);
        this.onCommission = this.onCommission.bind(this);
        this.onAllowances = this.onAllowances.bind(this);
        this.onDeductions = this.onDeductions.bind(this);
        this.onPayrollTaxes = this.onPayrollTaxes.bind(this);
        this.onLunchDuration = this.onLunchDuration.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck() {
        this.setState({
          subtract_lunch_time_from_working_hours: !this.state.checked
        });
    }

    onPayFrequency (e){
        this.setState({pay_frequency: e.value})
    }

    onCommission (e){
        this.setState({commission: e.value})
    }

    onAllowances (e){
        this.setState({allowances: e.value})
    }

    onDeductions (e){
        this.setState({deductions: e.value})
    }

    onPayrollTaxes (e){
        this.setState({payroll_taxes: e.value})
    }

    onLunchDuration (e){
        this.setState({lunch_duration: e.value})
    }

    static propTypes = {
        employeepaygrades : PropTypes.array.isRequired,
        getEmployeePaygrades: PropTypes.func.isRequired,
        addEmployeePaygrade: PropTypes.func.isRequired,
        editEmployeePaygrade: PropTypes.func.isRequired,
        deleteEmployeePaygrade: PropTypes.func.isRequired,
        getEmployeePayCommissionRules: PropTypes.func.isRequired,
        getEmployeeAllowances: PropTypes.func.isRequired,
        getEmployeePayDeductions: PropTypes.func.isRequired,
        getEmployeePayrollTaxes: PropTypes.func.isRequired,
        getEmployeePayFrequencies: PropTypes.func.isRequired,
        getEmployeeLunchChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeePaygrades()
        this.props.getEmployeePayCommissionRules()
        this.props.getEmployeeAllowances()
        this.props.getEmployeePayDeductions()
        this.props.getEmployeePayrollTaxes()
        this.props.getEmployeePayFrequencies()
        this.props.getEmployeeLunchChoices()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                salary: '',
                pay_frequency: null,
                monthly_leave_days: '',
                hourly_rate: '',
                overtime_rate: '',
                overtime_two_rate: '',
                commission: null,
                allowances: null,
                deductions: null,
                payroll_taxes: null,
                subtract_lunch_time_from_working_hours: false,
                lunch_duration: null,
                maximum_leave_days: '',
            },
            submitted: false,
            employeepaygradeDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeepaygradeDialog: false
        });
    }

    hideDeleteEmployeePaygradeDialog() {
        this.setState({ deleteEmployeePaygradeDialog: false });
    }

    hideDeleteEmployeePaygradesDialog() {
        this.setState({ deleteEmployeePaygradesDialog: false });
    }


    saveEmployeePaygrade = (e) => {
        e.preventDefault();
        const {
            name,
            salary,
            pay_frequency,
            monthly_leave_days,
            hourly_rate,
            overtime_rate,
            overtime_two_rate,
            commission,
            allowances,
            deductions,
            payroll_taxes,
            subtract_lunch_time_from_working_hours,
            lunch_duration,
            maximum_leave_days,
        } = this.state;
        const employeepaygrade = {
            name,
            salary,
            pay_frequency,
            monthly_leave_days,
            hourly_rate,
            overtime_rate,
            overtime_two_rate,
            commission,
            allowances,
            deductions,
            payroll_taxes,
            subtract_lunch_time_from_working_hours,
            lunch_duration,
            maximum_leave_days,
        };
        this.props.addEmployeePaygrade(employeepaygrade);
        this.setState({
            name: '',
            salary: '',
            pay_frequency: '',
            monthly_leave_days: '',
            hourly_rate: '',
            overtime_rate: '',
            overtime_two_rate: '',
            commission: '',
            allowances: '',
            deductions: '',
            payroll_taxes: '',
            subtract_lunch_time_from_working_hours: true,
            lunch_duration: '',
            maximum_leave_days: '',
            employeepaygradeDialog: false
        });
        this.props.history.push('/employeepaygrades');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                salary: '',
                pay_frequency: null,
                monthly_leave_days: '',
                hourly_rate: '',
                overtime_rate: '',
                overtime_two_rate: '',
                commission: null,
                allowances: null,
                deductions: null,
                payroll_taxes: null,
                subtract_lunch_time_from_working_hours: false,
                lunch_duration: null,
                maximum_leave_days: '',
            }
        });
    }

    //Edit Dialog
    onOpenEditDialog(event, rowData) {
        this.setState({
            visibleEditDialog: true,
            selectRow: rowData
        });
    }


    editEmployeePaygrade(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            salary,
            pay_frequency,
            monthly_leave_days,
            hourly_rate,
            overtime_rate,
            overtime_two_rate,
            commission,
            allowances,
            deductions,
            payroll_taxes,
            subtract_lunch_time_from_working_hours,
            lunch_duration,
            maximum_leave_days,
        } = this.state.selectRow;
        const employeepaygrade = {
            name,
            salary,
            pay_frequency,
            monthly_leave_days,
            hourly_rate,
            overtime_rate,
            overtime_two_rate,
            commission,
            allowances,
            deductions,
            payroll_taxes,
            subtract_lunch_time_from_working_hours,
            lunch_duration,
            maximum_leave_days,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeePaygrade(this.state.selectRow.id, employeepaygrade);
            this.onHideEditDialog(e);
            this.growl.show({severity: 'success', summary: 'Succesfully', detail: 'Edited'});
        }
    }


    editDataValidateError() {
        const errorList = [];
        if (!this.state.selectRow.name) {
            errorList.push({
                severity: 'error',
                summary: 'cant be left blank!',
                detail: 'Add'
            });
        }
        return errorList;
    }


    confirmDeleteEmployeePaygrade(employeepaygrade) {
        this.setState({
            employeepaygrade,
            deleteEmployeePaygradeDialog: true
        });
    }

    deleteEmployeePaygrade() {
        this.props.deleteEmployeePaygrade();
        this.setState({
            deleteEmployeePaygradeDialog: false,
            employeepaygrade: this.emptyEmployeePaygrade
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePaygradesDialog: true });
    }

    deleteSelectedEmployeePaygrades() {
        this.props.deleteEmployeePaygrade();
        this.setState({
            deleteEmployeePaygradesDialog: false,
            selectedEmployeePaygrades: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Paygrade</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE PAYGRADE" className="p-button-success p-mr-2" onClick={this.openNew} />
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-pdf" iconPos="right" label="EXPORT TO PDF" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-print" iconPos="right" label="PRINT" onClick={this.export}></Button></div>
                    <InputText className="fancy-icon" type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" />
                </div>
            </div>
        );
    }


    activityBodyTemplate(rowData) {
        return <ProgressBar value={rowData.activity} showValue={false} />;
    }

    actionBodyTemplate(rowData) {
        return (
            <>
                <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-success"
                    style={{marginRight: '.5em', fontSize: '12px'}}
                    onClick={(e) => {
                        this.onOpenEditDialog(e, rowData);
                    }}>
                </Button>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeePaygrade(rowData)} />
            </>
        );
    }


    renderDateFilter() {
        return (
            <Calendar value={this.state.dateFilter} onChange={this.onDateFilterChange} placeholder="Registration Date" dateFormat="yy-mm-dd" className="p-column-filter" />
        );
    }

    onDateFilterChange(event) {
        if (event.value !== null)
            this.dt.filter(this.formatDate(event.value), 'date', 'equals');
        else
            this.dt.filter(null, 'date', 'equals');

        this.setState({dateFilter: event.value});
    }

    filterDate(value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value === this.formatDate(filter);
    }

    export() {
        this.dt.exportCSV();
    }

    formatDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }


    render() {
        const employeepaygradeDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePaygrade} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeePaygrade}/>
            </div>
        );


        const deleteEmployeePaygradesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePaygradesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePaygrades} />
            </>
        );

        const header = this.renderHeader();
        const {
          name,
          salary,
          pay_frequency,
          monthly_leave_days,
          hourly_rate,
          overtime_rate,
          overtime_two_rate,
          commission,
          allowances,
          deductions,
          payroll_taxes,
          lunch_duration,
          maximum_leave_days,
        } = this.state;

        const {employeepaycommissionrules} = this.props;
        const {employeeallowances} = this.props;
        const {employeepaydeductions} = this.props;
        const {employeepayrolltaxes} = this.props;
        const {employeepayfrequencies} = this.props;
        const {employeelunchchoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeepaygrades}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeePaygrades} onSelectionChange={e => this.setState({selectedEmployeePaygrades: e.value})}
                        paginator rows={10} emptyMessage="No Employee Paygrades found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column
                            className="table-field"
                            selectionMode="multiple"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="id" header="ID"
                            sortable filter
                            filterPlaceholder="Search by ID"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="name"
                            header="Name"
                            sortable filter
                            filterPlaceholder="Search by Name"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="salary"
                            header="Salary"
                            sortable filter
                            filterPlaceholder="Search by Salary"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="reference_number"
                            header="Reference Number"
                            sortable filter
                            filterPlaceholder="Search by Reference Number"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="pay_frequency"
                            header="Pay Frequency"
                            sortable filter
                            filterPlaceholder="Search by Pay Frequency"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="lunch_duration"
                            header="Lunch Duration"
                            sortable filter
                            filterPlaceholder="Search by Lunch Duration"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            header="EDIT"
                            body={this.actionBodyTemplate}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>
                    <Dialog
                        visible={this.state.employeepaygradeDialog}
                        style={{ width: '900px' }}
                        header="Employee Paygrade Details"
                        modal className="p-fluid"
                        footer={employeepaygradeDialogFooter}
                        onHide={this.hideDialog}
                    >
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
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Salary</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="salary"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={salary}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Monthly Leave Days</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="monthly_leave_days"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={monthly_leave_days}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Hourly Rate</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="hourly_rate"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={hourly_rate}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Overtime Rate</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="overtime_rate"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={overtime_rate}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Overtime Two Rate</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="overtime_two_rate"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={overtime_two_rate}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Maximum Leave Days</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="maximum_leave_days"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={maximum_leave_days}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={pay_frequency}
                                    onChange={this.onPayFrequency}
                                    options={employeepayfrequencies}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="key"
                                />
                                <label htmlFor="inputtext">SELECT PAY FREQUENCY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={commission}
                                    onChange={this.onCommission}
                                    options={employeepaycommissionrules}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT COMMISSION</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={allowances}
                                    onChange={this.onAllowances}
                                    options={employeeallowances}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT ALLOWANCES</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={deductions}
                                    onChange={this.onDeductions}
                                    options={employeepaydeductions}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT DEDUCTIONS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={payroll_taxes}
                                    onChange={this.onPayrollTaxes}
                                    options={employeepayrolltaxes}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT PAYROLL TAX</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={lunch_duration}
                                    onChange={this.onLunchDuration}
                                    options={employeelunchchoices}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="key"
                                />
                                <label htmlFor="inputtext">SELECT LUNCH DURATION</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>SUBSTRACT LUNCH TIME FROM WORKING HOURS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onCheck}
                                checked={this.state.subtract_lunch_time_from_working_hours}
                            />
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE PAYGRADE"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                name: e.target.value
                                            }
                                        })
                                    }
                                    id="inName"
                                    value={this.state.selectRow.name}
                                />
                            </span>
                        </div>
                        <label htmlFor="inSalary">Salary</label>
                        <InputNumber
                            id="inRate"
                            value={this.state.selectRow.salary}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    salary: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inMonthlyLeaveDays">Monthly Leave Days</label>
                        <InputNumber
                            id="inMonthlyLeaveDays"
                            value={this.state.selectRow.monthly_leave_days}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    monthly_leave_days: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inHourlyRate">Hourly Rate</label>
                        <InputNumber
                            id="inHourlyRate"
                            value={this.state.selectRow.hourly_rate}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    hourly_rate: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inOvertimeRate">Overtime Rate</label>
                        <InputNumber
                            id="inOvertimeRate"
                            value={this.state.selectRow.overtime_rate}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    overtime_rate: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inOvertimeTwoRate">Overtime Two Rate</label>
                        <InputNumber
                            id="inOvertimeTwoRate"
                            value={this.state.selectRow.overtime_two_rate}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    overtime_two_rate: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inMaximumLeaveDays">Maximum Leave Days</label>
                        <InputNumber
                            id="inMaximumLeaveDays"
                            value={this.state.selectRow.maximum_leave_days}
                            style={{marginLeft: '.5em'}}
                            mode="decimal"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger"
                            incrementButtonClassName="p-button-success"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            step={1}
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    maximum_leave_days: e.target.value
                                }
                            })
                        }/>
                        <span className="p-float-label">
                        <Dropdown
                            id="inPayFrequency"
                            value={this.state.selectRow.pay_frequency}
                            options={employeepayfrequencies}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    pay_frequency: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inAllowances"
                            value={this.state.selectRow.allowances}
                            options={employeeallowances}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    allowances: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inCommission"
                            value={this.state.selectRow.commission}
                            options={employeepaycommissionrules}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    commission: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inDeductions"
                            value={this.state.selectRow.deductions}
                            options={employeepaydeductions}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    deductions: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inPayrollTaxes"
                            value={this.state.selectRow.payroll_taxes}
                            options={employeepayrolltaxes}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    payroll_taxes: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inLunchDuration"
                            value={this.state.selectRow.lunch_duration}
                            options={employeelunchchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    lunch_duration: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>SUBSTRACT LUNCH TIME FROM WORKING HOURS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            subtract_lunch_time_from_working_hours: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.subtract_lunch_time_from_working_hours}
                            />
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeePaygradesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePaygradesDialogFooter} onHide={this.hideDeleteEmployeePaygradesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeepaygrade && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeepaygrades: state.employeepaygrades.employeepaygrades,
    employeepaycommissionrules: state.employeepaycommissionrules.employeepaycommissionrules,
    employeeallowances: state.employeeallowances.employeeallowances,
    employeepaydeductions: state.employeepaydeductions.employeepaydeductions,
    employeepayrolltaxes: state.employeepayrolltaxes.employeepayrolltaxes,
    employeepayfrequencies: state.employeepayfrequencies.employeepayfrequencies,
    employeelunchchoices: state.employeelunchchoices.employeelunchchoices,
})

export default connect(mapStateToProps, {
    getEmployeePaygrades,
    getEmployeePayCommissionRules,
    getEmployeeAllowances,
    getEmployeePayDeductions,
    getEmployeePayrollTaxes,
    getEmployeePayFrequencies,
    getEmployeeLunchChoices,
    editEmployeePaygrade,
    deleteEmployeePaygrade,
    addEmployeePaygrade} ) (EmployeePaygrades);
