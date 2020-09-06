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
import { getBillPayments, addBillPayment, editBillPayment, deleteBillPayment } from '..//../actions/billpayments';
import { getAccounts} from '..//../actions/accounts';
import { getBills} from '..//../actions/bills';
import { getEmployees} from '..//../actions/employees';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";



class BillPayments extends Component {

    emptyBillPayment = {
        date: '',
        account: null,
        bill: null,
        amount: '',
        memo: '',
        paid_by: null,
    };


    constructor() {
        super();
        this.state = {
            billpayments: [],
            globalFilter: null,
            dateFilter: null,
            selectedBillPayments: null,
            billpaymentDialog: false,
            deleteBillPaymentDialog: false,
            deleteBillPaymentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                date: '',
                account: null,
                bill: null,
                amount: '',
                memo: '',
                paid_by: null,
            },
            newData: {
                date: '',
                account: null,
                bill: null,
                amount: '',
                memo: '',
                paid_by: null,
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
        this.saveBillPayment = this.saveBillPayment.bind(this);
        this.editBillPayment = this.editBillPayment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteBillPayment = this.confirmDeleteBillPayment.bind(this);
        this.deleteBillPayment = this.deleteBillPayment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedBillPayments = this.deleteSelectedBillPayments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteBillPaymentDialog = this.hideDeleteBillPaymentDialog.bind(this);
        this.hideDeleteBillPaymentsDialog = this.hideDeleteBillPaymentsDialog.bind(this);
        this.onAccount = this.onAccount.bind(this);
        this.onBill = this.onBill.bind(this);
        this.onPaidBy = this.onPaidBy.bind(this);
    }

    onAccount (e){
      this.setState({account: e.value})
    }

    onPaidBy (e){
      this.setState({paid_by: e.value})
    }

    onBill (e){
      this.setState({bill: e.value})
    }

    static propTypes = {
        billpayments : PropTypes.array.isRequired,
        getBillPayments: PropTypes.func.isRequired,
        addBillPayment: PropTypes.func.isRequired,
        editBillPayment: PropTypes.func.isRequired,
        deleteBillPayment: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                date: '',
                account: null,
                bill: null,
                amount: '',
                memo: '',
                paid_by: null,
            },
            submitted: false,
            billpaymentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            billpaymentDialog: false
        });
    }

    hideDeleteBillPaymentDialog() {
        this.setState({ deleteBillPaymentDialog: false });
    }

    hideDeleteBillPaymentsDialog() {
        this.setState({ deleteBillPaymentsDialog: false });
    }

    componentDidMount() {
        this.props.getBillPayments();
    }


    saveBillPayment = (e) => {
        e.preventDefault();
        const {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by
        } = this.state;
        const billpayment = {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by
        };
        this.props.addBillPayment(billpayment);
        this.setState({
            date: '',
            account: '',
            bill: '',
            amount: '',
            memo: '',
            paid_by: '',
            billpaymentDialog: false
        });
        this.props.history.push('/billpayments');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                date: '',
                account: '',
                bill: '',
                amount: '',
                memo: '',
                paid_by: ''
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


    editBillPayment(e) {
        const errors = this.editDataValidateError();
        const {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by

        } = this.state.selectRow;
        const billpayment = {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editBillPayment(this.state.selectRow.id, billpayment);
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
                detail: 'Ad'
            });
        }
        return errorList;
    }


    confirmDeleteBillPayment(billpayment) {
        this.setState({
            billpayment,
            deleteBillPaymentDialog: true
        });
    }

    deleteBillPayment() {
        this.props.deleteBillPayment();
        this.setState({
            deleteBillPaymentDialog: false,
            billpayment: this.emptyBillPayment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteBillPaymentsDialog: true });
    }

    deleteSelectedBillPayments() {
        this.props.deleteBillPayment();
        this.setState({
            deleteBillPaymentsDialog: false,
            selectedBillPayments: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Bill Payment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW BillPayment" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteBillPayment(rowData)} />
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
        const billpaymentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveBillPayment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editBillPayment}/>
            </div>
        );


        const deleteBillPaymentsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteBillPaymentsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedBillPayments} />
            </>
        );

        const header = this.renderHeader();
        const {
            date,
            account,
            bill,
            amount,
            memo,
            paid_by
        } = this.state;


        const {accounts} = this.props;
        const {bills} = this.props;
        const {employees} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedBillPayments} onSelectionChange={e => this.setState({selectedBillPayments: e.value})}
                        paginator rows={10} emptyMessage="No Bill Payments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="account"
                            header="Account"
                            sortable filter filterPlaceholder="Search by Account"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="bill"
                            header="Bill"
                            sortable filter filterPlaceholder="Search by Bill"
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
                            field="paid_by"
                            header="Paid By"
                            sortable filter filterPlaceholder="Search by Paid By"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="date"
                            header= "Date"
                            sortable filter filterPlaceholder="Search by Date"
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

                    <Dialog visible={this.state.billpaymentDialog} style={{ width: '450px' }} header="Bill Payment Details" modal className="p-fluid" footer={billpaymentDialogFooter} onHide={this.hideDialog}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                name="date"
                                onChange={this.onChange}
                                value={date}
                                dateFormat="yy-mm-dd"
                            />
                            <label htmlFor="inputtext">Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label>Amount</label>
                            <InputNumber
                              name="amount"
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
                                    name="memo"
                                    onChange={this.onChange}
                                    value={memo}
                                />
                                <label htmlFor="inputtext">Memo</label>
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
                            <span className="p-float-label">
                            <Dropdown
                                value={bill}
                                onChange={this.onBill}
                                options={bills}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="vendor"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT BILLS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={paid_by}
                                onChange={this.onPaidBy}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="id_number"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT EMPLOYEES</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE Bill Payment"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Calendar
                                id="inDate" value={this.state.selectRow.date}
                                style={{marginLeft: '.5em'}} onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            date: e.target.value
                                        }
                                    })
                                }
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Amount</label>
                            <InputNumber
                                id="inAmount"
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
                                        amount: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    id="inMemo"
                                    value={this.state.selectRow.memo}
                                    onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            memo: e.target.value
                                        }
                                    })
                                }/>
                                <label htmlFor="inputtext">Memo</label>
                          </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inAccount"
                                value={this.state.selectRow.account}
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
                                        account: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT ACCOUNT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inBill"
                                value={this.state.selectRow.bill}
                                options={bills}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="vendor"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        bill: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT BILLS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inPaidBy"
                                value={this.state.selectRow.paid_by}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        paid_by: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT EMPLOYEES</label>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteBillPaymentsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteBillPaymentsDialogFooter} onHide={this.hideDeleteBillPaymentsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.billpayments && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    accounts: state.accounts.accounts,
    bills: state.bills.bills,
    billpayments: state.billpayments.billpayments,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {
    getAccounts,
    getBills,
    getEmployees,
    addBillPayment,
    getBillPayments, editBillPayment, deleteBillPayment} ) (BillPayments);
