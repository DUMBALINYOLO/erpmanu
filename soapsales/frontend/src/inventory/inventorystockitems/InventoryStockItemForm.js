import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInventoryStockItem, getInventoryStockItems } from '..//../actions/inventorystockitems';
import { getWarehouses } from '..//../actions/warehouses';
import { getStoragemedias } from '..//../actions/storagemedias';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';


export class InventoryStockItemForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: null,
            quantity: '',
            warehouse: null,
            location: null,
            verified: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onItem = this.onItem.bind(this);
        this.onWarehouse = this.onWarehouse.bind(this);
        this.onLocation = this.onLocation.bind(this);
        this.onVerified = this.onVerified.bind(this);
    }

    onItem (e){
      this.setState({item: e.value})
    }

    onWarehouse (e){
      this.setState({warehouse: e.value})
    }

    onLocation (e){
      this.setState({location: e.value})
    }

    onVerified() {
        this.setState({
            verified: !this.state.checked
        });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            item,
            quantity,
            warehouse,
            location,
            verified
        } = this.state;

        const inventorystockitem = {
            item,
            quantity,
            warehouse,
            location,
            verified
        };

        this.props.addInventoryStockItem(inventorystockitem);
        this.setState({
            item: '',
            quantity: '',
            warehouse: '',
            location: '',
            verified: true
        });
        this.props.history.push('/inventorystockitems');

    };

    static propTypes = {
        addInventoryStockItem: PropTypes.func.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getStoragemedias: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getStoragemedias();
      this.props.getInventoryStockItems();
      this.props.getWarehouses();
    }

    render() {
        const {
            item,
            quantity,
            warehouse,
            location,
        } = this.state;

        const {inventorystockitems} = this.props;
        const {warehouses} = this.props;
        const {storagemedias} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage Inventory Stock Item</h2>
                <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label>Quantity</label>
                        <InputNumber
                            name="quantity"
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
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>VERIFIED :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onVerified}
                            checked={this.state.verified}
                        />
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
                            value={warehouse}
                            onChange={this.onWarehouse}
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
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={location}
                            onChange={this.onLocation}
                            options={storagemedias}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="kedidy"
                        />
                        <label htmlFor="dropdown">SELECT LOCATION</label>
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
    inventorystockitems: state.inventorystockitems.inventorystockitems,
    warehouses: state.warehouses.warehouses,
    storagemedias: state.storagemedias.storagemedias,
})

export default connect(mapStateToProps, {getInventoryStockItems, getWarehouses, getStoragemedias, addInventoryStockItem })(InventoryStockItemForm);
