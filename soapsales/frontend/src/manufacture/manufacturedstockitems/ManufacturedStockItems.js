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
import { Dialog } from 'primereact/dialog';
import { getManufacturedStockItems, addManufacturedStockItem, editManufacturedStockItem, deleteManufacturedStockItem } from '..//../actions/manufacturedstockitems';
import {getProcessProducts} from "..//../actions/processproducts";
import {getWarehouses} from "..//../actions/warehouses";
import {getStoragemedias} from "..//../actions/storagemedias";
import "./form.css";

class ManufacturedStockItems extends Component {

    emptyManufacturedStockItem = {
        item: null,
        quantity: '',
        warehouse: null,
        location: null
    };

    constructor() {
        super();
        this.state = {
            manufacturedstockitems : [],
            globalFilter: null,
            dateFilter: null,
            selectedManufacturedStockItems: null,
            manufacturedstockitemDialog: false,
            deleteManufacturedStockItemDialog: false,
            deleteManufacturedStockItemsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null
            },
            newData: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null
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
        this.saveManufacturedStockItem = this.saveManufacturedStockItem.bind(this);
        this.editManufacturedStockItem = this.editManufacturedStockItem.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteManufacturedStockItem = this.confirmDeleteManufacturedStockItem.bind(this);
        this.deleteManufacturedStockItem = this.deleteManufacturedStockItem.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedManufacturedStockItems = this.deleteSelectedManufacturedStockItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteManufacturedStockItemDialog = this.hideDeleteManufacturedStockItemDialog.bind(this);
        this.hideDeleteManufacturedStockItemsDialog = this.hideDeleteManufacturedStockItemsDialog.bind(this);
        this.onItem = this.onItem.bind(this);
        this.onWarehouse = this.onWarehouse.bind(this);
        this.onLocation = this.onLocation.bind(this);
    }

    onItem(e){
      this.setState({item: e.value})
    }

    onWarehouse(e){
      this.setState({warehouse: e.value})
    }

    onLocation(e){
      this.setState({location: e.value})
    }

    static propTypes = {
        manufacturedstockitems : PropTypes.array.isRequired,
        getManufacturedStockItems: PropTypes.func.isRequired,
        getProcessProducts: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getStoragemedias: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getManufacturedStockItems();
        this.props.getProcessProducts()
        this.props.getWarehouses()
        this.props.getStoragemedias()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null
            },
            submitted: false,
            manufacturedstockitemDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            manufacturedstockitemDialog: false
        });
    }

    hideDeleteManufacturedStockItemDialog() {
        this.setState({ deleteManufacturedStockItemDialog: false });
    }

    hideDeleteManufacturedStockItemsDialog() {
        this.setState({ deleteManufacturedStockItemsDialog: false });
    }

    saveManufacturedStockItem = (e) => {
        e.preventDefault();
        const {
            item,
            quantity,
            warehouse,
            location
        } = this.state;
        const manufacturedstockitem = {
            item,
            quantity,
            warehouse,
            location
        };
        this.props.addManufacturedStockItem(manufacturedstockitem);
        this.setState({
            item: null,
            quantity: '',
            warehouse: null,
            location: null,
            manufacturedstockitemDialog: false
        });
        this.props.history.push('/manufacturedstockitems');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null
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

    editManufacturedStockItem(e) {
        const errors = this.editDataValidateError();
        const {
            item,
            quantity,
            warehouse,
            location
        } = this.state.selectRow;
        const manufacturedstockitem = {
            item,
            quantity,
            warehouse,
            location
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editManufacturedStockItem(this.state.selectRow.id, manufacturedstockitem);
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

    confirmDeleteManufacturedStockItem(manufacturedstockitem) {
        this.setState({
            manufacturedstockitem,
            deleteManufacturedStockItemDialog: true
        });
    }

    deleteManufacturedStockItem() {
        this.props.deleteManufacturedStockItem();
        this.setState({
            deleteManufacturedStockItemDialog: false,
            manufacturedstockitem: this.emptyManufacturedStockItem
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteManufacturedStockItemsDialog: true });
    }

    deleteSelectedManufacturedStockItems() {
        this.props.deleteManufacturedStockItem();
        this.setState({
            deleteManufacturedStockItemsDialog: false,
            selectedManufacturedStockItems: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Manufactured Stock Item</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW MANUFACTURED STOCK ITEM" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteManufacturedStockItem(rowData)} />
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
        const manufacturedstockitemDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveManufacturedStockItem} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editManufacturedStockItem}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            item,
            quantity,
            warehouse,
            location
        } = this.state;

        const { processproducts } = this.props;
        const { warehouses } = this.props;
        const { storagemedias } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.manufacturedstockitems}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedManufacturedStockItems} onSelectionChange={e => this.setState({selectedManufacturedStockItems: e.value})}
                        paginator rows={10} emptyMessage="No Manufactured Stock Items found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="item"
                            header="Item"
                            sortable filter filterPlaceholder="Search by Item"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="quantity"
                            header="Quantity"
                            sortable filter filterPlaceholder="Search by Quantity"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="warehouse"
                            header="Warehouse"
                            sortable filter filterPlaceholder="Search by Warehouse"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="location"
                            header="Location"
                            sortable filter filterPlaceholder="Search by Location"
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
                        visible={this.state.manufacturedstockitemDialog}
                        style={{ width: '900px' }}
                        header=" Create Manufactured Stock Item"
                        modal
                        className="p-fluid"
                        footer={manufacturedstockitemDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                                <label>QUANTITY</label>
                                <InputNumber
                                    name="quantity"
                                    onChange={this.onChange}
                                    value={quantity}
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
                                    <Dropdown
                                        value={item}
                                        onChange={this.onItem}
                                        options={processproducts}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT ITEM</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={warehouse}
                                        onChange={this.onWarehouse}
                                        options={warehouses}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT WAREHOUSE</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={location}
                                        onChange={this.onLocation}
                                        options={storagemedias}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="name"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT LOCATION</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE MANUFACTURED STOCK ITEM"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inQuantity">Quantity </label>
                            <InputNumber
                                id="inQuantity"
                                value={this.state.selectRow.quantity}
                                style={{marginLeft: '.5em'}}
                                mode="decimal"
                                showButtons
                                buttonLayout="horizontal"
                                decrementButtonClassName="p-button-danger"
                                incrementButtonClassName="p-button-success"
                                incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus"
                                step={1}
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        quantity: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inWarehouse"
                                value={this.state.selectRow.warehouse}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            warehouse: e.target.value
                                        }
                                    })
                                }
                                options={warehouses}
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
                                id="inItem"
                                value={this.state.selectRow.item}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            item: e.target.value
                                        }
                                    })
                                }
                                options={processproducts}
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
                                id="inLocation"
                                value={this.state.selectRow.location}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            location: e.target.value
                                        }
                                    })
                                }
                                options={storagemedias}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
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
    manufacturedstockitems: state.manufacturedstockitems.manufacturedstockitems,
    processproducts: state.processproducts.processproducts,
    warehouses: state.warehouses.warehouses,
    storagemedias: state.storagemedias.storagemedias
})

export default connect(
    mapStateToProps,
    {
        getManufacturedStockItems,
        addManufacturedStockItem,
        deleteManufacturedStockItem,
        editManufacturedStockItem,
        getProcessProducts,
        getWarehouses,
        getStoragemedias
    }) (ManufacturedStockItems);
