import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { addProcessRate } from '..//../actions/processrates';
import { getProcessRateUnitTimeChoices, getUnitOfMeasureChoices } from '..//../actions/choices';
import {InputNumber} from 'primereact/inputnumber';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

class ProcessRateForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            unit: null,
            unit_time: null,
            quantity: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUnit = this.onUnit.bind(this);
        this.onUnitTime = this.onUnitTime.bind(this);
    }

    onUnit (e){
        this.setState({unit: e.value})
    }

    onUnitTime (e){
        this.setState({unit_time: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            unit,
            unit_time,
            quantity
        } = this.state;

        const processrate = {
            unit,
            unit_time,
            quantity
        };
        this.props.addProcessRate(processrate);
        this.setState({
            unit: '',
            unit_time: '',
            quantity: '',
        });
        this.props.history.push('/processrates');
    };

    static propTypes = {
        addProcessRate: PropTypes.func.isRequired,
        getUnitOfMeasureChoices: PropTypes.func.isRequired,
        getProcessRateUnitTimeChoices: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getUnitOfMeasureChoices()
        this.props.getProcessRateUnitTimeChoices()
    }

    render() {
        const {
            unit,
            unit_time,
            quantity
        } = this.state;

        const {unitofmeasurechoices} = this.props;
        const {processrateunittimechoices} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage PROCESS RATE</h2>
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
                                value={unit}
                                onChange={this.onUnit}
                                options={unitofmeasurechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="inputtext">SELECT UNIT</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <Dropdown
                                value={unit_time}
                                onChange={this.onUnitTime}
                                options={processrateunittimechoices}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="value"
                                optionValue="key"
                            />
                            <label htmlFor="inputtext">SELECT UNIT TIME</label>
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
    processrateunittimechoices: state.processrateunittimechoices.processrateunittimechoices
})
export default connect(
    mapStateToProps,
    {getUnitOfMeasureChoices, getProcessRateUnitTimeChoices, addProcessRate}
    )(ProcessRateForm);
