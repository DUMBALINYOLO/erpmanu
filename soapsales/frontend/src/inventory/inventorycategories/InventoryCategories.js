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
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { getInventoryCategories, addInventoryCategory, editInventoryCategory, deleteInventoryCategory } from '..//../actions/inventorycategories';
import "./form.css";

class InventoryCategories extends Component {

    emptyInventoryCategory = {
        name: '',
        parent: null,
        description: ''
    };

    constructor() {
        super();
        this.state = {
            inventorycategories : [],
            globalFilter: null,
            dateFilter: null,
            selectedInventoryCategories: null,
            inventorycategoryDialog: false,
            deleteInventoryCategoryDialog: false,
            deleteInventoryCategoriesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                parent: null,
                description: ''
            },
            newData: {
                name: '',
                parent: null,
                description: ''
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
        this.saveInventoryCategory = this.saveInventoryCategory.bind(this);
        this.editInventoryCategory = this.editInventoryCategory.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteInventoryCategory = this.confirmDeleteInventoryCategory.bind(this);
        this.deleteInventoryCategory = this.deleteInventoryCategory.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedInventoryCategories = this.deleteSelectedInventoryCategories.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteInventoryCategoryDialog = this.hideDeleteInventoryCategoryDialog.bind(this);
        this.hideDeleteInventoryCategoriesDialog = this.hideDeleteInventoryCategoriesDialog.bind(this);
        this.onParent = this.onParent.bind(this);
    }

    onParent (e){
        this.setState({parent: e.value})
    }

    static propTypes = {
        inventorycategories : PropTypes.array.isRequired,
        getInventoryCategories: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getInventoryCategories();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                parent: null,
                description: ''
            },
            submitted: false,
            inventorycategoryDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            inventorycategoryDialog: false
        });
    }

    hideDeleteInventoryCategoryDialog() {
        this.setState({ deleteInventoryCategoryDialog: false });
    }

    hideDeleteInventoryCategoriesDialog() {
        this.setState({ deleteInventoryCategoriesDialog: false });
    }

    saveInventoryCategory = (e) => {
        e.preventDefault();
        const {
            name,
            parent,
            description
        } = this.state;
        const inventorycategory = {
            name,
            parent,
            description
        };
        this.props.addInventoryCategory(inventorycategory);
        this.setState({
            name: '',
            parent: null,
            description: '',
            inventorycategoryDialog: false
        });
        this.props.history.push('/inventorycategories');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                parent: null,
                description: ''
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

    editInventoryCategory(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            parent,
            description
        } = this.state.selectRow;
        const inventorycategory = {
            name,
            parent,
            description
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editInventoryCategory(this.state.selectRow.id, inventorycategory);
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

    confirmDeleteInventoryCategory(inventorycategory) {
        this.setState({
            inventorycategory,
            deleteInventoryCategoryDialog: true
        });
    }

    deleteInventoryCategory() {
        this.props.deleteInventoryCategory();
        this.setState({
            deleteInventoryCategoryDialog: false,
            inventorycategory: this.emptyInventoryCategory
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteInventoryCategoriesDialog: true });
    }

    deleteSelectedInventoryCategories() {
        this.props.deleteInventoryCategory();
        this.setState({
            deleteInventoryCategoriesDialog: false,
            selectedInventoryCategories: null
        });
    }

    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Inventory Category</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW INVENTORY CATEGORY" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteInventoryCategory(rowData)} />
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
        const inventorycategoryDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveInventoryCategory} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editInventoryCategory}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            parent,
            description
        } = this.state;

        const {inventorycategories} = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.inventorycategories}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedInventoryCategories} onSelectionChange={e => this.setState({selectedInventoryCategories: e.value})}
                        paginator rows={10} emptyMessage="No Inventory
                        Categories found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            field="name"
                            header= "Name"
                            sortable filter filterPlaceholder="Search by Name"
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
                        visible={this.state.inventorycategoryDialog}
                        style={{ width: '900px' }}
                        header=" Create Inventory Category"
                        modal
                        className="p-fluid"
                        footer={inventorycategoryDialogFooter}
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
                                    value={parent}
                                    onChange={this.onParent}
                                    options={inventorycategories}
                                    filter={true}
                                    filterBy="id,name"
                                    showClear={true}
                                    optionLabel="name"
                                    optionValue="id"
                                />
                                <label htmlFor="dropdown">SELECT PARENT</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE INVENTORY CATEGORY"
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
                                <InputTextarea
                                    onChange={(e) => this.setState({
                                            selectRow: {
                                                ...this.state.selectRow,
                                                description: e.target.value
                                            }
                                        })
                                    }
                                    id="inDescription"
                                    value={this.state.selectRow.description}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                            <Dropdown
                                id="inParent"
                                value={this.state.selectRow.parent}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            parent: e.target.value
                                        }
                                    })
                                }
                                options={inventorycategories}
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
    inventorycategories: state.inventorycategories.inventorycategories,
})

export default connect(
    mapStateToProps,
    {
        getInventoryCategories,
        addInventoryCategory,
        deleteInventoryCategory,
        editInventoryCategory,
    }) (InventoryCategories);
