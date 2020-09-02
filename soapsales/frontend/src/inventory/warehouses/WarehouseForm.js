import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWarehouse } from '..//../actions/warehouses';
import { getEmployees } from '..//../actions/employees';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputNumber} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Calendar} from "primereact/calendar"
import {Dropdown} from 'primereact/dropdown';


export class WarehouseForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            description: '',
            inventory_controller: null,
            length: '',
            width: '',
            height: '',
            last_inventory_check_date: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({inventory_controller: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        } = this.state;
        const warehouse = {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        };
        this.props.addWarehouse(warehouse);
        this.setState({
            name: '',
            address: '',
            description: '',
            inventory_controller: '',
            length: '',
            width: '',
            height: '',
            last_inventory_check_date: '',
        });
        this.props.history.push('/warehouses');
    };

    static propTypes = {
        addWarehouse : PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getEmployees();
    }

    render() {
        const {
            name,
            address,
            description,
            inventory_controller,
            length,
            width,
            height,
            last_inventory_check_date,
        } = this.state;

        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Warehouse</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="name"
                                onChange={this.onChange}
                                value={name}
                            />
                            <label htmlFor="inputtext">Name</label>
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
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputTextarea
                                name="address"
                                onChange={this.onChange}
                                value={address}
                            />
                            <label htmlFor="inputtext">ADDRESS</label>
                        </span>
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
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="last_inventory_check_date"
                            onChange={this.onChange}
                            value={last_inventory_check_date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">LAST INVENTORY CHECK DATE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={inventory_controller}
                            onChange={this.onTypeChange}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT INVENTORY CONTROLLER/label>
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
  employees: state.employees.employees,
})

export default connect(
        mapStateToProps,
        { getEmployees, addWarehouse })
        (WarehouseForm);
