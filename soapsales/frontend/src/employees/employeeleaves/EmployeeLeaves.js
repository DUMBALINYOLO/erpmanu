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
import { getEmployeeLeaves, addEmployeeLeave, editEmployeeLeave, deleteEmployeeLeave } from '..//../actions/employeeleaves';
import { getEmployees } from '..//../actions/employees';
import { getEmployeeLeaveCategoryChoices, getEmployeeLeaveStatusChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";

class EmployeeLeaves extends Component {

    emptyEmployeeLeave = {
        start_date: '',
        end_date: '',
        employee: null,
        category: null,
        status: null,
        authorized_by: null,
        notes: '',
        recorded: false,
    };


    constructor() {
        super();
        this.state = {
            employeeleaves: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeeLeaves: null,
            employeeleaveDialog: false,
            deleteEmployeeLeaveDialog: false,
            deleteEmployeeLeavesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                start_date: '',
                end_date: '',
                employee: null,
                category: null,
                status: null,
                authorized_by: null,
                notes: '',
                recorded: false,
            },
            newData: {
                start_date: '',
                end_date: '',
                employee: null,
                category: null,
                status: null,
                authorized_by: null,
                notes: '',
                recorded: false,
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
        this.saveEmployeeLeave = this.saveEmployeeLeave.bind(this);
        this.editEmployeeLeave = this.editEmployeeLeave.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeeLeave = this.confirmDeleteEmployeeLeave.bind(this);
        this.deleteEmployeeLeave = this.deleteEmployeeLeave.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeeLeaves = this.deleteSelectedEmployeeLeaves.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeeLeaveDialog = this.hideDeleteEmployeeLeaveDialog.bind(this);
        this.hideDeleteEmployeeLeavesDialog = this.hideDeleteEmployeeLeavesDialog.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onStatus = this.onStatus.bind(this);
        this.onAuthorizedBy = this.onAuthorizedBy.bind(this);
        this.onRecorded = this.onRecorded.bind(this);
    }

    onRecorded() {
        this.setState({
          recorded: !this.state.checked
        });
    }

    onCategory (e){
        this.setState({category: e.value})
    }

    onEmployee (e){
        this.setState({employee: e.value})
    }

    onStatus (e){
        this.setState({status: e.value})
    }

    onAuthorizedBy (e){
        this.setState({authorized_by: e.value})
    }

    static propTypes = {
        employeeleaves : PropTypes.array.isRequired,
        getEmployeeLeaves: PropTypes.func.isRequired,
        addEmployeeLeave: PropTypes.func.isRequired,
        editEmployeeLeave: PropTypes.func.isRequired,
        deleteEmployeeLeave: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEmployeeLeaveStatusChoices: PropTypes.func.isRequired,
        getEmployeeLeaveCategoryChoices: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                start_date: '',
                end_date: '',
                employee: null,
                category: null,
                status: null,
                authorized_by: null,
                notes: '',
                recorded: false,
            },
            submitted: false,
            employeeleaveDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeeleaveDialog: false
        });
    }

    hideDeleteEmployeeLeaveDialog() {
        this.setState({ deleteEmployeeLeaveDialog: false });
    }

    hideDeleteEmployeeLeavesDialog() {
        this.setState({ deleteEmployeeLeavesDialog: false });
    }

    componentDidMount() {
        this.props.getEmployeeLeaves()
        this.props.getEmployees()
        this.props.getEmployeeLeaveCategoryChoices()
        this.props.getEmployeeLeaveStatusChoices()
    }


    saveEmployeeLeave = (e) => {
        e.preventDefault();
        const {
            start_date,
            end_date,
            employee,
            category,
            status,
            authorized_by,
            notes,
            recorded,
        } = this.state;
        const employeeleave = {
            start_date,
            end_date,
            employee,
            category,
            status,
            authorized_by,
            notes,
            recorded,
        };
        this.props.addEmployeeLeave(employeeleave);
        this.setState({
            start_date: '',
            end_date: '',
            employee: '',
            category: '',
            status: '',
            authorized_by: '',
            notes: '',
            recorded: true,
            employeeleaveDialog: false
        });
        this.props.history.push('/employeeleaves');
    };

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                start_date: '',
                end_date: '',
                employee: '',
                category: '',
                status: '',
                authorized_by: '',
                notes: '',
                recorded: false,
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


    editEmployeeLeave(e) {
        const errors = this.editDataValidateError();
        const {
            start_date,
            end_date,
            employee,
            category,
            status,
            authorized_by,
            notes,
            recorded,
        } = this.state.selectRow;
        const employeeleave = {
            start_date,
            end_date,
            employee,
            category,
            status,
            authorized_by,
            notes,
            recorded,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeeLeave(this.state.selectRow.id, employeeleave);
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


    confirmDeleteEmployeeLeave(employeeleave) {
        this.setState({
            employeeleave,
            deleteEmployeeLeaveDialog: true
        });
    }

    deleteEmployeeLeave() {
        this.props.deleteEmployeeLeave();
        this.setState({
            deleteEmployeeLeaveDialog: false,
            employeeleave: this.emptyEmployeeLeave
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeeLeavesDialog: true });
    }

    deleteSelectedEmployeeLeaves() {
        this.props.deleteEmployeeLeave();
        this.setState({
            deleteEmployeeLeavesDialog: false,
            selectedEmployeeLeaves: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Leave</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE LEAVE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeeLeave(rowData)} />
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
        const employeeleaveDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeeLeave} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeeLeave}/>
            </div>
        );


        const deleteEmployeeLeavesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeeLeavesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeeLeaves} />
            </>
        );

        const header = this.renderHeader();
        const {
          start_date,
          end_date,
          employee,
          category,
          status,
          authorized_by,
          notes,
        } = this.state;

        const {employeeleavecategorychoices} = this.props;
        const { employeeleavestatuschoices } = this.props;
        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeeleaves}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeeLeaves} onSelectionChange={e => this.setState({selectedEmployeeLeaves: e.value})}
                        paginator rows={10} emptyMessage="No Employee Leaves found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="category"
                            header="Category"
                            sortable filter
                            filterPlaceholder="Search by Category"
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
                            field="status"
                            header="Status"
                            sortable filter
                            filterPlaceholder="Search by Status"
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
                        visible={this.state.employeeleaveDialog}
                        style={{ width: '900px' }}
                        header="Employee Leave Details"
                        modal className="p-fluid"
                        footer={employeeleaveDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
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
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Calendar
                                        showIcon={true}
                                        name="end_date"
                                        onChange={this.onChange}
                                        value={end_date}
                                        dateFormat="yy-mm-dd"
                                    />
                                    <label htmlFor="inputtext">End Date</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <InputTextarea
                                        name="notes"
                                        onChange={this.onChange}
                                        value={notes}
                                    />
                                    <label htmlFor="inputtext">Notes</label>
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
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={authorized_by}
                                        onChange={this.onAuthorizedBy}
                                        options={employees}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT AUTHORIZED BY</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={category}
                                        onChange={this.onCategory}
                                        options={employeeleavecategorychoices}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="value"
                                        optionValue="key"
                                    />
                                    <label htmlFor="inputtext">SELECT CATEGORY</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={status}
                                        onChange={this.onStatus}
                                        options={employeeleavestatuschoices}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="value"
                                        optionValue="key"
                                    />
                                    <label htmlFor="inputtext">SELECT STATUS</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                                <label>RECORDED :</label>
                                <Checkbox
                                    inputId="working"
                                    onChange={this.onRecorded}
                                    checked={this.state.recorded}
                                />
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE EMPLOYEE LEAVE"
                        modal={true} onHide={this.onHideEditDialog}
                    >
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
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inEndDate"
                                value={this.state.selectRow.end_date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        end_date: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <span className="ui-float-label">
                            <InputTextarea id="inNotes" value={this.state.selectRow.notes}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        notes: e.target.value
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
                        <span className="p-float-label">
                            <Dropdown
                                id="inAuthorizedBy"
                                value={this.state.selectRow.authorized_by}
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
                                        authorized_by: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="p-float-label">
                            <Dropdown
                                id="inCategory"
                                value={this.state.selectRow.category}
                                options={employeeleavecategorychoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        category: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="p-float-label">
                            <Dropdown
                                id="inCategory"
                                value={this.state.selectRow.status}
                                options={employeeleavestatuschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        status: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>RECORDED :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            recorded: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.recorded}
                            />
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeeLeavesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeLeavesDialogFooter} onHide={this.hideDeleteEmployeeLeavesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeeleave && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeeleaves: state.employeeleaves.employeeleaves,
    employeeleavestatuschoices: state.employeeleavestatuschoices.employeeleavestatuschoices,
    employeeleavecategorychoices: state.employeeleavecategorychoices.employeeleavecategorychoices,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {
    getEmployeeLeaves,
    getEmployeeLeaveCategoryChoices,
    getEmployees,
    getEmployeeLeaveStatusChoices,
    addEmployeeLeave,
    editEmployeeLeave,
    deleteEmployeeLeave }
) (EmployeeLeaves);
