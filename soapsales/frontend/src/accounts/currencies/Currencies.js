import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component } from 'react';
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
            taxes: null,
            globalFilter: null,
            dateFilter: null,
            selectedTaxes: null,

            currencyDialog: false,
            deleteCurrencyDialog: false,
            deleteCurrenciesDialog: false,
            currency: this.emptyCurrency,
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
            currency: this.emptyCurrency,
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

    saveCurrency = e => {
        e.preventDefault();
        if (this.state.name && this.state.symbol) {
            const currency = {
                name: this.state.name,
                symbol: this.state.symbol,
            };
            this.setState({
                name: '',
                symbol: '',
                currencyDialog: false
            });
            this.props.addCurrency(currency);
        } else if (this.state.name && this.state.symbol) {
            const updatedcurrency = {
                name: this.state.name,
                symbol: this.state.symbol,
            };
            this.props.editCurrency(updatedcurrency);
            this.props.history.push('/currencies');
        }
    };

    editCurrency(currency) {
        this.setState({
            name: '',
            symbol: '',
            currencyDialog: true
        });
    }

    confirmDeleteCurrency(currency) {
        this.setState({
            currency,
            deleteSymbolDialog: true
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
        this.props.deleteCurrencies();
        this.setState({
            deleteCurrenciesDialog: false,
            selectedCurrencies: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Currencies</h1>
                <div className="datatable-fancy-icons">
                    <div className="fancy-icon"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="Export" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-pdf" iconPos="right" label="PDF" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-print" iconPos="right" label="PRINT" onClick={this.export}></Button></div>
                    <InputText className="fancy-icon" type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" />
                </div>
                <div>
                    <Button label="Create Currency" className="p-button-success p-mr-2" onClick={this.openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedCurrencies || !this.state.selectedCurrencies.length} />
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editCurrency(rowData)} />
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
        const deleteCurrencyDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteCurrencyDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteCurrency} />
            </>
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
            <div className="datatable-doc-demo">
                <DataTable ref={(el) => this.dt = el} value={this.props.currencies}
                    style={{backgroundColor: '#4EB08E'}}
                    header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                    selection={this.state.selectedCurrencies} onSelectionChange={e => this.setState({selectedCurrencies: e.value})}
                    paginator rows={10} emptyMessage="No Currencies found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                    <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                    <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                    <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                    <Column className="table-field" field="symbol" header="Symbol" sortable filter filterPlaceholder="Search by Symbol" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                    <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                </DataTable>

                <Dialog visible={this.state.currencyDialog} style={{ width: '450px' }} header="Currency Details" modal className="p-fluid" footer={currencyDialogFooter} onHide={this.hideDialog}>
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

                <Dialog visible={this.state.deleteCurrencyDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCurrencyDialogFooter} onHide={this.hideDeleteCurrencyDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.currency && <span>Are you sure you want to delete <b>{this.state.currency.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteCurrenciesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCurrenciesDialogFooter} onHide={this.hideDeleteCurrenciesDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.currency && <span>Are you sure you want to delete the selected?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    currencies: state.currencies.currencies
})

export default connect(mapStateToProps, { getCurrencies, addCurrency, editCurrency, deleteCurrency } ) (Currencies);
