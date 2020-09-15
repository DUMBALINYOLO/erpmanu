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
import { getEmployeeContractsTerminations, addEmployeeContractsTermination, editEmployeeContractsTermination, deleteEmployeeContractsTermination } from '..//../actions/employeecontractsterminations';
import { getEmploymentContractTerminationReasons } from '..//../actions/choices';
import { getEmployeeContracts } from '..//../actions/employeecontracts';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";


class EmployeeContractsTerminations extends Component {

    emptyEmployeeContractsTermination = {
        date: '',
        reason_for_termination: null,
        contract: null,
    };


    constructor() {
        super();
        this.state = {
            employeecontractsterminations: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeContracts: null,
            employeecontractsterminationDialog: false,
            deleteEmployeeContractsTerminationDialog: false,
            deleteEmployeeContractsTerminationsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                date: '',
                reason_for_termination: null,
                contract: null,
            },
            newData: {
                date: '',
                reason_for_termination: null,
                contract: null,
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
        this.saveEmployeeContractsTermination = this.saveEmployeeContractsTermination.bind(this);
        this.editEmployeeContractsTermination = this.editEmployeeContractsTermination.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeContractsTermination = this.confirmDeleteEmployeeContractsTermination.bind(this);
        this.deleteEmployeeContractsTermination = this.deleteEmployeeContractsTermination.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeContractsTerminations = this.deleteSelectedEmployeeContractsTerminations.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeContractsTerminationDialog = this.hideDeleteEmployeeContractsTerminationDialog.bind(this);
        this.hideDeleteEmployeeContractsTerminationsDialog = this.hideDeleteEmployeeContractsTerminationsDialog.bind(this);
        this.onReasonForTermination = this.onReasonForTermination.bind(this);
        this.onContract = this.onContract.bind(this);
    }

    onReasonForTermination (e){
        this.setState({reason_for_termination: e.value})
    }

    onContract (e){
        this.setState({contract: e.value})
    }

    static propTypes = {
        employeecontractsterminations: PropTypes.array.isRequired,
        getEmployeeContractsTerminations: PropTypes.func.isRequired,
        addEmployeeContractsTermination: PropTypes.func.isRequired,
        editEmployeeContractsTermination: PropTypes.func.isRequired,
        deleteEmployeeContractsTermination: PropTypes.func.isRequired,
        getEmployeeContracts: PropTypes.func.isRequired,
        getEmploymentContractTerminationReasons: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeeContractsTerminations()
        this.props.getEmployeeContracts()
        this.props.getEmploymentContractTerminationReasons()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                date: '',
                reason_for_termination: null,
                contract: null,
            },
            submitted: false,
            employeecontractsterminationDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeecontractsterminationDialog: false
        });
    }

    hideDeleteEmployeeContractsTerminationDialog() {
        this.setState({ deleteEmployeeContractsTerminationDialog: false });
    }

    hideDeleteEmployeeContractsTerminationsDialog() {
        this.setState({ deleteEmployeeContractsTerminationsDialog: false });
    }


    saveEmployeeContractsTermination = (e) => {
        e.preventDefault();
        const {
            date,
            reason_for_termination,
            contract,
        } = this.state;
        const employeecontractstermination = {
            date,
            reason_for_termination,
            contract,
        };
        this.props.addEmployeeContractsTermination(employeecontractstermination);
        this.setState({
            date: '',
            reason_for_termination: null,
            contract: null,
            employeecontractsterminationDialog: false
        });
        this.props.history.push('/employeecontractsterminations');
    };

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                date: '',
                reason_for_termination: null,
                contract: null,
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


    editEmployeeContractsTermination(e) {
        const errors = this.editDataValidateError();
        const {
            date,
            reason_for_termination,
            contract,
        } = this.state.selectRow;
        const employeecontractstermination = {
            date,
            reason_for_termination,
            contract,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeContractsTermination(this.state.selectRow.id, employeecontractstermination);
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


    confirmDeleteEmployeeContractsTermination(employeecontractstermination) {
        this.setState({
            employeecontractstermination,
            deleteEmployeeContractsTerminationDialog: true
        });
    }

    deleteEmployeeContractsTermination() {
        this.props.deleteEmployeeContractsTermination();
        this.setState({
            deleteEmployeeContractsTerminationDialog: false,
            employeecontractstermination: this.emptyEmployeeContractsTermination
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeContractsTerminationsDialog: true });
    }

    deleteSelectedEmployeeContractsTerminations() {
        this.props.deleteEmployeeContractsTermination();
        this.setState({
            deleteEmployeeContractsTerminationsDialog: false,
            selectedEmployeeContracts: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Contracts Termination</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE CONTRACT TERMINATION" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeContractsTermination(rowData)} />
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
        const employeecontractsterminationDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeContractsTermination} />
            </>
        );

        const editDialogFooter = (
            <div>
                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeContractsTermination}/>
            </div>
        );


        const deleteEmployeeContractsTerminationsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeContractsTerminationsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeContractsTerminations} />
            </>
        );

        const header = this.renderHeader();
        const {
            date,
            reason_for_termination,
            contract,
        } = this.state;

        const {employeecontracts} = this.props;
        const {employmentcontractterminationreasons} = this.props;


        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeecontractsterminations}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeeContracts} onSelectionChange={e => this.setState({selectedEmployeeContracts: e.value})}
                        paginator rows={10} emptyMessage="No Employee Contracts Terminations found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="reference_number"
                            header="Reference Number"
                            sortable filter
                            filterPlaceholder="Search by Reference Number"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="contract"
                            header="Contract"
                            sortable filter
                            filterPlaceholder="Search by Contract"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
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
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>
                    <Dialog
                        visible={this.state.employeecontractsterminationDialog}
                        style={{ width: '900px' }}
                        header="Employee Contracts Termination Details"
                        modal className="p-fluid"
                        footer={employeecontractsterminationDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    name="date"
                                    onChange={this.onChange}
                                    value={date}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={contract}
                                onChange={this.onContract}
                                options={employeecontracts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CONTRACT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={reason_for_termination}
                                onChange={this.onReasonForTermination}
                                options={employmentcontractterminationreasons}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT REASONS FOR TERMINATION</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE CONTRACT TERMINATION"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
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
                            <label htmlFor="inputtext">Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inContract"
                                value={this.state.selectRow.contract}
                                options={employeecontracts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        contract: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inReasonForTermination"
                                value={this.state.selectRow.reason_for_termination}
                                options={employmentcontractterminationreasons}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        reason_for_termination: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteEmployeeContractsTerminationsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeContractsTerminationsDialogFooter} onHide={this.hideDeleteEmployeeContractsTerminationsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeecontractstermination && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    employeecontractsterminations: state.employeecontractsterminations.employeecontractsterminations,
    employeecontracts: state.employeecontracts.employeecontracts,
    employmentcontractterminationreasons: state.employmentcontractterminationreasons.employmentcontractterminationreasons,
})

export default connect(mapStateToProps, {
    getEmployeeContracts,
    getEmploymentContractTerminationReasons,
    getEmployeeContractsTerminations,
    editEmployeeContractsTermination,
    deleteEmployeeContractsTermination,
    addEmployeeContractsTermination} ) (EmployeeContractsTerminations);
