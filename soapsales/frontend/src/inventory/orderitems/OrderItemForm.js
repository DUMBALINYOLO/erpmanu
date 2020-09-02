import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrderItem } from '..//../actions/orderitems';
import PropTypes from 'prop-types';
import { getUnitOfMeasureChoices } from '..//../actions/choices';
import { getInventoryOrders } from '..//../actions/inventoryorders';
import { getInventoryStockItems } from '..//../actions/inventorystockitems';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';


class OrderItemForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            order: null,
            item: null,
            quantity: '',
            unit: null,
            order_price: '',
            received: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onOrder = this.onOrder.bind(this);
        this.onItem = this.onItem.bind(this);
        this.onUnit = this.onUnit.bind(this);
    }

    onOrder (e){
        this.setState({order: e.value})
    }

    onItem (e){
        this.setState({item: e.value})
    }

    onUnit (e){
        this.setState({unit: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            order,
            item,
            quantity,
            unit,
            order_price,
            received
        } = this.state;
        const orderitem = {
            order,
            item,
            quantity,
            unit,
            order_price,
            received
        };
        this.props.addOrderItem(orderitem);
        this.setState({
            order: '',
            item: '',
            quantity: '',
            unit: '',
            order_price: '',
            received: ''
        });
        this.props.history.push('/orderitems');
    };

    static propTypes = {
        addOrderItem: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
        getInventoryOrders: PropTypes.func.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired

    }

    componentDidMount() {
        this.props.getUnitOfMeasureChoices()
        this.props.getInventoryOrders()
        this.props.getInventoryStockItems()
    }

    render() {
        const {
            order,
            item,
            quantity,
            unit,
            order_price,
            received
        } = this.state;

        const {unitofmeasurechoices} = this.props;
        const {inventoryorders} = this.props;
        const {inventorystockitems} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Order Item</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label>Quantity</label>
                        <InputNumber
                            name="quantity"
                            mode="decimal"
                            onChange={this.onChange}
                            value={quantity}
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
                        <label>Order Price</label>
                        <InputNumber
                            name="order_price"
                            mode="decimal"
                            onChange={this.onChange}
                            value={order_price}
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
                        <label>Received</label>
                        <InputNumber
                            name="received"
                            mode="decimal"
                            onChange={this.onChange}
                            value={received}
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
                        <span className="p-float-label">
                        <Dropdown
                            value={order}
                            onChange={this.onOrder}
                            options={inventoryorders}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ORDER</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={item}
                            onChange={this.onItem}
                            options={inventorystockitems}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ITEM</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={unit}
                            onChange={this.onUnit}
                            options={unitofmeasurechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT UNIT</label>
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
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
    inventoryorders: state.inventoryorders.inventoryorders,
    inventorystockitems: state.inventorystockitems.inventorystockitems
})

export default connect(mapStateToProps, {getUnitOfMeasureChoices, getInventoryOrders, getInventoryStockItems, addOrderItem})(OrderItemForm);
