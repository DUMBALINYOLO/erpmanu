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
import { getEmployeeContracts, addEmployeeContract, editEmployeeContract, deleteEmployeeContract } from '..//../actions/employeecontracts';
import { getEmployeeDepartments } from '..//../actions/employeedepartments';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeCategoryChoices, getNatureOfEmploymentChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";


class EmployeeContracts extends Component {

    emptyEmployeeContract = {
        start_date: '',
        department: null,
        employee: null,
        job_position: '',
        end_of_probation: '',
        termination_date: '',
        employee_category: null,
        nature_of_employment: null,
    };


    constructor() {
        super();
        this.state = {
            employeecontracts: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeContracts: null,
            employeecontractDialog: false,
            deleteEmployeeContractDialog: false,
            deleteEmployeeContractsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                start_date: '',
                department: null,
                employee: null,
                job_position: '',
                end_of_probation: '',
                termination_date: '',
                employee_category: null,
                nature_of_employment: null,
            },
            newData: {
                start_date: '',
                department: null,
                employee: null,
                job_position: '',
                end_of_probation: '',
                termination_date: '',
                employee_category: null,
                nature_of_employment: null,
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
        this.saveEmployeeContract = this.saveEmployeeContract.bind(this);
        this.editEmployeeContract = this.editEmployeeContract.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeContract = this.confirmDeleteEmployeeContract.bind(this);
        this.deleteEmployeeContract = this.deleteEmployeeContract.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeContracts = this.deleteSelectedEmployeeContracts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeContractDialog = this.hideDeleteEmployeeContractDialog.bind(this);
        this.hideDeleteEmployeeContractsDialog = this.hideDeleteEmployeeContractsDialog.bind(this);
        this.onDepartment = this.onDepartment.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onEmployeeCategory = this.onEmployeeCategory.bind(this);
        this.onNatureOfEmployment = this.onNatureOfEmployment.bind(this);
    }

    onDepartment (e){
        this.setState({department: e.value})
    }

    onEmployee (e){
        this.setState({employee: e.value})
    }

    onEmployeeCategory (e){
        this.setState({employee_category: e.value})
    }

    onNatureOfEmployment (e){
        this.setState({nature_of_employment: e.value})
    }

    static propTypes = {
        employeecontracts: PropTypes.array.isRequired,
        getEmployeeContracts: PropTypes.func.isRequired,
        addEmployeeContract: PropTypes.func.isRequired,
        editEmployeeContract: PropTypes.func.isRequired,
        deleteEmployeeContract: PropTypes.func.isRequired,
        getEmployeeDepartments: PropTypes.func.isRequired,
        getNatureOfEmploymentChoices: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeCategoryChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeeContracts()
        this.props.getEmployees()
        this.props.getNatureOfEmploymentChoices()
        this.props.getEmployeeCategoryChoices()
        this.props.getEmployeeDepartments()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                start_date: '',
                department: null,
                employee: null,
                job_position: '',
                end_of_probation: '',
                termination_date: '',
                employee_category: null,
                nature_of_employment: null,
            },
            submitted: false,
            employeecontractDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeecontractDialog: false
        });
    }

    hideDeleteEmployeeContractDialog() {
        this.setState({ deleteEmployeeContractDialog: false });
    }

    hideDeleteEmployeeContractsDialog() {
        this.setState({ deleteEmployeeContractsDialog: false });
    }


    saveEmployeeContract = (e) => {
        e.preventDefault();
        const {
            start_date,
            department,
            employee,
            job_position,
            end_of_probation,
            termination_date,
            employee_category,
            nature_of_employment,
        } = this.state;
        const employeecontract = {
            start_date,
            department,
            employee,
            job_position,
            end_of_probation,
            termination_date,
            employee_category,
            nature_of_employment,
        };
        this.props.addEmployeeContract(employeecontract);
        this.setState({
            start_date: '',
            department: null,
            employee: null,
            job_position: '',
            end_of_probation: '',
            termination_date: '',
            employee_category: null,
            nature_of_employment: null,
            employeecontractDialog: false
        });
        this.props.history.push('/employeecontracts');
    };

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                start_date: '',
                department: null,
                employee: null,
                job_position: '',
                end_of_probation: '',
                termination_date: '',
                employee_category: null,
                nature_of_employment: null,
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


    editEmployeeContract(e) {
        const errors = this.editDataValidateError();
        const {
            start_date,
            department,
            employee,
            job_position,
            end_of_probation,
            termination_date,
            employee_category,
            nature_of_employment,

        } = this.state.selectRow;
        const employeecontract = {
            start_date,
            department,
            employee,
            job_position,
            end_of_probation,
            termination_date,
            employee_category,
            nature_of_employment,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeContract(this.state.selectRow.id, employeecontract);
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


    confirmDeleteEmployeeContract(employeecontract) {
        this.setState({
            employeecontract,
            deleteEmployeeContractDialog: true
        });
    }

    deleteEmployeeContract() {
        this.props.deleteEmployeeContract();
        this.setState({
            deleteEmployeeContractDialog: false,
            employeecontract: this.emptyEmployeeContract
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeContractsDialog: true });
    }

    deleteSelectedEmployeeContracts() {
        this.props.deleteEmployeeContract();
        this.setState({
            deleteEmployeeContractsDialog: false,
            selectedEmployeeContracts: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Contract</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE CONTRACT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeContract(rowData)} />
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
        const employeecontractDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeContract} />
            </>
        );

        const editDialogFooter = (
            <div>
                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeContract}/>
            </div>
        );


        const deleteEmployeeContractsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeContractsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeContracts} />
            </>
        );

        const header = this.renderHeader();
        const {
          start_date,
          department,
          employee,
          job_position,
          end_of_probation,
          termination_date,
          employee_category,
          nature_of_employment,
           } = this.state;

        const {employeedepartments} = this.props;
        const {natureofemploymentchoices} = this.props;
        const { employeecategorychoices } = this.props;
        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeecontracts}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeeContracts} onSelectionChange={e => this.setState({selectedEmployeeContracts: e.value})}
                        paginator rows={10} emptyMessage="No Employee Contracts found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="employee"
                            header="Employee"
                            sortable filter
                            filterPlaceholder="Search by Employee"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="job_position"
                            header="Job Position"
                            sortable filter
                            filterPlaceholder="Search by Job Position"
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
                            field="employee_category"
                            header="Employee Category"
                            sortable filter
                            filterPlaceholder="Search by Employee Category"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="start_date"
                            header="Start Date"
                            sortable filter filterPlaceholder="Search by Start Date"
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
                        visible={this.state.employeecontractDialog}
                        style={{ width: '900px' }}
                        header="Employee Contract Details"
                        modal className="p-fluid"
                        footer={employeecontractDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="job_position"
                                    onChange={this.onChange}
                                    value={job_position}
                                />
                                <label htmlFor="inputtext">Job Position</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    name="start_date"
                                    onChange={this.onChange}
                                    value={start_date}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">Start Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    name="end_of_probation"
                                    onChange={this.onChange}
                                    value={end_of_probation}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">End Of Probation</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    name="termination_date"
                                    onChange={this.onChange}
                                    value={termination_date}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">Termination Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={employee}
                                onChange={this.onEmployee}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT EMPLOYEE</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={department}
                                onChange={this.onDepartment}
                                options={employeedepartments}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT EMPLOYEE DEPARTMENT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={employee_category}
                                onChange={this.onEmployeeCategory}
                                options={employeecategorychoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT EMPLOYEE CATEGORY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={nature_of_employment}
                                onChange={this.onNatureOfEmployment}
                                options={natureofemploymentchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT NATURE OF EMPLOYEE</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE CONTRACT"
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
                                                job_position: e.target.value
                                            }
                                        })
                                    }
                                    id="inJobPosition"
                                    value={this.state.selectRow.job_position}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inStartDate"
                                value={this.state.selectRow.start_date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        start_date: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inputtext">Start Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inEndOfProbation"
                                value={this.state.selectRow.end_of_probation}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        end_of_probation: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inputtext">End Of Probation</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inTerminationDate"
                                value={this.state.selectRow.termination_date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        termination_date: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inputtext">Termination Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEmployee"
                                value={this.state.selectRow.employee}
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
                                        employee: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inDepartment"
                                value={this.state.selectRow.department}
                                options={employeedepartments}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        department: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEmployeeCategory"
                                value={this.state.selectRow.employee_category}
                                options={employeecategorychoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        employee_category: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inNatureOfEmployment"
                                value={this.state.selectRow.nature_of_employment}
                                options={natureofemploymentchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        nature_of_employment: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteEmployeeContractsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeContractsDialogFooter} onHide={this.hideDeleteEmployeeContractsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeecontract && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    employeecontracts: state.employeecontracts.employeecontracts,
    employeedepartments: state.employeedepartments.employeedepartments,
    natureofemploymentchoices: state.natureofemploymentchoices.natureofemploymentchoices,
    employeecategorychoices: state.employeecategorychoices.employeecategorychoices,
    employees: state.employees.employees})

export default connect(mapStateToProps, {
    getEmployeeDepartments,
    getEmployeeCategoryChoices,
    getEmployees,
    getNatureOfEmploymentChoices,
    getEmployeeContracts,
    editEmployeeContract,
    deleteEmployeeContract,
    addEmployeeContract} ) (EmployeeContracts);
