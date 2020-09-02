import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStoragemedia } from '..//../actions/storagemedias';
import PropTypes from 'prop-types';
import { getWarehouses } from '..//../actions/warehouses';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';


class StoragemediaForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            warehouse: null,
            description: '',
            length: '',
            width: '',
            height: '',
            capacity: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        } = this.state;
        const storagemedia = {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        };
        this.props.addStoragemedia(storagemedia);
        this.setState({
            name: '',
            warehouse: '',
            description: '',
            length: '',
            width: '',
            height: '',
            capacity: '',
        });
        this.props.history.push('/storagemedias');
    };

    static propTypes = {
        addStoragemedia: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getWarehouses()
    }

    render() {
        const {
            name,
            warehouse,
            description,
            length,
            width,
            height,
            capacity,
        } = this.state;

        const {warehouses} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Storagemedia</h2>
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
                        <label>Length</label>
                         <InputNumber
                            name="length"
                            mode="decimal"
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
                        <label>Width</label>
                         <InputNumber
                            name="width"
                            mode="decimal"
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
                        <label>Height</label>
                         <InputNumber
                            name="height"
                            mode="decimal"
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
                        <label>Capacity</label>
                         <InputNumber
                            name="capacity"
                            mode="decimal"
                            onChange={this.onChange}
                            value={capacity}
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
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={warehouse}
                            onChange={this.onTypeChange}
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
                        <Button label="Submit" className="p-button-success p-button-rounded" />
                    </div>
                </div>
             </form>
         </div>
        );
    }
}


const mapStateToProps = state =>({
    warehouses: state.warehouses.warehouses,
})

export default connect(mapStateToProps, {getWarehouses, addStoragemedia})(StoragemediaForm);
