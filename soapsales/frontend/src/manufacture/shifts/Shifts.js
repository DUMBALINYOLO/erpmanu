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
import { Dialog } from 'primereact/dialog';
import { getShifts, addShift, editShift, deleteShift } from '..//../actions/shifts';
import {getEmployees} from "..//../actions/employees";
import {getManufacturingTeams} from "..//../actions/manufacturingteams";
import {getProcessMachines} from "..//../actions/processmachines";
import "./form.css";

class Shifts extends Component {

    emptyShift = {
        name: '',
        team: null,
        supervisor: null,
        employee: null,
        machine: null
    };

    constructor() {
        super();
        this.state = {
            shifts : [],
            globalFilter: null,
            dateFilter: null,
            selectedShifts: null,
            shiftDialog: false,
            deleteShiftDialog: false,
            deleteShiftsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                team: null,
                supervisor: null,
                employee: null,
                machine: null
            },
            newData: {
                name: '',
                team: null,
                supervisor: null,
                employee: null,
                machine: null
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
        this.saveShift = this.saveShift.bind(this);
        this.editShift = this.editShift.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteShifts = this.confirmDeleteShifts.bind(this);
        this.deleteShift = this.deleteShift.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedShifts = this.deleteSelectedShifts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteShiftDialog = this.hideDeleteShiftDialog.bind(this);
        this.hideDeleteShiftsDialog = this.hideDeleteShiftsDialog.bind(this);
        this.onTeam = this.onTeam.bind(this);
        this.onSupervisor = this.onSupervisor.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onMachine = this.onMachine.bind(this);
    }

    onTeam(e){
        this.setState({team: e.value})
    }

    onSupervisor(e){
        this.setState({supervisor: e.value})
    }

    onEmployee(e){
        this.setState({employee: e.value})
    }

    onMachine(e){
        this.setState({machine: e.value})
    }

    static propTypes = {
        shifts : PropTypes.array.isRequired,
        getShifts: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getManufacturingTeams: PropTypes.func.isRequired,
        getProcessMachines: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getShifts();
        this.props.getEmployees()
        this.props.getManufacturingTeams()
        this.props.getProcessMachines()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                team: null,
                supervisor: null,
                employee: null,
                machine: null
            },
            submitted: false,
            shiftDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            shiftDialog: false
        });
    }

    hideDeleteShiftDialog() {
        this.setState({ deleteShiftDialog: false });
    }

    hideDeleteShiftsDialog() {
        this.setState({ deleteShiftsDialog: false });
    }

    saveShift = (e) => {
        e.preventDefault();
        const {
            name,
            team,
            supervisor,
            employee,
            machine
        } = this.state;
        const shift = {
            name,
            team,
            supervisor,
            employee,
            machine
        };
        this.props.addShift(shift);
        this.setState({
            name: '',
            team: null,
            supervisor: null,
            employee: null,
            machine: null,
            shiftDialog: false
        });
        this.props.history.push('/shifts');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                team: null,
                supervisor: null,
                employee: null,
                machine: null
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

    editShift(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            team,
            supervisor,
            employee,
            machine
        } = this.state.selectRow;
        const shift = {
            name,
            team,
            supervisor,
            employee,
            machine
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editShift(this.state.selectRow.id, shift);
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

    confirmDeleteShifts(shift) {
        this.setState({
            shift,
            deleteShiftDialog: true
        });
    }

    deleteShift() {
        this.props.deleteShift();
        this.setState({
            deleteShiftDialog: false,
            shift: this.emptyShift
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteShiftsDialog: true });
    }

    deleteSelectedShifts() {
        this.props.deleteShift();
        this.setState({
            deleteShiftsDialog: false,
            selectedShifts: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Shift</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW SHIFT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteShifts(rowData)} />
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
        const shiftDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveShift} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editShift}/>
            </div>
        );

        const header = this.renderHeader();
        const {
          name,
          team,
          supervisor,
          employee,
          machine
        } = this.state;

        const { employees } = this.props;
        const { manufacturingteams } = this.props;
        const { processmachines } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.shifts}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedShifts} onSelectionChange={e => this.setState({selectedShifts: e.value})}
                        paginator rows={10} emptyMessage="No Shifts found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="name"
                            header="Name"
                            sortable filter filterPlaceholder="Search by Name"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="team"
                            header="Team"
                            sortable filter filterPlaceholder="Search by Team"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="supervisor"
                            header="Supervisor"
                            sortable filter filterPlaceholder="Search by Supervisor"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="machine"
                            header="Machine"
                            sortable filter filterPlaceholder="Search by Machine"
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
                        visible={this.state.shiftDialog}
                        style={{ width: '900px' }}
                        header=" Create Shift"
                        modal
                        className="p-fluid"
                        footer={shiftDialogFooter}
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
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={team}
                                        onChange={this.onTeam}
                                        options={manufacturingteams}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT TEAM</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={supervisor}
                                        onChange={this.onSupervisor}
                                        options={employees}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="employee_number"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT SUPERVISOR</label>
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
                                        optionLabel="employee_number"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT EMPLOYEE</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={machine}
                                        onChange={this.onMachine}
                                        options={processmachines}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="equipment"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT MACHINE</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE SHIFT"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
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
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    shifts: state.shifts.shifts,
    employees: state.employees.employees,
    processmachines: state.processmachines.processmachines,
    manufacturingteams: state.manufacturingteams.manufacturingteams})

export default connect(
    mapStateToProps,
    {
        getShifts,
        addShift,
        deleteShift,
        editShift,
        getEmployees,
        getProcessMachines,
        getManufacturingTeams,
    }) (Shifts);
