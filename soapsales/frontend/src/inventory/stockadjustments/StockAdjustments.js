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
import { getStockAdjustments, addStockAdjustment, editStockAdjustment, deleteStockAdjustment } from '..//../actions/stockadjustments';
import { getInventoryItems } from '..//../actions/inventoryitems';
import "./form.css";

class StockAdjustments extends Component {

    emptyStockAdjustment = {
        warehouse_item: null,
        adjustment: '',
        note: ''
    };

    constructor() {
        super();
        this.state = {
            stockadjustments : [],
            globalFilter: null,
            dateFilter: null,
            selectedStockAdjustments: null,
            stockadjustmentDialog: false,
            deleteStockAdjustmentDialog: false,
            deleteStockAdjustmentsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                warehouse_item: null,
                adjustment: '',
                note: ''
            },
            newData: {
                warehouse_item: null,
                adjustment: '',
                note: ''
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
        this.saveStockAdjustment = this.saveStockAdjustment.bind(this);
        this.editStockAdjustment = this.editStockAdjustment.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteStockAdjustment = this.confirmDeleteStockAdjustment.bind(this);
        this.deleteStockAdjustment = this.deleteStockAdjustment.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedStockAdjustments = this.deleteSelectedStockAdjustments.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteStockAdjustmentDialog = this.hideDeleteStockAdjustmentDialog.bind(this);
        this.hideDeleteStockAdjustmentsDialog = this.hideDeleteStockAdjustmentsDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse_item: e.value})
    }

    static propTypes = {
        stockadjustments : PropTypes.array.isRequired,
        getStockAdjustments: PropTypes.func.isRequired,
        getInventoryItems: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getStockAdjustments();
        this.props.getInventoryItems()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                warehouse_item: null,
                adjustment: '',
                note: ''
            },
            submitted: false,
            stockadjustmentDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            stockadjustmentDialog: false
        });
    }

    hideDeleteStockAdjustmentDialog() {
        this.setState({ deleteStockAdjustmentDialog: false });
    }

    hideDeleteStockAdjustmentsDialog() {
        this.setState({ deleteStockAdjustmentsDialog: false });
    }

    saveStockAdjustment = (e) => {
        e.preventDefault();
        const {
            warehouse_item,
            adjustment,
            note
        } = this.state;
        const stockadjustment = {
            warehouse_item,
            adjustment,
            note
        };
        this.props.addStockAdjustment(stockadjustment);
        this.setState({
            warehouse_item: '',
            adjustment: '',
            note: ''
        });
        this.props.history.push('/stockadjustments');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                warehouse_item: null,
                adjustment: '',
                note: ''
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


    editStockAdjustment(e) {
        const errors = this.editDataValidateError();
        const {
            warehouse_item,
            adjustment,
            note
        } = this.state.selectRow;
        const stockadjustment = {
            warehouse_item,
            adjustment,
            note
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editStockAdjustment(this.state.selectRow.id, stockadjustment);
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

    confirmDeleteStockAdjustment(stockadjustment) {
        this.setState({
            stockadjustment,
            deleteStockAdjustmentDialog: true
        });
    }

    deleteStockAdjustment() {
        this.props.deleteStockAdjustment();
        this.setState({
            deleteStockAdjustmentDialog: false,
            stockadjustment: this.emptyStockAdjustment
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteStockAdjustmentsDialog: true });
    }

    deleteSelectedStockAdjustments() {
        this.props.deleteStockAdjustment();
        this.setState({
            deleteStockAdjustmentsDialog: false,
            selectedStockAdjustments: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Stock Adjustment</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW STOCK ADJUSTMENT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteStockAdjustment(rowData)} />
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
        const stockadjustmentDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveStockAdjustment} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editStockAdjustment}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            warehouse_item,
            adjustment,
            note
        } = this.state;

        const {inventoryitems} = this.props;


        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.stockadjustments}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedStockAdjustments} onSelectionChange={e => this.setState({selectedStockAdjustments: e.value})}
                        paginator rows={10} emptyMessage="No Stock Adjustments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            header="EDIT"
                            body={this.actionBodyTemplate}
                            headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>
                    <Dialog
                        visible={this.state.stockadjustmentDialog}
                        style={{ width: '900px' }}
                        header=" Create Stock Adjustment"
                        modal
                        className="p-fluid"
                        footer={stockadjustmentDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <label>Adjustment</label>
                            <InputNumber
                                name="adjustment"
                                mode="decimal"
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
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                value={warehouse_item}
                                onChange={this.onTypeChange}
                                options={inventoryitems}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT WAREHOUSE ITEM</label>
                            </span>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE STOCK ADJUSTMENT"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
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
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                note: e.target.value
                                            }
                                        })
                                    }
                                    id="inNote"
                                    value={this.state.selectRow.note}
                                />
                            </span>
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
                                options={inventoryitems}
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
    stockadjustments: state.stockadjustments.stockadjustments,
    inventoryitems: state.inventoryitems.inventoryitems,
})

export default connect(
    mapStateToProps,
    {
        getStockAdjustments,
        addStockAdjustment,
        deleteStockAdjustment,
        editStockAdjustment,
        getInventoryItems
    }) (StockAdjustments);
