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
import { getActiveCustomers, getActiveCustomer, addActiveCustomer, editActiveCustomer, deleteActiveCustomer } from '..//../actions/activecustomers';
import { getCustomerStatusChoices } from '..//../actions/choices';
import { getAccounts } from '..//../actions/accounts';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";

class ActiveCustomers extends Component {

    emptyActiveCustomer = {
        name: '',
        is_organization: false,
        is_individual: false,
        banking_details: '',
        website: '',
        bp_number: '',
        email: '',
        phone: '',
        status: null,
        account: null,
    };


    constructor() {
        super();
        this.state = {
            activecustomers: [],
            globalFilter: null,
            dateFilter: null,
            selectedActiveCustomers: null,
            activecustomerDialog: false,
            deleteActiveCustomerDialog: false,
            deleteActiveCustomersDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
    			is_organization: false,
                is_individual: false,
    			banking_details: '',
    			website: '',
    			bp_number: '',
    			email: '',
    			phone: '',
                status: null,
                account: null,
            },
            newData: {
                name: '',
    			is_organization: false,
                is_individual: false,
    			banking_details: '',
    			website: '',
    			bp_number: '',
    			email: '',
    			phone: '',
                status: null,
                account: null,
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
        this.saveActiveCustomer = this.saveActiveCustomer.bind(this);
        this.editActiveCustomer = this.editActiveCustomer.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteActiveCustomer = this.confirmDeleteActiveCustomer.bind(this);
        this.deleteActiveCustomer = this.deleteActiveCustomer.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedActiveCustomers = this.deleteSelectedActiveCustomers.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteActiveCustomerDialog = this.hideDeleteActiveCustomerDialog.bind(this);
        this.hideDeleteActiveCustomersDialog = this.hideDeleteActiveCustomersDialog.bind(this);
        this.onStatus = this.onStatus.bind(this);
        this.onAccount = this.onAccount.bind(this);
        this.onIsOrganization = this.onIsOrganization.bind(this);
        this.onIsIndividual = this.onIsIndividual.bind(this)
    }

    onIsOrganization() {
        this.setState({
            is_organization: !this.state.checked
        });
    }

    onIsIndividual() {
        this.setState({
            is_individual: !this.state.checked
        });
    }

    onStatus (e){
        this.setState({status: e.value})
    }

    onAccount (e){
        this.setState({account: e.value})
    }

    static propTypes = {
        activecustomers : PropTypes.array.isRequired,
        getActiveCustomers: PropTypes.func.isRequired,
        addActiveCustomer: PropTypes.func.isRequired,
        editActiveCustomer: PropTypes.func.isRequired,
        deleteActiveCustomer: PropTypes.func.isRequired,
        getAccounts: PropTypes.func.isRequired,
        getActiveCustomer,
        getCustomerStatusChoices: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getAccounts()
        this.props.getActiveCustomers()
        this.props.getCustomerStatusChoices()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
    			is_organization: false,
                is_individual: false,
    			banking_details: '',
    			website: '',
    			bp_number: '',
    			email: '',
    			phone: '',
                status: null,
                account: null,
            },
            submitted: false,
            activecustomerDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            activecustomerDialog: false
        });
    }

    hideDeleteActiveCustomerDialog() {
        this.setState({ deleteActiveCustomerDialog: false });
    }

    hideDeleteActiveCustomersDialog() {
        this.setState({ deleteActiveCustomersDialog: false });
    }


    saveActiveCustomer = (e) => {
        e.preventDefault();
        const {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
        } = this.state;
        const activecustomer = {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
        };
        this.props.addActiveCustomer(activecustomer);
        this.setState({
            name: '',
			is_organization: false,
            is_individual: false,
			banking_details: '',
			website: '',
			bp_number: '',
			email: '',
			phone: '',
            status: '',
            account: '',
            activecustomerDialog: false
        });
        this.props.history.push('/activecustomers');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
    			is_organization: false,
                is_individual: false,
    			banking_details: '',
    			website: '',
    			bp_number: '',
    			email: '',
    			phone: '',
                status: null,
                account: null,
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


    editActiveCustomer(e) {
        const errors = this.editDataValidateError();
        const {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,

        } = this.state.selectRow;
        const activecustomer = {
            name,
			is_organization,
            is_individual,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editActiveCustomer(this.state.selectRow.id, activecustomer);
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


    confirmDeleteActiveCustomer(activecustomer) {
        this.setState({
            activecustomer,
            deleteActiveCustomerDialog: true
        });
    }

    deleteActiveCustomer() {
        this.props.deleteActiveCustomer();
        this.setState({
            deleteActiveCustomerDialog: false,
            activecustomer: this.emptyActiveCustomer
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteActiveCustomersDialog: true });
    }

    deleteSelectedActiveCustomers() {
        this.props.deleteActiveCustomer();
        this.setState({
            deleteActiveCustomersDialog: false,
            selectedActiveCustomers: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Active Customer</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW ACTIVE CUSTOMERS" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteActiveCustomer(rowData)} />
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
        const activecustomerDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveActiveCustomer} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editActiveCustomer}/>
            </div>
        );


        const deleteActiveCustomersDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteActiveCustomersDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedActiveCustomers} />
            </>
        );

        const header = this.renderHeader();
        const {
            name,
			banking_details,
			website,
			bp_number,
			email,
			phone,
            status,
            account,
        } = this.state;

        const {accounts} = this.props;
        const {customerstatuschoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.activecustomers}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedActiveCustomers} onSelectionChange={e => this.setState({selectedActiveCustomers: e.value})}
                        paginator rows={10} emptyMessage="No Active Customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="customer_number"
                            header="Customer Number"
                            sortable filter filterPlaceholder="Search by Customer Number"
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
                            field="phone"
                            header="Phone"
                            sortable filter filterPlaceholder="Search by Phone"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="email"
                            header="Email"
                            sortable filter filterPlaceholder="Search by Email"
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
                        visible={this.state.activecustomerDialog}
                        style={{ width: '900px' }}
                        header="Active Customer Details"
                        modal className="p-fluid"
                        footer={activecustomerDialogFooter}
                        onHide={this.hideDialog}
                    >
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="name"
                                    onChange={this.onChange}
                                    value={name}
                                />
                                <label htmlFor="inputtext">Name</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="website"
                                    onChange={this.onChange}
                                    value={website}
                                />
                                <label htmlFor="inputtext">Website</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="bp_number"
                                    onChange={this.onChange}
                                    value={bp_number}
                                />
                                <label htmlFor="inputtext">Bp Number</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="email"
                                    onChange={this.onChange}
                                    value={email}
                                />
                                <label htmlFor="inputtext">Email</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputText
                                    name="phone"
                                    onChange={this.onChange}
                                    value={phone}
                                />
                                <label htmlFor="inputtext">Phone</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="banking_details"
                                    onChange={this.onChange}
                                    value={banking_details}
                                />
                                <label htmlFor="inputtext">Banking Details</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>IS ORGANIZATION :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onIsOrganization}
                                checked={this.state.is_organization}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>IS INDIVIDUAL :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onIsIndividual}
                                checked={this.state.is_individual}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={status}
                                onChange={this.onStatus}
                                options={customerstatuschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="dropdown">SELECT STATUS</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                            <Dropdown
                                value={account}
                                onChange={this.onAccount}
                                options={accounts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="dropdown">SELECT ACCOUNT</label>
                            </span>
                        </div>
                    </div>
                    </Dialog>

                    <Dialog
                        header="UPDATE ACTIVE CUSTOMER"
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
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                website: e.target.value
                                            }
                                        })
                                    }
                                    id="inWebsite"
                                    value={this.state.selectRow.website}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                bp_number: e.target.value
                                            }
                                        })
                                    }
                                    id="inBpNumber"
                                    value={this.state.selectRow.bp_number}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                email: e.target.value
                                            }
                                        })
                                    }
                                    id="inEmail"
                                    value={this.state.selectRow.email}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputText
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                phone: e.target.value
                                            }
                                        })
                                    }
                                    id="inPhone"
                                    value={this.state.selectRow.phone}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    id="inBankingDetails"
                                    value={this.state.selectRow.banking_details}
                                    onChange={(e) =>
                                    this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            banking_details: e.target.value
                                        }
                                    })
                                }/>
                          </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>IS ORGANIZATION :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            is_organization: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.is_organization}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>IS INDIVIDUAL :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            is_individual: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.is_individual}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inStatus"
                                value={this.state.selectRow.status}
                                options={customerstatuschoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                                onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        status: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inAccount"
                                value={this.state.selectRow.account}
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
                                        account: e.target.value
                                    }
                                })
                            }/>
                            </span>
                        </div>
                    </Dialog>

                    <Dialog visible={this.state.deleteActiveCustomersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteActiveCustomersDialogFooter} onHide={this.hideDeleteActiveCustomersDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.activecustomer && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>

        );
    }
}

const mapStateToProps = state =>({
    activecustomers: state.activecustomers.activecustomers,
    accounts: state.accounts.accounts,
    customerstatuschoices: state.customerstatuschoices.customerstatuschoices,
})

export default connect(mapStateToProps, {
    getAccounts,
    getCustomerStatusChoices,
    getActiveCustomers,
    editActiveCustomer,
    deleteActiveCustomer,
    addActiveCustomer} ) (ActiveCustomers);
