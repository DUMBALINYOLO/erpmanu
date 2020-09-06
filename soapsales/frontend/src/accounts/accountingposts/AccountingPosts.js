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
import { getAccountingPosts, addAccountingPost, deleteAccountingPost, editAccountingPost } from '..//../actions/accountingposts';
import { getDebits } from '..//../actions/debits';
import { getCredits } from '..//../actions/credits';
import { getLedgers } from '..//../actions/ledgers';
import { getJournals } from '..//../actions/journals';
import { FileUpload } from 'primereact/fileupload';
import {Dropdown} from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import "./form.css";



class AccountingPosts extends Component {

    emptyAccountingPost = {
        entry: null,
        debit: null,
        credit: null,
        ledger: null,
    };


    constructor() {
        super();
        this.state = {
            accountingposts: [],
            globalFilter: null,
            dateFilter: null,
            selectedAccountingPosts: null,
            accountingpostDialog: false,
            deleteAccountingPostDialog: false,
            deleteAccountingPostsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                entry: null,
    			debit: null,
    			credit: null,
    			ledger: null,
            },
            newData: {
                entry: null,
    			debit: null,
    			credit: null,
    			ledger: null,
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
        this.saveAccountingPost = this.saveAccountingPost.bind(this);
        this.editAccountingPost = this.editAccountingPost.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteAccountingPost = this.confirmDeleteAccountingPost.bind(this);
        this.deleteAccountingPost = this.deleteAccountingPost.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedAccountingPosts = this.deleteSelectedAccountingPosts.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteAccountingPostDialog = this.hideDeleteAccountingPostDialog.bind(this);
        this.hideDeleteAccountingPostsDialog = this.hideDeleteAccountingPostsDialog.bind(this);
        this.onEntry = this.onEntry.bind(this);
        this.onDebit = this.onDebit.bind(this);
        this.onCredit = this.onCredit.bind(this);
        this.onLedger = this.onLedger.bind(this);
    }

    onEntry (e){
        this.setState({entry: e.value})
    }

    onDebit (e){
        this.setState({debit: e.value})
    }

    onCredit (e){
        this.setState({credit: e.value})
    }

    onLedger (e){
        this.setState({ledger: e.value})
    }

    static propTypes = {
        accountingposts : PropTypes.array.isRequired,
        getAccountingPosts: PropTypes.func.isRequired,
        addAccountingPost: PropTypes.func.isRequired,
        editAccountingPost: PropTypes.func.isRequired,
        deleteAccountingPost: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                entry: null,
    			debit: null,
    			credit: null,
    			ledger: null,
            },
            submitted: false,
            accountingpostDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            accountingpostDialog: false
        });
    }

    hideDeleteAccountingPostDialog() {
        this.setState({ deleteAccountingPostDialog: false });
    }

    hideDeleteAccountingPostsDialog() {
        this.setState({ deleteAccountingPostsDialog: false });
    }

    componentDidMount() {
        this.props.getAccountingPosts();
    }


    saveAccountingPost = (e) => {
        e.preventDefault();
        const {
            entry,
            debit,
            credit,
            ledger,
        } = this.state;
        const accountingpost = {
            entry,
            debit,
            credit,
            ledger,
        };
        this.props.addAccountingPost(accountingpost);
        this.setState({
            entry: '',
			debit: '',
			credit: '',
			ledger: '',
            accountingpostDialog: false
        });
        this.props.history.push('/accountingposts');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                entry: '',
    			debit: '',
    			credit: '',
    			ledger: '',
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


    editAccountingPost(e) {
        const errors = this.editDataValidateError();
        const {
            entry,
			debit,
			credit,
			ledger,

        } = this.state.selectRow;
        const accountingpost = {
            entry,
			debit,
			credit,
			ledger,

        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editAccountingPost(this.state.selectRow.id, accountingpost);
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


    confirmDeleteAccountingPost(accountingpost) {
        this.setState({
            accountingpost,
            deleteAccountingPostDialog: true
        });
    }

    deleteAccountingPost() {
        this.props.deleteAccountingPost();
        this.setState({
            deleteAccountingPostDialog: false,
            accountingpost: this.emptyAccountingPost
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteAccountingPostsDialog: true });
    }

    deleteSelectedAccountingPosts() {
        this.props.deleteAccountingPost();
        this.setState({
            deleteAccountingPostsDialog: false,
            selectedAccountingPosts: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Accounting Post</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW ACCOUNTING POST" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteAccountingPost(rowData)} />
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
        const accountingpostDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveAccountingPost} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editAccountingPost}/>
            </div>
        );


        const deleteAccountingPostsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteAccountingPostsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedAccountingPosts} />
            </>
        );

        const header = this.renderHeader();
        const {
            entry,
			debit,
			credit,
			ledger,
        } = this.state;

        const {journals} = this.props;
        const {debits} = this.props;
        const {credits} = this.props;
        const {ledgers} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.taxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedAccountingPosts} onSelectionChange={e => this.setState({selectedAccountingPosts: e.value})}
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
                            field="reference_number"
                            header="Reference Number"
                            sortable filter filterPlaceholder="Search by Reference Number"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="entry"
                            header="Entry"
                            sortable filter filterPlaceholder="Search by Entry"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="debit"
                            header="Debit"
                            sortable filter filterPlaceholder="Search by Debit"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="credit"
                            header="Credit"
                            sortable filter filterPlaceholder="Search by Credit"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="ledger"
                            header="Ledger"
                            sortable filter filterPlaceholder="Search by Ledger"
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
                        visible={this.state.accountingpostDialog}
                        style={{ width: '900px' }}
                        header="Accounting Post Details"
                        modal className="p-fluid"
                        footer={accountingpostDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
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
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={debit}
                                onChange={this.onDebit}
                                options={debits}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT DEBITS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={credit}
                                onChange={this.onCredit}
                                options={credits}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT CREDIT</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={ledger}
                                onChange={this.onLedger}
                                options={ledgers}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT LEDGER</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE ACCOUNTING POST"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inEntry"
                                value={this.state.selectRow.entry}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            entry: e.target.value
                                        }
                                    })
                                }
                                options={journals}
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
                                id="inDebit"
                                value={this.state.selectRow.debit}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            debit: e.target.value
                                        }
                                    })
                                }
                                options={debits}
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
                                id="inCredit"
                                value={this.state.selectRow.credit}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            credit: e.target.value
                                        }
                                    })
                                }
                                options={credits}
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
                                id="inLedger"
                                value={this.state.selectRow.ledger}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            ledger: e.target.value
                                        }
                                    })
                                }
                                options={ledgers}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            </span>
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteAccountingPostsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAccountingPostsDialogFooter} onHide={this.hideDeleteAccountingPostsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.accountingpost && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    accountingposts: state.accountingposts.accountingposts,
    journals: state.journals.journals,
    debits: state.debits.debits,
    ledgers: state.ledgers.ledgers,
    credits: state.credits.credits
})

export default connect(mapStateToProps, {
    getJournals,
    getDebits,
    getCredits,
    getLedgers,
    getAccountingPosts,
    deleteAccountingPost,
    editAccountingPost,
    addAccountingPost } ) (AccountingPosts);
