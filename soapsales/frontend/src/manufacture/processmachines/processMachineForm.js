import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { addProcessMachine } from '../../actions/processmachines';
import { getInventoryStockItems } from '..//../actions/inventorystockitems';
import PropTypes from 'prop-types';
import {Calendar} from "primereact/calendar";
import {Dropdown} from 'primereact/dropdown';

export class ProcessMachineForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            equipment: null,
            description: '',
            date_commissioned: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEquipment = this.onEquipment.bind(this);
    }

    onEquipment (e){
        this.setState({equipment: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { equipment, description, date_commissioned } = this.state;
        const processMachines = { equipment, description,  date_commissioned};
        this.props.addProcessMachine(processMachines);
        this.setState({
            equipment: '',
            description: '',
            date_commissioned: '',
        });
        this.props.history.push('/processmachines');
    };


    static propTypes = {
        addProcessMachine: PropTypes.func.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getInventoryStockItems();
    }

    render() {
        const { equipment, description,  date_commissioned } = this.state;

        const { inventorystockitems } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Process Machine</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <Calendar
                                showIcon={true}
                                className="form-control"
                                name="date_commissioned"
                                onChange={this.onChange}
                                value={date_commissioned}
                                dateFormat="yy-mm-dd"
                            />
                            <label htmlFor="inputtext">Date Commissioned</label>
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
                        <span className="p-float-label">
                            <Dropdown
                                value={equipment}
                                onChange={this.onEquipment}
                                options={inventorystockitems}
                                filter={true}
                                filterBy="id,name"
                                showClear={true}
                                optionLabel="name"
                                optionValue="id"
                            />
                            <label htmlFor="inputtext">SELECT EQUIPMENT</label>
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
    inventorystockitems: state.inventorystockitems.inventorystockitems,
})

export default connect(mapStateToProps, { getInventoryStockItems, addProcessMachine })(ProcessMachineForm);
