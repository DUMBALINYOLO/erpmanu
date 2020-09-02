import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInventoryOrders } from '..//../actions/inventoryorders';
import { getEmployees } from '..//../actions/employees';
import { addInventoryOrderpayment } from '..//../actions/orderpayments';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';



class InventoryOrderpaymentForm extends Component{
    constructor(props){
        super(props);
            this.state = {
                date: '',
                amount: '',
                comments: '',
                order: null,
                paid_by: null
        }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onTypeChange = this.onTypeChange.bind(this);
      this.onPaidBy = this.onPaidBy.bind(this);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onTypeChange (e){
      this.setState({order: e.value})
    }

    onPaidBy (e){
      this.setState({paid_by: e.value})
    }

    onSubmit = (e) => {
      e.preventDefault();
      const {
        date,
        amount,
        comments,
        order,
        paid_by
      } = this.state;

      const inventoryorderpayment = {
        date,
        amount,
        comments,
        order,
        paid_by
      };

      this.props.addInventoryOrderpayment(inventoryorderpayment);
      this.setState({
          date: '',
          amount: '',
          comments: '',
          order: '',
          paid_by: ''
        });
      this.props.history.push('/inventoryorderpayments');
    };

    static propTypes = {
        addInventoryOrderpayment: PropTypes.func.isRequired,
        getInventoryOrders: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getInventoryOrders()
        this.props.getEmployees()
    }

    render() {
        const {
          date,
          amount,
          comments,
          order,
          paid_by
        } = this.state;


        const { inventoryorders } = this.props;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Inventory OrderPayment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="date"
                            onChange={this.onChange}
                            value={date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Date</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>AMOUNT</label>
                        <InputNumber
                            name="amount"
                            onChange={this.onChange}
                            value={amount}
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
                                name="comments"
                                onChange={this.onChange}
                                value={comments}
                            />
                            <label htmlFor="inputtext">Comments</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={order}
                            onChange={this.onTypeChange}
                            options={inventoryorders}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="tracking_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ORDER/label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={paid_by}
                            onChange={this.onPaidBy}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT PAID BY/label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <Button label="Submit" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </form>
            </div>
        );
    }
}


const mapStateToProps = state =>({
    inventoryorders: state.inventoryorders.inventoryorders,
    employees: state.employees.employees
})

export default connect(mapStateToProps, {getInventoryOrders, getEmployees, addInventoryOrderpayment})(InventoryOrderpaymentForm);
