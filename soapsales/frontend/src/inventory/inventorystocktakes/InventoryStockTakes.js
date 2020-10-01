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
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { getInventoryStockTakes, addInventoryStockTake, editInventoryStockTake, deleteInventoryStockTake } from '..//../actions/inventorystocktakes';
import { getWarehouses } from '..//../actions/warehouses';
import { getEmployees } from '..//../actions/employees';
import {InputNumber} from 'primereact/inputnumber';
import "./form.css";

class InventoryStockTakes extends Component {

    emptyInventoryStockTake = {
        date: '',
        adjusted_by: null,
        warehouse: null,
        comments: '',
        adjustments: ''
    };

    constructor() {
        super();
        this.state = {
            inventorystocktakes : [],
            globalFilter: null,
            dateFilter: null,
            selectedInventoryStockTakes: null,
            inventorystocktakeDialog: false,
            deleteInventoryStockTakeDialog: false,
            deleteInventoryStockTakesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                date: '',
                adjusted_by: null,
                warehouse: null,
                comments: '',
                adjustments: ''
            },
            newData: {
                date: '',
                adjusted_by: null,
                warehouse: null,
                comments: '',
                adjustments: ''
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
        this.saveInventoryStockTake = this.saveInventoryStockTake.bind(this);
        this.editInventoryStockTake = this.editInventoryStockTake.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteInventoryStockTake = this.confirmDeleteInventoryStockTake.bind(this);
        this.deleteInventoryStockTake = this.deleteInventoryStockTake.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedInventoryStockTakes = this.deleteSelectedInventoryStockTakes.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteInventoryStockTakeDialog = this.hideDeleteInventoryStockTakeDialog.bind(this);
        this.hideDeleteInventoryStockTakesDialog = this.hideDeleteInventoryStockTakesDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onAdjustedBy = this.onAdjustedBy.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse: e.value})
    }

    onAdjustedBy (e){
        this.setState({adjusted_by: e.value})
    }

    static propTypes = {
        inventorystocktakes : PropTypes.array.isRequired,
        getInventoryStockTakes: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getInventoryStockTakes();
        this.props.getWarehouses()
        this.props.getEmployees()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                date: '',
                adjusted_by: null,
                warehouse: null,
                comments: '',
                adjustments: ''
            },
            submitted: false,
            inventorystocktakeDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            inventorystocktakeDialog: false
        });
    }

    hideDeleteInventoryStockTakeDialog() {
        this.setState({ deleteInventoryStockTakeDialog: false });
    }

    hideDeleteInventoryStockTakesDialog() {
        this.setState({ deleteInventoryStockTakesDialog: false });
    }

    saveInventoryStockTake = (e) => {
        e.preventDefault();
        const {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        } = this.state;
        const inventorystocktake = {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        };
        this.props.addInventoryStockTake(inventorystocktake);
        this.setState({
            date: '',
            adjusted_by: null,
            warehouse: null,
            comments: '',
            adjustments: '',
            inventorystocktakeDialog: false
        });
        this.props.history.push('/inventorystocktakes');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                date: '',
                adjusted_by: null,
                warehouse: null,
                comments: '',
                adjustments: ''
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

    editInventoryStockTake(e) {
        const errors = this.editDataValidateError();
        const {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        } = this.state.selectRow;
        const inventorystocktake = {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editInventoryStockTake(this.state.selectRow.id, inventorystocktake);
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

    confirmDeleteInventoryStockTake(inventorystocktake) {
        this.setState({
            inventorystocktake,
            deleteInventoryStockTakeDialog: true
        });
    }

    deleteInventoryStockTake() {
        this.props.deleteInventoryStockTake();
        this.setState({
            deleteInventoryStockTakeDialog: false,
            inventorystocktake: this.emptyInventoryStockTake
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteInventoryStockTakesDialog: true });
    }

    deleteSelectedInventoryStockTakes() {
        this.props.deleteInventoryStockTake();
        this.setState({
            deleteInventoryStockTakesDialog: false,
            selectedInventoryStockTakes: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Inventory Stock Take</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW INVENTORY STOCK TAKE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteInventoryStockTake(rowData)} />
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
        const inventorystocktakeDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveInventoryStockTake} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editInventoryStockTake}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        } = this.state;

        const {warehouses} = this.props;
        const {employees} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.inventorystocktakes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedInventoryStockTakes} onSelectionChange={e => this.setState({selectedInventoryStockTakes: e.value})}
                        paginator rows={10} emptyMessage="No Inventory Stock Takes found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="adjusted_by"
                            header="Adjusted By"
                            sortable filter filterPlaceholder="Search by Adjusted By"
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
                            field="value_of_all_adjustments"
                            header="Value Of All Adjustments"
                            sortable filter filterPlaceholder="Search by Value Of All Adjustments"
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
                        visible={this.state.inventorystocktakeDialog}
                        style={{ width: '900px' }}
                        header=" Create Inventory Stock Take"
                        modal
                        className="p-fluid"
                        footer={inventorystocktakeDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Calendar
                                    showIcon={true}
                                    className="form-control"
                                    name="date"
                                    onChange={this.onChange}
                                    value={date}
                                    dateFormat="yy-mm-dd"
                                />
                                <label htmlFor="inputtext">DATE</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>Adjustments</label>
                                 <InputNumber
                                    name="adjustments"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={adjustments}
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
                                        name="comments"
                                        onChange={this.onChange}
                                        value={comments}
                                    />
                                    <label htmlFor="inputtext">Comments</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={warehouse}
                                    onChange={this.onTypeChange}
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
                                    value={adjusted_by}
                                    onChange={this.onAdjustedBy}
                                    options={employees}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="employee_number"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT ADJUSTED BY</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE INVENTORY STOCK TAKE"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inDate"
                                value={this.state.selectRow.date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        date: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                           <InputNumber
                                id="inAdjustments"
                                value={this.state.selectRow.adjustments}
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
                                            adjustments: e.target.value
                                        }
                                    })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                comments: e.target.value
                                            }
                                        })
                                    }
                                    id="inComments"
                                    value={this.state.selectRow.comments}
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
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inAdjustedBy"
                                value={this.state.selectRow.adjusted_by}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            adjusted_by: e.target.value
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
    inventorystocktakes: state.inventorystocktakes.inventorystocktakes,
    warehouses: state.warehouses.warehouses,
    employees: state.employees.employees,
})

export default connect(
    mapStateToProps,
    {
        getInventoryStockTakes,
        getWarehouses,
        getEmployees,
        addInventoryStockTake,
        deleteInventoryStockTake,
        editInventoryStockTake,
    }) (InventoryStockTakes);
