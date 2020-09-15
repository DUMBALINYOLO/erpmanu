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
import { getEmployeePayrollDates, addEmployeePayrollDate, deleteEmployeePayrollDate, editEmployeePayrollDate } from '..//../actions/employeepayrolldates';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeDepartments } from '..//../actions/employeedepartments';
import { getEmployeePaygrades } from '..//../actions/employeepaygrades';
import { getEmployeePayrollSchedules } from '..//../actions/employeepayrollschedules';
import { getEmployeePayrollDateChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import {Dropdown} from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import "./form.css";

class EmployeePayrollDates extends Component {

    emptyEmployeePayrollDate = {
        date: null,
        employee: null,
        departments: null,
        pay_grades: null,
        schedule: null
    };


    constructor() {
        super();
        this.state = {
            employeepayrolldates: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePayrollDates: null,
            employeepayrolldateDialog: false,
            deleteEmployeePayrollDateDialog: false,
            deleteEmployeePayrollDatesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                date: null,
                employee: null,
                departments: null,
                pay_grades: null,
                schedule: null
            },
            newData: {
                date: null,
                employee: null,
                departments: null,
                pay_grades: null,
                schedule: null
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
        this.saveEmployeePayrollDate = this.saveEmployeePayrollDate.bind(this);
        this.editEmployeePayrollDate = this.editEmployeePayrollDate.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeePayrollDate = this.confirmDeleteEmployeePayrollDate.bind(this);
        this.deleteEmployeePayrollDate = this.deleteEmployeePayrollDate.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePayrollDates = this.deleteSelectedEmployeePayrollDates.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePayrollDateDialog = this.hideDeleteEmployeePayrollDateDialog.bind(this);
        this.hideDeleteEmployeePayrollDatesDialog = this.hideDeleteEmployeePayrollDatesDialog.bind(this);
        this.onDate = this.onDate.bind(this);
        this.onDepartments = this.onDepartments.bind(this);
        this.onPayGrades = this.onPayGrades.bind(this);
        this.onSchedule = this.onSchedule.bind(this);
    }

    onDate (e){
        this.setState({date: e.value})
    }

    onDepartments (e){
        this.setState({departments: e.value})
    }

    onPayGrades (e){
        this.setState({pay_grades: e.value})
    }

    onSchedule (e){
        this.setState({schedule: e.value})
    }

    static propTypes = {
        employeepayrolldates : PropTypes.array.isRequired,
        getEmployeePayrollDates: PropTypes.func.isRequired,
        addEmployeePayrollDate: PropTypes.func.isRequired,
        editEmployeePayrollDate: PropTypes.func.isRequired,
        deleteEmployeePayrollDate: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeDepartments: PropTypes.func.isRequired,
        getEmployeePaygrades: PropTypes.func.isRequired,
        getEmployeePayrollSchedules: PropTypes.func.isRequired,
        getEmployeePayrollDateChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeePayrollDates()
        this.props.getEmployees()
        this.props.getEmployeeDepartments()
        this.props.getEmployeePaygrades()
        this.props.getEmployeePayrollSchedules()
        this.props.getEmployeePayrollDateChoices()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                date: null,
                employee: null,
                departments: null,
                pay_grades: null,
                schedule: null
            },
            submitted: false,
            employeepayrolldateDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeepayrolldateDialog: false
        });
    }

    hideDeleteEmployeePayrollDateDialog() {
        this.setState({ deleteEmployeePayrollDateDialog: false });
    }

    hideDeleteEmployeePayrollDatesDialog() {
        this.setState({ deleteEmployeePayrollDatesDialog: false });
    }


    saveEmployeePayrollDate = (e) => {
        e.preventDefault();
        const {
            date,
            employee,
            departments,
            pay_grades,
            schedule
        } = this.state;
        const employeepayrolldate = {
            date,
            employee,
            departments,
            pay_grades,
            schedule
        };
        this.props.addEmployeePayrollDate(employeepayrolldate);
        this.setState({
            date: '',
            employee: '',
            departments: '',
            pay_grades: '',
            schedule: '',
            employeepayrolldateDialog: false
        });
        this.props.history.push('/employeepayrolldates');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                date: '',
                employee: '',
                departments: '',
                pay_grades: '',
                schedule: ''
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


    editEmployeePayrollDate(e) {
        const errors = this.editDataValidateError();
        const {
            date,
            employee,
            departments,
            pay_grades,
            schedule

        } = this.state.selectRow;
        const employeepayrolldate = {
            date,
            employee,
            departments,
            pay_grades,
            schedule
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeePayrollDate(this.state.selectRow.id, employeepayrolldate);
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


    confirmDeleteEmployeePayrollDate(employeepayrolldate) {
        this.setState({
            employeepayrolldate,
            deleteEmployeePayrollDateDialog: true
        });
    }

    deleteEmployeePayrollDate() {
        this.props.deleteEmployeePayrollDate();
        this.setState({
            deleteEmployeePayrollDateDialog: false,
            employeepayrolldate: this.emptyEmployeePayrollDate
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePayrollDatesDialog: true });
    }

    deleteSelectedEmployeePayrollDates() {
        this.props.deleteEmployeePayrollDate();
        this.setState({
            deleteEmployeePayrollDatesDialog: false,
            selectedEmployeePayrollDates: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Payroll Date</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE PAYROLL DATE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeePayrollDate(rowData)} />
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
        const employeepayrolldateDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePayrollDate} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeePayrollDate}/>
            </div>
        );


        const deleteEmployeePayrollDatesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayrollDatesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePayrollDates} />
            </>
        );

        const header = this.renderHeader();
        const { date, employee, departments, pay_grades, schedule } = this.state;
        const { employees } = this.props;
        const { employeedepartments } = this.props;
        const { employeepaygrades } = this.props;
        const { employeepayrollschedules } = this.props;
        const { employeepayrolldatechoices } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeepayrolldates}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeePayrollDates} onSelectionChange={e => this.setState({selectedEmployeePayrollDates: e.value})}
                        paginator rows={10} emptyMessage="No Employee Payroll Dates found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="schedule"
                            header="Schedule"
                            sortable filter
                            filterPlaceholder="Search by Schedule"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="number_of_employees"
                            header="Number Of Employees"
                            sortable filter
                            filterPlaceholder="Search by Number Of Employees"
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
                        visible={this.state.employeepayrolldateDialog}
                        style={{ width: '900px' }}
                        header="Employee Payroll Date Details"
                        modal className="p-fluid"
                        footer={employeepayrolldateDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={employee}
                                onChange={this.onEmployees}
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
                                value={date}
                                onChange={this.onDate}
                                options={employeepayrolldatechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT DATE</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={departments}
                                onChange={this.onDepartments}
                                options={employeedepartments}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT DEPARTMENTS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                            value={pay_grades}
                            onChange={this.onPayGrades}
                            options={employeepaygrades}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT PAYGRADES</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={schedule}
                                onChange={this.onSchedule}
                                options={employeepayrollschedules}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT PAYROLL SCHEDULE</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE PAYROLL DATE"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEmployee"
                                value={this.state.selectRow.employee}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            employee: e.target.value
                                        }
                                    })
                                }
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inDate"
                                value={this.state.selectRow.date}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            date: e.target.value
                                        }
                                    })
                                }
                                options={employeepayrolldatechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inDepartments"
                                value={this.state.selectRow.departments}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            departments: e.target.value
                                        }
                                    })
                                }
                                options={employeedepartments}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inPayGrades"
                                value={this.state.selectRow.pay_grades}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            pay_grades: e.target.value
                                        }
                                    })
                                }
                                options={employeepaygrades}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inSchedule"
                                value={this.state.selectRow.schedule}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            schedule: e.target.value
                                        }
                                    })
                                }
                                options={employeepayrollschedules}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            </span>
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeePayrollDatesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayrollDatesDialogFooter} onHide={this.hideDeleteEmployeePayrollDatesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeepayrolldate && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    employeepayrolldates: state.employeepayrolldates.employeepayrolldates,
    employees: state.employees.employees,
    employeedepartments: state.employeedepartments.employeedepartments,
    employeepaygrades: state.employeepaygrades.employeepaygrades,
    employeepayrollschedules: state.employeepayrollschedules.employeepayrollschedules,
    employeepayrolldatechoices: state.employeepayrolldatechoices.employeepayrolldatechoices
})

export default connect(mapStateToProps, {
    getEmployees,
    getEmployeeDepartments,
    getEmployeePaygrades,
    getEmployeePayrollSchedules,
    getEmployeePayrollDateChoices,
    getEmployeePayrollDates,
    deleteEmployeePayrollDate,
    editEmployeePayrollDate,
    addEmployeePayrollDate } ) (EmployeePayrollDates);
