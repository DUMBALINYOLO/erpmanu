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
import { getTaxes, addTax, editTax, deleteTax } from '..//../actions/taxes';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import "./form.css";


class Taxes extends Component {

    emptyTax = {
        name: '',
        rate: ''
    };


    constructor() {
        super();
        this.state = {
            taxes: [],
            globalFilter: null,
            dateFilter: null,
            selectedTaxes: null,
            taxDialog: false,
            deleteTaxDialog: false,
            deleteTaxesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                rate: '',
            },
            newData: {
                name: '',
                rate:''
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
        this.saveTax = this.saveTax.bind(this);
        this.editTax = this.editTax.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteTax = this.confirmDeleteTax.bind(this);
        this.deleteTax = this.deleteTax.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedTaxes = this.deleteSelectedTaxes.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteTaxDialog = this.hideDeleteTaxDialog.bind(this);
        this.hideDeleteTaxesDialog = this.hideDeleteTaxesDialog.bind(this);
    }

    static propTypes = {
        taxes : PropTypes.array.isRequired,
        getTaxes: PropTypes.func.isRequired,
        addTax: PropTypes.func.isRequired,
        editTax: PropTypes.func.isRequired,
        deleteTax: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                rate: ''
            },
            submitted: false,
            taxDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            taxDialog: false
        });
    }

    hideDeleteTaxDialog() {
        this.setState({ deleteTaxDialog: false });
    }

    hideDeleteTaxesDialog() {
        this.setState({ deleteTaxesDialog: false });
    }

    componentDidMount() {
        this.props.getTaxes();
    }


    saveTax = (e) => {
        e.preventDefault();
        const { name, rate } = this.state;
        const tax = { name, rate};
        this.props.addTax(tax);
        this.setState({
            name: '',
            rate: '',
            taxDialog: false
        });
        this.props.history.push('/taxes');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                rate: '',
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


    editTax(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            rate

        } = this.state.selectRow;
        const tax = {
            name,
            rate,

        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editTax(this.state.selectRow.id, tax);
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


    confirmDeleteTax(tax) {
        this.setState({
            tax,
            deleteTaxDialog: true
        });
    }

    deleteTax() {
        this.props.deleteTax();
        this.setState({
            deleteTaxDialog: false,
            tax: this.emptyTax
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteTaxesDialog: true });
    }

    deleteSelectedTaxes() {
        this.props.deleteTax();
        this.setState({
            deleteTaxesDialog: false,
            selectedTaxes: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Taxes</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW TAX" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteTax(rowData)} />
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
        const taxDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveTax} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editTax}/>
            </div>
        );


        const deleteTaxesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteTaxesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedTaxes} />
            </>
        );

        const header = this.renderHeader();
        const { name, rate } = this.state;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedTaxes} onSelectionChange={e => this.setState({selectedTaxes: e.value})}
                        paginator rows={10} emptyMessage="No Taxes found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="rate" header="Rate" sortable filter filterPlaceholder="Search by Rate" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>

                    <Dialog
                        visible={this.state.taxDialog}
                        style={{ width: '900px' }}
                        header="Tax Details"
                        modal className="p-fluid"
                        footer={taxDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-12">
                                <label>Name</label>
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
                                <label>Rate</label>
                                 <InputNumber
                                    name="rate"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={rate}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                  />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE TAX"
                        modal={true} onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
                            <label htmlFor="inName">Name </label>
                            <InputText id="inName" value={this.state.selectRow.name}
                                       style={{marginLeft: '.5em'}} 
                                onChange={(e) => this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        name: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inRate">Rate </label>
                            <InputNumber
                                id="inRate"
                                value={this.state.selectRow.rate}
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
                                        rate: e.target.value
                                    }
                                })
                            }/>
                        </span>
                    </Dialog>
                    <Dialog visible={this.state.deleteTaxesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteTaxesDialogFooter} onHide={this.hideDeleteTaxesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.tax && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    taxes: state.taxes.taxes
})

export default connect(mapStateToProps, { getTaxes, addTax, editTax, deleteTax } ) (Taxes);
