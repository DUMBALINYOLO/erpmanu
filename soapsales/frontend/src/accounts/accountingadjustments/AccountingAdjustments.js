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
import { getAccountingAdjustments, addAccountingAdjustment, deleteAccountingAdjustment, editAccountingAdjustment } from '..//../actions/accountingadjustments';
import { getJournals } from '..//../actions/journals';
import { getEmployees } from '..//../actions/employees';
import { getWorkbooks } from '..//../actions/workbooks';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";



class AccountingAdjustments extends Component {

    emptyAccountingAdjustment = {
        entry: null,
        adjusting_entry: null,
        workbook: null,
        description: '',
        created_by: null,
        date_created: ''
    };

    constructor() {
        super();
        this.state = {
            accountingadjustments: [],
            globalFilter: null,
            dateFilter: null,
            selectedAccountingAdjustments: null,
            accountingadjustmentDialog: false,
            deleteAccountingAdjustmentDialog: false,
            deleteAccountingAdjustmentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                entry: null,
                adjusting_entry: null,
                workbook: null,
                description: '',
                created_by: null,
                date_created: ''
            },
            newData: {
                entry: null,
                adjusting_entry: null,
                workbook: null,
                description: '',
                created_by: null,
                date_created: ''
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
        this.saveAccountingAdjustment = this.saveAccountingAdjustment.bind(this);
        this.editAccountingAdjustment = this.editAccountingAdjustment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteAccountingAdjustment = this.confirmDeleteAccountingAdjustment.bind(this);
        this.deleteAccountingAdjustment = this.deleteAccountingAdjustment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedAccountingAdjustments = this.deleteSelectedAccountingAdjustments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteAccountingAdjustmentDialog = this.hideDeleteAccountingAdjustmentDialog.bind(this);
        this.hideDeleteAccountingAdjustmentsDialog = this.hideDeleteAccountingAdjustmentsDialog.bind(this);
        this.onEntry = this.onEntry.bind(this);
        this.onAdjustingEntry = this.onAdjustingEntry.bind(this);
        this.onWorkbook = this.onWorkbook.bind(this);
        this.onCreatedBy = this.onCreatedBy.bind(this);
    }

    static propTypes = {
        accountingadjustments : PropTypes.array.isRequired,
        getAccountingAdjustments: PropTypes.func.isRequired,
        addAccountingAdjustment: PropTypes.func.isRequired,
        editAccountingAdjustment: PropTypes.func.isRequired,
        deleteAccountingAdjustment: PropTypes.func.isRequired,
    };

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

    openNew() {
        this.setState({
            newData: {
                entry: null,
    			adjusting_entry: null,
    			workbook: null,
    			description: '',
    			created_by: null,
    			date_created: ''
            },
            submitted: false,
            accountingadjustmentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            accountingadjustmentDialog: false
        });
    }

    hideDeleteAccountingAdjustmentDialog() {
        this.setState({ deleteAccountingAdjustmentDialog: false });
    }

    hideDeleteAccountingAdjustmentsDialog() {
        this.setState({ deleteAccountingAdjustmentsDialog: false });
    }

    componentDidMount() {
        this.props.getAccountingAdjustments();
    }


    saveAccountingAdjustment = (e) => {
        e.preventDefault();
        const {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        } = this.state;
        const accountingadjustment = {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        };
        this.props.addAccountingAdjustment(accountingadjustment);
        this.setState({
            entry: '',
			adjusting_entry: '',
			workbook: '',
			description: '',
			created_by: '',
			date_created: '',
            accountingadjustmentDialog: false
        });
        this.props.history.push('/accountingadjustments');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                entry: '',
    			adjusting_entry: '',
    			workbook: '',
    			description: '',
    			created_by: '',
    			date_created: '',
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


    editAccountingAdjustment(e) {
        const errors = this.editDataValidateError();
        const {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,

        } = this.state.selectRow;
        const accountingadjustment = {
            entry,
			adjusting_entry,
			workbook,
			description,
			created_by,
			date_created,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editAccountingAdjustment(this.state.selectRow.id, accountingadjustment);
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


    confirmDeleteAccountingAdjustment(accountingadjustment) {
        this.setState({
            accountingadjustment,
            deleteAccountingAdjustmentDialog: true
        });
    }

    deleteAccountingAdjustment() {
        this.props.deleteBillPayment();
        this.setState({
            deleteAccountingAdjustmentDialog: false,
            accountingadjustment: this.emptyAccountingAdjustment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteAccountingAdjustmentsDialog: true });
    }

    deleteSelectedAccountingAdjustments() {
        this.props.deleteAccountingAdjustment();
        this.setState({
            deleteAccountingAdjustmentsDialog: false,
            selectedAccountingAdjustments: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Accounting Adjustment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW ACCOUNTING ADJUSTMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteAccountingAdjustment(rowData)} />
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
        const accountingadjustmentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveAccountingAdjustment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editAccountingAdjustment}/>
            </div>
        );


        const deleteAccountingAdjustmentsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAccountingAdjustmentsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedAccountingAdjustments} />
            </>
        );

        const header = this.renderHeader();
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
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedAccountingPosts} onSelectionChange={e => this.setState({selectedAccountingPosts: e.value})}
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
                            field="reference_number"
                            header="Reference Number"
                            sortable filter filterPlaceholder="Search by Reference Number"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="entry"
                            header="Entry"
                            sortable filter filterPlaceholder="Search by Entry"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="adjusting_entry"
                            header="Adjusting Entry"
                            sortable filter filterPlaceholder="Search by Adjusting Entry"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="workbook"
                            header="Workbook"
                            sortable filter filterPlaceholder="Search by Workbook"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="created_by"
                            header="Created By"
                            sortable filter filterPlaceholder="Search by Created By"
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
                        visible={this.state.accountingadjustmentDialog}
                        style={{ width: '900px' }}
                        header="Accounting Adjustment Details"
                        modal className="p-fluid"
                        footer={accountingadjustmentDialogFooter}
                        onHide={this.hideDialog}
                    >
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
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE ACCOUNTING ADJUSTMENT"
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
                                id="inDateCreated" value={this.state.selectRow.date_created}
                                style={{marginLeft: '.5em'}} onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            date_created: e.target.value
                                        }
                                    })
                                }
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    id="inDescription"
                                    value={this.state.selectRow.description}
                                    onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            description: e.target.value
                                        }
                                    })
                                }/>
                                <label htmlFor="inputtext">Description</label>
                          </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEntry"
                                value={this.state.selectRow.entry}
                                options={journals}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        entry: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT ENTRY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inAdjustingEntry"
                                value={this.state.selectRow.adjusting_entry}
                                options={journals}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="vendor"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        adjusting_entry: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT ADJUSTING ENTRY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inWorkbook"
                                value={this.state.selectRow.workbook}
                                options={ workbooks}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        workbook: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT  WORKBOOK</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inCreatedBy"
                                value={this.state.selectRow.created_by}
                                options={ employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        created_by: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="dropdown">SELECT EMPLOYEES</label>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteAccountingAdjustmentsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAccountingAdjustmentsDialogFooter} onHide={this.hideDeleteAccountingAdjustmentsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.accountingadjustment && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    journals: state.journals.journals,
    workbooks: state.workbooks.workbooks,
    employees: state.employees.employees,
    accountingadjustments: state.accountingadjustments.accountingadjustments,
})

export default connect(mapStateToProps, {
    getEmployees,
    getJournals,
    getWorkbooks,
    getAccountingAdjustments,
    deleteAccountingAdjustment,
    editAccountingAdjustment,
    addAccountingAdjustment} ) (AccountingAdjustments);
