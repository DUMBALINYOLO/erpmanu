import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addManufacturingPersonel } from '..//../actions/manufacturingpersonels';
import { getEmployees } from '..//../actions/employees';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';

export class ManufacturingPersonelForm extends Component{
    constructor(props){
        super(props);
        this.state = {
        employee: null,
        is_manager: false,
        can_authorize_equipment_requisitions: false,
        can_authorize_consumables_requisitions: false,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleIsManger = this.handleIsManger.bind(this);
      this.handleEquipment = this.handleEquipment.bind(this);
      this.handleConsumables = this.handleConsumables.bind(this);
      this.onEmployee = this.onEmployee.bind(this);
    }

    handleIsManger() {
      this.setState({
        is_manager: !this.state.checked
      });
    }

    handleEquipment(event) {
      this.setState({
        can_authorize_equipment_requisitions: !this.state.checked
      });
    }

    handleConsumables(event) {
      this.setState({
        can_authorize_consumables_requisitions: !this.state.checked
      });
    }

    onEmployee (e){
      this.setState({employee: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        employee,
        is_manager,
        can_authorize_equipment_requisitions,
        can_authorize_consumables_requisitions, 
      } = this.state;

      const manufacturingpersonel = { 
        employee,
        is_manager,
        can_authorize_equipment_requisitions,
        can_authorize_consumables_requisitions,
      };

      this.props.addManufacturingPersonel(manufacturingpersonel);
      this.setState({
        employee: '',
        is_manager: true,
        can_authorize_equipment_requisitions: true,
        can_authorize_consumables_requisitions: true,
      });
      this.props.history.push('/manufacturingpersonels');


    };

    static propTypes = {
        addManufacturingPersonel: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired
    }

    componentDidMount() {
      this.props.getEmployees();

    }


    render() {
        const {  
          employee,
          is_manager,
          can_authorize_equipment_requisitions,
          can_authorize_consumables_requisitions,
        } = this.state;
        const { employees } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Manufacturing Personel</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <Dropdown 
                      placeholder ="SELECT EMPLOYEE"
                      value={employee}
                      onChange={this.onEmployee}
                      options={employees}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="employee_number" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>IS MANAGER :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleIsManger}
                      checked={this.state.is_manager}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN AUTHORIZE EQUIPMENT REQUISITIONS :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleEquipment}
                      checked={this.state.can_authorize_equipment_requisitions}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>CAN AUTHORIZE CONSUMABLES REQUISITIONS :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.handleConsumables}
                      checked={this.state.can_authorize_consumables_requisitions}
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
    employees: state.employees.employees
})

export default connect(mapStateToProps, { getEmployees, addManufacturingPersonel })(ManufacturingPersonelForm);
