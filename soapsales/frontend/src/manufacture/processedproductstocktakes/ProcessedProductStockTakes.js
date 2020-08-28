import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import {MultiSelect} from 'primereact/multiselect';
import {ProgressBar} from 'primereact/progressbar';
import classNames from 'classnames';
import { getProcessedProductStockTakes} from '..//../actions/processedproductstocktakes';
import "./form.css";


class ProcessedProductStockTakes extends Component {

    constructor() {
        super();
        this.state = {
            processedproductstocktakes : null,
            globalFilter: null,
            dateFilter: null,
            selectedProcessedProductStockTakes: null,

        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);       //custom filter function
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this)
        this.onDateFilterChange = this.onDateFilterChange.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    static propTypes = {
        processedproductstocktakes : PropTypes.array.isRequired,
        getProcessedProductStockTakes: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getProcessedProductStockTakes();
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>List of Processed Product Stock Takes</h1>
                <div className="datatable-fancy-icons">
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-pdf" iconPos="right" label="PDF" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-file-excel" iconPos="right" label="CSV" onClick={this.export}></Button></div>
                    <div className="fancy-icon"><Button type="button" className="p-button-warning p-button-rounded" icon="pi pi-print" iconPos="right" label="PRINT" onClick={this.export}></Button></div>
                    <InputText className="fancy-icon" type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Search" />
                </div>
            </div>
        );
    }

    activityBodyTemplate(rowData) {
        return <ProgressBar value={rowData.activity} showValue={false} />;
    }

    actionBodyTemplate() {
        return (
            <Link to="/" >
                <Button type="button" label="VIEW-ME" icon="pi pi-pencil" className="p-button-warning p-button-rounded"></Button>
            </Link>
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

        const header = this.renderHeader();
        const dateFilter = this.renderDateFilter();


        return (
            <div className="datatable-doc-demo">
                <DataTable ref={(el) => this.dt = el} value={this.props.processedproductstocktakes}
                    style={{backgroundColor: '#4EB08E'}}
                    header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                    selection={this.state.selectedProcessedProductStockTakes} onSelectionChange={e => this.setState({selectedProcessedProductStockTakes: e.value})}
                    paginator rows={10} emptyMessage="No ProcessedProductStockTakes found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                        field="reference_number"
                        header="Reference Number"
                        sortable filter filterPlaceholder="Search by Reference Number"
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
            </div>
        );
    }
}

const mapStateToProps = state =>({
    processedproductstocktakes: state.processedproductstocktakes.processedproductstocktakes
})

export default connect(mapStateToProps, {getProcessedProductStockTakes} ) (ProcessedProductStockTakes);
