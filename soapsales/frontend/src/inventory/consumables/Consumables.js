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
import { getConsumables, addConsumable, editConsumable, deleteConsumable } from '..//../actions/consumables';
import { getInventoryTypesChoices, getUnitOfMeasureChoices } from '..//../actions/choices';
import { getActiveSuppliers } from '..//../actions/activesuppliers';
import { getInventoryCategories } from '..//../actions/inventorycategories';
import "./form.css";

class Consumables extends Component {

    emptyConsumable = {
        name: '',
        type: null,
        category: null,
        length: '',
        width: '',
        height: '',
        description: '',
        unit: null,
        unit_purchase_price: '',
        supplier: null,
        minimum_order_level: '',
        maximum_stock_level: '',
    };

    constructor() {
        super();
        this.state = {
            consumables : [],
            globalFilter: null,
            dateFilter: null,
            selectedConsumables: null,
            consumableDialog: false,
            deleteConsumableDialog: false,
            deleteConsumablesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                type: null,
                category: null,
                length: '',
                width: '',
                height: '',
                description: '',
                unit: null,
                unit_purchase_price: '',
                supplier: null,
                minimum_order_level: '',
                maximum_stock_level: '',
            },
            newData: {
                name: '',
                type: null,
                category: null,
                length: '',
                width: '',
                height: '',
                description: '',
                unit: null,
                unit_purchase_price: '',
                supplier: null,
                minimum_order_level: '',
                maximum_stock_level: '',
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
        this.saveConsumable = this.saveConsumable.bind(this);
        this.editConsumable = this.editConsumable.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteConsumable = this.confirmDeleteConsumable.bind(this);
        this.deleteConsumable = this.deleteConsumable.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedConsumables = this.deleteSelectedConsumables.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteConsumableDialog = this.hideDeleteConsumableDialog.bind(this);
        this.hideDeleteConsumablesDialog = this.hideDeleteConsumablesDialog.bind(this);
        this.onType = this.onType.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onSupplier = this.onSupplier.bind(this);
    }

    onType (e){
       this.setState({type: e.value})
    }

    onCategory (e){
       this.setState({category: e.value})
    }

    onUnit (e){
       this.setState({unit: e.value})
    }

    onSupplier (e){
       this.setState({supplier: e.value})
    }

    static propTypes = {
        consumables : PropTypes.array.isRequired,
        getInventoryTypesChoices: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
        getActiveSuppliers: PropTypes.func.isRequired,
        getInventoryCategories: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getConsumables();
        this.props.getInventoryTypesChoices();
        this.props.getUnitOfMeasureChoices();
        this.props.getActiveSuppliers();
        this.props.getInventoryCategories();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                type: null,
                category: null,
                length: '',
                width: '',
                height: '',
                description: '',
                unit: null,
                unit_purchase_price: '',
                supplier: null,
                minimum_order_level: '',
                maximum_stock_level: '',
            },
            submitted: false,
            consumableDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            consumableDialog: false
        });
    }

    hideDeleteConsumableDialog() {
        this.setState({ deleteConsumableDialog: false });
    }

    hideDeleteConsumablesDialog() {
        this.setState({ deleteConsumablesDialog: false });
    }

    saveConsumable = (e) => {
        e.preventDefault();
        const {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;
        const consumable = {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        };
        this.props.addConsumable(consumable);
        this.setState({
            name: '',
            type: null,
            category: null,
            length: '',
            width: '',
            height: '',
            description: '',
            unit: null,
            unit_purchase_price: '',
            supplier: null,
            minimum_order_level: '',
            maximum_stock_level: '',
            consumableDialog: false
        });
        this.props.history.push('/consumables');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                type: null,
                category: null,
                length: '',
                width: '',
                height: '',
                description: '',
                unit: null,
                unit_purchase_price: '',
                supplier: null,
                minimum_order_level: '',
                maximum_stock_level: '',
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

    editConsumable(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        } = this.state.selectRow;
        const consumable = {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editConsumable(this.state.selectRow.id, consumable);
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

    confirmDeleteConsumable(consumable) {
        this.setState({
            consumable,
            deleteConsumableDialog: true
        });
    }

    deleteConsumable() {
        this.props.deleteConsumable();
        this.setState({
            deleteConsumableDialog: false,
            consumable: this.emptyConsumable
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteConsumablesDialog: true });
    }

    deleteSelectedConsumables() {
        this.props.deleteConsumable();
        this.setState({
            deleteConsumablesDialog: false,
            selectedConsumables: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Consumable</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW CONSUMABLE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteConsumable(rowData)} />
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
        const consumableDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveConsumable} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editConsumable}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;

        const {inventorytypeschoices} = this.props;
        const {inventorycategories} = this.props;
        const {unitofmeasurechoices} = this.props;
        const {activesuppliers} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.consumables}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedConsumables} onSelectionChange={e => this.setState({selectedConsumables: e.value})}
                        paginator rows={10} emptyMessage="No Consumables found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="type"
                            header="Type"
                            sortable filter filterPlaceholder="Search by Type"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="category"
                            header="Category"
                            sortable filter filterPlaceholder="Search by Category"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="unit"
                            header="Unit"
                            sortable filter filterPlaceholder="Search by Unit"
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
                        visible={this.state.consumableDialog}
                        style={{ width: '900px' }}
                        header=" Create Consumable"
                        modal
                        className="p-fluid"
                        footer={consumableDialogFooter}
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
                            <div className="p-field p-col-12 p-md-6">
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
                                <label>MAXIMUM STOCK LEVEL</label>
                                <InputNumber
                                    name="maximum_stock_level"
                                    onChange={this.onChange}
                                    value={maximum_stock_level}
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
                                <label>UNIT PURCHASE PRICE</label>
                                <InputNumber
                                    name="unit_purchase_price"
                                    onChange={this.onChange}
                                    value={unit_purchase_price}
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
                                <label>MINIMUM ORDER LEVEL</label>
                                <InputNumber
                                    name="minimum_order_level"
                                    onChange={this.onChange}
                                    value={minimum_order_level}
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
                                <Dropdown
                                    placeholder ="SELECT TYPE"
                                    value={type}
                                    onChange={this.onType}
                                    options={inventorytypeschoices}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="key"
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <Dropdown
                                    placeholder ="SELECT CATEGORY"
                                    value={category}
                                    onChange={this.onCategory}
                                    options={inventorycategories}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <Dropdown
                                    placeholder ="SELECT UNIT"
                                    value={unit}
                                    onChange={this.onUnit}
                                    options={unitofmeasurechoices}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="key"
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <Dropdown
                                    placeholder ="SELECT SUPPLIER"
                                    value={supplier}
                                    onChange={this.onSupplier}
                                    options={activesuppliers}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE CONSUMABLE"
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
                            <label htmlFor="inAmount">Length </label>
                            <InputNumber
                                id="inLength"
                                value={this.state.selectRow.length}
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
                                        length: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Width </label>
                            <InputNumber
                                id="inWidth"
                                value={this.state.selectRow.width}
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
                                        width: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Height </label>
                            <InputNumber
                                id="inHeight"
                                value={this.state.selectRow.height}
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
                                        height: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inMaximumStockLevel">Maximum Stock Level </label>
                            <InputNumber
                                id="inMaximumStockLevel"
                                value={this.state.selectRow.maximum_stock_level}
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
                                        maximum_stock_level: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inUnitPurchasePrice">Unit Purchase Price</label>
                            <InputNumber
                                id="inUnitPurchasePrice"
                                value={this.state.selectRow.unit_purchase_price}
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
                                        unit_purchase_price: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inMinimumOrderLevel">Minimum Order Level</label>
                            <InputNumber
                                id="inMinimumOrderLevel"
                                value={this.state.selectRow.minimum_order_level}
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
                                        minimum_order_level: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inDescription">Description </label>
                            <InputTextarea id="inDescription" value={this.state.selectRow.description}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        description: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inCategory"
                                value={this.state.selectRow.category}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            category: e.target.value
                                        }
                                    })
                                }
                                options={inventorycategories}
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
                                id="inUnit"
                                value={this.state.selectRow.unit}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            unit: e.target.value
                                        }
                                    })
                                }
                                options={unitofmeasurechoices}
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
                                id="inSupplier"
                                value={this.state.selectRow.supplier}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            supplier: e.target.value
                                        }
                                    })
                                }
                                options={activesuppliers}
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
                                id="inType"
                                value={this.state.selectRow.type}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            type: e.target.value
                                        }
                                    })
                                }
                                options={inventorytypeschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
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
    consumables: state.consumables.consumables,
    inventorytypeschoices: state.inventorytypeschoices.inventorytypeschoices,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
    activesuppliers: state.activesuppliers.activesuppliers,
    inventorycategories: state.inventorycategories.inventorycategories,
})

export default connect(
    mapStateToProps,
    {
        getConsumables,
        addConsumable,
        deleteConsumable,
        editConsumable,
        getInventoryTypesChoices,
        getInventoryCategories,
        getUnitOfMeasureChoices,
        getActiveSuppliers,
    }) (Consumables);
