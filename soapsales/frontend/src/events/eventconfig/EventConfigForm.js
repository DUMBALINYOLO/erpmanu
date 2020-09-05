import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEventConfig } from '..//../actions/eventconfig';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {InputNumber} from 'primereact/inputnumber';



class EventConfigForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            number_of_agenda_items: '',
            autogenerate_events_from_models: false,
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onCompleted = this.onCompleted.bind(this);
    }

    onCompleted() {
      this.setState({
        autogenerate_events_from_models: !this.state.checked
      });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    onSubmit = (e) => {
      e.preventDefault();
      const {
        number_of_agenda_items,
        autogenerate_events_from_models,
      } = this.state;

      const eventconfig = {
        number_of_agenda_items,
        autogenerate_events_from_models,
      };

      this.props.addEventConfig(eventconfig);
      this.setState({
          number_of_agenda_items: '',
          autogenerate_events_from_models:'',

        });
    };

    static propTypes = {
        addEventConfig: PropTypes.func.isRequired,

    }

    render() {
        const {
          number_of_agenda_items,
        } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Event Config</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                  <label>Number Of Agenda Items</label>
                  <InputNumber
                    className="form-control"
                    name="number_of_agenda_items"
                    onChange={this.onChange}
                    value={number_of_agenda_items}
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClassName="p-button-danger"
                    incrementButtonClassName="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    step={1}
                  />
                </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>AUTOGENERATED EVENTS FROM MODELS :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onCompleted}
                      checked={this.state.autogenerate_events_from_models}
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


export default connect(null, { addEventConfig })(EventConfigForm);
