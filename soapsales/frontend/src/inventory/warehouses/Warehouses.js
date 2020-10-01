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
import { InputNumber } from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { getWarehouses, addWarehouse, editWarehouse, deleteWarehouse } from '..//../actions/warehouses';
import { getEmployees } from '..//../actions/employees';
import "./form.css";

class Warehouses extends Component {

    emptyWarehouse = {
        name: '',
        address: '',
        description: '',
        inventory_controller: null,
        length: '',
        width: '',
        height: '',
        last_inventory_check_date: '',
    };

    constructor() {
        super();
        this.state = {
            warehouses : [],
            globalFilter: null,
            dateFilter: null,
            selectedWarehouses: null,
            warehouseDialog: false,
            deleteWarehouseDialog: false,
            deleteWarehousesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                address: '',
                description: '',
                inventory_controller: null,
                length: '',
                width: '',
                height: '',
                last_inventory_check_date: '',
            },
            newData: {
                name: '',
                address: '',
                description: '',
                inventory_controller: null,
                length: '',
                width: '',
                height: '',
                last_inventory_check_date: '',
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
        this.saveWarehouse = this.saveWarehouse.bind(this);
        this.editWarehouse = this.editWarehouse.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteWarehouse = this.confirmDeleteWarehouse.bind(this);
        this.deleteWarehouse = this.deleteWarehouse.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedWarehouses = this.deleteSelectedWarehouses.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteWarehouseDialog = this.hideDeleteWarehouseDialog.bind(this);
        this.hideDeleteWarehousesDialog = this.hideDeleteWarehousesDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({inventory_controller: e.value})
    }

    static propTypes = {
        warehouses : PropTypes.array.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployees();
        this.props.getWarehouses()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                address: '',
                description: '',
                inventory_controller: null,
                length: '',
                width: '',
                height: '',
                last_inventory_check_date: '',
            },
            submitted: false,
            warehouseDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            warehouseDialog: false
        });
    }

    hideDeleteWarehouseDialog() {
        this.setState({ deleteWarehouseDialog: false });
    }

    hideDeleteWarehousesDialog() {
        this.setState({ deleteWarehousesDialog: false });
    }

    saveWarehouse = (e) => {
        e.preventDefault();
        const {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        } = this.state;
        const warehouse = {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        };
        this.props.addWarehouse(warehouse);
        this.setState({
            name: '',
            address: '',
            description: '',
            inventory_controller: null,
            length: '',
            width: '',
            height: '',
            last_inventory_check_date: '',
            warehouseDialog: false
        });
        this.props.history.push('/warehouses');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                address: '',
                description: '',
                inventory_controller: null,
                length: '',
                width: '',
                height: '',
                last_inventory_check_date: '',
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

    editWarehouse(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        } = this.state.selectRow;
        const warehouse = {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editWarehouse(this.state.selectRow.id, warehouse);
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

    confirmDeleteWarehouse(warehouse) {
        this.setState({
            warehouse,
            deleteWarehouseDialog: true
        });
    }

    deleteWarehouse() {
        this.props.deleteWarehouse();
        this.setState({
            deleteWarehouseDialog: false,
            warehouse: this.emptyWarehouse
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteWarehousesDialog: true });
    }

    deleteSelectedWarehouses() {
        this.props.deleteWarehouse();
        this.setState({
            deleteWarehousesDialog: false,
            selectedWarehouses: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Warehouse</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW WAREHOUSE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteWarehouse(rowData)} />
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
        const storagemediaDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveWarehouse} />
            </>
        );

        const editDialogFooter = (
            <div>
                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editWarehouse}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        } = this.state;

        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.warehouses}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedWarehouses} onSelectionChange={e => this.setState({selectedWarehouses: e.value})}
                        paginator rows={10} emptyMessage="No Warehouses found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="inventory_controller"
                            header="Inventory Controller"
                            sortable filter filterPlaceholder="Search by Inventory Controller"
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
                        visible={this.state.warehouseDialog}
                        style={{ width: '900px' }}
                        header=" Create Storagemedia"
                        modal
                        className="p-fluid"
                        footer={storagemediaDialogFooter}
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
                                <label>LENGTH</label>
                                <InputNumber
                                    name="length"
                                    onChange={this.onChange}
                                    value={length}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
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
                                    <InputTextarea
                                        name="address"
                                        onChange={this.onChange}
                                        value={address}
                                    />
                                    <label htmlFor="inputtext">ADDRESS</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>WIDTH</label>
                                <InputNumber
                                    name="width"
                                    onChange={this.onChange}
                                    value={width}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>HEIGHT</label>
                                <InputNumber
                                    name="height"
                                    onChange={this.onChange}
                                    value={height}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    className="form-control"
                                    name="last_inventory_check_date"
                                    onChange={this.onChange}
                                    value={last_inventory_check_date}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">LAST INVENTORY CHECK DATE</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={inventory_controller}
                                    onChange={this.onTypeChange}
                                    options={employees}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="employee_number"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT INVENTORY CONTROLLER</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE WAREHOUSE"
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
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inInventoryController"
                                value={this.state.selectRow.inventory_controller}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            inventory_controller: e.target.value
                                        }
                                    })
                                }
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="employee_number"
                                optionValue="id"
                            />
                            </span>
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employees: state.employees.employees,
    warehouses: state.warehouses.warehouses,
})

export default connect(
    mapStateToProps,
    {
        getEmployees,
        addWarehouse,
        deleteWarehouse,
        editWarehouse,
        getWarehouses
    }) (Warehouses);
