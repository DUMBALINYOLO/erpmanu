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
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { getProcessProducts, addProcessProduct, editProcessProduct, deleteProcessProduct } from '..//../actions/processproducts';
import { getManufacturingProductTypesChoices, getProcessedProductsStockStatusChoices, getUnitOfMeasureChoices } from '..//../actions/choices';
import "./form.css";

class ProcessProducts extends Component {

    emptyProcessProduct = {
        name: '',
        description: '',
        type: null,
        unit: null,
        finished_goods: false,
        unit_price: '',
        status: null,
        minimum_order_level: '',
        maximum_stock_level: '',
    };

    constructor() {
        super();
        this.state = {
            processproducts : [],
            globalFilter: null,
            dateFilter: null,
            selectedProcessProducts: null,
            processproductDialog: false,
            deleteProcessProductDialog: false,
            deleteProcessProductsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                description: '',
                type: null,
                unit: null,
                finished_goods: false,
                unit_price: '',
                status: null,
                minimum_order_level: '',
                maximum_stock_level: '',
            },
            newData: {
                name: '',
                description: '',
                type: null,
                unit: null,
                finished_goods: false,
                unit_price: '',
                status: null,
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
        this.saveProcessProduct = this.saveProcessProduct.bind(this);
        this.editProcessProduct = this.editProcessProduct.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteProcessProduct = this.confirmDeleteProcessProduct.bind(this);
        this.deleteProcessProduct = this.deleteProcessProduct.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProcessProducts = this.deleteSelectedProcessProducts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteProcessProductDialog = this.hideDeleteProcessProductDialog.bind(this);
        this.hideDeleteProcessProductsDialog = this.hideDeleteProcessProductsDialog.bind(this);
        this.onType = this.onType.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onStatus = this.onStatus.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
    }

    handleFinished() {
      this.setState({
        finished_goods: !this.state.checked
      });
    }

    onType (e){
      this.setState({type: e.value})
    }

    onUnit (e){
      this.setState({unit: e.value})
    }

    onStatus (e){
      this.setState({status: e.value})
    }

    static propTypes = {
        processproducts : PropTypes.array.isRequired,
        getProcessProducts: PropTypes.func.isRequired,
        getManufacturingProductTypesChoices: PropTypes.func.isRequired,
        getProcessedProductsStockStatusChoices: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getProcessProducts();
        this.props.getManufacturingProductTypesChoices();
        this.props.getProcessedProductsStockStatusChoices();
        this.props.getUnitOfMeasureChoices();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                description: '',
                type: null,
                unit: null,
                finished_goods: false,
                unit_price: '',
                status: null,
                minimum_order_level: '',
                maximum_stock_level: '',
            },
            submitted: false,
            processproductDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            processproductDialog: false
        });
    }

    hideDeleteProcessProductDialog() {
        this.setState({ deleteProcessProductDialog: false });
    }

    hideDeleteProcessProductsDialog() {
        this.setState({ deleteProcessProductsDialog: false });
    }

    saveProcessProduct = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            type,
            unit,
            finished_goods,
            unit_price,
            status,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;
        const processproduct = {
            name,
            description,
            type,
            unit,
            finished_goods,
            unit_price,
            status,
            minimum_order_level,
            maximum_stock_level,
        };
        this.props.addProcessProduct(processproduct);
        this.setState({
            name: '',
            description: '',
            type: null,
            unit: null,
            finished_goods: true,
            unit_price: '',
            status: null,
            minimum_order_level: '',
            maximum_stock_level: '',
            processproductDialog: false
        });
        this.props.history.push('/processproducts');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                description: '',
                type: null,
                unit: null,
                finished_goods: false,
                unit_price: '',
                status: null,
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

    editProcessProduct(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            description,
            type,
            unit,
            finished_goods,
            unit_price,
            status,
            minimum_order_level,
            maximum_stock_level,
        } = this.state.selectRow;
        const processproduct = {
            name,
            description,
            type,
            unit,
            finished_goods,
            unit_price,
            status,
            minimum_order_level,
            maximum_stock_level,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editProcessProduct(this.state.selectRow.id, processproduct);
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

    confirmDeleteProcessProduct(processproduct) {
        this.setState({
            processproduct,
            deleteProcessProductDialog: true
        });
    }

    deleteProcessProduct() {
        this.props.deleteProcessProduct();
        this.setState({
            deleteProcessProductDialog: false,
            processproduct: this.emptyProcessProduct
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteProcessProductsDialog: true });
    }

    deleteSelectedProcessProducts() {
        this.props.deleteProcessProduct();
        this.setState({
            deleteProcessProductsDialog: false,
            selectedProcessProducts: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Process Product</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW PROCESS PRODUCT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProcessProduct(rowData)} />
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
        const processproductDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProcessProduct} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editProcessProduct}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            description,
            type,
            unit,
            unit_price,
            status,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;
        const {manufacturingproducttypeschoices} = this.props;
        const {processedproductsstockstatuschoices} = this.props;
        const {unitofmeasurechoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.processproducts}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedProcessProducts} onSelectionChange={e => this.setState({selectedProcessProducts: e.value})}
                        paginator rows={10} emptyMessage="No Process Products found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="reference_number" header="Reference Number" sortable filter filterPlaceholder="Search by Reference Number" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="type" header="Type" sortable filter filterPlaceholder="Search by Type" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="status" header="Status" sortable filter filterPlaceholder="Search by Status" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>
                    <Dialog
                        visible={this.state.processproductDialog}
                        style={{ width: '900px' }}
                        header=" Create Process Product"
                        modal
                        className="p-fluid"
                        footer={processproductDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                              <label>Description</label>
                              <InputTextarea
                                name="description"
                                onChange={this.onChange}
                                value={description}
                              />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                              <label>Name</label>
                              <InputText
                                name="name"
                                onChange={this.onChange}
                                value={name}
                              />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                              <label>Unit Price</label>
                              <InputNumber
                                name="unit_price"
                                onChange={this.onChange}
                                value={unit_price}
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
                                options={manufacturingproducttypeschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
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
                                placeholder ="SELECT STATUS"
                                value={status}
                                onChange={this.onStatus}
                                options={processedproductsstockstatuschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                              />
                            </div>
                            <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                              <label>FINISHED GOODS :</label>
                              <Checkbox
                                inputId="working"
                                onChange={this.handleFinished}
                                checked={this.state.finished_goods}
                              />
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE PROCESS PRODUCT"
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
                        <div>
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
                            <div>
                            <label htmlFor="inMinimumOrderLevel">Minimum Order Level </label>
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
                        <div>
                        <label htmlFor="inUnitPrice">Unit Price </label>
                        <InputNumber
                            id="inUnitPrice"
                            value={this.state.selectRow.unit_price}
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
                                    unit_price: e.target.value
                                }
                            })
                        }/>
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
                                options={manufacturingproducttypeschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
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
                                id="inStatus"
                                value={this.state.selectRow.status}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            status: e.target.value
                                        }
                                    })
                                }
                                options={processedproductsstockstatuschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
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
    processproducts: state.processproducts.processproducts,
    manufacturingproducttypeschoices: state.manufacturingproducttypeschoices.manufacturingproducttypeschoices,
    processedproductsstockstatuschoices: state.processedproductsstockstatuschoices.processedproductsstockstatuschoices,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
})

export default connect(
    mapStateToProps,
    {
        getProcessProducts,
        addProcessProduct,
        deleteProcessProduct,
        editProcessProduct,
        getManufacturingProductTypesChoices,
        getProcessedProductsStockStatusChoices,
        getUnitOfMeasureChoices,
    }) (ProcessProducts);
