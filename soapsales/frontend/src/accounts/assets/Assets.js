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
import { getAssets, addAsset, editAsset, deleteAsset } from '..//../actions/assets';
import { getAssetTypesChoices, getAssetsDepriciationMethodChoices } from '..//../actions/choices';
import { getJournals } from '..//../actions/journals';
import { getEmployees } from '..//../actions/employees';
import { getAccounts } from '..//../actions/accounts';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";



class Assets extends Component {

    emptyAsset = {
        name: '',
        description: '',
        category: null,
        initial_value: '',
        credit_account: null,
        depreciation_period: '',
        init_date: '',
        depreciation_method: null,
        salvage_value: '',
        created_by: null,
        entry: null
    };


    constructor() {
        super();
        this.state = {
            assets: [],
            globalFilter: null,
            dateFilter: null,
            selectedAssets: null,
            assetDialog: false,
            deleteAssetDialog: false,
            deleteAssetsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                description: '',
                category: null,
                initial_value: '',
                credit_account: null,
                depreciation_period: '',
                init_date: '',
                depreciation_method: null,
                salvage_value: '',
                created_by: null,
                entry: null
            },
            newData: {
                name: '',
                description: '',
                category: null,
                initial_value: '',
                credit_account: null,
                depreciation_period: '',
                init_date: '',
                depreciation_method: null,
                salvage_value: '',
                created_by: null,
                entry: null
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
        this.saveAsset = this.saveAsset.bind(this);
        this.editAsset = this.editAsset.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteAsset = this.confirmDeleteAsset.bind(this);
        this.deleteAsset = this.deleteAsset.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedAssets = this.deleteSelectedAssets.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteAssetDialog = this.hideDeleteAssetDialog.bind(this);
        this.hideDeleteAssetsDialog = this.hideDeleteAssetsDialog.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onCreditAccount = this.onCreditAccount.bind(this);
        this.onDepreciationMethod = this.onDepreciationMethod.bind(this);
        this.onCreatedBy = this.onCreatedBy.bind(this);
        this.onEntry = this.onEntry.bind(this);
    }

    onCategory (e){
        this.setState({category: e.value})
    }

    onCreditAccount (e){
        this.setState({credit_account: e.value})
    }

    onDepreciationMethod (e){
        this.setState({depreciation_method: e.value})
    }

    onCreatedBy (e){
        this.setState({created_by: e.value})
    }

    onEntry (e){
        this.setState({entry: e.value})
    }

    static propTypes = {
        assets : PropTypes.array.isRequired,
        getAssets: PropTypes.func.isRequired,
        addAsset: PropTypes.func.isRequired,
        editAsset: PropTypes.func.isRequired,
        deleteAsset: PropTypes.func.isRequired,
        getAssetTypesChoices: PropTypes.func.isRequired,
        getAssetsDepriciationMethodChoices: PropTypes.func.isRequired,
        getJournals: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getAssetTypesChoices()
        this.props.getAssetsDepriciationMethodChoices()
        this.props.getJournals()
        this.props.getEmployees()
        this.props.getAccounts()
        this.props.getAssets()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                description: '',
                category: null,
                initial_value: '',
                credit_account: null,
                depreciation_period: '',
                init_date: '',
                depreciation_method: null,
                salvage_value: '',
                created_by: null,
                entry: null
            },
            submitted: false,
            assetDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            assetDialog: false
        });
    }

    hideDeleteAssetDialog() {
        this.setState({ deleteAssetDialog: false });
    }

    hideDeleteAssetsDialog() {
        this.setState({ deleteAssetsDialog: false });
    }


    saveAsset = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        } = this.state;
        const asset = {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        };
        this.props.addAsset(asset);
        this.setState({
            name: '',
            description: '',
            category: '',
            initial_value: '',
            credit_account: '',
            depreciation_period: '',
            init_date: '',
            depreciation_method: '',
            salvage_value: '',
            created_by: '',
            entry: '',
            assetDialog: false
        });
        this.props.history.push('/assets');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                description: '',
                category: '',
                initial_value: '',
                credit_account: '',
                depreciation_period: '',
                init_date: '',
                depreciation_method: '',
                salvage_value: '',
                created_by: '',
                entry: '',
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


    editAsset(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,

        } = this.state.selectRow;
        const asset = {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editAsset(this.state.selectRow.id, asset);
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
                detail: 'Ad'
            });
        }
        return errorList;
    }


    confirmDeleteAsset(asset) {
        this.setState({
            asset,
            deleteAssetDialog: true
        });
    }

    deleteAsset() {
        this.props.deleteAsset();
        this.setState({
            deleteAssetDialog: false,
            asset: this.emptyAsset
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteAssetsDialog: true });
    }

    deleteSelectedAssets() {
        this.props.deleteAsset();
        this.setState({
            deleteAssetsDialog: false,
            selectedAssets: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Asset</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW ASSET" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteAsset(rowData)} />
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
        const assetDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveAsset} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editAsset}/>
            </div>
        );


        const deleteAssetsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAssetsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedAssets} />
            </>
        );

        const header = this.renderHeader();
        const {
            name,
            description,
            category,
            initial_value,
            credit_account,
            depreciation_period,
            init_date,
            depreciation_method,
            salvage_value,
            created_by,
            entry,
        } = this.state;

        const { assettypeschoices } = this.props;
        const { assetsdepriciationmethodchoices } = this.props;
        const { journals } = this.props;
        const { employees } = this.props;
        const { accounts } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedAssets} onSelectionChange={e => this.setState({selectedAssets: e.value})}
                        paginator rows={10} emptyMessage="No Bill Payments found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="credit_account"
                            header="Credit Account"
                            sortable filter filterPlaceholder="Search by Credit Account"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="name"
                            header="Name"
                            sortable filter filterPlaceholder="Search by Name"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="initial_value"
                            header="Initial Value"
                            sortable filter filterPlaceholder="Search by Initial Value"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="created_by"
                            header="Created By"
                            sortable filter filterPlaceholder="Search by Created By"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="category"
                            header="Category"
                            sortable filter filterPlaceholder="Search by Category"
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
                        visible={this.state.assetDialog}
                        style={{ width: '900px' }}
                        header="Asset Details"
                        modal className="p-fluid"
                        footer={assetDialogFooter}
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
                            <label>Initial Value</label>
                             <InputNumber
                                name="initial_value"
                                mode="decimal"
                                onChange={this.onChange}
                                value={initial_value}
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
                            <label>Depreciation Period</label>
                             <InputNumber
                                name="depreciation_period"
                                mode="decimal"
                                onChange={this.onChange}
                                value={depreciation_period}
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
                            <label>Salvage Value</label>
                             <InputNumber
                                name="salvage_value"
                                mode="decimal"
                                onChange={this.onChange}
                                value={salvage_value}
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
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                name="init_date"
                                onChange={this.onChange}
                                value={init_date}
                                dateFormat="yy-mm-dd"
                            />
                            <label htmlFor="inputtext">Init Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="description"
                                    onChange={this.onChange}
                                    value={description}
                                />
                                <label htmlFor="inputtext">Description</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={category}
                                onChange={this.onCategory}
                                options={assettypeschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT CATEGORY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={credit_account}
                                onChange={this.onCreditAccount}
                                options={accounts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CREDIT ACCOUNT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={depreciation_method}
                                onChange={this.onDepreciationMethod}
                                options={assetsdepriciationmethodchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT DEPRECIATION METHOD</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={created_by}
                                onChange={this.onCreatedBy}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="id_number"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CREATED BY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={entry}
                                onChange={this.onEntry}
                                options={journals}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT ENTRY</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE ASSET"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <InputText
                                id="inName" value={this.state.selectRow.name}
                                style={{marginLeft: '.5em'}} onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            name: e.target.value
                                        }
                                    })
                                }
                            />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Initial Value</label>
                            <InputNumber
                                id="inInitialValue"
                                value={this.state.selectRow.initial_value}
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
                                        initial_value: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Depreciation Period</label>
                            <InputNumber
                                id="inDepreciationPeriod"
                                value={this.state.selectRow.depreciation_period}
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
                                        depreciation_period: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Salvage Value</label>
                            <InputNumber
                                id="inSalvageValue"
                                value={this.state.selectRow.salvage_value}
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
                                        salvage_value: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                id="inInitDate"
                                value={this.state.selectRow.init_date}
                                dateFormat="yy-mm-dd"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        init_date: e.target.value
                                    }
                                })
                            }/>
                            <label htmlFor="inputtext">Init Date</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    id="inDescription"
                                    value={this.state.selectRow.description}
                                    onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            description: e.target.value
                                        }
                                    })
                                }/>
                                <label htmlFor="inputtext">Description</label>
                          </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inCategory"
                                value={this.state.selectRow.category}
                                options={assettypeschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        category: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inCreditAccount"
                                value={this.state.selectRow.credit_account}
                                options={accounts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        credit_account: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inDepreciationMethod"
                                value={this.state.selectRow.depreciation_method}
                                options={assetsdepriciationmethodchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        depreciation_method: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inCreatedBy"
                                value={this.state.selectRow.created_by}
                                options={employees}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        created_by: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEntry"
                                value={this.state.selectRow.entry}
                                options={journals}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        entry: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteAssetsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAssetsDialogFooter} onHide={this.hideDeleteAssetsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.assets && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    assettypeschoices: state.assettypeschoices.assettypeschoices,
    assetsdepriciationmethodchoices: state.assetsdepriciationmethodchoices.assetsdepriciationmethodchoices,
    journals: state.journals.journals,
    employees: state.employees.employees,
    accounts: state.accounts.accounts,
    assets: state.assets.assets,
})

export default connect(mapStateToProps, {
    getAssetTypesChoices,
    getAssetsDepriciationMethodChoices,
    getJournals,
    getEmployees,
    getAccounts,
    addAsset,
    getAssets,
    editAsset,
    deleteAsset } ) (Assets);
