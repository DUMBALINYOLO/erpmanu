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
import { getEmployeePayDeductions, addEmployeePayDeduction, editEmployeePayDeduction, deleteEmployeePayDeduction } from '..//../actions/employeepaydeductions';
import { getEmployeeAllowances } from '..//../actions/employeeallowances';
import { getEmployeePayCommissionRules } from '..//../actions/employeepaycommissionrules';
import { getEmployeePayrollTaxes } from '..//../actions/employeepayrolltaxes';
import { getAccounts } from '..//../actions/accounts';
import { getEmployeeDeductionMethods } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";

class EmployeePayDeductions extends Component {

    emptyEmployeePayDeduction = {
        deduction_method: null,
        name: '',
        tax_deductable: false,
        basic_income: false,
        hourly_income: false,
        overtime_income: false,
        benefits: null,
        commission: null,
        payroll_taxes: null,
        rate: '',
        fixed_amount: '',
        employer_contribution: '',
        liability_account: null,
        account_paid_into: null,
        archived: false
    };


    constructor() {
        super();
        this.state = {
            employeepaydeductions: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePayDeductions: null,
            employeepaydeductionDialog: false,
            deleteEmployeePayDeductionDialog: false,
            deleteEmployeePayDeductionsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                deduction_method: null,
                name: '',
                tax_deductable: false,
                basic_income: false,
                hourly_income: false,
                overtime_income: false,
                benefits: null,
                commission: null,
                payroll_taxes: null,
                rate: '',
                fixed_amount: '',
                employer_contribution: '',
                liability_account: null,
                account_paid_into: null,
                archived: false
            },
            newData: {
                deduction_method: null,
                name: '',
                tax_deductable: false,
                basic_income: false,
                hourly_income: false,
                overtime_income: false,
                benefits: null,
                commission: null,
                payroll_taxes: null,
                rate: '',
                fixed_amount: '',
                employer_contribution: '',
                liability_account: null,
                account_paid_into: null,
                archived: false
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
        this.saveEmployeePayDeduction = this.saveEmployeePayDeduction.bind(this);
        this.editEmployeePayDeduction = this.editEmployeePayDeduction.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeePayDeduction = this.confirmDeleteEmployeePayDeduction.bind(this);
        this.deleteEmployeePayDeduction = this.deleteEmployeePayDeduction.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePayDeductions = this.deleteSelectedEmployeePayDeductions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePayDeductionDialog = this.hideDeleteEmployeePayDeductionDialog.bind(this);
        this.hideDeleteEmployeePayDeductionsDialog = this.hideDeleteEmployeePayDeductionsDialog.bind(this);
        this.onDeductionMethods = this.onDeductionMethods.bind(this);
        this.onBenefits = this.onBenefits.bind(this);
        this.onCommission = this.onCommission.bind(this);
        this.onPayrollTaxes = this.onPayrollTaxes.bind(this);
        this.onLiabilityAccount = this.onLiabilityAccount.bind(this);
        this.onAccountPaidInto = this.onAccountPaidInto.bind(this);
        this.onTaxDeductable = this.onTaxDeductable.bind(this);
        this.onBasicIncome = this.onBasicIncome.bind(this);
        this.onHourlyIncome = this.onHourlyIncome.bind(this);
        this.onOvertimeIncome = this.onOvertimeIncome.bind(this);
        this.onArchived = this.onArchived.bind(this);
    }

    onTaxDeductable() {
        this.setState({
          tax_deductable: !this.state.checked
        });
    }

    onBasicIncome() {
        this.setState({
          basic_income: !this.state.checked
        });
    }

    onHourlyIncome() {
        this.setState({
          hourly_income: !this.state.checked
        });
    }

    onOvertimeIncome() {
        this.setState({
          overtime_income: !this.state.checked
        });
    }

    onArchived() {
        this.setState({
          archived: !this.state.checked
        });
    }

    onDeductionMethods (e){
        this.setState({deduction_method: e.value})
    }

    onBenefits (e){
        this.setState({benefits: e.value})
    }

    onCommission (e){
        this.setState({commission: e.value})
    }

    onPayrollTaxes (e){
        this.setState({payroll_taxes: e.value})
    }

    onLiabilityAccount (e){
        this.setState({liability_account: e.value})
    }

    onAccountPaidInto (e){
        this.setState({account_paid_into: e.value})
    }

    static propTypes = {
        employeepaydeductions : PropTypes.array.isRequired,
        getEmployeePayDeductions: PropTypes.func.isRequired,
        addEmployeePayDeduction: PropTypes.func.isRequired,
        editEmployeePayDeduction: PropTypes.func.isRequired,
        deleteEmployeePayDeduction: PropTypes.func.isRequired,
        getEmployeeAllowances: PropTypes.func.isRequired,
        getEmployeePayCommissionRules: PropTypes.func.isRequired,
        getEmployeePayrollTaxes: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getEmployeeDeductionMethods: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeePayDeductions()
        this.props.getEmployeeAllowances()
        this.props.getEmployeePayCommissionRules()
        this.props.getEmployeePayrollTaxes()
        this.props.getAccounts()
        this.props.getEmployeeDeductionMethods()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                deduction_method: null,
                name: '',
                tax_deductable: false,
                basic_income: false,
                hourly_income: false,
                overtime_income: false,
                benefits: null,
                commission: null,
                payroll_taxes: null,
                rate: '',
                fixed_amount: '',
                employer_contribution: '',
                liability_account: null,
                account_paid_into: null,
                archived: false
            },
            submitted: false,
            employeepaydeductionDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeepaydeductionDialog: false
        });
    }

    hideDeleteEmployeePayDeductionDialog() {
        this.setState({ deleteEmployeePayDeductionDialog: false });
    }

    hideDeleteEmployeePayDeductionsDialog() {
        this.setState({ deleteEmployeePayDeductionsDialog: false });
    }


    saveEmployeePayDeduction = (e) => {
        e.preventDefault();
        const {
            deduction_method,
            name,
            tax_deductable,
            basic_income,
            hourly_income,
            overtime_income,
            benefits,
            commission,
            payroll_taxes,
            rate,
            fixed_amount,
            employer_contribution,
            liability_account,
            account_paid_into,
            archived
        } = this.state;
        const employeepaydeduction = {
            deduction_method,
            name,
            tax_deductable,
            basic_income,
            hourly_income,
            overtime_income,
            benefits,
            commission,
            payroll_taxes,
            rate,
            fixed_amount,
            employer_contribution,
            liability_account,
            account_paid_into,
            archived
        };
        this.props.addEmployeePayDeduction(employeepaydeduction);
        this.setState({
            deduction_method: '',
            name: '',
            tax_deductable: true,
            basic_income: true,
            hourly_income: true,
            overtime_income: true,
            benefits: '',
            commission: '',
            payroll_taxes: '',
            rate: '',
            fixed_amount: '',
            employer_contribution: '',
            liability_account: '',
            account_paid_into: '',
            archived: true,
            employeepaydeductionDialog: false
        });
        this.props.history.push('/employeepaydeductions');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                deduction_method: null,
                name: '',
                tax_deductable: false,
                basic_income: false,
                hourly_income: false,
                overtime_income: false,
                benefits: null,
                commission: null,
                payroll_taxes: null,
                rate: '',
                fixed_amount: '',
                employer_contribution: '',
                liability_account: null,
                account_paid_into: null,
                archived: false
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


    editEmployeePayDeduction(e) {
        const errors = this.editDataValidateError();
        const {
            deduction_method,
            name,
            tax_deductable,
            basic_income,
            hourly_income,
            overtime_income,
            benefits,
            commission,
            payroll_taxes,
            rate,
            fixed_amount,
            employer_contribution,
            liability_account,
            account_paid_into,
            archived
        } = this.state.selectRow;
        const employeepaydeduction = {
            deduction_method,
            name,
            tax_deductable,
            basic_income,
            hourly_income,
            overtime_income,
            benefits,
            commission,
            payroll_taxes,
            rate,
            fixed_amount,
            employer_contribution,
            liability_account,
            account_paid_into,
            archived
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeePayDeduction(this.state.selectRow.id, employeepaydeduction);
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


    confirmDeleteEmployeePayDeduction(employeepaydeduction) {
        this.setState({
            employeepaydeduction,
            deleteEmployeePayDeductionDialog: true
        });
    }

    deleteEmployeePayDeduction() {
        this.props.deleteEmployeePayDeduction();
        this.setState({
            deleteEmployeePayDeductionDialog: false,
            employeepaydeduction: this.emptyEmployeePayDeduction
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePayDeductionsDialog: true });
    }

    deleteSelectedEmployeePayDeductions() {
        this.props.deleteEmployeePayDeduction();
        this.setState({
            deleteEmployeePayDeductionsDialog: false,
            selectedEmployeePayDeductions: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Pay Deduction</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE PAY DEDUCTION" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeePayDeduction(rowData)} />
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
        const employeepaydeductionDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePayDeduction} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeePayDeduction}/>
            </div>
        );


        const deleteEmployeePayDeductionsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayDeductionsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePayDeductions} />
            </>
        );

        const header = this.renderHeader();
        const {
          deduction_method,
          name,
          benefits,
          commission,
          payroll_taxes,
          rate,
          fixed_amount,
          employer_contribution,
          liability_account,
          account_paid_into,
        } = this.state;

        const {employeeallowances} = this.props;
        const {employeepaycommissionrules} = this.props;
        const {employeepayrolltaxes} = this.props;
        const {employeedeductionmethods} = this.props;
        const {accounts} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeepaydeductions}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeePayDeductions} onSelectionChange={e => this.setState({selectedEmployeePayDeductions: e.value})}
                        paginator rows={10} emptyMessage="No Employee Pay Deductions found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="deduction_method"
                            header="Deduction Method"
                            sortable filter
                            filterPlaceholder="Search by Deduction Method"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="rate"
                            header="Rate"
                            sortable filter
                            filterPlaceholder="Search by Rate"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="fixed_amount"
                            header="Fixed Amount"
                            sortable filter
                            filterPlaceholder="Search by Fixed Amount"
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
                        visible={this.state.employeepaydeductionDialog}
                        style={{ width: '900px' }}
                        header="Employee Pay Deduction Details"
                        modal className="p-fluid"
                        footer={employeepaydeductionDialogFooter}
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
                            <label htmlFor="inputtext">Rate</label>
                            <span className="p-float-label">
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
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Fixed Amount</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="fixed_amount"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={fixed_amount}
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
                            <label htmlFor="inputtext">Employer Contribution</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="employer_contribution"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={employer_contribution}
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
                                    value={deduction_method}
                                    onChange={this.onDeductionMethods}
                                    options={employeedeductionmethods}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="key"
                                />
                                <label htmlFor="inputtext">SELECT DEDUCTION METHOD</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={benefits}
                                    onChange={this.onBenefits}
                                    options={employeeallowances}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT BENEFITS</label>
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
                                    value={payroll_taxes}
                                    onChange={this.onPayrollTaxes}
                                    options={employeepayrolltaxes}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT PAYROLL TAXES</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={liability_account}
                                    onChange={this.onLiabilityAccount}
                                    options={accounts}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT LIABILITY ACCOUNT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <Dropdown
                                    value={account_paid_into}
                                    onChange={this.onAccountPaidInto}
                                    options={accounts}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="inputtext">SELECT ACCOUNT PAID INTO</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>TAX DEDUCTABLE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onTaxDeductable}
                                checked={this.state.tax_deductable}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>BASIC INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onBasicIncome}
                                checked={this.state.basic_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>HOURLY INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onHourlyIncome}
                                checked={this.state.hourly_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>OVERTIME INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onOvertimeIncome}
                                checked={this.state.overtime_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>ARCHIVED :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onArchived}
                                checked={this.state.archived}
                            />
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE PAY DEDUCTION"
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
                        <label htmlFor="inRate">Rate</label>
                        <InputNumber
                            id="inRate"
                            value={this.state.selectRow.rate}
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
                                    rate: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inFixedAmount">Fixed Amount</label>
                        <InputNumber
                            id="inFixedAmount"
                            value={this.state.selectRow.fixed_amount}
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
                                    fixed_amount: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inEmployerContribution">Employer Contribution</label>
                        <InputNumber
                            id="inEmployerContribution"
                            value={this.state.selectRow.employer_contribution}
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
                                    employer_contribution: e.target.value
                                }
                            })
                        }/>
                        <span className="p-float-label">
                        <Dropdown
                            id="inDeductionMethod"
                            value={this.state.selectRow.deduction_method}
                            options={employeedeductionmethods}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    deduction_method: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inBenefits"
                            value={this.state.selectRow.benefits}
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
                                    benefits: e.target.value
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
                            id="inLiabilityAccount"
                            value={this.state.selectRow.liability_account}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    liability_account: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inAccountPaidInto"
                            value={this.state.selectRow.account_paid_into}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    account_paid_into: e.target.value
                                }
                            })
                        }/>
                        </span>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>TAX DEDUCTABLE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            tax_deductable: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.tax_deductable}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>BASIC INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            basic_income: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.basic_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>HOURLY INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            hourly_income: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.hourly_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>OVERTIME INCOME :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            overtime_income: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.overtime_income}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>ARCHIVED :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            archived: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.archived}
                            />
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeePayDeductionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayDeductionsDialogFooter} onHide={this.hideDeleteEmployeePayDeductionsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeepaydeduction && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeepaydeductions: state.employeepaydeductions.employeepaydeductions,
    employeeallowances: state.employeeallowances.employeeallowances,
    employeepaycommissionrules: state.employeepaycommissionrules.employeepaycommissionrules,
    employeepayrolltaxes: state.employeepayrolltaxes.employeepayrolltaxes,
    employeedeductionmethods: state.employeedeductionmethods.employeedeductionmethods,
    accounts: state.accounts.accounts,
})

export default connect(mapStateToProps, {
    getEmployeePayDeductions,
    getEmployeeAllowances,
    getEmployeePayCommissionRules,
    getEmployeePayrollTaxes,
    getAccounts,
    getEmployeeDeductionMethods,
    editEmployeePayDeduction,
    deleteEmployeePayDeduction,
    addEmployeePayDeduction} ) (EmployeePayDeductions);
