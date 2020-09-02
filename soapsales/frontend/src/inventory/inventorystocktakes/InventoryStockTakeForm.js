import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInventoryStockTake } from '..//../actions/inventorystocktakes';
import PropTypes from 'prop-types';
import { getWarehouses } from '..//../actions/warehouses';
import { getEmployees } from '..//../actions/employees';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';


class InventoryStockTakeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: '',
            adjusted_by: null,
            warehouse: null,
            comments: '',
            adjustments: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onAdjustedBy = this.onAdjustedBy.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse: e.value})
    }

    onAdjustedBy (e){
        this.setState({adjusted_by: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        } = this.state;
        const inventorystocktake = {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        };
        this.props.addInventoryStockTake(inventorystocktake);
        this.setState({
            date: '',
            adjusted_by: '',
            warehouse: '',
            comments: '',
            adjustments: ''
        });
        this.props.history.push('/inventorystocktakes');
    };

    static propTypes = {
        addInventoryStockTake: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getWarehouses()
        this.props.getEmployees()
    }

    render() {
        const {
            date,
            adjusted_by,
            warehouse,
            comments,
            adjustments
        } = this.state;

        const {warehouses} = this.props;
        const {employees} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Inventory Stock Take</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
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
                        <label htmlFor="inputtext">DATE</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Adjustments</label>
                         <InputNumber
                            name="adjustments"
                            mode="decimal"
                            onChange={this.onChange}
                            value={adjustments}
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
                                name="comments"
                                onChange={this.onChange}
                                value={comments}
                            />
                            <label htmlFor="inputtext">Comments</label>
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
                        <span className="p-float-label">
                        <Dropdown
                            value={adjusted_by}
                            onChange={this.onAdjustedBy}
                            options={employees}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="id_number"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ADJUSTED BY</label>
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
    employees: state.employees.employees,
})

export default connect(mapStateToProps, {getWarehouses, getEmployees, addInventoryStockTake})(InventoryStockTakeForm);
