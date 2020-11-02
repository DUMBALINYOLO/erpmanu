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
import { getProcessRates, addProcessRate, editProcessRate, deleteProcessRate } from '..//../actions/processrates';
import { getProcessRateUnitTimeChoices } from '..//../actions/choices';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";


class Taxes extends Component {

    emptyProcessRate = {
        unit_time: null,
        quantity: '',
    };


    constructor() {
        super();
        this.state = {
            processrates: [],
            globalFilter: null,
            dateFilter: null,
            selectedProcessRates: null,
            processrateDialog: false,
            deleteProcessRateDialog: false,
            deleteProcessRatesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                unit_time: null,
                quantity: '',
            },
            newData: {
                unit_time: null,
                quantity: '',
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
        this.saveProcessRate = this.saveProcessRate.bind(this);
        this.editProcessRate = this.editProcessRate.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteProcessRate = this.confirmDeleteProcessRate.bind(this);
        this.deleteProcessRate = this.deleteProcessRate.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProcessRates = this.deleteSelectedProcessRates.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteProcessRateDialog = this.hideDeleteProcessRateDialog.bind(this);
        this.hideDeleteProcessRatesDialog = this.hideDeleteProcessRatesDialog.bind(this);
        this.onUnitTime = this.onUnitTime.bind(this);
    }

    onUnitTime (e){
        this.setState({unit_time: e.value})
    }

    static propTypes = {
        processrates : PropTypes.array.isRequired,
        getProcessRates: PropTypes.func.isRequired,
        addProcessRate: PropTypes.func.isRequired,
        editProcessRate: PropTypes.func.isRequired,
        deleteProcessRate: PropTypes.func.isRequired,
        getProcessRateUnitTimeChoices: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                unit_time: null,
                quantity: '',
            },
            submitted: false,
            processrateDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            processrateDialog: false
        });
    }

    hideDeleteProcessRateDialog() {
        this.setState({ deleteProcessRateDialog: false });
    }

    hideDeleteProcessRatesDialog() {
        this.setState({ deleteProcessRatesDialog: false });
    }

    componentDidMount() {
        this.props.getProcessRates();
        this.props.getProcessRateUnitTimeChoices()
    }


    saveProcessRate = (e) => {
        e.preventDefault();
        const {
            unit_time,
            quantity
        } = this.state;
        const processrate = {
            unit_time,
            quantity
        };
        this.props.addProcessRate(processrate);
        this.setState({
            unit_time: null,
            quantity: '',
            processrateDialog: false
        });
        this.props.history.push('/processrates');
    };

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                unit_time: null,
                quantity: '',
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


    editProcessRate(e) {
        const errors = this.editDataValidateError();
        const {
            unit_time,
            quantity

        } = this.state.selectRow;
        const processrate = {
            unit_time,
            quantity

        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editProcessRate(this.state.selectRow.id, processrate);
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


    confirmDeleteProcessRate(processrate) {
        this.setState({
            processrate,
            deleteProcessRateDialog: true
        });
    }

    deleteProcessRate() {
        this.props.deleteProcessRate();
        this.setState({
            deleteProcessRateDialog: false,
            processrate: this.emptyProcessRate
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteProcessRatesDialog: true });
    }

    deleteSelectedProcessRates() {
        this.props.deleteProcessRate();
        this.setState({
            deleteProcessRatesDialog: false,
            selectedProcessRates: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Process Rate</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW PROCESS RATE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProcessRate(rowData)} />
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
        const processrateDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProcessRate} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editProcessRate}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            unit_time,
            quantity
        } = this.state;

        const {processrateunittimechoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.processrates}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedProcessRates} onSelectionChange={e => this.setState({selectedProcessRates: e.value})}
                        paginator rows={10} emptyMessage="No Taxes found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="unit_time" header="Unit Time" sortable filter filterPlaceholder="Search by Time" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="quantity" header="Quantity" sortable filter filterPlaceholder="Search by Quantity" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>

                    <Dialog
                        visible={this.state.processrateDialog}
                        style={{ width: '900px' }}
                        header="Create Process Rate"
                        modal className="p-fluid"
                        footer={processrateDialogFooter}
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
                                        value={unit_time}
                                        onChange={this.onUnitTime}
                                        options={processrateunittimechoices}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="value"
                                        optionValue="key"
                                    />
                                    <label htmlFor="inputtext">SELECT UNIT TIME</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE PROCESS RATE"
                        modal={true} onHide={this.onHideEditDialog}
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
                                id="inUnitTime"
                                value={this.state.selectRow.unit_time}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            unit_time: e.target.value
                                        }
                                    })
                                }
                                options={processrateunittimechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            </span>
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteProcessRatesDialog} style={{ width: '450px' }} header="Confirm" modal onHide={this.hideDeleteProcessRatesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.processrate && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    processrates: state.processrates.processrates,
    processrateunittimechoices: state.processrateunittimechoices.processrateunittimechoices
})

export default connect(mapStateToProps, { getProcessRateUnitTimeChoices, getProcessRates, addProcessRate, editProcessRate, deleteProcessRate } ) (Taxes);
