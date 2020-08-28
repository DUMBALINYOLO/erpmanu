import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {ProgressBar} from 'primereact/progressbar';
import { Link } from 'react-router-dom';
import { getEmployeePayrollSchedules} from '..//../actions/employeepayrollschedules';
import "./form.css";


class EmployeePayrollSchedules extends Component {

    emptyEmployeePayrollSchedule = {
        name: ''
    };

    constructor() {
        super();
        this.state = {
            employeepayrollschedules: null,
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePayrollSchedules: null,
            employeepayrollscheduleDialog: false,
            deleteEmployeePayrollScheduleDialog: false,
            deleteEmployeePayrollSchedulesDialog: false,
            employeepayrollschedule: this.emptyEmployeePayrollSchedule,
            submitted: false,

        };
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);       //custom filter function
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this)
        this.onDateFilterChange = this.onDateFilterChange.bind(this)
        this.formatDate = this.formatDate.bind(this)

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.editEmployeePayrollSchedule = this.editEmployeePayrollSchedule.bind(this);
        this.confirmDeleteEmployeePayrollSchedule = this.confirmDeleteEmployeePayrollSchedule.bind(this);
        this.deleteEmployeePayrollSchedule = this.deleteEmployeePayrollSchedule.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePayrollSchedules = this.deleteSelectedEmployeePayrollSchedules.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePayrollScheduleDialog = this.hideDeleteEmployeePayrollScheduleDialog.bind(this);
        this.hideDeleteEmployeePayrollSchedulesDialog = this.hideDeleteEmployeePayrollSchedulesDialog.bind(this);

    }

    static propTypes = {
        employeepayrollschedules : PropTypes.array.isRequired,
        getEmployeePayrollSchedules: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getEmployeePayrollSchedules();
    }

    openNew() {
        this.setState({
            employeepayrollschedule: this.emptyEmployeePayrollSchedule,
            submitted: false,
            employeepayrollscheduleDialog: true
        });
    }

    saveEmployeePayrollSchedule = (e) => {
      e.preventDefault();
      const { name } = this.state;
      const employeepayrollschedule = { name };
      this.props.addEmployeePayrollSchedule(employeepayrollschedule);
      this.setState({
        name: ''
      });
      this.props.history.push('/employeepayrollschedules');
    };

    hideDialog() {
        this.setState({
            submitted: false,
            employeepayrollscheduleDialog: false
        });
    }

    hideDeleteEmployeePayrollScheduleDialog() {
        this.setState({ deleteEmployeePayrollScheduleDialog: false });
    }

    hideDeleteEmployeePayrollSchedulesDialog() {
        this.setState({ deleteEmployeePayrollSchedulesDialog: false });
    }

    editEmployeePayrollSchedule(employeepayrollschedule) {
        this.setState({
            employeepayrollschedule: { ...employeepayrollschedule },
            employeepayrollscheduleDialog: true
        });
        this.props.history.push('/employeepayrollschedules');
    }

    confirmDeleteEmployeePayrollSchedule(employeepayrollschedule) {
        this.setState({
            employeepayrollschedule,
            deleteEmployeePayrollScheduleDialog: true
        });
    }

    deleteEmployeePayrollSchedule() {
        this.props.deleteEmployeePayrollSchedule()
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePayrollSchedulesDialog: true });
    }

    deleteSelectedEmployeePayrollSchedules() {
        let employeepayrollschedules = this.state.employeepayrollschedules.filter(val => !this.state.selectedEmployeePayrollSchedules.includes(val));
        this.setState({
            employeepayrollschedules,
            deleteEmployeePayrollSchedulesDialog: false,
            selectedEmployeePayrollSchedules: null
        });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });



    renderHeader() {
        return (
            <div className="table-head">
                <h1 className="pb-2">Manage Employee Payroll Schedules</h1>
                <div className="datatable-fancy-icons">
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-pdf" iconPos="right" label="PDF" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-excel" iconPos="right" label="CSV" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-print" iconPos="right" label="PRINT" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <InputText className="fancy-iconz p-ml-2" type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" />
                </div>
                <div>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedEmployeePayrollSchedules || !this.state.selectedEmployeePayrollSchedules.length}/>
                </div>
            </div>
        )
    }

    activityBodyTemplate(rowData) {
        return <ProgressBar value={rowData.activity} showValue={false} />;
    }

    actionBodyTemplate(rowData) {
        return (
            <Link to="/">
                <Button type="button" label="VIEW-ME" icon="pi pi-pencil" className="p-button-warning p-button-rounded"></Button>
            </Link>
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

        const employeepayrollscheduleDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePayrollSchedule} />
            </>
        );
        const deleteEmployeePayrollScheduleDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayrollScheduleDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteEmployeePayrollSchedule} />
            </>
        );
        const deleteEmployeePayrollSchedulesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayrollSchedulesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePayrollSchedules} />
            </>
        );

        const header = this.renderHeader();

        const { name } = this.state;

        return (
            <div className="datatable-doc-demo">
                <DataTable ref={(el) => this.dt = el} value={this.props.employeepayrollschedules}
                    style={{background: '#4EB08E'}}
                    header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                    selection={this.state.selectedEmployeePayrollSchedules} onSelectionChange={e => this.setState({selectedEmployeePayrollSchedules: e.value})}
                    paginator rows={10} emptyMessage="No EmployeePayrollSchedules found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                        header="EDIT"
                        body={this.actionBodyTemplate}
                        headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                    />
                </DataTable>

                <Dialog visible={this.state.EmployeePayrollScheduleDialog} editEmployeePayrollSchedule={this.editEmployeePayrollSchedule} style={{ width: '450px' }} header="Employee Payroll Schedule Details" modal className="p-fluid" footer={employeepayrollscheduleDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText
                          name="name"
                          onChange={this.onChange}
                          value={name}
                        />
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteEmployeePayrollScheduleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayrollScheduleDialogFooter} onHide={this.hideDeleteEmployeePayrollScheduleDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.employeepayrollschedule && <span>Are you sure you want to delete <b>{this.state.employeepayrollschedule.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteEmployeePayrollSchedulesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayrollSchedulesDialogFooter} onHide={this.hideDeleteEmployeePayrollSchedulesDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.employeepayrollschedule && <span>Are you sure you want to delete the selected?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    employeepayrollschedules: state.employeepayrollschedules.employeepayrollschedules
})

export default connect(mapStateToProps, {getEmployeePayrollSchedules} ) (EmployeePayrollSchedules);
