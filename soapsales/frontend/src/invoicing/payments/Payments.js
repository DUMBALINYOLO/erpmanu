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
import { FileUpload } from 'primereact/fileupload';
import {Calendar} from 'primereact/calendar';
import {ProgressBar} from 'primereact/progressbar';
import { InputNumber } from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { getPayments, addPayment, editPayment } from '..//../actions/payments';
import { getCustomerPaymentMethodsChoices } from '..//../actions/choices';
import { getInvoices } from '..//../actions/invoices';
import { getEmployees } from '..//../actions/employees';
import { getCashDrawers } from '..//../actions/cashdrawers';


class Payments extends Component {

    emptyAccount = {
        amount: '',
        comments: '',
        invoice: null,
        cashier: null,
        method: null,
        cash: null,
        
    };

    constructor() {
        super();
        this.state = {
            accounts : [],
            globalFilter: null,
            dateFilter: null,
            selectedPayments: null,
            paymentDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            selectRow: {
                amount: '',
                comments: '',
                invoice: null,
                cashier: null,
                method: null,
                cash: null,
            },
            newData: {
                amount: '',
                comments: '',
                invoice: null,
                cashier: null,
                method: null,
                cash: null,
            },
            submitted: false,

        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this);
        this.onDateFilterChange = this.onDateFilterChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.editPayment = this.editPayment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onMethod = this.onMethod.bind(this);
        this.onInvoice = this.onInvoice.bind(this);
        this.onCash = this.onCash.bind(this);


        
    }

    static propTypes = {
        payments : PropTypes.array.isRequired,
        getPayments: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getEmployees();
        this.props.getPayments();
        this.props.getCustomerPaymentMethodsChoices();
        this.props.getCashDrawers();
        this.props.getInvoices();

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    onEmployee (e){
        this.setState({cashier: e.value})
    }

    onMethod (e){
        this.setState({method: e.value})
    }

    onInvoice (e){
        this.setState({invoice: e.value})
    }

    onCash (e){
        this.setState({cash: e.value})
    }

    openNew() {
        this.setState({
            newData: {
                amount: '',
                comments: '',
                invoice: null,
                cashier: null,
                method: null,
                cash: null,
                
            },
            submitted: false,
            paymentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            paymentDialog: false
        });
    }



    savePayment = (e) => {
        e.preventDefault();
        const {
            amount,
            comments,
            invoice,
            cashier,
            method,
            cash,
        } = this.state;
        const payment = {
            amount,
            comments,
            invoice,
            cashier,
            method,
            cash,
        };
        this.props.addPayment(payment);
        this.setState({
            amount: '',
            comments: '',
            invoice: null,
            cashier: null,
            method: null,
            cash: null,
            
        });
        this.props.history.push('/payments');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                amount: '',
                comments: '',
                invoice: null,
                cashier: null,
                method: null,
                cash: null,
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


    editPayment(e) {
        const errors = this.editDataValidateError();
        const {
            amount,
            comments,
            invoice,
            cashier,
            method,
            cash,
        } = this.state.selectRow;
        const payment = {
            amount,
            comments,
            invoice,
            cashier,
            method,
            cash,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editPayment(this.state.selectRow.id, payment);
            this.onHideEditDialog(e);
            this.growl.show({severity: 'success', summary: 'Succesfully', detail: 'Edited'});
        }
    }


    editDataValidateError() {
        const errorList = [];
        if (!this.state.selectRow.id) {
            errorList.push({
                severity: 'error',
                summary: 'cant be left blank!',
                detail: 'Add'
            });
        }
        return errorList;
    }






    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Payment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="MAKE NEW PAYMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
        const paymentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.savePayment} />
            </>
        );

        const header = this.renderHeader();
        const { invoices } = this.props;
        const { customerpaymentmethodschoices } = this.props;
        const { employees } = this.props;
        const { cashdrawers } = this.props;
        const { payments } = this.props;

        const {
            amount,
            comments,
            invoice,
            cashier,
            method,
            cash,
            
        } = this.state;


        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={payments}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedAccounts} onSelectionChange={e => this.setState({selectedAccounts: e.value})}
                        paginator rows={10} emptyMessage="No Payments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column
                            className="table-field"
                            selectionMode="multiple"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="id" header="ID"
                            sortable filter filterPlaceholder="Search by ID"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="reference_number"
                            header="Reference Number"
                            sortable filter filterPlaceholder="Search by Reference Number"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="method"
                            header="Payment Method"
                            sortable filter filterPlaceholder="Search by Method"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="amount"
                            header="Amount"
                            sortable filter filterPlaceholder="Search by Amount"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            header="EDIT"
                            body={this.actionBodyTemplate}
                            headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>
                    <Dialog 
                        visible={this.state.paymentDialog} 
                        style={{ width: '900px' }} 
                        header=" Create Payment" 
                        modal 
                        className="p-fluid" 
                        footer={paymentDialogFooter} 
                        onHide={this.hideDialog}
                    >
                        
                        <div className="p-field p-col-12 p-md-12">
                            <label>Amount</label>
                            <InputNumber
                                name="amount"
                                mode="decimal"
                                onChange={this.onChange}
                                value={amount}
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
                                    name="comments"
                                    onChange={this.onChange}
                                    value={comments}
                                />
                                <label htmlFor="inputtext">Comments</label>
                            </span>
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                value={invoice}
                                onChange={this.onInvoice}
                                options={invoices}
                                filter={true}
                                filterBy="id"
                                showClear={true}
                                optionLabel="customer"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT INVOICE</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                value={method}
                                onChange={this.onMethod}
                                options={customerpaymentmethodschoices}
                                filter={true}
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT PAYMENT METHOD</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                value={cashier}
                                onChange={this.onEmployee}
                                options={employees}
                                filter={true}
                                showClear={true}
                                optionLabel="email"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CASHIER</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                value={cash}
                                onChange={this.onCash}
                                options={cashdrawers}
                                filter={true}
                                showClear={true}
                                optionLabel="id"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CASH DRAWER</label>
                            </span>
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    payments: state.payments.payments,
    cashdrawers: state.cashdrawers.cashdrawers,
    invoices: state.invoices.invoices,
    employees: state.employees.employees,
    customerpaymentmethodschoices: state.customerpaymentmethodschoices.customerpaymentmethodschoices,

})

export default connect(
            mapStateToProps, 
            {getPayments, addPayment, editPayment, getCashDrawers, getCustomerPaymentMethodsChoices, getEmployees, getInvoices } 
            ) (Payments);






























