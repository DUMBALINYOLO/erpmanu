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
import { getManufacturingTeams, addManufacturingTeam, editManufacturingTeam, deleteManufacturingTeam } from '..//../actions/manufacturingteams';
import { getManufacturingPersonels } from '../../actions/manufacturingpersonels';
import "./form.css";

class ManufacturingTeams extends Component {

    emptyManufacturingTeam = {
        name: '',
        description: '',
        manager: null,
        members: null,
    };

    constructor() {
        super();
        this.state = {
            manufacturingteams : [],
            globalFilter: null,
            dateFilter: null,
            selectedManufacturingTeams: null,
            manufacturingteamDialog: false,
            deleteManufacturingTeamDialog: false,
            deleteManufacturingTeamsDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,
            selectRow: {
                name: '',
                description: '',
                manager: null,
                members: null,
            },
            newData: {
                name: '',
                description: '',
                manager: null,
                members: null,
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
        this.saveManufacturingTeam = this.saveManufacturingTeam.bind(this);
        this.editManufacturingTeam = this.editManufacturingTeam.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteManufacturingTeam = this.confirmDeleteManufacturingTeam.bind(this);
        this.deleteManufacturingTeam = this.deleteManufacturingTeam.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedManufacturingTeams = this.deleteSelectedManufacturingTeams.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteManufacturingTeamDialog = this.hideDeleteManufacturingTeamDialog.bind(this);
        this.hideDeleteManufacturingTeamsDialog = this.hideDeleteManufacturingTeamsDialog.bind(this);
        this.onManager = this.onManager.bind(this);
        this.onMembers = this.onMembers.bind(this);
    }

    onManager (e){
        this.setState({manager: e.value})
    }

    onMembers (e){
        this.setState({members: e.value})
    }

    static propTypes = {
        manufacturingteams : PropTypes.array.isRequired,
        getManufacturingTeams: PropTypes.func.isRequired,
        getManufacturingPersonels: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getManufacturingTeams();
        this.props.getManufacturingPersonels()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                description: '',
                manager: null,
                members: null,
            },
            submitted: false,
            manufacturingteamDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            manufacturingteamDialog: false
        });
    }

    hideDeleteManufacturingTeamDialog() {
        this.setState({ deleteManufacturingTeamDialog: false });
    }

    hideDeleteManufacturingTeamsDialog() {
        this.setState({ deleteManufacturingTeamsDialog: false });
    }

    saveManufacturingTeam = (e) => {
        e.preventDefault();
        const {
            name,
            description,
            manager,
            members,
        } = this.state;
        const manufacturingteam = {
            name,
            description,
            manager,
            members,
        };
        this.props.addManufacturingTeam(manufacturingteam);
        this.setState({
            name: '',
            description: '',
            manager: null,
            members: null,
            manufacturingteamDialog: false
        });
        this.props.history.push('/manufacturingteams');
    };


    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                description: '',
                manager: null,
                members: null,
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

    editManufacturingTeam(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            description,
            manager,
            members,
        } = this.state.selectRow;
        const manufacturingteam = {
            name,
            description,
            manager,
            members,
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editManufacturingTeam(this.state.selectRow.id, manufacturingteam);
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

    confirmDeleteManufacturingTeam(manufacturingteam) {
        this.setState({
            manufacturingteam,
            deleteManufacturingTeamDialog: true
        });
    }

    deleteManufacturingTeam() {
        this.props.deleteManufacturingTeam();
        this.setState({
            deleteManufacturingTeamDialog: false,
            manufacturingteam: this.emptyManufacturingTeam
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteManufacturingTeamsDialog: true });
    }

    deleteSelectedManufacturingTeams() {
        this.props.deleteManufacturingTeam();
        this.setState({
            deleteManufacturingTeamsDialog: false,
            selectedManufacturingTeams: null
        });
    }



    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Manufacturing Team</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW MANUFACTURING TEAM" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteManufacturingTeam(rowData)} />
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
        const manufacturingteamDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveManufacturingTeam} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editManufacturingTeam}/>
            </div>
        );

        const header = this.renderHeader();
        const {
            name,
            description,
            manager,
            members,
        } = this.state;

        const { manufacturingpersonels } = this.props

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.manufacturingteams}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedManufacturingTeams} onSelectionChange={e => this.setState({selectedManufacturingTeams: e.value})}
                        paginator rows={10} emptyMessage="No Manufacturing Teams found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
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
                            header="Name"
                            sortable filter filterPlaceholder="Search by Name"
                            style={{width:'3em', backgroundColor: '#4EB0A5'}}
                        />
                        <Column
                            className="table-field"
                            field="manager"
                            header="Manager"
                            sortable filter filterPlaceholder="Search by Manager"
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
                            header="EDIT"
                            body={this.actionBodyTemplate}
                            headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>
                    <Dialog
                        visible={this.state.manufacturingteamDialog}
                        style={{ width: '900px' }}
                        header=" Create Manufacturing Team"
                        modal
                        className="p-fluid"
                        footer={manufacturingteamDialogFooter}
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
                                        value={manager}
                                        onChange={this.onManager}
                                        options={manufacturingpersonels}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="employee"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT MANAGER</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        value={members}
                                        onChange={this.onMembers}
                                        options={manufacturingpersonels}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="employee"
                                        optionValue="id"
                                    />
                                    <label htmlFor="inputtext">SELECT MEMBERS</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE MANUFACTURING TEAM"
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
                                id="inManager"
                                value={this.state.selectRow.manager}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            manager: e.target.value
                                        }
                                    })
                                }
                                options={manufacturingpersonels}
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
                                id="inMembers"
                                value={this.state.selectRow.members}
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            members: e.target.value
                                        }
                                    })
                                }
                                options={manufacturingpersonels}
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
    manufacturingteams: state.manufacturingteams.manufacturingteams,
    manufacturingpersonels: state.manufacturingpersonels.manufacturingpersonels,
})

export default connect(
    mapStateToProps,
    {
        getManufacturingTeams,
        addManufacturingTeam,
        deleteManufacturingTeam,
        editManufacturingTeam,
        getManufacturingPersonels
    }) (ManufacturingTeams);
