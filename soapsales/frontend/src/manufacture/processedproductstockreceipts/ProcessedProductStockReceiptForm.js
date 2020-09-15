import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProcessedProductStockReceipt } from '../../actions/processedproductstockreceipts';
import { getWarehouses } from '../../actions/warehouses';
import { getEmployees } from '../../actions/employees';
import { getProductionProcesses } from '../../actions/productionprocesses';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";
import {Dropdown} from 'primereact/dropdown';
import ProcessedProductStockReceiptLine from './ProcessedProductStockReceiptLine';




export class ProcessedProductStockReceipt extends Component{
    constructor(props){
        super(props);
        this.state = {
        	process: null,
        	received_by: null,
        	ship_to: null,
        	receive_date: '',
            note: '',
            lines: [{ index: Math.random(), item: '', quantity: '' }],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onWarehouse = this.onWarehouse.bind(this);
        this.onEmployee = this.onEmployee.bind(this);
        this.onProcess = this.onProcess.bind(this);


    }

    onWarehouse (e){
        this.setState({ship_to: e.value})
    }

    onEmployee (e){
        this.setState({received_by: e.value})
    }

    onProcess (e){
        this.setState({process: e.value})
    }


    handleChange = (e) => {
        if (["quantity", "item"].includes(e.target.name)) {
            let lines = [...this.state.lines]
            lines[e.target.dataset.id][e.target.name] = e.target.value;

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            lines: [...prevState.lines, { index: Math.random(), item: '', quantity: ''  }],
        }));
    }

    deleteRow = (index) => {
        this.setState({
            lines: this.state.lines.filter((s, sindex) => index !== sindex),
        });
    }

    clickOnDelete(record) {
        this.setState({
            lines: this.state.lines.filter(r => r !== record)
        });
    }

    componentDidMount(){
    	this.props.getEmployees();
    	this.props.getProductionProcesses()
    	this.props.getWarehouses()


    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { note, ship_to, received_by, receive_date, process, lines } = this.state;
        const receipt = { note, ship_to, received_by, receive_date, process, lines  };
        this.props.addProcessedProductStockReceipt(receipt);
        this.setState({
            lines: [],
            note: '',
            received_by: '',
            receive_date: '',
            ship_to: '',
            process: '',

        });
        // this.props.history.push('/processmachinegroups');
    };

    static propTypes = {
        addProcessedProductStockReceipt: PropTypes.func.isRequired,
    }


    render() {
        const { note, lines, received_by, receive_date, ship_to, process} = this.state;
        const { employees } = this.props;
        const { warehouses } = this.props;
        const { productionprocesses } = this.props;




        return (
            <div className="card card-body mt-4 mb-4">
                <h2>RECEIVE STOCK</h2>
                <form onSubmit={this.onSubmit} onChange={this.handleChange}>
                    <div className="p-fluid p-formgrid p-grid">
                        
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="note"
                                    value={note}
                                />
                                <label htmlFor="inputtext">NOTE</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
			                <span className="p-float-label">
			                <Calendar
			                    showIcon={true}
			                    className="form-control"
			                    name="receive_date"
			                    onChange={this.onChange}
			                    value={receive_date}
			                    dateFormat="yy-mm-dd"
			                />
			                <label htmlFor="inputtext">Date</label>
			                </span>
			            </div>
			            <div className="p-field p-col-12 p-md-6">
			                <span className="p-float-label">
			                <Dropdown
			                    value={ship_to}
			                    onChange={this.onWarehouse}
			                    options={warehouses}
			                    filter={true}
			                    filterBy="name, id"
			                    showClear={true}
			                    optionLabel="name"
			                    optionValue="id"
			                />

			                <label htmlFor="dropdown">WAREHOUSE</label>
			                </span>
			            </div>
			            <div className="p-field p-col-12 p-md-6">
			                <span className="p-float-label">
			                <Dropdown
			                    value={received_by}
			                    onChange={this.onEmployee}
			                    options={employees}
			                    filter={true}
			                    showClear={true}
			                    optionLabel="email"
			                    optionValue="id"
			                />

			                <label htmlFor="dropdown">RECEIVED BY</label>
			                </span>
			            </div>
			            <div className="p-field p-col-12 p-md-6">
			                <span className="p-float-label">
			                <Dropdown
			                    value={process}
			                    onChange={this.onProcess}
			                    options={productionprocesses}
			                    filter={true}
			                    showClear={true}
			                    optionLabel="name"
			                    optionValue="id"
			                />

			                <label htmlFor="dropdown">PRODUCTION PROCESS</label>
			                </span>
			            </div>
                        <div className="p-field p-col-12 p-md-6">
                            <Button label="Submit" className="p-button-success p-button-rounded" />
                        </div>
                        <table className="table">
                          <thead>
                              <tr>
                                <th>QUANTITY</th>
                                <th>ITEM</th>

                              </tr>
                            </thead>
                            <tbody>
                              <ProcessedProductStockReceiptLine add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lines={lines} />
                            </tbody>
                            <tfoot>
                                <tr><td colSpan="4">
                                    <Button onClick={this.addNewRow} type="button" icon='pi pi-plus' className="p-button-warning"/>
                                </td></tr>
                            </tfoot>
                        </table>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    employees: state.employees.employees,
    productionprocesses: state.productionprocesses.productionprocesses,
    warehouses: state.warehouses.warehouses,

})

export default connect(
			mapStateToProps, 
			{ addProcessedProductStockReceipt, getProductionProcesses, getWarehouses, getEmployees  })
			(ProcessedProductStockReceipt);








































