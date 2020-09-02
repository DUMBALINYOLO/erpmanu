import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSupplierAddress } from '..//../actions/supplieraddresses';
import { getSuppliers } from '..//../actions/suppliers';
import PropTypes from 'prop-types';
import { getSupplierAddressTypeChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';


class SupplierAddressForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            owner: null,
			type: null,
			street_address: '',
			floor_number: '',
			city: '',
			postal_code: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onOwner = this.onOwner.bind(this);
        this.onType = this.onType.bind(this);
    }

    onOwner (e){
        this.setState({owner: e.value})
    }

    onType (e){
        this.setState({type: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        } = this.state;
        const supplieraddress  = {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        };
        this.props.addSupplierAddress( supplieraddress );
        this.setState({
            owner: '',
			type: '',
			street_address: '',
			floor_number: '',
			city: '',
			postal_code: ''
        });
        this.props.history.push('/supplieraddresss');
    };

    static propTypes = {
        addSupplierAddress: PropTypes.func.isRequired,
        getSuppliers: PropTypes.func.isRequired,
        getSupplierAddressTypeChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSuppliers()
        this.props.getSupplierAddressTypeChoices()
    }

    render() {
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			postal_code
        } = this.state;

        const {suppliers} = this.props;
        const {supplieraddresstypechoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Supplier Address</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="street_address"
                                onChange={this.onChange}
                                value={street_address}
                            />
                            <label htmlFor="inputtext">Street Address</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="floor_number"
                                onChange={this.onChange}
                                value={floor_number}
                            />
                            <label htmlFor="inputtext">Floor Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="city"
                                onChange={this.onChange}
                                value={city}
                            />
                            <label htmlFor="inputtext">City</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="apartment_number"
                                onChange={this.onChange}
                                value={apartment_number}
                            />
                            <label htmlFor="inputtext">Apartment Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="postal_code"
                                onChange={this.onChange}
                                value={postal_code}
                            />
                            <label htmlFor="inputtext">Postal Code</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={type}
                            onChange={this.onType}
                            options={supplieraddresstypechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT TYPE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={owner}
                            onChange={this.onOwner}
                            options={suppliers}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT OWNER</label>
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
    suppliers: state.suppliers.suppliers,
    supplieraddresstypechoices: state.supplieraddresstypechoices.supplieraddresstypechoices,
})
export default connect(mapStateToProps, {getSuppliers, getSupplierAddressTypeChoices, addSupplierAddress})(SupplierAddressForm);
