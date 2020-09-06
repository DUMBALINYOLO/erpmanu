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
import { getInterestBearingAccounts, addInterestBearingAccount, editInterestBearingAccount, deleteInterestBearingAccount } from '..//../actions/interestbearingaccounts';
import { getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices, getInterestIntervalAccountChoices, getAccountInterestMethodChoices } from '..//../actions/choices';
import { getAccounts } from '..//../actions/accounts';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";



class InterestBearingAccounts extends Component {

    emptyInterestBearingAccount = {
        name: '',
        balance: '',
        type: null,
        description: '',
        control_account: false,
        parent_account: null,
        balance_sheet_category: null,
        active: false,
        interest_rate: '',
        interest_interval: null,
        interest_method: null,
        last_interest_earned_date: ''
    };


    constructor() {
        super();
        this.state = {
            interestbearingaccounts: [],
            globalFilter: null,
            dateFilter: null,
            selectedInterestBearingAccounts: null,
            interestbearingaccountDialog: false,
            deleteInterestBearingAccountDialog: false,
            deleteInterestBearingAccountsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                balance: '',
                type: null,
                description: '',
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
                interest_rate: '',
                interest_interval: null,
                interest_method: null,
                last_interest_earned_date: ''
            },
            newData: {
                name: '',
                balance: '',
                type: null,
                description: '',
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
                interest_rate: '',
                interest_interval: null,
                interest_method: null,
                last_interest_earned_date: ''
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
        this.saveInterestBearingAccount = this.saveInterestBearingAccount.bind(this);
        this.editInterestBearingAccount = this.editInterestBearingAccount.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteInterestBearingAccount = this.confirmDeleteInterestBearingAccount.bind(this);
        this.deleteInterestBearingAccount = this.deleteInterestBearingAccount.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedInterestBearingAccounts = this.deleteSelectedInterestBearingAccounts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteInterestBearingAccountDialog = this.hideDeleteInterestBearingAccountDialog.bind(this);
        this.hideDeleteInterestBearingAccountsDialog = this.hideDeleteInterestBearingAccountsDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onParentAccount = this.onParentAccount.bind(this);
        this.onBalanceSheetCategory = this.onBalanceSheetCategory.bind(this);
        this.onControlAccount = this.onControlAccount.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onInterestInterval = this.onInterestInterval.bind(this);
        this.onInterestMethod = this.onInterestMethod.bind(this)
    }

    onControlAccount() {
        this.setState({
            control_account: !this.state.checked
        });
    }

    onActive() {
        this.setState({
            is_active: !this.state.checked
        });
    }

    onTypeChange (e){
        this.setState({type: e.value})
    }

    onInterestInterval (e){
        this.setState({interest_interval: e.value})
    }

    onInterestMethod (e){
        this.setState({interest_method: e.value})
    }

    onParentAccount (e){
        this.setState({parent_account: e.value})
    }

    onBalanceSheetCategory (e){
        this.setState({balance_sheet_category: e.value})
    }

    static propTypes = {
        interestbearingaccounts : PropTypes.array.isRequired,
        getInterestBearingAccounts: PropTypes.func.isRequired,
        addInterestBearingAccount: PropTypes.func.isRequired,
        editInterestBearingAccount: PropTypes.func.isRequired,
        deleteInterestBearingAccount: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                balance: '',
                type: null,
                description: '',
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
                interest_rate: '',
                interest_interval: null,
                interest_method: null,
                last_interest_earned_date: ''
            },
            submitted: false,
            interestbearingaccountDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            interestbearingaccountDialog: false
        });
    }

    hideDeleteInterestBearingAccountDialog() {
        this.setState({ deleteInterestBearingAccountDialog: false });
    }

    hideDeleteInterestBearingAccountsDialog() {
        this.setState({ deleteInterestBearingAccountsDialog: false });
    }

    componentDidMount() {
        this.props.getInterestBearingAccounts();
    }


    saveInterestBearingAccount = (e) => {
        e.preventDefault();
        const {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date,
        } = this.state;
        const interestbearingaccount = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date,
        };
        this.props.addInterestBearingAccount(interestbearingaccount);
        this.setState({
            name: '',
            balance: '',
            type: null,
            description: '',
            control_account: false,
            parent_account: null,
            balance_sheet_category: null,
            active: false,
            interest_rate: '',
            interest_interval: null,
            interest_method: null,
            last_interest_earned_date: '',
            billpaymentDialog: false
        });
        this.props.history.push('/interestbearingaccounts');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                balance: '',
                type: null,
                description: '',
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
                interest_rate: '',
                interest_interval: null,
                interest_method: null,
                last_interest_earned_date: ''
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


    editInterestBearingAccount(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date,

        } = this.state.selectRow;
        const interestbearingaccount = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editInterestBearingAccount(this.state.selectRow.id, interestbearingaccount);
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


    confirmDeleteInterestBearingAccount(interestbearingaccount) {
        this.setState({
            interestbearingaccount,
            deleteInterestBearingAccountDialog: true
        });
    }

    deleteInterestBearingAccount() {
        this.props.deleteInterestBearingAccount();
        this.setState({
            deleteInterestBearingAccountDialog: false,
            interestbearingaccount: this.emptyInterestBearingAccount
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteInterestBearingAccountsDialog: true });
    }

    deleteSelectedInterestBearingAccounts() {
        this.props.deleteInterestBearingAccount();
        this.setState({
            deleteInterestBearingAccountsDialog: false,
            selectedInterestBearingAccounts: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Interest Bearing Account</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW INTEREST BEARING ACCOUNT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteInterestBearingAccount(rowData)} />
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
        const interestbearingaccountDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveInterestBearingAccount} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editInterestBearingAccount}/>
            </div>
        );


        const deleteInterestBearingAccountsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteInterestBearingAccountsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedInterestBearingAccounts} />
            </>
        );

        const header = this.renderHeader();
        const {
            name,
            balance,
            type,
            description,
            parent_account,
            balance_sheet_category,
            interest_rate,
            interest_interval,
            interest_method,
            last_interest_earned_date
        } = this.state;

        const {accounts} = this.props;
        const {accounttypechoices} = this.props;
        const {accountbalancesheetcategorieschoices} = this.props;
        const {interestintervalaccountchoices} = this.props;
        const {accountinterestmethodchoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedInterestBearingAccounts} onSelectionChange={e => this.setState({selectedInterestBearingAccounts: e.value})}
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
                            field="account_number"
                            header="Account Number"
                            sortable filter filterPlaceholder="Search by Account Number"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="type"
                            header="Type"
                            sortable filter filterPlaceholder="Search by Type"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="balance_sheet_category"
                            header="Balance Sheet Category"
                            sortable filter filterPlaceholder="Search by Balance Sheet Category"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="balance"
                            header="Balance"
                            sortable filter filterPlaceholder="Search by Balance"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="interest_interval"
                            header="Interest Interval"
                            sortable filter filterPlaceholder="Search by Interest Interval"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="interest_method"
                            header="Interest Method"
                            sortable filter filterPlaceholder="Search by Interest Method"
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
                        visible={this.state.interestbearingaccountDialog}
                        style={{ width: '900px' }}
                        header="Interest Bearing Account Details"
                        modal className="p-fluid"
                        footer={interestbearingaccountDialogFooter}
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
                            <label>Balance</label>
                             <InputNumber
                                name="balance"
                                mode="decimal"
                                onChange={this.onChange}
                                value={balance}
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
                            <label>Interest Rate</label>
                             <InputNumber
                                name="interest_rate"
                                mode="decimal"
                                onChange={this.onChange}
                                value={interest_rate}
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
                                name="last_interest_earned_date"
                                onChange={this.onChange}
                                value={last_interest_earned_date}
                                dateFormat="yy-mm-dd"
                            />
                            <label htmlFor="inputtext">Last Interest Earned Date</label>
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
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>ACTIVE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onActive}
                                checked={this.state.active}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>CONTROL ACCOUNT :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onControlAccount}
                                checked={this.state.control_account}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={type}
                                onChange={this.onTypeChange}
                                options={accounttypechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT TYPE</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={parent_account}
                                onChange={this.onParentAccount}
                                options={accounts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT PARENT ACCOUNT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={balance_sheet_category}
                                onChange={this.onBalanceSheetCategory}
                                options={accountbalancesheetcategorieschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT BALANCE SHEET CATEGORY</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={interest_interval}
                                onChange={this.onInterestInterval}
                                options={interestintervalaccountchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT INTEREST INTERVAL</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={interest_method}
                                onChange={this.onInterestMethod}
                                options={accountinterestmethodchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT INTEREST METHOD</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE INTEREST BEARING ACCOUNT"
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
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                name: e.target.value
                                            }
                                        })
                                    }
                                    id="inName"
                                    value={this.state.selectRow.name}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Balance</label>
                            <InputNumber
                                id="inBalance"
                                value={this.state.selectRow.balance}
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
                                        balance: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label>Interest Rate</label>
                            <InputNumber
                                id="inInterestRate"
                                value={this.state.selectRow.interest_rate}
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
                                        interest_rate: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Calendar
                                id="inDate" value={this.state.selectRow.last_interest_earned_date}
                                style={{marginLeft: '.5em'}} onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            last_interest_earned_date: e.target.value
                                        }
                                    })
                                }
                            />
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
                          </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>ACTIVE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            active: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.active}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>CONTROL ACCOUNT :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            control_account: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.control_account}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inType"
                                value={this.state.selectRow.type}
                                options={accounttypechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        type: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inParentAccount"
                                value={this.state.selectRow.parent_account}
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
                                        parent_account: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inPaidBy"
                                value={this.state.selectRow.balance_sheet_category}
                                options={accountbalancesheetcategorieschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        balance_sheet_category: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inInterestInterval"
                                value={this.state.selectRow.interest_interval}
                                options={interestintervalaccountchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        interest_interval: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inInterestMethod"
                                value={this.state.selectRow.interest_method}
                                options={accountinterestmethodchoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        interest_method: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteInterestBearingAccountsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteInterestBearingAccountsDialogFooter} onHide={this.hideDeleteInterestBearingAccountsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.interestbearingaccount && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    interestbearingaccounts: state.interestbearingaccounts.interestbearingaccounts,
    accounts: state.accounts.accounts,
    interestintervalaccountchoices: state.interestintervalaccountchoices.interestintervalaccountchoices,
    accountinterestmethodchoices: state.accountinterestmethodchoices.accountinterestmethodchoices,
    accounttypechoices: state.accounttypechoices.accounttypechoices,
    accountbalancesheetcategorieschoices: state.accountbalancesheetcategorieschoices.accountbalancesheetcategorieschoices
})

export default connect(mapStateToProps, {
    getAccounts,
    getAccountTypeChoices,
    getInterestIntervalAccountChoices,
    getAccountInterestMethodChoices,
    getAccountBalanceSheetCategoriesChoices,
    getInterestBearingAccounts,
    editInterestBearingAccount,
    deleteInterestBearingAccount,
    addInterestBearingAccount} ) (InterestBearingAccounts);
