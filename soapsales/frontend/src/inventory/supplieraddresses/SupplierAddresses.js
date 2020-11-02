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
import { getSupplierAddresses, addSupplierAddress, editSupplierAddress, deleteSupplierAddress } from '..//../actions/supplieraddresses';
import {getSupplierAddressTypeChoices} from "..//../actions/choices";
import { getActiveSuppliers } from '..//../actions/activesuppliers';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";


class SupplierAddresses extends Component {

    emptySupplierAddress = {
        owner: null,
        type: null,
        street_address: '',
        floor_number: '',
        city: '',
        postal_code: ''
    };


    constructor() {
        super();
        this.state = {
            supplieraddresses: [],
            globalFilter: null,
            dateFilter: null,
            selectedSupplierAddresses: null,
            supplieraddressDialog: false,
            deleteSupplierAddressDialog: false,
            deleteSupplierAddressesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                owner: null,
    			type: null,
    			street_address: '',
    			floor_number: '',
    			city: '',
    			postal_code: ''
            },
            newData: {
                owner: null,
    			type: null,
    			street_address: '',
    			floor_number: '',
    			city: '',
    			postal_code: ''
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
        this.saveSupplierAddress = this.saveSupplierAddress.bind(this);
        this.editSupplierAddress = this.editSupplierAddress.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteSupplierAddress = this.confirmDeleteSupplierAddress.bind(this);
        this.deleteSupplierAddress = this.deleteSupplierAddress.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedSupplierAddresses = this.deleteSelectedSupplierAddresses.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteSupplierAddressDialog = this.hideDeleteSupplierAddressDialog.bind(this);
        this.hideDeleteSupplierAddressesDialog = this.hideDeleteSupplierAddressesDialog.bind(this);
        this.onOwner = this.onOwner.bind(this);
        this.onType = this.onType.bind(this);
    }

    onOwner (e){
        this.setState({owner: e.value})
    }

    onType (e){
        this.setState({type: e.value})
    }

    static propTypes = {
        supplieraddresses : PropTypes.array.isRequired,
        getSupplierAddresses: PropTypes.func.isRequired,
        addSupplierAddress: PropTypes.func.isRequired,
        editSupplierAddress: PropTypes.func.isRequired,
        deleteSupplierAddress: PropTypes.func.isRequired,
        getActiveSuppliers: PropTypes.func.isRequired,
        getSupplierAddressTypeChoices: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                owner: null,
    			type: null,
    			street_address: '',
    			floor_number: '',
    			city: '',
    			postal_code: ''
            },
            submitted: false,
            supplieraddressDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            supplieraddressDialog: false
        });
    }

    hideDeleteSupplierAddressDialog() {
        this.setState({ deleteSupplierAddressDialog: false });
    }

    hideDeleteSupplierAddressesDialog() {
        this.setState({ deleteSupplierAddressesDialog: false });
    }

    componentDidMount() {
        this.props.getSupplierAddresses();
        this.props.getSupplierAddressTypeChoices()
        this.props.getActiveSuppliers()
    }

    saveSupplierAddress = (e) => {
        e.preventDefault();
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        } = this.state;
        const supplieraddress  = {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        };
        this.props.addSupplierAddress(supplieraddress);
        this.setState({
            owner: null,
			type: null,
			street_address: '',
			floor_number: '',
			city: '',
			postal_code: '',
            supplieraddressDialog: false
        });
        this.props.history.push('/supplieraddresses');
    };

    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                owner: null,
    			type: null,
    			street_address: '',
    			floor_number: '',
    			city: '',
    			postal_code: ''
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


    editSupplierAddress(e) {
        const errors = this.editDataValidateError();
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        } = this.state.selectRow;
        const supplieraddress = {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editSupplierAddress(this.state.selectRow.id, supplieraddress);
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


    confirmDeleteSupplierAddress(supplieraddress) {
        this.setState({
            supplieraddress,
            deleteSupplierAddressDialog: true
        });
    }

    deleteSupplierAddress() {
        this.props.deleteSupplierAddress();
        this.setState({
            deleteSupplierAddressDialog: false,
            supplieraddress: this.emptySupplierAddress
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteSupplierAddressesDialog: true });
    }

    deleteSelectedSupplierAddresses() {
        this.props.deleteSupplierAddress();
        this.setState({
            deleteSupplierAddressesDialog: false,
            selectedSupplierAddresses: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Supplier Address</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW SUPPLIER ADDRESS" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteSupplierAddress(rowData)} />
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
        const supplieraddressDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveSupplierAddress} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editSupplierAddress}/>
            </div>
        );

        const deleteSupplierAddressesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteSupplierAddressesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedSupplierAddresses} />
            </>
        );

        const header = this.renderHeader();
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        } = this.state;

        const {activesuppliers} = this.props;
        const {supplieraddresstypechoices} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.supplieraddresses}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedSupplierAddresses} onSelectionChange={e => this.setState({selectedSupplierAddresses: e.value})}
                        paginator rows={10} emptyMessage="No Supplier Addresses found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="owner"
                            header="Owner"
                            sortable filter filterPlaceholder="Search by Owner"
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
                            field="street_address"
                            header="Street Address"
                            sortable filter filterPlaceholder="Search by Street Address"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="floor_number"
                            header="Floor Number"
                            sortable filter filterPlaceholder="Search by Floor Number"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="city"
                            header="City"
                            sortable filter filterPlaceholder="Search by City"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="postal_code"
                            header="Postal Code"
                            sortable filter filterPlaceholder="Search by Postal Code"
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
                        visible={this.state.supplieraddressDialog}
                        style={{ width: '900px' }}
                        header="Supplier Address Details"
                        modal className="p-fluid"
                        footer={supplieraddressDialogFooter}
                        onHide={this.hideDialog}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        name="street_address"
                                        onChange={this.onChange}
                                        value={street_address}
                                    />
                                    <label htmlFor="inputtext">Street Address</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        name="floor_number"
                                        onChange={this.onChange}
                                        value={floor_number}
                                    />
                                    <label htmlFor="inputtext">Floor Number</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        name="city"
                                        onChange={this.onChange}
                                        value={city}
                                    />
                                    <label htmlFor="inputtext">City</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <InputText
                                        name="postal_code"
                                        onChange={this.onChange}
                                        value={postal_code}
                                    />
                                    <label htmlFor="inputtext">Postal Code</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={type}
                                    onChange={this.onType}
                                    options={supplieraddresstypechoices}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="value"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT TYPE</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={owner}
                                    onChange={this.onOwner}
                                    options={activesuppliers}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT OWNER</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE SUPPLIER ADDRESS"
                        modal={true} onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
                            <label htmlFor="inStreetAddress">Street Address </label>
                            <InputText id="inStreetAddress" value={this.state.selectRow.street_address}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        street_address: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="ui-float-label">
                            <label htmlFor="inFloorNumber">Floor Number </label>
                            <InputText id="inFloorNumber" value={this.state.selectRow.floor_number}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        floor_number: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="ui-float-label">
                            <label htmlFor="inCity">City </label>
                            <InputText id="inCity" value={this.state.selectRow.city}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        city: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="ui-float-label">
                            <label htmlFor="inPostalCode">Postal Code </label>
                            <InputText id="inPostalCode" value={this.state.selectRow.postal_code}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        postal_code: e.target.value
                                    }
                                })
                            }/>
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inType"
                            value={this.state.selectRow.type}
                            options={supplieraddresstypechoices}
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
                        <span className="p-float-label">
                        <Dropdown
                            id="inOwner"
                            value={this.state.selectRow.owner}
                            options={activesuppliers}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    owner: e.target.value
                                }
                            })
                        }/>
                        </span>
                    </Dialog>
                    <Dialog visible={this.state.deleteSupplierAddressesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSupplierAddressesDialogFooter} onHide={this.hideDeleteSupplierAddressesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.supplieraddress && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    supplieraddresses: state.supplieraddresses.supplieraddresses,
    activesuppliers: state.activesuppliers.activesuppliers,
    supplieraddresstypechoices: state.supplieraddresstypechoices.supplieraddresstypechoices,
})

export default connect(mapStateToProps, {
    getSupplierAddresses,
    getActiveSuppliers,
    getSupplierAddressTypeChoices,
    addSupplierAddress,
    editSupplierAddress,
    deleteSupplierAddress
} ) (SupplierAddresses);
