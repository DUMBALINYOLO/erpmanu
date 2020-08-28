import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Button} from 'primereact/button';
import { addManufacturingTeam } from '../../actions/manufacturingteams';
import { getManufacturingPersonels } from '../../actions/manufacturingpersonels';
import PropTypes from 'prop-types';
import {Dropdown} from 'primereact/dropdown';

export class ManufacturingTeamForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
        description: '',
        manager: null,
        members: null,
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onManager = this.onManager.bind(this);
      this.onMembers = this.onMembers.bind(this);
    }

    onManager (e){
      this.setState({manager: e.value})
    }

    onMembers (e){
      this.setState({members: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { 
        name,
        description,
        manager,
        members, 
      } = this.state;
      const manufacturingteam = { 
        name,
        description,
        manager,
        members, 
      };
      this.props.addManufacturingTeam(manufacturingteam);
      this.setState({
          name: '',
          description: '',
          manager: '',
          members: '',
        });
      this.props.history.push('/manufacturingteams');
    };

    static propTypes = {
        addManufacturingTeam: PropTypes.func.isRequired,
        getManufacturingPersonels: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getManufacturingPersonels()
    }

    render() {

        const { 
          name,
          description,
          manager,
          members, 
        } = this.state;
        const { manufacturingpersonels } = this.props

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Manufacturing Team </h2>
              <form onSubmit={this.onSubmit}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                  <label>Name</label>
                  <InputText
                    name="name"
                    onChange={this.onChange}
                    value={name}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12">
                  <label>Name</label>
                  <InputTextarea
                    name="description"
                    onChange={this.onChange}
                    value={description}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <Dropdown 
                    placeholder ="SELECT MANAGER"
                    value={manager}
                    onChange={this.onManager}
                    options={manufacturingpersonels}
                    filter={true} 
                    filterBy="id,name" 
                    showClear={true}
                    optionLabel="name" 
                    optionValue="id"
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT MEMBERS"
                      value={members}
                      onChange={this.onMembers}
                      options={manufacturingpersonels}
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
    manufacturingpersonels: state.manufacturingpersonels.manufacturingpersonels,
})

export default connect(mapStateToProps, { getManufacturingPersonels, addManufacturingTeam })(ManufacturingTeamForm);
