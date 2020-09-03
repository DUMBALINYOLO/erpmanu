import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addManufacturedStockItem } from '..//../actions/manufacturedstockitems';
import {getProcessProducts} from "..//../actions/processproducts";
import {getWarehouses} from "..//../actions/warehouses";
import {getStorageMedias} from "..//../actions/storagemedias";
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

export class ManufacturedStockItemForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: null,
            quantity: '',
            warehouse: null,
            location: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onItem = this.onItem.bind(this);
        this.onWarehouse = this.onWarehouse.bind(this);
        this.onLocation = this.onLocation.bind(this);
    }

    onItem(e){
      this.setState({item: e.value})
    }

    onWarehouse(e){
      this.setState({warehouse: e.value})
    }

    onLocation(e){
      this.setState({location: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            item,
            quantity,
            warehouse,
            location
        } = this.state;
        const manufacturedstockitem = {
            item,
            quantity,
            warehouse,
            location
        };
        this.props.addManufacturedStockItem(manufacturedstockitem);
        this.setState({
            item: '',
            quantity: '',
            warehouse: '',
            location: ''
        });
        this.props.history.push('/manufacturedstockitems');
    };

    static propTypes = {
        addManufacturedStockItem: PropTypes.func.isRequired,
        getProcessProducts: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getStorageMedias: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getProcessProducts()
        this.props.getWarehouses()
        this.props.getStorageMedias()
    }


    render() {
        const {
            item,
            quantity,
            warehouse,
            location
        } = this.state;

        const { processproducts } = this.props;
        const { warehouses } = this.props;
        const { storagemedias } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage Manufactured Stock Item</h2>
                <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <label>QUANTITY</label>
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
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown
                                value={item}
                                onChange={this.onItem}
                                options={processproducts}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="inputtext">SELECT ITEM</label>
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
                            <label htmlFor="inputtext">SELECT WAREHOUSE</label>
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
                                optionValue="id"
                            />
                            <label htmlFor="inputtext">SELECT LOCATION</label>
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
    processproducts: state.processproducts.processproducts,
    warehouses: state.warehouses.warehouses,
    storagemedias: state.storagemedias.storagemedias
})

export default connect(mapStateToProps, { getProcessProducts, getWarehouses, getStorageMedias, addManufacturedStockItem })(ManufacturedStockItemForm);
