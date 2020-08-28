import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProcessedProductStockTake } from '../../actions/processedproductstocktakes';
import { getWarehouses } from '../../actions/warehouses';
import { getInventoryControllers } from '../../actions/inventorycontrollers';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";


export class ProcessedProductStockTakeForm extends Component{
    constructor(props){
    super(props);
    this.state = {
        date: '',
        adjusted_by: null,
        warehouse: null,
        comments: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onAdjustedBy = this.onAdjustedBy.bind(this);
      this.onWarehouse = this.onWarehouse.bind(this);
    }

    onAdjustedBy (e){
      this.setState({adjusted_by: e.value})
    }

    onWarehouse (e){
      this.setState({warehouse: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        date,
        adjusted_by,
        warehouse,
        comments, 
      } = this.state;
      const processedproductstocktake = { 
        date,
        adjusted_by,
        warehouse,
        comments, 
      };
      this.props.addProcessedProductStockTake(processedproductstocktake);
      this.setState({
        date: '',
        adjusted_by: '',
        warehouse: '',
        comments: '',
      });
      this.props.history.push('/processedproductstocktakes');
    };

    static propTypes = {
        addProcessedProductStockTake: PropTypes.func.isRequired,
        getWarehouses: PropTypes.func.isRequired,
        getInventoryControllers: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getWarehouses()
      this.props.getInventoryControllers()
    }


    render() {

        const { 
          date,
          adjusted_by,
          warehouse,
          comments,
        } = this.state;

        const { warehouses } = this.props;
        const { inventorycontrollers } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Processed Product Stock Take</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Comments</label>
                    <InputTextarea
                      name="comments"
                      onChange={this.onChange}
                      value={comments}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                  <label>Date</label>
                      <Calendar
                        showIcon={true}
                        className="form-control"
                        name="date"
                        onChange={this.onChange}
                        value={date}
                        dateFormat="yy-mm-dd"
                      />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT ADJUSTED BY"
                      value={adjusted_by}
                      onChange={this.onAdjustedBy}
                      options={inventorycontrollers}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT WAREHOUSE"
                      value={warehouse}
                      onChange={this.onWarehouse}
                      options={warehouses}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="name" 
                      optionValue="id"
                    />
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
    inventorycontrollers: state.inventorycontrollers.inventorycontrollers
})

export default connect(mapStateToProps, { getWarehouses, getInventoryControllers, addProcessedProductStockTake })(ProcessedProductStockTakeForm);
