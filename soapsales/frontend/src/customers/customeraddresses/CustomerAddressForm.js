import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCustomerAddress } from '..//../actions/customeraddresses';
import { getActiveCustomers } from '..//../actions/activecustomers';
import PropTypes from 'prop-types';
import { getCustomerAddressTypeChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';


class CustomerAddressForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            owner: null,
			type: null,
			street_address: '',
			floor_number: '',
			city: '',
			apartment_number: '',
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
			apartment_number,
			postal_code
        } = this.state;
        const customeraddress  = {
            owner,
			type,
			street_address,
			floor_number,
			city,
			apartment_number,
			postal_code
        };
        this.props.addCustomerAddress( customeraddress );
        this.setState({
            owner: '',
			type: '',
			street_address: '',
			floor_number: '',
			city: '',
			apartment_number: '',
			postal_code: ''
        });
        this.props.history.push('/customeraddresses');
    };

    static propTypes = {
        addCustomerAddress: PropTypes.func.isRequired,
        getActiveCustomers: PropTypes.func.isRequired,
        getCustomerAddressTypeChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getActiveCustomers()
        this.props.getCustomerAddressTypeChoices()
    }

    render() {
        const {
            owner,
			type,
			street_address,
			floor_number,
			city,
			apartment_number,
			postal_code
        } = this.state;

        const {activecustomers} = this.props;
        const {customeraddresstypechoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Customer Address</h2>
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
                            options={customeraddresstypechoices}
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
                            options={activecustomers}
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
    activecustomers: state.activecustomers.activecustomers,
    customeraddresstypechoices: state.customeraddresstypechoices.customeraddresstypechoices,
})
export default connect(mapStateToProps, {getActiveCustomers, getCustomerAddressTypeChoices, addCustomerAddress})(CustomerAddressForm);
