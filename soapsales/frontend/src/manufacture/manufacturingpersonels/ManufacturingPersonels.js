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
import { getManufacturingPersonels, addManufacturingPersonel, editManufacturingPersonel, deleteManufacturingPersonel } from '..//../actions/manufacturingpersonels';
import { getEmployees } from '..//../actions/employees';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";

class ManufacturingPersonels extends Component {

    emptyManufacturingPersonel = {
        employee: null,
        is_manager: false,
        can_authorize_equipment_requisitions: false,
        can_authorize_consumables_requisitions: false,
    };


    constructor() {
        super();
        this.state = {
            manufacturingpersonels: [],
            globalFilter: null,
            dateFilter: null,
            selectedManufacturingPersonels: null,
            manufacturingpersonelDialog: false,
            deleteManufacturingPersonelDialog: false,
            deleteManufacturingPersonelsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                employee: null,
                is_manager: false,
                can_authorize_equipment_requisitions: false,
                can_authorize_consumables_requisitions: false,
            },
            newData: {
                employee: null,
                is_manager: false,
                can_authorize_equipment_requisitions: false,
                can_authorize_consumables_requisitions: false,
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
        this.saveManufacturingPersonel = this.saveManufacturingPersonel.bind(this);
        this.editManufacturingPersonel = this.editManufacturingPersonel.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteManufacturingPersonel = this.confirmDeleteManufacturingPersonel.bind(this);
        this.deleteManufacturingPersonel = this.deleteManufacturingPersonel.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedManufacturingPersonels = this.deleteSelectedManufacturingPersonels.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteManufacturingPersonelDialog = this.hideDeleteManufacturingPersonelDialog.bind(this);
        this.hideDeleteManufacturingPersonelsDialog = this.hideDeleteManufacturingPersonelsDialog.bind(this);
        this.handleIsManger = this.handleIsManger.bind(this);
        this.handleEquipment = this.handleEquipment.bind(this);
        this.handleConsumables = this.handleConsumables.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
    }

    handleIsManger() {
        this.setState({
            is_manager: !this.state.checked
        });
    }

    handleEquipment(event) {
        this.setState({
            can_authorize_equipment_requisitions: !this.state.checked
        });
    }

    handleConsumables(event) {
        this.setState({
            can_authorize_consumables_requisitions: !this.state.checked
        });
    }

    onEmployee (e){
        this.setState({employee: e.value})
    }

    static propTypes = {
        manufacturingpersonels : PropTypes.array.isRequired,
        getManufacturingPersonels: PropTypes.func.isRequired,
        addManufacturingPersonel: PropTypes.func.isRequired,
        editManufacturingPersonel: PropTypes.func.isRequired,
        deleteManufacturingPersonel: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getManufacturingPersonels()
        this.props.getEmployees();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                employee: null,
                is_manager: false,
                can_authorize_equipment_requisitions: false,
                can_authorize_consumables_requisitions: false,
            },
            submitted: false,
            manufacturingpersonelDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            manufacturingpersonelDialog: false
        });
    }

    hideDeleteManufacturingPersonelDialog() {
        this.setState({ deleteManufacturingPersonelDialog: false });
    }

    hideDeleteManufacturingPersonelsDialog() {
        this.setState({ deleteManufacturingPersonelsDialog: false });
    }


    saveManufacturingPersonel = (e) => {
        e.preventDefault();
        const {
            employee,
            is_manager,
            can_authorize_equipment_requisitions,
            can_authorize_consumables_requisitions,
        } = this.state;
        const manufacturingpersonel = {
            employee,
            is_manager,
            can_authorize_equipment_requisitions,
            can_authorize_consumables_requisitions,
        };
        this.props.addManufacturingPersonel(manufacturingpersonel);
        this.setState({
            employee: '',
            is_manager: true,
            can_authorize_equipment_requisitions: true,
            can_authorize_consumables_requisitions: true,
            manufacturingpersonelDialog: false
        });
        this.props.history.push('/manufacturingpersonels');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                employee: null,
                is_manager: false,
                can_authorize_equipment_requisitions: false,
                can_authorize_consumables_requisitions: false,
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


    editManufacturingPersonel(e) {
        const errors = this.editDataValidateError();
        const {
            employee,
            is_manager,
            can_authorize_equipment_requisitions,
            can_authorize_consumables_requisitions,

        } = this.state.selectRow;
        const manufacturingpersonel = {
            employee,
            is_manager,
            can_authorize_equipment_requisitions,
            can_authorize_consumables_requisitions,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editManufacturingPersonel(this.state.selectRow.id, manufacturingpersonel);
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


    confirmDeleteManufacturingPersonel(manufacturingpersonel) {
        this.setState({
            manufacturingpersonel,
            deleteManufacturingPersonelDialog: true
        });
    }

    deleteManufacturingPersonel() {
        this.props.deleteManufacturingPersonel();
        this.setState({
            deleteManufacturingPersonelDialog: false,
            manufacturingpersonel: this.emptyManufacturingPersonel
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteManufacturingPersonelsDialog: true });
    }

    deleteSelectedManufacturingPersonels() {
        this.props.deleteManufacturingPersonel();
        this.setState({
            deleteManufacturingPersonelsDialog: false,
            selectedManufacturingPersonels: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Manufacturing Personel</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW MANUFACTURING PERSONEL" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteManufacturingPersonel(rowData)} />
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
        const manufacturingpersonelDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveManufacturingPersonel} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editManufacturingPersonel}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            employee,
        } = this.state;

        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.manufacturingpersonels}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedManufacturingPersonels} onSelectionChange={e => this.setState({selectedManufacturingPersonels: e.value})}
                        paginator rows={10} emptyMessage="No Active Customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="employee"
                            header="Employee"
                            sortable filter filterPlaceholder="Search by Employee"
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
                        visible={this.state.manufacturingpersonelDialog}
                        style={{ width: '900px' }}
                        header="Create Manufacturing Personel"
                        modal className="p-fluid"
                        footer={manufacturingpersonelDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-12">
                            <Dropdown
                                placeholder ="SELECT EMPLOYEE"
                                value={employee}
                                onChange={this.onEmployee}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="employee_number"
                                optionValue="id"
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>IS MANAGER :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.handleIsManger}
                                checked={this.state.is_manager}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>CAN AUTHORIZE EQUIPMENT REQUISITIONS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.handleEquipment}
                                checked={this.state.can_authorize_equipment_requisitions}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>CAN AUTHORIZE CONSUMABLES REQUISITIONS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.handleConsumables}
                                checked={this.state.can_authorize_consumables_requisitions}
                            />
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE MANUFACTURING PERSONEL"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>IS MANAGER :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            is_manager: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.is_manager}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>CAN AUTHORIZE EQUIPMENT REQUISITIONS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            can_authorize_equipment_requisitions: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.can_authorize_equipment_requisitions}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>CAN AUTHORIZE CONSUMABLES REQUISITIONS :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            can_authorize_consumables_requisitions: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.can_authorize_consumables_requisitions}
                            />
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
                                optionLabel="employee_number"
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
                    </Dialog>
                    <Dialog visible={this.state.deleteManufacturingPersonelsDialog} style={{ width: '450px' }} header="Confirm" modal onHide={this.hideDeleteManufacturingPersonelsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.manufacturingpersonel && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    manufacturingpersonels: state.manufacturingpersonels.manufacturingpersonels,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {
    getEmployees,
    getManufacturingPersonels,
    editManufacturingPersonel,
    deleteManufacturingPersonel,
    addManufacturingPersonel} ) (ManufacturingPersonels);
