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
import { getProcessedProductStockAdjustments, addProcessedProductStockAdjustment, editProcessedProductStockAdjustment, deleteProcessedProductStockAdjustment } from '..//../actions/processedproductstockadjustments';
import { getManufacturedStockItems } from '../../actions/manufacturedstockitems';
import { getProcessedProductStockTakes } from '../../actions/processedproductstocktakes';
import "./form.css";

class ProcessedProductStockAdjustments extends Component {

    emptyProcessedProductStockAdjustment = {
        warehouse_item: null,
        adjustment: '',
        note: '',
        inventory_check: null
    };

    constructor() {
        super();
        this.state = {
            processedproductstockadjustments : [],
            globalFilter: null,
            dateFilter: null,
            selectedProcessedProductStockAdjustments: null,
            processedproductstockadjustmentDialog: false,
            deleteProcessedProductStockAdjustmentDialog: false,
            deleteProcessedProductStockAdjustmentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                warehouse_item: null,
                adjustment: '',
                note: '',
                inventory_check: null
            },
            newData: {
                warehouse_item: null,
                adjustment: '',
                note: '',
                inventory_check: null
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
        this.saveProcessedProductStockAdjustment = this.saveProcessedProductStockAdjustment.bind(this);
        this.editProcessedProductStockAdjustment = this.editProcessedProductStockAdjustment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteProcessedProductStockAdjustment = this.confirmDeleteProcessedProductStockAdjustment.bind(this);
        this.deleteProcessedProductStockAdjustment = this.deleteProcessedProductStockAdjustment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProcessedProductStockAdjustments = this.deleteSelectedProcessedProductStockAdjustments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteProcessedProductStockAdjustmentDialog = this.hideDeleteProcessedProductStockAdjustmentDialog.bind(this);
        this.hideDeleteProcessedProductStockAdjustmentsDialog = this.hideDeleteProcessedProductStockAdjustmentsDialog.bind(this);
        this.onWarehouseItem = this.onWarehouseItem.bind(this);
        this.onInventoryCheck = this.onInventoryCheck.bind(this);
    }

    onWarehouseItem (e){
        this.setState({warehouse_item: e.value})
    }

    onInventoryCheck (e){
        this.setState({inventory_check: e.value})
    }

    static propTypes = {
        processedproductstockadjustments : PropTypes.array.isRequired,
        getProcessedProductStockAdjustments: PropTypes.func.isRequired,
        getManufacturedStockItems: PropTypes.func.isRequired,
        getProcessedProductStockTakes: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getProcessedProductStockAdjustments();
        this.props.getManufacturedStockItems();
        this.props.getProcessedProductStockTakes();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                warehouse_item: null,
                adjustment: '',
                note: '',
                inventory_check: null
            },
            submitted: false,
            processedproductstockadjustmentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            processedproductstockadjustmentDialog: false
        });
    }

    hideDeleteProcessedProductStockAdjustmentDialog() {
        this.setState({ deleteProcessedProductStockAdjustmentDialog: false });
    }

    hideDeleteProcessedProductStockAdjustmentsDialog() {
        this.setState({ deleteProcessedProductStockAdjustmentsDialog: false });
    }

    saveProcessedProductStockAdjustment = (e) => {
        e.preventDefault();
        const {
            warehouse_item,
            adjustment,
            note,
            inventory_check
        } = this.state;
        const processedproductstockadjustment = {
            warehouse_item,
            adjustment,
            note,
            inventory_check
        };
        this.props.addProcessedProductStockAdjustment(processedproductstockadjustment);
        this.setState({
            warehouse_item: null,
            adjustment: '',
            note: '',
            inventory_check: null,
            processedproductstockadjustmentDialog: false
        });
        this.props.history.push('/processedproductstockadjustments');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                warehouse_item: null,
                adjustment: '',
                note: '',
                inventory_check: null
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

    editProcessedProductStockAdjustment(e) {
        const errors = this.editDataValidateError();
        const {
            warehouse_item,
            adjustment,
            note,
            inventory_check
        } = this.state.selectRow;
        const processedproductstockadjustment = {
            warehouse_item,
            adjustment,
            note,
            inventory_check
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editProcessedProductStockAdjustment(this.state.selectRow.id, processedproductstockadjustment);
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

    confirmDeleteProcessedProductStockAdjustment(processedproductstockadjustment) {
        this.setState({
            processedproductstockadjustment,
            deleteProcessedProductStockAdjustmentDialog: true
        });
    }

    deleteProcessedProductStockAdjustment() {
        this.props.deleteProcessedProductStockAdjustment();
        this.setState({
            deleteProcessedProductStockAdjustmentDialog: false,
            processedproductstockadjustment: this.emptyProcessedProductStockAdjustment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteProcessedProductStockAdjustmentsDialog: true });
    }

    deleteSelectedProcessedProductStockAdjustments() {
        this.props.deleteProcessedProductStockAdjustment();
        this.setState({
            deleteProcessedProductStockAdjustmentsDialog: false,
            selectedProcessedProductStockAdjustments: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Processed Product Stock Adjustment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW PROCESSED PRODUCT STOCK ADJUSTMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProcessedProductStockAdjustment(rowData)} />
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
        const processedproductstockadjustmentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProcessedProductStockAdjustment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editProcessedProductStockAdjustment}/>
            </div>
        );

        const header = this.renderHeader();
        const {
          warehouse_item,
          adjustment,
          note,
          inventory_check
        } = this.state;

        const { manufacturedstockitems } = this.props;
        const { processedproductstocktakes } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.processedproductstockadjustments}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedProcessedProductStockAdjustments} onSelectionChange={e => this.setState({selectedProcessedProductStockAdjustments: e.value})}
                        paginator rows={10} emptyMessage="No Processed Product Stock Adjustments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="warehouse_item"
                            header="Warehouse Item"
                            sortable filter filterPlaceholder="Search by Warehouse Item"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="adjustment"
                            header="Adjustment"
                            sortable filter filterPlaceholder="Search by Adjustment"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="inventory_check"
                            header="Inventory Check"
                            sortable filter filterPlaceholder="Search by Inventory Check"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="adjustment_value"
                            header="Adjustment Value"
                            sortable filter filterPlaceholder="Search by Adjustment Value"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="prev_quantity"
                            header="Prev Quantity"
                            sortable filter filterPlaceholder="Search by Prev Quantity"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="reference_number"
                            header="Reference Number"
                            sortable filter filterPlaceholder="Search by Reference Number"
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
                        visible={this.state.processedproductstockadjustmentDialog}
                        style={{ width: '900px' }}
                        header=" Create Processed Product Stock Adjustment"
                        modal
                        className="p-fluid"
                        footer={processedproductstockadjustmentDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                                <label>Adjustment</label>
                                <InputNumber
                                    name="adjustment"
                                    onChange={this.onChange}
                                    value={adjustment}
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
                                        name="note"
                                        onChange={this.onChange}
                                        value={note}
                                    />
                                    <label htmlFor="inputtext">Note</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={warehouse_item}
                                        onChange={this.onWarehouseItem}
                                        options={manufacturedstockitems}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="item"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT WAREHOUSE ITEM</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={inventory_check}
                                        onChange={this.onInventoryCheck}
                                        options={processedproductstocktakes}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="reference_number"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT INVENTORY CHECK</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE PROCESSED PRODUCT STOCK ADJUSTMENT"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAdjustment">Adjustment </label>
                            <InputNumber
                                id="inAdjustment"
                                value={this.state.selectRow.adjustment}
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
                                        adjustment: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inNote">Note </label>
                            <InputTextarea id="inNote" value={this.state.selectRow.note}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        note: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inWarehouseItem"
                                value={this.state.selectRow.warehouse_item}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            warehouse_item: e.target.value
                                        }
                                    })
                                }
                                options={manufacturedstockitems}
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
                                id="inInventoryCheck"
                                value={this.state.selectRow.inventory_check}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            inventory_check: e.target.value
                                        }
                                    })
                                }
                                options={processedproductstocktakes}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="reference_number"
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
    processedproductstockadjustments: state.processedproductstockadjustments.processedproductstockadjustments,
    processedproductstocktakes: state.processedproductstocktakes.processedproductstocktakes,
    manufacturedstockitems: state.manufacturedstockitems.manufacturedstockitems,
})

export default connect(
    mapStateToProps,
    {
        getProcessedProductStockAdjustments,
        addProcessedProductStockAdjustment,
        deleteProcessedProductStockAdjustment,
        editProcessedProductStockAdjustment,
        getManufacturedStockItems,
        getProcessedProductStockTakes
    }) (ProcessedProductStockAdjustments);
