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
import { getEmployeePayrollTaxes, addEmployeePayrollTax, editEmployeePayrollTax, deleteEmployeePayrollTax } from '..//../actions/employeepayrolltaxes';
import {getEmployeePayrollTaxChoices} from "..//../actions/choices";
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import "./form.css";

class EmployeePayrollTaxes extends Component {

    emptyEmployeePayrollTax = {
        name: '',
        paid_by: null
    };


    constructor() {
        super();
        this.state = {
            employeepayrolltaxes: [],
            globalFilter: null,
            dateFilter: null,
            selectedEmployeePayrollTaxes: null,
            employeepayrolltaxDialog: false,
            deleteEmployeePayrollTaxDialog: false,
            deleteEmployeePayrollTaxesDialog: false,
            visibleNewDialog: false,
            visibleEditDialog: false,
            visibleDeleteDialog: false,

            selectRow: {
                name: '',
                paid_by: null
            },
            newData: {
                name: '',
                paid_by: null
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
        this.saveEmployeePayrollTax = this.saveEmployeePayrollTax.bind(this);
        this.editEmployeePayrollTax = this.editEmployeePayrollTax.bind(this);
        this.onOpenEditDialog = this.onOpenEditDialog.bind(this);
        this.onHideEditDialog = this.onHideEditDialog.bind(this);
        this.editDataValidateError = this.editDataValidateError.bind(this);
        this.confirmDeleteEmployeePayrollTax = this.confirmDeleteEmployeePayrollTax.bind(this);
        this.deleteEmployeePayrollTax = this.deleteEmployeePayrollTax.bind(this);
        this.confirmDeleteSelected = this.confirmDeleteSelected.bind(this);
        this.deleteSelectedEmployeePayrollTaxes = this.deleteSelectedEmployeePayrollTaxes.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideDeleteEmployeePayrollTaxDialog = this.hideDeleteEmployeePayrollTaxDialog.bind(this);
        this.hideDeleteEmployeePayrollTaxesDialog = this.hideDeleteEmployeePayrollTaxesDialog.bind(this);
        this.onPaidBy = this.onPaidBy.bind(this);
    }

    onPaidBy(e){
        this.setState({paid_by: e.value})
    }

    static propTypes = {
        employeepayrolltaxes : PropTypes.array.isRequired,
        getEmployeePayrollTaxes: PropTypes.func.isRequired,
        addEmployeePayrollTax: PropTypes.func.isRequired,
        editEmployeePayrollTax: PropTypes.func.isRequired,
        deleteEmployeePayrollTax: PropTypes.func.isRequired,
        getEmployeePayrollTaxChoices: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    openNew() {
        this.setState({
            newData: {
                name: '',
                paid_by: null
            },
            submitted: false,
            employeepayrolltaxDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            employeepayrolltaxDialog: false
        });
    }

    hideDeleteEmployeePayrollTaxDialog() {
        this.setState({ deleteEmployeePayrollTaxDialog: false });
    }

    hideDeleteEmployeePayrollTaxesDialog() {
        this.setState({ deleteEmployeePayrollTaxesDialog: false });
    }

    componentDidMount() {
        this.props.getEmployeePayrollTaxes();
        this.props.getEmployeePayrollTaxChoices()
    }


    saveEmployeePayrollTax = (e) => {
        e.preventDefault();
        const { name, paid_by } = this.state;
        const employeepayrolltax = { name, paid_by };
        this.props.addEmployeePayrollTax(employeepayrolltax);
        this.setState({
            name: '',
            paid_by: '',
            employeepayrolltaxDialog: false
        });
        this.props.history.push('/employeepayrolltaxes');
    };



    onHideEditDialog(event) {
        this.setState({
            visibleEditDialog: false,
            selectRow: {
                name: '',
                paid_by: ''
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


    editEmployeePayrollTax(e) {
        const errors = this.editDataValidateError();
        const {
            name,
            paid_by
        } = this.state.selectRow;
        const employeepayrolltax = {
            name,
            paid_by
        };
        if (errors.length !== 0) {
            this.growl.show(errors);
        } else {
            this.props.editEmployeePayrollTax(this.state.selectRow.id, employeepayrolltax);
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


    confirmDeleteEmployeePayrollTax(employeepayrolltax) {
        this.setState({
            employeepayrolltax,
            deleteEmployeePayrollTaxDialog: true
        });
    }

    deleteEmployeePayrollTax() {
        this.props.deleteEmployeePayrollTax();
        this.setState({
            deleteEmployeePayrollTaxDialog: false,
            employeepayrolltax: this.emptyEmployeePayrollTax
        });
    }

    confirmDeleteSelected() {
        this.setState({ deleteEmployeePayrollTaxesDialog: true });
    }

    deleteSelectedEmployeePayrollTaxes() {
        this.props.deleteEmployeePayrollTax();
        this.setState({
            deleteEmployeePayrollTaxesDialog: false,
            selectedEmployeePayrollTaxes: null
        });
    }


    renderHeader() {
        return (
            <div className="table-head">
                <h1>Manage Employee Payroll Taxes</h1>
                <div className="datatable-icons">
                    <div className="h"><FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /></div>
                    <div className="fancy-icon"><Button label="EXPORT TO CSV" icon="pi pi-upload" className="p-button-rounded p-button-help" onClick={this.export} /></div>
                    <Button label="CREATE NEW EMPLOYEE PAYROLL TAX" className="p-button-success p-mr-2" onClick={this.openNew} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEmployeePayrollTax(rowData)} />
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
        const employeepayrolltaxDialogFooter = (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveEmployeePayrollTax} />
            </>
        );

        const editDialogFooter = (
            <div>

                <Button label="Cancel" className="p-button-danger" icon="pi pi-times" onClick={this.onHideEditDialog}/>
                <Button label="Save" className="p-button-success" icon="pi pi-check" onClick={this.editEmployeePayrollTax}/>
            </div>
        );


        const deleteEmployeePayrollTaxesDialogFooter = (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEmployeePayrollTaxesDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteSelectedEmployeePayrollTaxes} />
            </>
        );

        const header = this.renderHeader();
        const { name, paid_by } = this.state;
        const { employeepayrolltaxchoices } = this.props;

        return (
            <Fragment>
                <Growl ref={(el) => this.growl = el}/>
                <div className="datatable-doc-demo">
                    <DataTable ref={(el) => this.dt = el} value={this.props.employeepayrolltaxes}
                        style={{backgroundColor: '#4EB08E'}}
                        header={header} responsive className="table-head" dataKey="id" rowHover globalFilter={this.state.globalFilter}
                        selection={this.state.selectedEmployeePayrollTaxes} onSelectionChange={e => this.setState({selectedEmployeePayrollTaxes: e.value})}
                        paginator rows={10} emptyMessage="No Employee Payroll Taxes found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                        <Column className="table-field" selectionMode="multiple" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="id" header="ID" sortable filter filterPlaceholder="Search by ID" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="name" header="Name" sortable filter filterPlaceholder="Search by Name" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" field="paid_by" header="Paid By" sortable filter filterPlaceholder="Search by Paid By" style={{width:'3em', backgroundColor: '#4EB0A5'}}/>
                        <Column className="table-field" body={this.actionBodyTemplate} headerStyle={{width: '3em', textAlign: 'center', backgroundColor: '#4EB0A5'}} bodyStyle={{textAlign: 'center', overflow: 'visible', backgroundColor: '#4EB0A5'}} />
                    </DataTable>
                    <Dialog
                        visible={this.state.employeepayrolltaxDialog}
                        style={{ width: '900px' }}
                        header="Employee Payroll Tax Details"
                        modal className="p-fluid"
                        footer={employeepayrolltaxDialogFooter}
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
                                    <Dropdown
                                        value={paid_by}
                                        onChange={this.onPaidBy}
                                        options={employeepayrolltaxchoices}
                                        filter={true}
                                        filterBy="id,name"
                                        showClear={true}
                                        optionLabel="value"
                                        optionValue="key"
                                    />
                                    <label htmlFor="inputtext">SELECT PAID BY</label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        footer={editDialogFooter}
                        visible={this.state.visibleEditDialog}
                        style={{ width: '700px' }}
                        header="UPDATE EMPLOYEE PAYROLL TAX"
                        modal={true} onHide={this.onHideEditDialog}
                    >
                        <span className="ui-float-label">
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
                        </span>
                        <span className="p-float-label">
                        <Dropdown
                            id="inPaidBy"
                            value={this.state.selectRow.paid_by}
                            options={employeepayrolltaxchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                            onChange={(e) =>
                            this.setState({
                                selectRow: {
                                    ...this.state.selectRow,
                                    paid_by: e.target.value
                                }
                            })
                        }/>
                        </span>
                    </Dialog>
                    <Dialog visible={this.state.deleteEmployeePayrollTaxesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeePayrollTaxesDialogFooter} onHide={this.hideDeleteEmployeePayrollTaxesDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                            {this.state.employeepayrolltax && <span>Are you sure you want to delete the selected?</span>}
                        </div>
                    </Dialog>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state =>({
    employeepayrolltaxes: state.employeepayrolltaxes.employeepayrolltaxes,
    employeepayrolltaxchoices: state.employeepayrolltaxchoices.employeepayrolltaxchoices
})

export default connect(mapStateToProps, { getEmployeePayrollTaxes, getEmployeePayrollTaxChoices, addEmployeePayrollTax, editEmployeePayrollTax, deleteEmployeePayrollTax } ) (EmployeePayrollTaxes);
