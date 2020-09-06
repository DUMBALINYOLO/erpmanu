import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component, Fragment } from 'react';
import {Growl} from 'primereact/growl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import {Checkbox} from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { getAccounts, addAccount, editAccount, deleteAccount } from '..//../actions/accounts';
import { getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices } from '..//../actions/choices';
import "./form.css";



class Accounts extends Component {

    emptyAccount = {
        name: '',
        balance: '',
        type: null,
        description: '',
        bank_account: false,
        control_account: false,
        parent_account: null,
        balance_sheet_category: null,
        active: false,
        
    };

    constructor() {
        super();
        this.state = {
            accounts : [],
            globalFilter: null,
            dateFilter: null,
            selectedAccounts: null,
            accountDialog: false,
            deleteAccountDialog: false,
            deleteAccountsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                balance: '',
                type: null,
                description: '',
                bank_account: false,
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
            },
            newData: {
                name: '',
                balance: '',
                type: null,
                description: '',
                bank_account: false,
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
            },
            submitted: false,

        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this);
        this.onDateFilterChange = this.onDateFilterChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onParentAccount = this.onParentAccount.bind(this);
        this.onBalanceSheetCategory = this.onBalanceSheetCategory.bind(this);
        this.onControlAccount = this.onControlAccount.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onBankAccount = this.onBankAccount.bind(this);
        this.onChange = this.onChange.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteAccount = this.confirmDeleteAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedAccounts = this.deleteSelectedAccounts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteAccountDialog = this.hideDeleteAccountDialog.bind(this);
        this.hideDeleteAccountsDialog = this.hideDeleteAccountsDialog.bind(this);

        
    }

    static propTypes = {
        accounts : PropTypes.array.isRequired,
        getAccounts: PropTypes.func.isRequired,

    };

    componentDidMount() {
        this.props.getAccounts();
        this.props.getAccountTypeChoices();
        this.props.getAccountBalanceSheetCategoriesChoices();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onBankAccount() {
        this.setState({
            bank_account: !this.state.checked
        });
    }

    onControlAccount() {
        this.setState({
            control_account: !this.state.checked
        });
    }

    onActive() {
        this.setState({
            active: !this.state.checked
        });
    }

    onTypeChange (e){
        this.setState({type: e.value})
    }

    onParentAccount (e){
        this.setState({parent_account: e.value})
    }

    onBalanceSheetCategory (e){
        this.setState({balance_sheet_category: e.value})
    }

    openNew() {
        this.setState({
            newData: {
                name: '',
                balance: '',
                type: null,
                description: '',
                bank_account: false,
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
            },
            submitted: false,
            accountDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            accountDialog: false
        });
    }

    hideDeleteAccountDialog() {
        this.setState({ deleteAccountDialog: false });
    }

    hideDeleteAccountsDialog() {
        this.setState({ deleteAccountsDialog: false });
    }

    saveAccount = (e) => {
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
            bank_account
        } = this.state;
        const account = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            bank_account
        };
        this.props.addAccount(account);
        this.setState({
            name: '',
            balance: '',
            type: '',
            description: '',
            control_account: true,
            parent_account: '',
            balance_sheet_category: '',
            active: true,
            bank_account: true
        });
        this.props.history.push('/accounts');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                balance: '',
                type: null,
                description: '',
                bank_account: false,
                control_account: false,
                parent_account: null,
                balance_sheet_category: null,
                active: false,
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


    editAccount(e) {
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
            bank_account
        } = this.state.selectRow;
        const account = {
            name,
            balance,
            type,
            description,
            control_account,
            parent_account,
            balance_sheet_category,
            active,
            bank_account
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editAccount(this.state.selectRow.id, account);
            this.onHideEditDialog(e);
            this.growl.show({severity: 'success', summary: 'Succesfully', detail: 'Edited'});
        }
    }


    editDataValidateError() {
        const errorList = [];
        if (!this.state.selectRow.name) {
            errorList.push({
                severity: 'error',
                summary: 'Boş Bırakılamaz!',
                detail: 'Ad'
            });
        }
        return errorList;
    }


    confirmDeleteAccount(account) {
        this.setState({
            account,
            deleteAccountDialog: true
        });
    }

    deleteAccount() {
        this.props.deleteAccount();
        this.setState({
            deleteAccountDialog: false,
            account: this.emptyAccount
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteAccountsDialog: true });
    }

    deleteSelectedAccounts() {
        this.props.deleteAccount();
        this.setState({
            deleteAccountsDialog: false,
            selectedAccounts: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Accounts</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW ACCOUNT" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteAccount(rowData)} />
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
        const accountDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveAccount} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editAccount}/>
            </div>
        );


        const deleteAccountDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAccountsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedAccounts} />
            </>
        );

        const header = this.renderHeader();
        const { accounts } = this.props;
        const { accounttypechoices } = this.props;
        const {accountbalancesheetcategorieschoices} = this.props;
        const {
            name,
            balance,
            type,
            description,
            parent_account,
            balance_sheet_category,
        } = this.state;


        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.accounts}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedAccounts} onSelectionChange={e => this.setState({selectedAccounts: e.value})}
                        paginator rows={10} emptyMessage="No Accounts found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="created_date"
                            header="Created Date"
                            sortable filter filterPlaceholder="Search by Created Date"
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
                        visible={this.state.accountDialog} 
                        style={{ width: '900px' }} 
                        header=" Create Account" 
                        modal 
                        className="p-fluid" 
                        footer={accountDialogFooter} 
                        onHide={this.hideDialog}
                    >
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
                            <span className="p-float-label">
                                <InputTextarea
                                    name="description"
                                    onChange={this.onChange}
                                    value={description}
                                />
                                <label htmlFor="inputtext">Description</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>BANK ACCOUNT :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onBankAccount}
                                checked={this.state.bank_account}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>CONTROL ACCOUNT :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onControlAccount}
                                checked={this.state.control_account}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>ACTIVE :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onActive}
                                checked={this.state.active}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12">
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
                        <div className="p-field p-col-12 p-md-12">
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
                        <div className="p-field p-col-12 p-md-12">
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
                    </Dialog>
                    <Dialog 
                        header="UPDATE ACCOUNT" 
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
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                description: e.target.value
                                            }
                                        })
                                    }
                                    id="inDes" 
                                    value={this.state.selectRow.description}
                                />
                            </span>
                        </div>

                        
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>BANK ACCOUNT :</label>
                            <Checkbox
                                onChange={(e) => this.setState({
                                    selectRow: {
                                            ...this.state.selectRow,
                                            bank_account: e.target.value
                                        }
                                    })
                                }
                                inputId="working"
                                id="inBankAccount" 
                                checked={this.state.selectRow.bank_account}
                                
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
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inType" 
                                value={this.state.selectRow.type}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            type: e.target.value
                                        }
                                    })
                                }
                                options={accounttypechoices}
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
                                id="inBalanceSheetCategory" 
                                value={this.state.selectRow.balance_sheet_category}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            balance_sheet_category: e.target.value
                                        }
                                    })
                                }
                                options={accountbalancesheetcategorieschoices}
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
                                id="inParentAccount" 
                                value={this.state.selectRow.parent_account}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            parent_account: e.target.value
                                        }
                                    })
                                }
                                options={accounts}
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
    accounts: state.accounts.accounts,
    accounttypechoices: state.accounttypechoices.accounttypechoices,
    accountbalancesheetcategorieschoices: state.accountbalancesheetcategorieschoices.accountbalancesheetcategorieschoices,

})

export default connect(
            mapStateToProps, 
            {getAccounts, addAccount, deleteAccount, editAccount, getAccountTypeChoices, getAccountBalanceSheetCategoriesChoices} 
            ) (Accounts);


