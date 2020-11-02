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
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import { getInventoryOrders } from '..//../actions/inventoryorders';
import { getEmployees } from '..//../actions/employees';
import { getInventoryOrderpayments, addInventoryOrderpayment, editInventoryOrderpayment, deleteInventoryOrderpayment } from '..//../actions/inventoryorderpayments';
import "./form.css";

class InventoryOrderpayments extends Component {

    emptyInventoryOrderpayment = {
        date: '',
        amount: '',
        comments: '',
        order: null,
        paid_by: null
    };

    constructor() {
        super();
        this.state = {
            inventoryorderpayments : [],
            globalFilter: null,
            dateFilter: null,
            selectedInventoryOrderpayments: null,
            inventoryorderpaymentDialog: false,
            deleteInventoryOrderpaymentDialog: false,
            deleteInventoryOrderpaymentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                date: '',
                amount: '',
                comments: '',
                order: null,
                paid_by: null
            },
            newData: {
                date: '',
                amount: '',
                comments: '',
                order: null,
                paid_by: null
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
        this.saveInventoryOrderpayment = this.saveInventoryOrderpayment.bind(this);
        this.editInventoryOrderpayment = this.editInventoryOrderpayment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteInventoryOrderpayment = this.confirmDeleteInventoryOrderpayment.bind(this);
        this.deleteInventoryOrderpayment = this.deleteInventoryOrderpayment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedInventoryOrderpayments = this.deleteSelectedInventoryOrderpayments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteInventoryOrderpaymentDialog = this.hideDeleteInventoryOrderpaymentDialog.bind(this);
        this.hideDeleteInventoryOrderpaymentsDialog = this.hideDeleteInventoryOrderpaymentsDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onPaidBy = this.onPaidBy.bind(this);
    }

    onTypeChange (e){
        this.setState({order: e.value})
    }

    onPaidBy (e){
        this.setState({paid_by: e.value})
    }

    static propTypes = {
        inventoryorderpayments : PropTypes.array.isRequired,
        getInventoryOrderpayments: PropTypes.func.isRequired,
        getInventoryOrders: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getInventoryOrderpayments();
        this.props.getInventoryOrders()
        this.props.getEmployees()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                date: '',
                amount: '',
                comments: '',
                order: null,
                paid_by: null
            },
            submitted: false,
            inventoryorderpaymentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            inventoryorderpaymentDialog: false
        });
    }

    hideDeleteInventoryOrderpaymentDialog() {
        this.setState({ deleteInventoryOrderpaymentDialog: false });
    }

    hideDeleteInventoryOrderpaymentsDialog() {
        this.setState({ deleteInventoryOrderpaymentsDialog: false });
    }

    saveInventoryOrderpayment = (e) => {
        e.preventDefault();
        const {
            date,
            amount,
            comments,
            order,
            paid_by
        } = this.state;
        const inventoryorderpayment = {
            date,
            amount,
            comments,
            order,
            paid_by
        };
        this.props.addInventoryOrderpayment(inventoryorderpayment);
        this.setState({
            date: '',
            amount: '',
            comments: '',
            order: null,
            paid_by: null,
            inventoryorderpaymentDialog: false
        });
        this.props.history.push('/inventoryorderpayments');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                date: '',
                amount: '',
                comments: '',
                order: null,
                paid_by: null
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

    editInventoryOrderpayment(e) {
        const errors = this.editDataValidateError();
        const {
            date,
            amount,
            comments,
            order,
            paid_by
        } = this.state.selectRow;
        const inventoryorderpayment = {
            date,
            amount,
            comments,
            order,
            paid_by
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editInventoryOrderpayment(this.state.selectRow.id, inventoryorderpayment);
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

    confirmDeleteInventoryOrderpayment(inventoryorderpayment) {
        this.setState({
            inventoryorderpayment,
            deleteInventoryOrderpaymentDialog: true
        });
    }

    deleteInventoryOrderpayment() {
        this.props.deleteInventoryOrderpayment();
        this.setState({
            deleteInventoryOrderpaymentDialog: false,
            inventoryorderpayment: this.emptyInventoryOrderpayment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteInventoryOrderpaymentsDialog: true });
    }

    deleteSelectedInventoryOrderpayments() {
        this.props.deleteInventoryOrderpayment();
        this.setState({
            deleteInventoryOrderpaymentsDialog: false,
            selectedInventoryOrderpayments: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Inventory Orderpayment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW INVENTORY ORDERPAYMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteInventoryOrderpayment(rowData)} />
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
        const inventoryorderpaymentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveInventoryOrderpayment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editInventoryOrderpayment}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            date,
            amount,
            comments,
            order,
            paid_by
        } = this.state;

        const { inventoryorders } = this.props;
        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.inventoryorderpayments}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedInventoryOrderpayments} onSelectionChange={e => this.setState({selectedInventoryOrderpayments: e.value})}
                        paginator rows={10} emptyMessage="No Inventory Orderpayments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="paid_by"
                            header="Paid By"
                            sortable filter filterPlaceholder="Search by Paid By"
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
                            field="order"
                            header="Order"
                            sortable filter filterPlaceholder="Search by Order"
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
                            field="date"
                            header="Date"
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
                    <Dialog
                        visible={this.state.inventoryorderpaymentDialog}
                        style={{ width: '900px' }}
                        header=" Create Inventory Orderpayment"
                        modal
                        className="p-fluid"
                        footer={inventoryorderpaymentDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
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
                            <div className="p-field p-col-12 p-md-12">
                                <label>AMOUNT</label>
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
                                        name="comments"
                                        onChange={this.onChange}
                                        value={comments}
                                    />
                                    <label htmlFor="inputtext">Comments</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={order}
                                    onChange={this.onTypeChange}
                                    options={inventoryorders}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="tracking_number"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT ORDER</label>
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
                                    optionLabel="employee_number"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT PAID BY</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE INVENTORY ORDERPAYMENT"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-6">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inDate"
                                value={this.state.selectRow.date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        date: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                           <InputNumber
                                id="inAmount"
                                value={this.state.selectRow.amount}
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
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                comments: e.target.value
                                            }
                                        })
                                    }
                                    id="inComments"
                                    value={this.state.selectRow.comments}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inOrder"
                                value={this.state.selectRow.order}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            order: e.target.value
                                        }
                                    })
                                }
                                options={inventoryorders}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="tracking_number"
                                optionValue="id"
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inPaidBy"
                                value={this.state.selectRow.paid_by}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            paid_by: e.target.value
                                        }
                                    })
                                }
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="employee_number"
                                optionValue="id"
                            />
                            </span>
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    inventoryorderpayments: state.inventoryorderpayments.inventoryorderpayments,
    inventoryorders: state.inventoryorders.inventoryorders,
    employees: state.employees.employees
})

export default connect(
    mapStateToProps,
    {
        getInventoryOrderpayments,
        getInventoryOrders,
        getEmployees,
        addInventoryOrderpayment,
        deleteInventoryOrderpayment,
        editInventoryOrderpayment,
    }) (InventoryOrderpayments);
