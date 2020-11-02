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
import { FileUpload } from 'primereact/fileupload';
import {Calendar} from 'primereact/calendar';
import {ProgressBar} from 'primereact/progressbar';
import { InputNumber } from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { getStoragemedias, addStoragemedia, editStoragemedia, deleteStoragemedia } from '..//../actions/storagemedias';
import { getWarehouses } from '..//../actions/warehouses';
import "./form.css";

class Storagemedias extends Component {

    emptyStoragemedia = {
        name: '',
        warehouse: null,
        description: '',
        length: '',
        width: '',
        height: '',
        capacity: '',
    };

    constructor() {
        super();
        this.state = {
            storagemedias : [],
            globalFilter: null,
            dateFilter: null,
            selectedStoragemedias: null,
            storagemediaDialog: false,
            deleteStoragemediaDialog: false,
            deleteStoragemediasDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                warehouse: null,
                description: '',
                length: '',
                width: '',
                height: '',
                capacity: '',
            },
            newData: {
                name: '',
                warehouse: null,
                description: '',
                length: '',
                width: '',
                height: '',
                capacity: '',
            },
            submitted: false,
        };

        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.export = this.export.bind(this);
        this.renderDateFilter = this.renderDateFilter.bind(this);
        this.onDateFilterChange = this.onDateFilterChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onChange = this.onChange.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveStoragemedia = this.saveStoragemedia.bind(this);
        this.editStoragemedia = this.editStoragemedia.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteStoragemedia = this.confirmDeleteStoragemedia.bind(this);
        this.deleteStoragemedia = this.deleteStoragemedia.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedStoragemedias = this.deleteSelectedStoragemedias.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteStoragemediaDialog = this.hideDeleteStoragemediaDialog.bind(this);
        this.hideDeleteStoragemediasDialog = this.hideDeleteStoragemediasDialog.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse: e.value})
    }

    static propTypes = {
        storagemedias : PropTypes.array.isRequired,
        getStoragemedias: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getStoragemedias();
        this.props.getWarehouses()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                warehouse: null,
                description: '',
                length: '',
                width: '',
                height: '',
                capacity: '',
            },
            submitted: false,
            storagemediaDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            storagemediaDialog: false
        });
    }

    hideDeleteStoragemediaDialog() {
        this.setState({ deleteStoragemediaDialog: false });
    }

    hideDeleteStoragemediasDialog() {
        this.setState({ deleteStoragemediasDialog: false });
    }

    saveStoragemedia = (e) => {
        e.preventDefault();
        const {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        } = this.state;
        const storagemedia = {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        };
        this.props.addStoragemedia(storagemedia);
        this.setState({
            name: '',
            warehouse: null,
            description: '',
            length: '',
            width: '',
            height: '',
            capacity: '',
            storagemediaDialog: false
        });
        this.props.history.push('/storagemedias');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                warehouse: null,
                description: '',
                length: '',
                width: '',
                height: '',
                capacity: '',
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

    editStoragemedia(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        } = this.state.selectRow;
        const storagemedia = {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editStoragemedia(this.state.selectRow.id, storagemedia);
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

    confirmDeleteStoragemedia(storagemedia) {
        this.setState({
            storagemedia,
            deleteStoragemediaDialog: true
        });
    }

    deleteStoragemedia() {
        this.props.deleteStoragemedia();
        this.setState({
            deleteStoragemediaDialog: false,
            storagemedia: this.emptyStoragemedia
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteStoragemediasDialog: true });
    }

    deleteSelectedStoragemedias() {
        this.props.deleteStoragemedia();
        this.setState({
            deleteStoragemediasDialog: false,
            selectedStoragemedias: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Storagemedia</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW STORAGEMEDIA" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteStoragemedia(rowData)} />
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
        const storagemediaDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveStoragemedia} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editStoragemedia}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        } = this.state;

        const {warehouses} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.storagemedias}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedStoragemedias} onSelectionChange={e => this.setState({selectedStoragemedias: e.value})}
                        paginator rows={10} emptyMessage="No Storagemedias found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column
                            className="table-field"
                            selectionMode="multiple"
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
                            field="warehouse"
                            header="Warehouse"
                            sortable filter filterPlaceholder="Search by Warehouse"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="length"
                            header="Length"
                            sortable filter filterPlaceholder="Search by Length"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="width"
                            header="Width"
                            sortable filter filterPlaceholder="Search by Width"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="height"
                            header="Height"
                            sortable filter filterPlaceholder="Search by Height"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="capacity"
                            header="Capacity"
                            sortable filter filterPlaceholder="Search by Capacity"
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
                        visible={this.state.storagemediaDialog}
                        style={{ width: '900px' }}
                        header=" Create Storagemedia"
                        modal
                        className="p-fluid"
                        footer={storagemediaDialogFooter}
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
                                <label>Length</label>
                                 <InputNumber
                                    name="length"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={length}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                  />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>Width</label>
                                 <InputNumber
                                    name="width"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={width}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                  />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>Height</label>
                                 <InputNumber
                                    name="height"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={height}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                  />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label>Capacity</label>
                                 <InputNumber
                                    name="capacity"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={capacity}
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
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                <Dropdown
                                    value={warehouse}
                                    onChange={this.onTypeChange}
                                    options={warehouses}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT WAREHOUSE</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE STORAGEMEDIA"
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        className="p-fluid"
                        style ={{ width: '700px'}}
                        modal={true}
                        onHide={this.onHideEditDialog}
                    >
                        <div className="p-field p-col-12 p-md-12">
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
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Length </label>
                            <InputNumber
                                id="inLength"
                                value={this.state.selectRow.length}
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
                                        length: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Width </label>
                            <InputNumber
                                id="inWidth"
                                value={this.state.selectRow.width}
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
                                        width: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Height </label>
                            <InputNumber
                                id="inHeight"
                                value={this.state.selectRow.height}
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
                                        height: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inAmount">Capacity </label>
                            <InputNumber
                                id="inCapacity"
                                value={this.state.selectRow.capacity}
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
                                        capacity: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inDescription">Description </label>
                            <InputTextarea id="inDescription" value={this.state.selectRow.description}
                                       style={{marginLeft: '.5em'}} onChange={(e) =>
                                this.setState({
                                    selectRow: {
                                        ...this.state.selectRow,
                                        description: e.target.value
                                    }
                                })
                            }/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inWarehouse"
                                value={this.state.selectRow.warehouse}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            warehouse: e.target.value
                                        }
                                    })
                                }
                                options={warehouses}
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
    storagemedias: state.storagemedias.storagemedias,
    warehouses: state.warehouses.warehouses,
})

export default connect(
    mapStateToProps,
    {
        getStoragemedias,
        addStoragemedia,
        deleteStoragemedia,
        editStoragemedia,
        getWarehouses
    }) (Storagemedias);
