import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import { addProcessProduct } from '../../actions/processproducts';
import { getManufacturingProductTypeChoices, getProcessedProductsStockStatusChoices, getUnitOfMeasureChoices } from '..//../actions/choices';
import { getInventoryStockItems } from '..//../actions/inventorystockitems';
import PropTypes from 'prop-types';

export class ProcessProductForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            type: null,
            unit: null,
            finished_goods: false,
            location:null,
            status: null,
            minimum_order_level: '',
            maximum_stock_level: '',

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
        this.onType = this.onType.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onlocation = this.onlocation.bind(this);
        this.onStatus = this.onStatus.bind(this);
    }

    handleFinished() {
      this.setState({
        finished_goods: !this.state.checked
      });
    }

    onType (e){
      this.setState({type: e.value})
    }

    onUnit (e){
      this.setState({unit: e.value})
    }

    onlocation (e){
      this.setState({location: e.value})
    }

    onStatus (e){
      this.setState({status: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
          name,
          description,
          type,
          unit,
          finished_goods,
          location,
          status,
          minimum_order_level,
          maximum_stock_level,
        } = this.state;
      const processproduct = {
          name,
          description,
          type,
          unit,
          finished_goods,
          location,
          status,
          minimum_order_level,
          maximum_stock_level,
        };
      this.props.addProcessProduct(processproduct);
      console.log(processproduct)
      this.setState({
          name: '',
          description: '',
          type: '',
          unit: '',
          finished_goods: true,
          location: '',
          status: '',
          minimum_order_level: '',
          maximum_stock_level: '',
        });
      this.props.history.push('/processproducts');
    };

    static propTypes = {
        addProcessProduct: PropTypes.func.isRequired,
        getManufacturingProductTypeChoices: PropTypes.func.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired,
        getProcessedProductsStockStatusChoices: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
    }
    componentDidMount() {
      this.props.getManufacturingProductTypeChoices();
      this.props.getInventoryStockItems();
      this.props.getProcessedProductsStockStatusChoices();
      this.props.getUnitOfMeasureChoices();
    }

    render() {
        const {
            name,
            description,
            type,
            unit,
            finished_goods,
            location,
            status,
            minimum_order_level,
            maximum_stock_level,
        } = this.state;

        const {manufacturingproducttypechoices} = this.props;
        const {inventorystockitems} = this.props;
        const {processedproductstockstatuschoices} = this.props;
        const {unitofmeasurechoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Process Product</h2>
              <form onSubmit={this.onSubmit}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                  <label>Name</label>
                  <InputText
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12">
                  <label>Description</label>
                  <InputTextarea
                    name="description"
                    onChange={this.onChange}
                    value={description}
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
                    options={manufacturingproducttypechoices}
                    filter={true}
                    filterBy="id,name"
                    showClear={true}
                    optionLabel="value"
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
                    optionLabel="name"
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown
                    placeholder ="SELECT LOCATION"
                    value={location}
                    onChange={this.onlocation}
                    options={inventorystockitems}
                    filter={true}
                    filterBy="id,name"
                    showClear={true}
                    optionLabel="name"
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown
                    placeholder ="SELECT STATUS"
                    value={status}
                    onChange={this.onStatus}
                    options={processedproductstockstatuschoices}
                    filter={true}
                    filterBy="id,name"
                    showClear={true}
                    optionLabel="value"
                    optionValue="key"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                  <label>FINISHED GOODS :</label>
                  <Checkbox
                    inputId="working"
                    onChange={this.handleFinished}
                    checked={this.state.finished_goods}
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
    manufacturingproducttypechoices: state.manufacturingproducttypechoices.manufacturingproducttypechoices,
    processedproductstockstatuschoices: state.processedproductstockstatuschoices.processedproductstockstatuschoices,
    unitofmeasurechoices: state.unitofmeasurechoices.unitofmeasurechoices,
    inventorystockitems: state.inventorystockitems.inventorystockitems,
})

export default connect(mapStateToProps, {getManufacturingProductTypeChoices, getProcessedProductsStockStatusChoices, getUnitOfMeasureChoices, getInventoryStockItems, addProcessProduct })(ProcessProductForm);
