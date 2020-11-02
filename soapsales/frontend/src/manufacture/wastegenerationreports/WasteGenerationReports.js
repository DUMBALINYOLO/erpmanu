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
import {Dropdown} from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { getWasteGenerationReports, addWasteGenerationReport, editWasteGenerationReport, deleteWasteGenerationReport } from '..//../actions/wastegenerationreports';
import { getEmployees } from '..//../actions/employees';
import { getProcessProducts } from '..//../actions/processproducts';
import { getUnitOfMeasureChoices } from '..//../actions/choices';
import "./form.css";

class WasteGenerationReports extends Component {

    emptyWasteGenerationReport = {
        product: null,
        unit: null,
        quantity: '',
        comments: '',
        recorded_by: null,
    };

    constructor() {
        super();
        this.state = {
            wastegenerationreports : [],
            globalFilter: null,
            dateFilter: null,
            selectedWasteGenerationReports: null,
            wastegenerationreportDialog: false,
            deleteWasteGenerationReportDialog: false,
            deleteWasteGenerationReportsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                product: null,
                unit: null,
                quantity: '',
                comments: '',
                recorded_by: null,
            },
            newData: {
                product: null,
                unit: null,
                quantity: '',
                comments: '',
                recorded_by: null,
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
        this.saveWasteGenerationReport = this.saveWasteGenerationReport.bind(this);
        this.editWasteGenerationReport = this.editWasteGenerationReport.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteManufacturedStockItem = this.confirmDeleteManufacturedStockItem.bind(this);
        this.deleteWasteGenerationReport = this.deleteWasteGenerationReport.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedWasteGenerationReports = this.deleteSelectedWasteGenerationReports.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteWasteGenerationReportDialog = this.hideDeleteWasteGenerationReportDialog.bind(this);
        this.hideDeleteWasteGenerationReportsDialog = this.hideDeleteWasteGenerationReportsDialog.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onProduct = this.onProduct.bind(this);
        this.onRecordedBy = this.onRecordedBy.bind(this);
    }

    onUnit (e){
        this.setState({unit: e.value})
    }

    onProduct (e){
        this.setState({product: e.value})
    }

    onRecordedBy (e){
        this.setState({recorded_by: e.value})
    }

    static propTypes = {
        wastegenerationreports : PropTypes.array.isRequired,
        getWasteGenerationReports: PropTypes.func.isRequired,
        getProcessProducts: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getWasteGenerationReports();
        this.props.getProcessProducts()
        this.props.getUnitOfMeasureChoices()
        this.props.getEmployees()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                product: null,
                unit: null,
                quantity: '',
                comments: '',
                recorded_by: null,
            },
            submitted: false,
            wastegenerationreportDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            wastegenerationreportDialog: false
        });
    }

    hideDeleteWasteGenerationReportDialog() {
        this.setState({ deleteWasteGenerationReportDialog: false });
    }

    hideDeleteWasteGenerationReportsDialog() {
        this.setState({ deleteWasteGenerationReportsDialog: false });
    }

    saveWasteGenerationReport = (e) => {
        e.preventDefault();
        const {
            product,
            unit,
            quantity,
            comments,
            recorded_by
        } = this.state;
        const wastegenerationreport = {
            product,
            unit,
            quantity,
            comments,
            recorded_by
        };
        this.props.addWasteGenerationReport(wastegenerationreport);
        this.setState({
            product: null,
            unit: null,
            quantity: '',
            comments: '',
            recorded_by: null,
            wastegenerationreportDialog: false
        });
        this.props.history.push('/wastegenerationreports');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                product: null,
                unit: null,
                quantity: '',
                comments: '',
                recorded_by: null,
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

    editWasteGenerationReport(e) {
        const errors = this.editDataValidateError();
        const {
            product,
            unit,
            quantity,
            comments,
            recorded_by
        } = this.state.selectRow;
        const wastegenerationreport = {
            product,
            unit,
            quantity,
            comments,
            recorded_by
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editWasteGenerationReport(this.state.selectRow.id, wastegenerationreport);
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

    confirmDeleteManufacturedStockItem(wastegenerationreport) {
        this.setState({
            wastegenerationreport,
            deleteWasteGenerationReportDialog: true
        });
    }

    deleteWasteGenerationReport() {
        this.props.deleteWasteGenerationReport();
        this.setState({
            deleteWasteGenerationReportDialog: false,
            wastegenerationreport: this.emptyWasteGenerationReport
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteWasteGenerationReportsDialog: true });
    }

    deleteSelectedWasteGenerationReports() {
        this.props.deleteWasteGenerationReport();
        this.setState({
            deleteWasteGenerationReportsDialog: false,
            selectedWasteGenerationReports: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Waste Generation Report</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW WASTE GENERATION REPORT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
        const wastegenerationreportDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveWasteGenerationReport} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editWasteGenerationReport}/>
            </div>
        );

        const header = this.renderHeader();
        const { product, unit, quantity, comments, recorded_by } = this.state;
        const { processproducts } = this.props;
        const { unitofmeasurechoices } = this.props;
        const { employees } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.wastegenerationreports}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedWasteGenerationReports} onSelectionChange={e => this.setState({selectedWasteGenerationReports: e.value})}
                        paginator rows={10} emptyMessage="No Waste Generation Reports found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="reference_number" header="Reference Number" sortable filter filterPlaceholder="Search by Reference Number" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="product" header="Product" sortable filter filterPlaceholder="Search by Product" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="unit" header="Unit" sortable filter filterPlaceholder="Search by Unit" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by Quantity" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="recorded_by" header="Recorded By" sortable filter filterPlaceholder="Search by Record" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>
                    <Dialog
                        visible={this.state.wastegenerationreportDialog}
                        style={{ width: '900px' }}
                        header=" Create Waste Generation Report"
                        modal
                        className="p-fluid"
                        footer={wastegenerationreportDialogFooter}
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
                            <div className="p-field p-col-12 p-md-12">
                              <label>COMMNETS</label>
                              <InputTextarea
                                name="comments"
                                onChange={this.onChange}
                                value={comments}
                              />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                              <Dropdown
                                placeholder ="SELECT PRODUCT"
                                value={product}
                                onChange={this.onProduct}
                                options={processproducts}
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
                                placeholder ="SELECT RECORDED BY"
                                value={recorded_by}
                                onChange={this.onRecordedBy}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="employee_number"
                                optionValue="id"
                              />
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE WASTE GENERATION REPORT"
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
                            <label htmlFor="inComments">Comments </label>
                            <InputTextarea id="inComments" value={this.state.selectRow.comments}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        comments: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inProduct"
                                value={this.state.selectRow.product}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            product: e.target.value
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
                                id="inRecordedBy"
                                value={this.state.selectRow.recorded_by}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            recorded_by: e.target.value
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
    wastegenerationreports: state.wastegenerationreports.wastegenerationreports,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
    processproducts: state.processproducts.processproducts,
    employees: state.employees.employees
})

export default connect(
    mapStateToProps,
    {
        getWasteGenerationReports,
        addWasteGenerationReport,
        deleteWasteGenerationReport,
        editWasteGenerationReport,
        getUnitOfMeasureChoices,
        getProcessProducts,
        getEmployees,
    }) (WasteGenerationReports);
