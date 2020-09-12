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
import { getEmployeeAllowances, addEmployeeAllowance, editEmployeeAllowance, deleteEmployeeAllowance } from '..//../actions/employeeallowances';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";


class EmployeeAllowances extends Component {

    emptyTax = {
        name: '',
        amount: '',
        taxable: false,
    };


    constructor() {
        super();
        this.state = {
            employeeallowances: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeAllowances: null,
            employeeallowanceDialog: false,
            deleteEmployeeAllowanceDialog: false,
            deleteEmployeeAllowancesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                amount: '',
                taxable: false,
            },
            newData: {
                name: '',
                amount: '',
                taxable: false,
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
        this.saveEmployeeAllowance = this.saveEmployeeAllowance.bind(this);
        this.editEmployeeAllowance = this.editEmployeeAllowance.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeAllowance = this.confirmDeleteEmployeeAllowance.bind(this);
        this.deleteEmployeeAllowance = this.deleteEmployeeAllowance.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeAllowances = this.deleteSelectedEmployeeAllowances.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeAllowanceDialog = this.hideDeleteEmployeeAllowanceDialog.bind(this);
        this.hideDeleteEmployeeAllowancesDialog = this.hideDeleteEmployeeAllowancesDialog.bind(this);
        this.onTaxable = this.onTaxable.bind(this);
    }

    onTaxable() {
        this.setState({
            taxable: !this.state.checked
        });
    }

    static propTypes = {
        employeeallowances : PropTypes.array.isRequired,
        getEmployeeAllowances: PropTypes.func.isRequired,
        addEmployeeAllowance: PropTypes.func.isRequired,
        editEmployeeAllowance: PropTypes.func.isRequired,
        deleteEmployeeAllowance: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                amount: '',
                taxable: false,
            },
            submitted: false,
            employeeallowanceDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeeallowanceDialog: false
        });
    }

    hideDeleteEmployeeAllowanceDialog() {
        this.setState({ deleteEmployeeAllowanceDialog: false });
    }

    hideDeleteEmployeeAllowancesDialog() {
        this.setState({ deleteEmployeeAllowancesDialog: false });
    }

    componentDidMount() {
        this.props.getEmployeeAllowances();
    }


    saveEmployeeAllowance = (e) => {
        e.preventDefault();
        const { name, amount, taxable } = this.state;
        const employeeallowance = { name, amount, taxable};
        this.props.addEmployeeAllowance(employeeallowance);
        this.setState({
            name: '',
            amount: '',
            taxable: true,
            employeeallowanceDialog: false
        });
        this.props.history.push('/employeeallowances');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                amount: '',
                taxable: false,
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


    editEmployeeAllowance(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            amount,
            taxable

        } = this.state.selectRow;
        const employeeallowance = {
            name,
            amount,
            taxable

        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeAllowance(this.state.selectRow.id, employeeallowance);
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


    confirmDeleteEmployeeAllowance(employeeallowance) {
        this.setState({
            employeeallowance,
            deleteEmployeeAllowanceDialog: true
        });
    }

    deleteEmployeeAllowance() {
        this.props.deleteEmployeeAllowance();
        this.setState({
            deleteEmployeeAllowanceDialog: false,
            employeeallowance: this.emptyEmployeeAllowance
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeAllowancesDialog: true });
    }

    deleteSelectedEmployeeAllowances() {
        this.props.deleteEmployeeAllowance();
        this.setState({
            deleteEmployeeAllowancesDialog: false,
            selectedEmployeeAllowances: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Allowance</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE ALLOWANCE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeAllowance(rowData)} />
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
        const employeeallowanceDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeAllowance} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeAllowance}/>
            </div>
        );


        const deleteEmployeeAllowancesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeAllowancesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeAllowances} />
            </>
        );

        const header = this.renderHeader();
        const { name, amount } = this.state;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeeallowances}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedTaxes} onSelectionChange={e => this.setState({selectedTaxes: e.value})}
                        paginator rows={10} emptyMessage="No Employee Allowance found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="amount" header="Amount" sortable filter filterPlaceholder="Search by Amount" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>

                    <Dialog
                        visible={this.state.employeeallowanceDialog}
                        style={{ width: '900px' }}
                        header="Employee Allowance Details"
                        modal className="p-fluid"
                        footer={employeeallowanceDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                                <label>Name</label>
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
                            <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                                <label>TAXABLE :</label>
                                <Checkbox
                                    inputId="working"
                                    onChange={this.onTaxable}
                                    checked={this.state.taxable}
                                />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE EMPLOYEE ALLOWANCE"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
                            <label htmlFor="inName">Name </label>
                            <InputText id="inName" value={this.state.selectRow.name}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        name: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inAmount">Amount </label>
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
                            <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                                <label>TAXABLE :</label>
                                <Checkbox
                                    inputId="working"
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                taxable: e.target.value
                                            }
                                        })
                                    }
                                    checked={this.state.selectRow.taxable}
                                />
                            </div>
                        </span>
                    </Dialog>

                    <Dialog visible={this.state.deleteEmployeeAllowancesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeAllowancesDialogFooter} onHide={this.hideDeleteEmployeeAllowancesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeeallowance && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    employeeallowances: state.employeeallowances.employeeallowances
})

export default connect(mapStateToProps, { getEmployeeAllowances, addEmployeeAllowance, editEmployeeAllowance, deleteEmployeeAllowance } ) (EmployeeAllowances);
