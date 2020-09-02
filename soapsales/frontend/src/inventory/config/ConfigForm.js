import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addConfig } from '..//../actions/config';
import PropTypes from 'prop-types';
import { getInventoryValuationPeriodChoices, getInventoryCheckFrequencyChoices, getInventoryCheckDateChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {InputNumber} from 'primereact/inputnumber';


class ConfigForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            inventory_valuation_method: null,
            inventory_check_frequency: null,
            inventory_check_date: null,
            use_warehousing_model: false,
            use_storage_media_model: false,
            use_product_inventory: false,
            use_equipment_inventory: false,
            use_consumables_inventory: false,
            use_raw_materials_inventory: false,
            is_configured: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInventoryValuationMethod = this.onInventoryValuationMethod.bind(this);
        this.onInventoryCheckFrequency = this.onInventoryCheckFrequency.bind(this);
        this.onInventoryCheckDate = this.onInventoryCheckDate.bind(this);
        this.onUseWarehousingModel = this.onUseWarehousingModel.bind(this);
        this.onUseStorageMediaModel = this.onUseStorageMediaModel.bind(this);
        this.onUseProductInventory = this.onUseProductInventory.bind(this);
        this.onUseEquipmentInventory = this.onUseEquipmentInventory.bind(this);
        this.onUseConsumablesInventory = this.onUseConsumablesInventory.bind(this);
        this.onUseRawMaterialsInventory = this.onUseRawMaterialsInventory.bind(this);
        this.onIsConfigured = this.onIsConfigured.bind(this)
    }

    onUseWarehousingModel() {
        this.setState({
            use_warehousing_model: !this.state.checked
        });
    }

    onUseStorageMediaModel() {
        this.setState({
            use_storage_media_model: !this.state.checked
        });
    }

    onUseProductInventory() {
        this.setState({
            use_product_inventory: !this.state.checked
        });
    }

    onUseEquipmentInventory() {
        this.setState({
            use_equipment_inventory: !this.state.checked
        });
    }

    onUseConsumablesInventory() {
        this.setState({
            use_consumables_inventory: !this.state.checked
        });
    }

    onUseRawMaterialsInventory() {
        this.setState({
            use_raw_materials_inventory: !this.state.checked
        });
    }

    onIsConfigured() {
        this.setState({
            is_configured: !this.state.checked
        });
    }

    onInventoryValuationMethod (e){
        this.setState({inventory_valuation_method: e.value})
    }

    onInventoryCheckFrequency (e){
        this.setState({inventory_check_frequency: e.value})
    }

    onInventoryCheckDate (e){
        this.setState({inventory_check_date: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            inventory_valuation_method,
            inventory_check_frequency,
            inventory_check_date,
            use_warehousing_model,
            use_storage_media_model,
            use_product_inventory,
            use_equipment_inventory,
            use_consumables_inventory,
            use_raw_materials_inventory,
            is_configured
        } = this.state;
        const config = {
            inventory_valuation_method,
            inventory_check_frequency,
            inventory_check_date,
            use_warehousing_model,
            use_storage_media_model,
            use_product_inventory,
            use_equipment_inventory,
            use_consumables_inventory,
            use_raw_materials_inventory,
            is_configured
        };
        this.props.addConfig(config);
        this.setState({
            inventory_valuation_method: '',
            inventory_check_frequency: '',
            inventory_check_date: '',
            use_warehousing_model: true,
            use_storage_media_model: true,
            use_product_inventory: true,
            use_equipment_inventory: true,
            use_consumables_inventory: true,
            use_raw_materials_inventory: true,
            is_configured: true
        });
        this.props.history.push('/config');
    };

    static propTypes = {
        addConfig: PropTypes.func.isRequired,
        getInventoryValuationPeriodChoices: PropTypes.func.isRequired,
        getInventoryCheckFrequencyChoices: PropTypes.func.isRequired,
        getInventoryCheckDateChoices: PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getInventoryValuationPeriodChoices()
        this.props.getInventoryCheckFrequencyChoices()
        this.props.getInventoryCheckDateChoices()
    }

    render() {
        const {
            inventory_valuation_method,
            inventory_check_frequency,
            inventory_check_date,
            use_warehousing_model,
            use_storage_media_model,
            use_product_inventory,
            use_equipment_inventory,
            use_consumables_inventory,
            use_raw_materials_inventory,
            is_configured
        } = this.state;

        const {inventoryvaluationperiodchoices} = this.props;
        const {inventorycheckfrequencychoices} = this.props;
        const {inventorycheckdatechoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Config</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE WAREHOUSING MODEL :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseWarehousingModel}
                            checked={this.state.use_warehousing_model}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE STORAGE MEDIA MODEL :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseStorageMediaModel}
                            checked={this.state.use_storage_media_model}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE PRODUCT INVENTORY :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseProductInventory}
                            checked={this.state.use_product_inventory}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE EQUIPMENT INVENTORY :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseEquipmentInventory}
                            checked={this.state.use_equipment_inventory}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE CONSUMABLES INVENTORY :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseConsumablesInventory}
                            checked={this.state.use_consumables_inventory}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USE RAW MATERIALS INVENTORY :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUseRawMaterialsInventory}
                            checked={this.state.use_raw_materials_inventory}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>IS CONFIGURED :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onIsConfigured}
                            checked={this.state.is_configured}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={inventory_valuation_method}
                            onChange={this.onInventoryValuationMethod}
                            options={inventoryvaluationperiodchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT INVENTORY VALUATION METHOD</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={inventory_check_frequency}
                            onChange={this.onInventoryCheckFrequency}
                            options={inventorycheckfrequencychoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT INVENTORY CHECK FREQUENCY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={inventory_check_date}
                            onChange={this.onInventoryCheckDate}
                            options={inventorycheckdatechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT INVENTORY CHECK DATE</label>
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
    inventoryvaluationperiodchoices: state.inventoryvaluationperiodchoices.inventoryvaluationperiodchoices,
    inventorycheckfrequencychoices: state.inventorycheckfrequencychoices.inventorycheckfrequencychoices,
    inventorycheckdatechoices: state.inventorycheckdatechoices.inventorycheckdatechoices
})

export default connect(mapStateToProps, {getInventoryValuationPeriodChoices, getInventoryCheckFrequencyChoices,
    getInventoryCheckDateChoices, addConfig})(ConfigForm);
