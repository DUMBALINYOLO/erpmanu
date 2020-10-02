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
import { getInventoryStockItems, addInventoryStockItem, editInventoryStockItem, deleteInventoryStockItem } from '..//../actions/inventorystockitems';
import { getWarehouses } from '..//../actions/warehouses';
import { getStoragemedias } from '..//../actions/storagemedias';
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";

class InventoryStockItems extends Component {

    emptyInventoryStockItem = {
        item: null,
        quantity: '',
        warehouse: null,
        location: null,
        verified: false
    };

    constructor() {
        super();
        this.state = {
            inventorystockitems : [],
            globalFilter: null,
            dateFilter: null,
            selectedInventoryStockItems: null,
            inventorystockitemDialog: false,
            deleteInventoryStockItemDialog: false,
            deleteInventoryStockItemsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null,
                verified: false
            },
            newData: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null,
                verified: false
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
        this.saveInventoryStockItem = this.saveInventoryStockItem.bind(this);
        this.editInventoryStockItem = this.editInventoryStockItem.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteInventoryStockItem = this.confirmDeleteInventoryStockItem.bind(this);
        this.deleteInventoryStockItem = this.deleteInventoryStockItem.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedInventoryStockItems = this.deleteSelectedInventoryStockItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteInventoryStockItemDialog = this.hideDeleteInventoryStockItemDialog.bind(this);
        this.hideDeleteInventoryStockItemsDialog = this.hideDeleteInventoryStockItemsDialog.bind(this);
        this.onItem = this.onItem.bind(this);
        this.onWarehouse = this.onWarehouse.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.onVerified = this.onVerified.bind(this);
    }

    onItem (e){
      this.setState({item: e.value})
    }

    onWarehouse (e){
      this.setState({warehouse: e.value})
    }

    onLocation (e){
      this.setState({location: e.value})
    }

    onVerified() {
        this.setState({
            verified: !this.state.checked
        });
    }

    static propTypes = {
        inventorystockitems : PropTypes.array.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired,
        addInventoryStockItem: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getStoragemedias: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getStoragemedias();
        this.props.getInventoryStockItems();
        this.props.getWarehouses();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null,
                verified: false
            },
            submitted: false,
            inventorystockitemDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            inventorystockitemDialog: false
        });
    }

    hideDeleteInventoryStockItemDialog() {
        this.setState({ deleteInventoryStockItemDialog: false });
    }

    hideDeleteInventoryStockItemsDialog() {
        this.setState({ deleteInventoryStockItemsDialog: false });
    }

    saveInventoryStockItem = (e) => {
        e.preventDefault();
        const {
            item,
            quantity,
            warehouse,
            location,
            verified
        } = this.state;
        const inventorystockitem = {
            item,
            quantity,
            warehouse,
            location,
            verified
        };
        this.props.addInventoryStockItem(inventorystockitem);
        this.setState({
            item: null,
            quantity: '',
            warehouse: null,
            location: null,
            verified: true,
            inventorystockitemDialog: false
        });
        this.props.history.push('/inventorystockitems');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                item: null,
                quantity: '',
                warehouse: null,
                location: null,
                verified: false
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

    editInventoryStockItem(e) {
        const errors = this.editDataValidateError();
        const {
            item,
            quantity,
            warehouse,
            location,
            verified
        } = this.state.selectRow;
        const inventorystockitem = {
            item,
            quantity,
            warehouse,
            location,
            verified
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editInventoryStockItem(this.state.selectRow.id, inventorystockitem);
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

    confirmDeleteInventoryStockItem(inventorystockitem) {
        this.setState({
            inventorystockitem,
            deleteInventoryStockItemDialog: true
        });
    }

    deleteInventoryStockItem() {
        this.props.deleteInventoryStockItem();
        this.setState({
            deleteInventoryStockItemDialog: false,
            inventorystockitem: this.emptyInventoryStockItem
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteInventoryStockItemsDialog: true });
    }

    deleteSelectedInventoryStockItems() {
        this.props.deleteInventoryStockItem();
        this.setState({
            deleteInventoryStockItemsDialog: false,
            selectedInventoryStockItems: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Inventory Stock Item</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW INVENTORY STOCK ITEM" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteInventoryStockItem(rowData)} />
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
        const inventorystockitemDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveInventoryStockItem} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editInventoryStockItem}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            item,
            quantity,
            warehouse,
            location,
        } = this.state;

        const {inventorystockitems} = this.props;
        const {warehouses} = this.props;
        const {storagemedias} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.inventorystockitems}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedInventoryStockItems} onSelectionChange={e => this.setState({selectedInventoryStockItems: e.value})}
                        paginator rows={10} emptyMessage="No Inventory Stock Items found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column
                            className="table-field"
                            selectionMode="multiple"
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
                            field="stock_value"
                            header="Stock Value"
                            sortable filter filterPlaceholder="Search by Stock Value"
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
                        visible={this.state.inventorystockitemDialog}
                        style={{ width: '900px' }}
                        header=" Create Inventory Stock Item"
                        modal
                        className="p-fluid"
                        footer={inventorystockitemDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                                <label>Quantity</label>
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
                            <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                                <label>VERIFIED :</label>
                                <Checkbox
                                    inputId="working"
                                    onChange={this.onVerified}
                                    checked={this.state.verified}
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={item}
                                    onChange={this.onItem}
                                    options={inventorystockitems}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT ITEM</label>
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
                                <label htmlFor="dropdown">SELECT WAREHOUSE</label>
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
                                <label htmlFor="dropdown">SELECT LOCATION</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE INVENTORY STOCK ITEM"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
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
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>VERIFIED :</label>
                            <Checkbox
                                onChange={(e) => this.setState({
                                    selectRow: {
                                            ...this.state.selectRow,
                                            verified: e.target.value
                                        }
                                    })
                                }
                                inputId="working"
                                id="inVerified"
                                checked={this.state.selectRow.verified}
                            />
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
                                options={inventorystockitems}
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
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    inventorystockitems: state.inventorystockitems.inventorystockitems,
    warehouses: state.warehouses.warehouses,
    storagemedias: state.storagemedias.storagemedias,
})

export default connect(
    mapStateToProps,
    {
        getInventoryStockItems,
        getWarehouses,
        getStoragemedias,
        addInventoryStockItem,
        deleteInventoryStockItem,
        editInventoryStockItem,
    }) (InventoryStockItems);
