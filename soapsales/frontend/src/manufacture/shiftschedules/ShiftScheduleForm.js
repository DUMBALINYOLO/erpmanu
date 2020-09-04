import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addShiftSchedule } from '..//../actions/shiftschedules';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export class ShiftScheduleForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        name: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const {
        name
      } = this.state;
      const shiftschedule = {
        name
      };
      this.props.addShiftSchedule(shiftschedule);
      this.setState({
        name: ''
      });
      this.props.history.push('/shiftschedules');
    };

    static propTypes = {
        addShiftSchedule: PropTypes.func.isRequired    }

    render() {
        const {
          name
        } = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Shift Schedule</h2>
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
                  <div className="p-field p-col-12 p-md-6">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                  </div>
                </div>
             </form>
         </div>
        );
    }
}

export default connect(null, { addShiftSchedule })(ShiftScheduleForm);
