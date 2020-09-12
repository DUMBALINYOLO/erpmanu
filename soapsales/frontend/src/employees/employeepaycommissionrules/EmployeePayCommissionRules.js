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
import { getEmployeePayCommissionRules, addEmployeePayCommissionRule, editEmployeePayCommissionRule, deleteEmployeePayCommissionRule } from '..//../actions/employeepaycommissionrules';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import "./form.css";

class EmployeePayCommissionRules extends Component {

    emptyEmployeePayCommissionRule = {
        name: '',
        min_sales: '',
        rate: '',
        archived: false,
    };


    constructor() {
        super();
        this.state = {
            employeepaycommissionrules: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePayCommissionRules: null,
            employeepaycommissionruleDialog: false,
            deleteEmployeePayCommissionRuleDialog: false,
            deleteEmployeePayCommissionRulesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                min_sales: '',
                rate: '',
                archived: false,
            },
            newData: {
                name: '',
                min_sales: '',
                rate: '',
                archived: false,
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
        this.saveEmployeePayCommissionRule = this.saveEmployeePayCommissionRule.bind(this);
        this.editEmployeePayCommissionRule = this.editEmployeePayCommissionRule.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeePayCommissionRule = this.confirmDeleteEmployeePayCommissionRule.bind(this);
        this.deleteEmployeePayCommissionRule = this.deleteEmployeePayCommissionRule.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePayCommissionRules = this.deleteSelectedEmployeePayCommissionRules.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePayCommissionRuleDialog = this.hideDeleteEmployeePayCommissionRuleDialog.bind(this);
        this.hideDeleteEmployeePayCommissionRulesDialog = this.hideDeleteEmployeePayCommissionRulesDialog.bind(this);
        this.onArchived = this.onArchived.bind(this);
    }

    onArchived() {
        this.setState({
          archived: !this.state.checked
        });
    }

    static propTypes = {
        employeepaycommissionrules : PropTypes.array.isRequired,
        getEmployeePayCommissionRules: PropTypes.func.isRequired,
        addEmployeePayCommissionRule: PropTypes.func.isRequired,
        editEmployeePayCommissionRule: PropTypes.func.isRequired,
        deleteEmployeePayCommissionRule: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getEmployeePayCommissionRules()
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                min_sales: '',
                rate: '',
                archived: false,
            },
            submitted: false,
            employeepaycommissionruleDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeepaycommissionruleDialog: false
        });
    }

    hideDeleteEmployeePayCommissionRuleDialog() {
        this.setState({ deleteEmployeePayCommissionRuleDialog: false });
    }

    hideDeleteEmployeePayCommissionRulesDialog() {
        this.setState({ deleteEmployeePayCommissionRulesDialog: false });
    }


    saveEmployeePayCommissionRule = (e) => {
        e.preventDefault();
        const {
            name,
            min_sales,
            rate,
            archived
        } = this.state;
        const employeepaycommissionrule = {
            name,
            min_sales,
            rate,
            archived
        };
        this.props.addEmployeePayCommissionRule(employeepaycommissionrule);
        this.setState({
            name: '',
            min_sales: '',
            rate: '',
            archived: true,
            employeepaycommissionruleDialog: false
        });
        this.props.history.push('/employeepaycommissionrules');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                min_sales: '',
                rate: '',
                archived: false,
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


    editEmployeePayCommissionRule(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            min_sales,
            rate,
            archived
        } = this.state.selectRow;
        const employeepaycommissionrule = {
            name,
            min_sales,
            rate,
            archived
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeePayCommissionRule(this.state.selectRow.id, employeepaycommissionrule);
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


    confirmDeleteEmployeePayCommissionRule(employeepaycommissionrule) {
        this.setState({
            employeepaycommissionrule,
            deleteEmployeePayCommissionRuleDialog: true
        });
    }

    deleteEmployeePayCommissionRule() {
        this.props.deleteEmployeePayCommissionRule();
        this.setState({
            deleteEmployeePayCommissionRuleDialog: false,
            employeepaycommissionrule: this.emptyEmployeePayCommissionRule
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePayCommissionRulesDialog: true });
    }

    deleteSelectedEmployeePayCommissionRules() {
        this.props.deleteEmployeePayCommissionRule();
        this.setState({
            deleteEmployeePayCommissionRulesDialog: false,
            selectedEmployeePayCommissionRules: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Pay Commission Rule</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE PAY COMMISSION RULE" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeePayCommissionRule(rowData)} />
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
        const employeepaycommissionruleDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePayCommissionRule} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeePayCommissionRule}/>
            </div>
        );


        const deleteEmployeePayCommissionRulesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayCommissionRulesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePayCommissionRules} />
            </>
        );

        const header = this.renderHeader();
        const { name, min_sales, rate } = this.state;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeepaycommissionrules}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeePayCommissionRules} onSelectionChange={e => this.setState({selectedEmployeePayCommissionRules: e.value})}
                        paginator rows={10} emptyMessage="No Employee Pay Commission Rules found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column
                            className="table-field"
                            selectionMode="multiple"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="id" header="ID"
                            sortable filter
                            filterPlaceholder="Search by ID"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="name"
                            header="Name"
                            sortable filter
                            filterPlaceholder="Search by Name"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="min_sales"
                            header="Min Sales"
                            sortable filter
                            filterPlaceholder="Search by Min Sales"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="rate"
                            header="Rate"
                            sortable filter
                            filterPlaceholder="Search by Rate"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            field="reference_number"
                            header="Reference Number"
                            sortable filter
                            filterPlaceholder="Search by Reference Number"
                            style={{width:'3em'}}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                        />
                        <Column
                            className="table-field"
                            header="EDIT"
                            body={this.actionBodyTemplate}
                            headerStyle={{width: '3em', backgroundColor: '#4EB0A5', textAlign: 'center'}}
                            bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}}
                        />
                    </DataTable>

                    <Dialog
                        visible={this.state.employeepaycommissionruleDialog}
                        style={{ width: '900px' }}
                        header="Employee Pay Commission Rule Details"
                        modal className="p-fluid"
                        footer={employeepaycommissionruleDialogFooter}
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
                            <label htmlFor="inputtext">Min Sales</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="min_sales"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={min_sales}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                                <label htmlFor="inputtext">Min Sales</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="inputtext">Rate</label>
                            <span className="p-float-label">
                                <InputNumber
                                    name="rate"
                                    mode="decimal"
                                    onChange={this.onChange}
                                    value={rate}
                                    showButtons
                                    buttonLayout="horizontal"
                                    decrementButtonClassName="p-button-danger"
                                    incrementButtonClassName="p-button-success"
                                    incrementButtonIcon="pi pi-plus"
                                    decrementButtonIcon="pi pi-minus"
                                    step={1}
                                />
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                            <label>ARCHIVED :</label>
                            <Checkbox
                                inputId="working"
                                onChange={this.onArchived}
                                checked={this.state.archived}
                            />
                        </div>
                    </div>
                    </Dialog>
                    <Dialog
                        header="UPDATE EMPLOYEE PAY COMMISSION RULE"
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
                        <label htmlFor="inAmount">Min Sales</label>
                        <InputNumber
                            id="inMinSales"
                            value={this.state.selectRow.min_sales}
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
                                    min_sales: e.target.value
                                }
                            })
                        }/>
                        <label htmlFor="inAmount">Rate</label>
                        <InputNumber
                            id="inRate"
                            value={this.state.selectRow.rate}
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
                                    rate: e.target.value
                                }
                            })
                        }/>
                        <div className="p-field p-col-12 p-md-12 p-formgroup-inline">
                            <label>ARCHIVED :</label>
                            <Checkbox
                                inputId="working"
                                onChange={(e) => this.setState({
                                        selectRow: {
                                            ...this.state.selectRow,
                                            archived: e.target.value
                                        }
                                    })
                                }
                                checked={this.state.selectRow.archived}
                            />
                        </div>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeePayCommissionRulesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayCommissionRulesDialogFooter} onHide={this.hideDeleteEmployeePayCommissionRulesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeepaycommissionrule && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeepaycommissionrules: state.employeepaycommissionrules.employeepaycommissionrules,
})

export default connect(mapStateToProps, {
    getEmployeePayCommissionRules,
    editEmployeePayCommissionRule,
    deleteEmployeePayCommissionRule,
    addEmployeePayCommissionRule} ) (EmployeePayCommissionRules);
