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
import { getEmployeeDepartments, addEmployeeDepartment, editEmployeeDepartment, deleteEmployeeDepartment } from '..//../actions/employeedepartments';
import { getEmployees } from '..//../actions/employees';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import "./form.css";

class EmployeeDepartments extends Component {

    emptyEmployeeDepartment = {
        name: '',
        description: '',
        manager: null,
        employee: null,
    };


    constructor() {
        super();
        this.state = {
            employeedepartments: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeDepartments: null,
            employeedepartmentDialog: false,
            deleteEmployeeDepartmentDialog: false,
            deleteEmployeeDepartmentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                description: '',
                manager: null,
                employee: null,
            },
            newData: {
                name: '',
                description: '',
                manager: null,
                employee: null,
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
        this.saveEmployeeDepartment = this.saveEmployeeDepartment.bind(this);
        this.editEmployeeDepartment = this.editEmployeeDepartment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeDepartment = this.confirmDeleteEmployeeDepartment.bind(this);
        this.deleteEmployeeDepartment = this.deleteEmployeeDepartment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeDepartments = this.deleteSelectedEmployeeDepartments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeDepartmentDialog = this.hideDeleteEmployeeDepartmentDialog.bind(this);
        this.hideDeleteEmployeeDepartmentsDialog = this.hideDeleteEmployeeDepartmentsDialog.bind(this);
        this.onManager = this.onManager.bind(this);
        this.onEmployees = this.onEmployees.bind(this);
    }

    onManager (e){
        this.setState({manager: e.value})
    }

    onEmployees (e){
        this.setState({employee: e.value})
    }

    static propTypes = {
        employeedepartments : PropTypes.array.isRequired,
        getEmployeeDepartments: PropTypes.func.isRequired,
        addEmployeeDepartment: PropTypes.func.isRequired,
        editEmployeeDepartment: PropTypes.func.isRequired,
        deleteEmployeeDepartment: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                description: '',
                manager: null,
                employee: null,
            },
            submitted: false,
            employeedepartmentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeedepartmentDialog: false
        });
    }

    hideDeleteEmployeeDepartmentDialog() {
        this.setState({ deleteEmployeeDepartmentDialog: false });
    }

    hideDeleteEmployeeDepartmentsDialog() {
        this.setState({ deleteEmployeeDepartmentsDialog: false });
    }

    componentDidMount() {
        this.props.getEmployeeDepartments();
        this.props.getEmployees()
    }


    saveEmployeeDepartment = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            manager,
            employee,
        } = this.state;
        const employeedepartment = {
            name,
            description,
            manager,
            employee,
        };
        this.props.addEmployeeDepartment(employeedepartment);
        this.setState({
            name: '',
            description: '',
            manager: '',
            employee: '',
            employeedepartmentDialog: false
        });
        this.props.history.push('/employeedepartments');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                description: '',
                manager: '',
                employee: '',
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


    editEmployeeDepartment(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            description,
            manager,
            employee,
        } = this.state.selectRow;
        const employeedepartment = {
            name,
            description,
            manager,
            employee,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeDepartment(this.state.selectRow.id, employeedepartment);
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


    confirmDeleteEmployeeDepartment(employeedepartment) {
        this.setState({
            employeedepartment,
            deleteEmployeeDepartmentDialog: true
        });
    }

    deleteEmployeeDepartment() {
        this.props.deleteEmployeeDepartment();
        this.setState({
            deleteEmployeeDepartmentDialog: false,
            employeedepartment: this.emptyEmployeeDepartment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeDepartmentsDialog: true });
    }

    deleteSelectedEmployeeDepartments() {
        this.props.deleteEmployeeDepartment();
        this.setState({
            deleteEmployeeDepartmentsDialog: false,
            selectedEmployeeDepartments: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Department</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE DEPARTMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeDepartment(rowData)} />
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
        const employeedepartmentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeDepartment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeDepartment}/>
            </div>
        );


        const deleteEmployeeDepartmentsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeDepartmentsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeDepartments} />
            </>
        );

        const header = this.renderHeader();
        const {
          name,
          description,
          manager,
          employee,
        } = this.state;

        const {employees} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeedepartments}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeeDepartments} onSelectionChange={e => this.setState({selectedEmployeeDepartments: e.value})}
                        paginator rows={10} emptyMessage="No Employee Departments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="reference_number"
                            header="Reference Number"
                            sortable filter
                            filterPlaceholder="Search by Reference Number"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="manager"
                            header="Manager"
                            sortable filter
                            filterPlaceholder="Search by Manager"
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
                        visible={this.state.employeedepartmentDialog}
                        style={{ width: '900px' }}
                        header="Employee Department Details"
                        modal className="p-fluid"
                        footer={employeedepartmentDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
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
                                <span className="p-float-label">
                                    <InputTextarea
                                        name="description"
                                        onChange={this.onChange}
                                        value={description}
                                    />
                                    <label htmlFor="inputtext">Description</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={manager}
                                        onChange={this.onManager}
                                        options={employees}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT MANAGER</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-12">
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
                                    <label htmlFor="inputtext">SELECT EMPLOYEE</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE EMPLOYEE DEPARTMENT"
                        modal={true} onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
                            <InputText id="inName" value={this.state.selectRow.name}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        name: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="ui-float-label">
                            <InputTextarea id="inDescription" value={this.state.selectRow.description}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        description: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inManager"
                            value={this.state.selectRow.manager}
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
                                    manager: e.target.value
                                }
                            })
                        }/>
                        </span>
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
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeeDepartmentsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeDepartmentsDialogFooter} onHide={this.hideDeleteEmployeeDepartmentsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeedepartment && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeedepartments: state.employeedepartments.employeedepartments,
    employees: state.employees.employees,
})

export default connect(mapStateToProps, {
    getEmployeeDepartments,
    getEmployees,
    addEmployeeDepartment,
    editEmployeeDepartment,
    deleteEmployeeDepartment }
) (EmployeeDepartments);
