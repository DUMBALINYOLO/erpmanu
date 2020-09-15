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
import { getCurrencies, addCurrency, editCurrency, deleteCurrency } from '..//../actions/currencies';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import "./form.css";



class Currencies extends Component {

    emptyCurrency = {
        name: '',
        symbol: ''
    };


    constructor() {
        super();
        this.state = {
            currencies: [],
            globalFilter: null,
            dateFilter: null,
            selectedCurrencies: null,
            taxDialog: false,
            deleteCurrencyDialog: false,
            deleteCurrenciesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                symbol: '',
            },
            newData: {
                name: '',
                symbol:''
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
        this.saveCurrency = this.saveCurrency.bind(this);
        this.editCurrency = this.editCurrency.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteCurrency = this.confirmDeleteCurrency.bind(this);
        this.deleteCurrency = this.deleteCurrency.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedCurrencies = this.deleteSelectedCurrencies.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteCurrencyDialog = this.hideDeleteCurrencyDialog.bind(this);
        this.hideDeleteCurrenciesDialog = this.hideDeleteCurrenciesDialog.bind(this);
    }

    static propTypes = {
        currencies : PropTypes.array.isRequired,
        getCurrencies: PropTypes.func.isRequired,
        addCurrency: PropTypes.func.isRequired,
        editCurrency: PropTypes.func.isRequired,
        deleteCurrency: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                symbol: ''
            },
            submitted: false,
            currencyDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            currencyDialog: false
        });
    }

    hideDeleteCurrencyDialog() {
        this.setState({ deleteCurrencyDialog: false });
    }

    hideDeleteCurrenciesDialog() {
        this.setState({ deleteCurrenciesDialog: false });
    }

    componentDidMount() {
        this.props.getCurrencies();
    }


    saveCurrency = (e) => {
        e.preventDefault();
        const { name, symbol } = this.state;
        const currency = { name, symbol};
        this.props.addCurrency(currency);
        this.setState({
            name: '',
            symbol: '',
            currencyDialog: false
        });
        this.props.history.push('/currencies');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                symbol: '',
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


    editCurrency(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            symbol

        } = this.state.selectRow;
        const currency = {
            name,
            symbol,

        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editCurrency(this.state.selectRow.id, currency);
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


    confirmDeleteCurrency(currency) {
        this.setState({
            currency,
            deleteCurrencyDialog: true
        });
    }

    deleteCurrency() {
        this.props.deleteCurrency();
        this.setState({
            deleteCurrencyDialog: false,
            currency: this.emptyCurrency
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteCurrenciesDialog: true });
    }

    deleteSelectedCurrencies() {
        this.props.deleteCurrency();
        this.setState({
            deleteCurrenciesDialog: false,
            selectedCurrencies: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Currency</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW CURRENCY" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteCurrency(rowData)} />
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
        const currencyDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveCurrency} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editCurrency}/>
            </div>
        );


        const deleteCurrenciesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteCurrenciesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedCurrencies} />
            </>
        );

        const header = this.renderHeader();
        const { name, symbol } = this.state;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.currencies}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedCurrencies} onSelectionChange={e => this.setState({selectedCurrencies: e.value})}
                        paginator rows={10} emptyMessage="No Currency found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="symbol" header="Symbol" sortable filter filterPlaceholder="Search by Symbol" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>

                    <Dialog
                        visible={this.state.currencyDialog}
                        style={{ width: '900px' }}
                        header="Currency Details"
                        modal className="p-fluid"
                        footer={currencyDialogFooter}
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
                                    <InputText
                                      name="symbol"
                                      onChange={this.onChange}
                                      value={symbol}
                                    />
                                    <label htmlFor="inputtext">Symbol</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE CURRENCY"
                        footer={editDialogFooter}
                        className="p-fluid"
                        style={{ width: '700px' }}
                        visible={this.state.visibleEditDialog}
                        modal={true} onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
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
                            <label htmlFor="inSymbol">Symbol </label>
                            <InputText id="inSymbol" value={this.state.selectRow.symbol}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        symbol: e.target.value
                                    }
                                })
                            }/>
                        </span>
                    </Dialog>
                    <Dialog visible={this.state.deleteCurrenciesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCurrenciesDialogFooter} onHide={this.hideDeleteCurrenciesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.currency && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    currencies: state.currencies.currencies
})

export default connect(mapStateToProps, { getCurrencies, addCurrency, editCurrency, deleteCurrency } ) (Currencies);
