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
import { getEmployeeAttendanceTimesheets, addEmployeeAttendanceTimesheet, editEmployeeAttendanceTimesheet, deleteEmployeeAttendanceTimesheet } from '..//../actions/employeeattendancetimesheets';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeTimesheetMonthChoices, getEmployeeYearChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";


class EmployeeAttendanceTimesheets extends Component {

    emptyEmployeeAttendanceTimesheet = {
        employee: null,
        month: null,
        year: null,
        recorded_by: null,
        complete: false,
    };


    constructor() {
        super();
        this.state = {
            employeeattendancetimesheets: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeAttendanceTimesheets: null,
            employeeattendancetimesheetDialog: false,
            deleteEmployeeAttendanceTimesheetDialog: false,
            deleteEmployeeAttendanceTimesheetsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                employee: null,
                month: null,
                year: null,
                recorded_by: null,
                complete: false,
            },
            newData: {
                employee: null,
                month: null,
                year: null,
                recorded_by: null,
                complete: false,
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
        this.saveEmployeeAttendanceTimesheet = this.saveEmployeeAttendanceTimesheet.bind(this);
        this.editEmployeeAttendanceTimesheet = this.editEmployeeAttendanceTimesheet.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeAttendanceTimesheet = this.confirmDeleteEmployeeAttendanceTimesheet.bind(this);
        this.deleteEmployeeAttendanceTimesheet = this.deleteEmployeeAttendanceTimesheet.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeAttendanceTimesheets = this.deleteSelectedEmployeeAttendanceTimesheets.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeAttendanceTimesheetDialog = this.hideDeleteEmployeeAttendanceTimesheetDialog.bind(this);
        this.hideDeleteEmployeeAttendanceTimesheetsDialog = this.hideDeleteEmployeeAttendanceTimesheetsDialog.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onMonth = this.onMonth.bind(this);
        this.onYear = this.onYear.bind(this);
        this.onRecordedBy = this.onRecordedBy.bind(this);
        this.onComplete = this.onComplete.bind(this);
    }

    onEmployee (e){
        this.setState({employee: e.value})
    }

    onMonth (e){
        this.setState({month: e.value})
    }

    onYear (e){
        this.setState({year: e.value})
    }

    onRecordedBy (e){
        this.setState({recorded_by: e.value})
    }

    onComplete() {
        this.setState({
            complete: !this.state.checked
        });
    }


    static propTypes = {
        employeeattendancetimesheets : PropTypes.array.isRequired,
        getEmployeeAttendanceTimesheets: PropTypes.func.isRequired,
        addEmployeeAttendanceTimesheet: PropTypes.func.isRequired,
        editEmployeeAttendanceTimesheet: PropTypes.func.isRequired,
        deleteEmployeeAttendanceTimesheet: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getCustomerStatusChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeeAttendanceTimesheets()
        this.props.getEmployees()
        this.props.getEmployeeTimesheetMonthChoices()
        this.props.getEmployeeYearChoices()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                employee: null,
                month: null,
                year: null,
                recorded_by: null,
                complete: false,
            },
            submitted: false,
            employeeattendancetimesheetDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeeattendancetimesheetDialog: false
        });
    }

    hideDeleteEmployeeAttendanceTimesheetDialog() {
        this.setState({ deleteEmployeeAttendanceTimesheetDialog: false });
    }

    hideDeleteEmployeeAttendanceTimesheetsDialog() {
        this.setState({ deleteEmployeeAttendanceTimesheetsDialog: false });
    }


    saveEmployeeAttendanceTimesheet = (e) => {
        e.preventDefault();
        const {
            employee,
            month,
            year,
            recorded_by,
            complete,
        } = this.state;
        const employeeattendancetimesheet = {
            employee,
            month,
            year,
            recorded_by,
            complete,
        };
        this.props.addEmployeeAttendanceTimesheet(employeeattendancetimesheet);
        this.setState({
            employee: null,
            month: null,
            year: null,
            recorded_by: null,
            complete: true,
            employeeattendancetimesheetDialog: false
        });
        this.props.history.push('/employeeattendancetimesheets');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                employee: null,
                month: null,
                year: null,
                recorded_by: null,
                complete: false,
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


    editEmployeeAttendanceTimesheet(e) {
        const errors = this.editDataValidateError();
        const {
            employee,
            month,
            year,
            recorded_by,
            complete,

        } = this.state.selectRow;
        const employeeattendancetimesheet = {
            employee,
            month,
            year,
            recorded_by,
            complete,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeAttendanceTimesheet(this.state.selectRow.id, employeeattendancetimesheet);
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


    confirmDeleteEmployeeAttendanceTimesheet(employeeattendancetimesheet) {
        this.setState({
            employeeattendancetimesheet,
            deleteEmployeeAttendanceTimesheetDialog: true
        });
    }

    deleteEmployeeAttendanceTimesheet() {
        this.props.deleteEmployeeAttendanceTimesheet();
        this.setState({
            deleteEmployeeAttendanceTimesheetDialog: false,
            employeeattendancetimesheet: this.emptyActiveCustomer
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeAttendanceTimesheetsDialog: true });
    }

    deleteSelectedEmployeeAttendanceTimesheets() {
        this.props.deleteEmployeeAttendanceTimesheet();
        this.setState({
            deleteEmployeeAttendanceTimesheetsDialog: false,
            selectedEmployeeAttendanceTimesheets: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Attendance Timesheet</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE ATTENDANCE TIMESHEET" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeAttendanceTimesheet(rowData)} />
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
        const employeeattendancetimesheetDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeAttendanceTimesheet} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeAttendanceTimesheet}/>
            </div>
        );


        const deleteEmployeeAttendanceTimesheetsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeAttendanceTimesheetsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeAttendanceTimesheets} />
            </>
        );

        const header = this.renderHeader();
        const {
          employee,
          month,
          year,
          recorded_by,
        } = this.state;

        const {employeetimesheetmonthchoices} = this.props;
        const {employeeyearchoices} = this.props;
        const {employees} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeeattendancetimesheets}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeeAttendanceTimesheets} onSelectionChange={e => this.setState({selectedEmployeeAttendanceTimesheets: e.value})}
                        paginator rows={10} emptyMessage="No Employee Attendance Timesheets found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="reference_number"
                            header="Reference Number"
                            sortable filter
                            filterPlaceholder="Search by Reference Number"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="month"
                            header="Month"
                            sortable filter
                            filterPlaceholder="Search by Month"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="year"
                            header="Year"
                            sortable filter
                            filterPlaceholder="Search by Year"
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
                        visible={this.state.employeeattendancetimesheetDialog}
                        style={{ width: '900px' }}
                        header="Employee Attendance Timesheet Details"
                        modal className="p-fluid"
                        footer={employeeattendancetimesheetDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={employee}
                                onChange={this.onEmployee}
                                options={employee}
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
                                value={recorded_by}
                                onChange={this.onRecordedBy}
                                options={employee}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT RECORDED BY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={month}
                                onChange={this.onMonth}
                                options={employeetimesheetmonthchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT MONTH</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={year}
                                onChange={this.onYear}
                                options={employeeyearchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT YEAR</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>COMPLETE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onComplete}
                                checked={this.state.complete}
                            />
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE ATTANDANCE TIMESHEET"
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
                                id="inMonth"
                                value={this.state.selectRow.month}
                                options={employeetimesheetmonthchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        month: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inYear"
                                value={this.state.selectRow.year}
                                options={employeeyearchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        year: e.target.value
                                    }
                                })
                            }/>
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
                                id="inRecordedBy"
                                value={this.state.selectRow.recorded_by}
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
                                        recorded_by: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>COMPLETE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            complete: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.complete}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteEmployeeAttendanceTimesheetsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeAttendanceTimesheetsDialogFooter} onHide={this.hideDeleteEmployeeAttendanceTimesheetsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeeattendancetimesheet && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    employeeattendancetimesheets: state.employeeattendancetimesheets.employeeattendancetimesheets,
    employeetimesheetmonthchoices: state.employeetimesheetmonthchoices.employeetimesheetmonthchoices,
    employeeyearchoices: state.employeeyearchoices.employeeyearchoices,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {
    getEmployees,
    getEmployeeYearChoices,
    getEmployeeTimesheetMonthChoices,
    getEmployeeAttendanceTimesheets,
    editEmployeeAttendanceTimesheet,
    deleteEmployeeAttendanceTimesheet,
    addEmployeeAttendanceTimesheet} ) (EmployeeAttendanceTimesheets);
