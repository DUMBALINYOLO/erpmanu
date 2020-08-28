import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { getProcessMachineGroups, addgetProcessMachineGroup } from '../actions/processmachinegroups';
import './DataTableDemo.scss';


export class ProcessMachineGroups extends Component {

    emptyProcessMachineGroup = {
        id: null,
        name: '',
        description: '',
        ProcessMachineGroup: 'INPROCESS'
    };

    constructor(props) {
        super(props);

        this.state = {
            processmachinegroups: null,
            processmachinegroupDialog: false,
            deleteProcessMachineGroupDialog: false,
            deleteProcessMachineGroupsDialog: false,
            processmachinegroup: this.emptyProcessMachineGroup,
            selectedProcessMachineGroups: null,
            submitted: false,
            globalFilter: null
        };

        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveProcessMachineGroup = this.saveProcessMachineGroup.bind(this);
        this.editProcessMachineGroup = this.editProcessMachineGroup.bind(this);
        this.confirmDeleteProcessMachineGroup = this.confirmDeleteProcessMachineGroup.bind(this);
        this.deleteProcessMachineGroup = this.deleteProcessMachineGroup.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedProcessMachineGroups = this.deleteSelectedProcessMachineGroups.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDeleteProcessMachineGroupDialog = this.hideDeleteProcessMachineGroupDialog.bind(this);
        this.hideDeleteProcessMachineGroupsDialog = this.hideDeleteProcessMachineGroupsDialog.bind(this);
    }

    componentDidMount() {
        this.props.getProcessMachineGroups()
    }

    openNew() {
        this.setState({
            processmachinegroup: this.emptyProcessMachineGroup,
            submitted: false,
            processmachinegroupDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            processmachinegroupDialog: false
        });
    }

    hideDeleteProcessMachineGroupDialog() {
        this.setState({ deleteProcessMachineGroupDialog: false });
    }

    hideDeleteProcessMachineGroupsDialog() {
        this.setState({ deleteProcessMachineGroupsDialog: false });
    }

    saveProcessMachineGroup() {
        let state = { submitted: true };

        if (this.state.processmachinegroup.name.trim()) {
            let processmachinegroups = [...this.state.processmachinegroups];
            let processmachinegroup = {...this.state.processmachinegroup};
            if (this.state.processmachinegroup.id) {
                const index = this.findIndexById(this.state.processmachinegroup.id);

                processmachinegroups[index] = processmachinegroup;
                this.message.show({ severity: 'success', summary: 'Successful', detail: 'Updated', life: 3000 });
            }
            else {
                processmachinegroup.id = this.createId();
                processmachinegroups.push(processmachinegroup);
                this.message.show({ severity: 'success', summary: 'Successful', detail: 'Created', life: 3000 });
            }

            state = {
                ...state,
                processmachinegroups,
                processmachinegroupDialog: false,
                processmachinegroup: this.emptyProcessMachineGroup
            };
        }

        this.setState(state);
    }

    editProcessMachineGroup(processmachinegroup) {
        this.setState({
            processmachinegroup: { ...processmachinegroup },
            processmachinegroupDialog: true
        });
    }

    confirmDeleteProcessMachineGroup(processmachinegroup) {
        this.setState({
            processmachinegroup,
            deleteProcessMachineGroupDialog: true
        });
    }

    deleteProcessMachineGroup() {
        let processmachinegroups = this.state.processmachinegroups.filter(val => val.id !== this.state.processmachinegroup.id);
        this.setState({
            processmachinegroups,
            deleteProductDialog: false,
            processmachinegroup: this.ProcessMachineGroup
        });
        this.message.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
    }

    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.processmachinegroups.length; i++) {
            if (this.state.processmachinegroups[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    confirmDeleteSelected() {
        this.setState({ deleteProcessMachineGroupsDialog: true });
    }

    deleteSelectedProcessMachineGroups() {
        let processmachinegroups = this.state.processmachinegroups.filter(val => !this.state.selectedProcessMachineGroups.includes(val));
        this.setState({
            processmachinegroups,
            deleteProductsDialog: false,
            selectedProcessMachineGroups: null
        });
        this.message.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });
    }

    onCategoryChange(e) {
        let processmachinegroup = {...this.state.processmachinegroup};
        processmachinegroup['category'] = e.value;
        this.setState({ processmachinegroup });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let processmachinegroup = {...this.state.processmachinegroup};
        processmachinegroup[`${name}`] = val;

        this.setState({ processmachinegroup });
    }


    leftToolbarTemplate() {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={this.confirmDeleteSelected} disabled={!this.state.selectedProducts || !this.state.selectedProducts.length} />
            </>
        )
    }

    rightToolbarTemplate() {
        return (
            <>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={this.exportCSV} />
            </>
        )
    }


    ratingBodyTemplate(rowData) {
        return <Rating value={rowData.rating} readonly cancel={false} />;
    }

    statusBodyTemplate(rowData) {
        return <span className={`product-badge status-${rowData.ProcessMachineGroup.toLowerCase()}`}>{rowData.ProcessMachineGroup}</span>;
    }

    actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProcessMachineGroup(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteProcessMachineGroup(rowData)} />
            </>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="p-m-0">Manage Process Machine Groups</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search..." />
                </span>
            </div>
        );
        const processmachinegroupDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProcessMachineGroup} />
            </>
        );
        const deleteProcessMachineGroupDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProcessMachineGroupDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProcessMachineGroup} />
            </>
        );
        const deleteProcessMachineGroupsDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProcessMachineGroupsDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedProcessMachineGroups} />
            </>
        );

        return (
            <div className="datatable-crud-demo">
                <Message ref={(el) => this.message = el} />

                <div className="card">
                    <Toolbar className="p-mb-4" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.processmachinegroups} selection={this.state.selectedProcessMachineGroups} onSelectionChange={(e) => this.setState({ selectedProcessMachineGroups: e.value })}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ProcessMachineGroup"
                        globalFilter={this.state.globalFilter}
                        header={header}>

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="reference_number" header="Reference Number" sortable></Column>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="ProcessMachineGroup" header="Status" body={this.statusBodyTemplate} sortable></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.processmachinegroupDialog} style={{ width: '450px' }} header="ProcessMachineGroup Details" modal className="p-fluid" footer={processmachinegroupDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.processmachinegroup.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.processmachinegroup.name })} />
                        {this.state.submitted && !this.state.processmachinegroup.name && <small className="p-invalid">Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" value={this.state.processmachinegroup.description} onChange={(e) => this.onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProcessMachineGroupDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProcessMachineGroupDialogFooter} onHide={this.hideDeleteProcessMachineGroupDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.processmachinegroup && <span>Are you sure you want to delete <b>{this.state.processmachinegroup.name}</b>?</span>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteProcessMachineGroupsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProcessMachineGroupsDialogFooter} onHide={this.hideDeleteProcessMachineGroupsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {this.state.processmachinegroup && <span>Are you sure you want to delete the selected processmachinegroups?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    processmachinegroups: state.processmachinegroups.processmachinegroups
})

export default connect(mapStateToProps, { getProcessMachineGroups })(ProcessMachineGroups);
