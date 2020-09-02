import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStockAdjustment } from '..//../actions/stockadjustments';
import PropTypes from 'prop-types';
import { getInventoryStockItems } from '..//../actions/inventorystockitems';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';


class StockAdjustmentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            warehouse_item: null,
            adjustment: '',
            note: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({warehouse_item: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            warehouse_item,
            adjustment,
            note
        } = this.state;
        const stockadjustment = {
            warehouse_item,
            adjustment,
            note
        };
        this.props.addStockAdjustment(stockadjustment);
        this.setState({
            warehouse_item: '',
            adjustment: '',
            note: ''
        });
        this.props.history.push('/stockadjustments');
    };

    static propTypes = {
        addStockAdjustment: PropTypes.func.isRequired,
        getInventoryStockItems: PropTypes.func.isRequired,

    }

    componentDidMount() {
        this.props.getInventoryStockItems()
    }

    render() {
        const {
            warehouse_item,
            adjustment,
            note
        } = this.state;

        const {inventorystockitems} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Stock Adjustment</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label>Adjustment</label>
                         <InputNumber
                            name="adjustment"
                            mode="decimal"
                            onChange={this.onChange}
                            value={adjustment}
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
                                name="note"
                                onChange={this.onChange}
                                value={note}
                            />
                            <label htmlFor="inputtext">Note</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={warehouse_item}
                            onChange={this.onTypeChange}
                            options={inventorystockitems}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT WAREHOUSE ITEM</label>
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

export default connect(mapStateToProps, {getInventoryStockItems, addStockAdjustment})(StockAdjustmentForm);
