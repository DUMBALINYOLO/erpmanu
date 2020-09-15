import React, { Component } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { getEmployees } from '..//../actions/employees';
import { getActiveSuppliers } from '..//../actions/activesuppliers';
import { getWarehouses } from '..//../actions/warehouses';
import { getInventoryOrderStatusChoices } from '..//../actions/choices';
import { addInventoryOrder } from '..//../actions/inventoryorders';
import { getTaxes} from '..//../actions/taxes';
// import { getJournalEntries  } from '..//../actions/journalentries';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';
import PropTypes from 'prop-types';
import OrderItems from './OrderItems';




class InventoryOrderForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      validated_by: null,
      expected_receipt_date: '',
      date: '',
      due: '',
      supplier: null,
      ship_to: null,
      notes: '',
      status: null,
      tax: null,
      issuing_inventory_controller: null,
      items:[{ndex: Math.random(), item: "", quantity: '', unit: '', order_price: '',}],

    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.onValidatedBy = this.onValidatedBy.bind(this);
    this.onSupplier = this.onSupplier.bind(this);
    this.onShipTo = this.onShipTo.bind(this);
    this.onStatus = this.onStatus.bind(this);
    this.onTax = this.onTax.bind(this);
    this.onIssuingInventoryController = this.onIssuingInventoryController.bind(this);
  }

  onValidatedBy (e){
      this.setState({validated_by: e.value})
    }

  onSupplier (e){
      this.setState({supplier: e.value})
    }

  onShipTo (e){
      this.setState({ship_to: e.value})
    }

  onStatus (e){
      this.setState({status: e.value})
    }

  onTax (e){
      this.setState({tax: e.value})
    }

  onIssuingInventoryController (e){
      this.setState({issuing_inventory_controller: e.value})
    }

  handleChange = (e) => {
    if (["item", "quantity", 'unit', 'order_price'].includes(e.target.name)) {
        let items = [...this.state.items]
        items[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
        this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = (e) => {
      this.setState((prevState) => ({
          items: [...prevState.items, { index: Math.random(), item: "", quantity: '',  unit: '', order_price: '' }],
      }));
  }

  deleteRow = (index) => {
      this.setState({
          items: this.state.items.filter((s, sindex) => index !== sindex),
      });
      // const taskList1 = [...this.state.taskList];
      // taskList1.splice(index, 1);
      // this.setState({ taskList: taskList1 });
  }

  clickOnDelete(record) {
        this.setState({
            items: this.state.items.filter(r => r !== record)
        });
  }



  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }




  onSubmit = (e) => {
      e.preventDefault();
      const {
        validated_by,
        expected_receipt_date,
        date,
        due,
        supplier,
        ship_to,
        notes,
        status,
        issuing_inventory_controller,
        tax,
        items

      } = this.state;

      const inventoryorder = {
        validated_by,
        expected_receipt_date,
        date,
        due,
        supplier,
        ship_to,
        notes,
        status,
        issuing_inventory_controller,
        tax,
        items

      };

      this.props.addInventoryOrder(inventoryorder);
      console.log(inventoryorder)
      this.setState({
          items: [],
          validated_by: '',
          expected_receipt_date: '',
          date: '',
          due: '',
          supplier: '',
          supplier_invoice_number: '',
          ship_to: '',
          notes: '',
          status: '',
          issuing_inventory_controller: '',
          tax: '',

        });
      // this.props.history.push('/inventoryorders');
    };

    static propTypes = {
        addInventoryOrder: PropTypes.func.isRequired,
        getActiveSuppliers: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getInventoryOrderStatusChoices: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getTaxes: PropTypes.func.isRequired,
    }

  componentDidMount() {
    this.props.getEmployees();
    this.props.getWarehouses();
    this.props.getActiveSuppliers();
    this.props.getInventoryOrderStatusChoices();
    this.props.getTaxes();
    // this.props.getJournalEntries();


  }

  render = () => {
    const {
        validated_by,
        expected_receipt_date,
        date,
        due,
        supplier,
        // entries,
        // shipping_cost_entries,
        ship_to,
        notes,
        status,
        issuing_inventory_controller,
        tax,
        items,

    } = this.state;


    const { activesuppliers } = this.props;
    const { warehouses } = this.props;
    const { employees } = this.props;
    const { inventoryorderstatuschoices } = this.props;
    const { taxes } = this.props;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Manage Inventory Order</h2>
        <form onSubmit={this.onSubmit} onChange={this.handleChange}>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label>Expected Date</label>
              <Calendar
                showIcon={true}
                className="form-control"
                name="expected_receipt_date"
                onChange={this.onChange}
                value={expected_receipt_date}
                dateFormat="yy-mm-dd"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label>Date</label>
              <Calendar
                showIcon={true}
                className="form-control"
                name="date"
                onChange={this.onChange}
                value={date}
                dateFormat="yy-mm-dd"
              />
            </div>
             <div className="p-field p-col-12 p-md-6">
              <label>Due</label>
              <Calendar
                showIcon={true}
                className="form-control"
                name="due"
                onChange={this.onChange}
                value={due}
                dateFormat="yy-mm-dd"
              />
            </div>
            <div className="p-field p-col-12 p-md-12">
              <label>NOTES</label>
              <InputTextarea
                rows="3"
                className="form-control"
                type="text"
                name="notes"
                onChange={this.onChange}
                value={notes}
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT STATUS"
                value={status}
                onChange={this.onStatus}
                options={inventoryorderstatuschoices}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="value"
                optionValue="key"
              />
            </div>

            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT VALIDATED BY"
                value={validated_by}
                onChange={this.onValidatedBy}
                options={employees}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="email"
                optionValue="id"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT ISSUER"
                value={issuing_inventory_controller}
                onChange={this.onIssuingInventoryController}
                options={employees}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="email"
                optionValue="id"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT SHIP TO"
                value={ship_to}
                onChange={this.onShipTo}
                options={warehouses}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="name"
                optionValue="id"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT SUPPLIER"
                value={supplier}
                onChange={this.onSupplier}
                options={activesuppliers}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="name"
                optionValue="id"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT TAX"
                value={tax}
                onChange={this.onTax}
                options={taxes}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="name"
                optionValue="id"
              />
            </div>
            

            <div className="p-field p-col-12 p-md-12">
              <Button label="Submit" className="p-button-success p-button-rounded" />
            </div>
            <table className="table">
              <thead>
                  <tr>
                    <th>QUANTITY</th>
                    <th>Order Price</th>
                    <th>Item</th>
                    <th>Unit Of Measure</th>
                  </tr>
                </thead>
                <tbody>
                  <OrderItems add={this.addNewRow} delete={this.clickOnDelete.bind(this)} items={items} />
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
    activesuppliers: state.activesuppliers.activesuppliers,
    warehouses: state.warehouses.warehouses,
    taxes: state.taxes.taxes,
    inventoryorderstatuschoices: state.inventoryorderstatuschoices.inventoryorderstatuschoices,

})

export default connect(
      mapStateToProps,
      {getActiveSuppliers, getWarehouses, getTaxes, getInventoryOrderStatusChoices, getEmployees, addInventoryOrder})
      (InventoryOrderForm);
