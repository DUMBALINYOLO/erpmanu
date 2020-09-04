import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addConsumable } from '..//../actions/consumables';
import { getInventoryTypesChoices, getUnitOfMeasureChoices } from '..//../actions/choices';
import { getActiveSuppliers } from '..//../actions/activesuppliers';
import { getInventoryCategories } from '..//../actions/inventorycategories';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Dropdown} from 'primereact/dropdown';

export class ConsumableForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            type: null,
            category: null,
            length: '',
            width: '',
            height: '',
            description: '',
            unit: null,
            unit_purchase_price: '',
            supplier: null,
            minimum_order_level: '',
            maximum_stock_level: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onType = this.onType.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onSupplier = this.onSupplier.bind(this);
    }

    onType (e){
       this.setState({type: e.value})
    }

    onCategory (e){
       this.setState({category: e.value})
    }

    onUnit (e){
       this.setState({unit: e.value})
    }

    onSupplier (e){
       this.setState({supplier: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;

        const consumable = {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        };

        this.props.addConsumable(consumable);
        this.setState({
            name: '',
            type: '',
            category: '',
            length: '',
            width: '',
            height: '',
            description: '',
            unit: '',
            unit_purchase_price: '',
            supplier: '',
            minimum_order_level: '',
            maximum_stock_level: '',

        });
        this.props.history.push('/consumables');

    };

    static propTypes = {
        addConsumable: PropTypes.func.isRequired,
        getInventoryTypesChoices: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
        getActiveSuppliers: PropTypes.func.isRequired,
        getInventoryCategories: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getInventoryTypesChoices();
        this.props.getUnitOfMeasureChoices();
        this.props.getActiveSuppliers();
        this.props.getInventoryCategories();
    }

    render() {
        const {
            name,
            type,
            category,
            length,
            width,
            height,
            description,
            unit,
            unit_purchase_price,
            supplier,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;

        const {inventorytypeschoices} = this.props;
        const {inventorycategories} = this.props;
        const {unitofmeasurechoices} = this.props;
        const {activesuppliers} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage Consumable</h2>
                <form onSubmit={this.onSubmit}>
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
                        <label>LENGTH</label>
                        <InputNumber
                            name="length"
                            onChange={this.onChange}
                            value={length}
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
                        <label>WIDTH</label>
                        <InputNumber
                            name="width"
                            onChange={this.onChange}
                            value={width}
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
                        <label>HEIGHT</label>
                        <InputNumber
                            name="height"
                            onChange={this.onChange}
                            value={height}
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
                        <label>MAXIMUM STOCK LEVEL</label>
                        <InputNumber
                            name="maximum_stock_level"
                            onChange={this.onChange}
                            value={maximum_stock_level}
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
                        <label>UNIT PURCHASE PRICE</label>
                        <InputNumber
                            name="unit_purchase_price"
                            onChange={this.onChange}
                            value={unit_purchase_price}
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
                        <label>MINIMUM ORDER LEVEL</label>
                        <InputNumber
                            name="minimum_order_level"
                            onChange={this.onChange}
                            value={minimum_order_level}
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
                        <Dropdown
                            placeholder ="SELECT TYPE"
                            value={type}
                            onChange={this.onType}
                            options={inventorytypeschoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="id"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <Dropdown
                            placeholder ="SELECT CATEGORY"
                            value={category}
                            onChange={this.onCategory}
                            options={inventorycategories}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <Dropdown
                            placeholder ="SELECT UNIT"
                            value={unit}
                            onChange={this.onUnit}
                            options={unitofmeasurechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
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
                        <Button label="Submit" className="p-button-success p-button-rounded" />
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    inventorytypeschoices: state.inventorytypeschoices.inventorytypeschoices,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
    activesuppliers: state.activesuppliers.activesuppliers,
    inventorycategories: state.inventorycategories.inventorycategories,
})

export default connect(
      mapStateToProps,
      {getInventoryTypesChoices, getInventoryCategories, getUnitOfMeasureChoices, getActiveSuppliers, addConsumable })
      (ConsumableForm);
