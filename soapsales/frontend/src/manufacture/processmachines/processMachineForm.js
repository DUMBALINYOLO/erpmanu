import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { addProcessMachine } from '../../actions/processmachines';
import PropTypes from 'prop-types';
import {Calendar} from "primereact/calendar";


export class ProcessMachineForm extends Component{
  constructor(props){
    super(props);
    this.state = {
        name: '',
        description: '',
        date_commissioned: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { name, description, date_commissioned } = this.state;
      const processMachines = { name, description,  date_commissioned};
      this.props.addProcessMachine(processMachines);
      this.setState({
        name: '',
        description: '',
        date_commissioned: '',
      });
      this.props.history.push('/processmachines');
    };


    static propTypes = {
        addProcessMachine: PropTypes.func.isRequired,
    }

    render() {
        const { name, description,  date_commissioned } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Process Machine</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-6">
                    <label>Name</label>
                    <InputText
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <label>Date Commissioned</label>
                    <Calendar
                      showIcon={true}
                      className="form-control"
                      name="date_commissioned"
                      onChange={this.onChange}
                      value={date_commissioned}
                      dateFormat="yy-mm-dd"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Description</label>
                    <InputTextarea
                      rows={3}
                      name="description"
                      onChange={this.onChange}
                      value={description}
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

export default connect(null, { addProcessMachine })(ProcessMachineForm);
