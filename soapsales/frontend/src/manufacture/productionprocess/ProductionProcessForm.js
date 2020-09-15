import React, { Component } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { getProcessRates } from '..//../actions/processrates';
import { addProcess } from '..//../actions/unverifiedproductionprocesses';
import { getManufacturingProcessChoices } from '..//../actions/choices';
import { getProcessMachineGroups } from '..//../actions/processmachinegroups';
import {Calendar} from "primereact/calendar";
import {InputNumber} from 'primereact/inputnumber';
import PropTypes from 'prop-types';
import Ingridients from './Ingridients';



class ProductionProcessForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            process_equipment: null,
            rate: null,
            description: '',
            date: '',
            type: null,
            duration: '',
            ingridients: [{ index: Math.random(), quantity: '', ship_from: '', raw_material: ''}],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onRate = this.onRate.bind(this);
        this.onEquipment = this.onEquipment.bind(this);
        this.onChoices = this.onChoices.bind(this);
        
    }

    onRate (e){
        this.setState({rate: e.value})
    }

    onEquipment (e){
        this.setState({process_equipment: e.value})
    }

    onChoices (e){
        this.setState({type: e.value})
    }



    handleChange = (e) => {
        if (["quantity", "raw_material", 'ship_from'].includes(e.target.name)) {
            let ingridients = [...this.state.ingridients]
            ingridients[e.target.dataset.id][e.target.name] = e.target.value;

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            ingridients: [...prevState.ingridients, { index: Math.random(), ship_from: "", raw_material: '', quantity: '' }],
        }));
    }

    deleteRow = (index) => {
        this.setState({
            ingridients: this.state.ingridients.filter((s, sindex) => index !== sindex),
        });
    }

    clickOnDelete(record) {
        this.setState({
            ingridients: this.state.ingridients.filter(r => r !== record)
        });
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            process_equipment,
            rate,
            description,
            date,
            type,
            duration,
            ingridients,

        } = this.state;

        const process = {
            name,
            process_equipment,
            rate,
            description,
            date,
            type,
            duration,
            ingridients,
        };

        this.props.addProcess(process);
        this.setState({
            ingridients: [],
            name: '',
            process_equipment: null,
            rate: null,
            description: '',
            date: '',
            type: null,
            duration: '',
        });
        // this.props.history.push('/bills')
    };

    static propTypes = {
        addProcess: PropTypes.func.isRequired,
        
    }

    componentDidMount() {
        this.props.getProcessRates();
        this.props.getProcessMachineGroups();
        this.props.getManufacturingProcessChoices();
    }

    render() {
        const {
            name,
            process_equipment,
            rate,
            description,
            date,
            type,
            duration,
            ingridients,
        } = this.state;


        const { processrates } = this.props;
        const { processmachinegroups } = this.props;
        const { manufacturingprocesschoices } = this.props;
        

        return (
          <div className="card card-body mt-4 mb-4">
            <h2>Manage Bill</h2>
            <form onSubmit={this.onSubmit} onChange={this.handleChange}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <InputText
                            name="name"
                            value={name}
                        />
                        <label htmlFor="inputtext">NAME</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                    <Calendar
                        showIcon={true}
                        className="form-control"
                        name="date"
                        onChange={this.onChange}
                        value={date}
                        dateFormat="yy-mm-dd"
                    />
                    <label htmlFor="inputtext">Date</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>DURATION</label>
                    <InputNumber
                        name="duration"
                        onChange={this.onChange}
                        value={duration}
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
                            value={description}
                        />
                        <label htmlFor="inputtext">DESCRIPTION</label>
                  </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                    <Dropdown
                        value={rate}
                        onChange={this.onRate}
                        options={processrates}
                        filter={true}
                        showClear={true}
                        optionLabel="quantity"
                        optionValue="id"
                    />

                    <label htmlFor="dropdown">SELECT RATE</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                    <Dropdown
                        value={type}
                        onChange={this.onChoices}
                        options={manufacturingprocesschoices}
                        filter={true}
                        filterBy="key,value"
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
                        value={process_equipment}
                        onChange={this.onEquipment}
                        options={processmachinegroups}
                        filter={true}
                        filterBy="id, name"
                        showClear={true}
                        optionLabel="name"
                        optionValue="id"
                    />

                    <label htmlFor="dropdown">SELECT EQUIPMENT</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                </div>
                <table className="table">
                  <thead>
                      <tr>
                        <th>QUANTIY</th>
                        <th>SHIP FROM</th>
                        <th>RAW MATERIAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Ingridients add={this.addNewRow} delete={this.clickOnDelete.bind(this)} ingridients={ingridients} />
                    </tbody>
                    <tfoot>
                        <tr><td colSpan="4">
                            <Button onClick={this.addNewRow} type="button" icon='pi pi-plus' className="p-button-warning"/>
                        </td></tr>
                    </tfoot>
                </table>
              </div>
            </form>
          </div>
        );
    }

}



const mapStateToProps = state =>({
    processmachinegroups: state.processmachinegroups.processmachinegroups,
    processrates: state.processrates.processrates,
    manufacturingprocesschoices: state.manufacturingprocesschoices.manufacturingprocesschoices,

})

export default connect(
            mapStateToProps, 
            {getProcessMachineGroups, getProcessRates, addProcess, getManufacturingProcessChoices })
            (ProductionProcessForm);


