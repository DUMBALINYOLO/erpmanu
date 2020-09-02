import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '..//../actions/events';
import PropTypes from 'prop-types';
import { getEventReminderChoices } from '..//../actions/choices';
import { getEventTimeChoices } from '..//../actions/choices';
import { getEventPriorityChoices } from '..//../actions/choices';
import { getEventRepeatChoices } from '..//../actions/choices';
import { getEventIconChoices } from '..//../actions/choices';
import { getEmployees} from '..//../actions/employees';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {Calendar} from "primereact/calendar";


class EventForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            owner: null,
            date: '',
            start_time: null,
            completion_time: '',
            completed: false,
            repeat_active: false,
            end_time: null,
            priority: null,
            description: '',
            repeat: null,
            label: '',
            icon: null,
            reminder: null
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onOwner = this.onOwner.bind(this);
      this.onStartTime = this.onStartTime.bind(this);
      this.onEndTime = this.onEndTime.bind(this);
      this.onPriority = this.onPriority.bind(this);
      this.onRepeat = this.onRepeat.bind(this);
      this.onIcon = this.onIcon.bind(this);
      this.onReminder = this.onReminder.bind(this);
      this.onCompleted = this.onCompleted.bind(this);
      this.onRepeatActive = this.onRepeatActive.bind(this)
    }

    onCompleted() {
      this.setState({
        completed: !this.state.checked
      });
    }

    onRepeatActive() {
      this.setState({
        repeat_active: !this.state.checked
      });
    }

    onOwner (e){
      this.setState({owner: e.value})
    } 
    
    onStartTime (e){
      this.setState({start_time: e.value})
    }

    onEndTime (e){
      this.setState({end_time: e.value})
    }

    onPriority (e){
      this.setState({priority: e.value})
    }

    onRepeat (e){
      this.setState({repeat: e.value})
    }

    onIcon (e){
      this.setState({icon: e.value})
    }

    onReminder (e){
      this.setState({reminder: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    onSubmit = (e) => {
      e.preventDefault();
      const {
        owner,
        date,
        start_time,
        completion_time,
        completed,
        repeat_active,
        end_time,
        priority,
        description,
        repeat,
        label,
        icon,
        reminder
      } = this.state;

      const event = {
        owner,
        date,
        start_time,
        completion_time,
        completed,
        repeat_active,
        end_time,
        priority,
        description,
        repeat,
        label,
        icon,
        reminder
      };

      this.props.addEvent(event);
      this.setState({
          owner: '',
          date: '',
          start_time: '',
          completion_time: '',
          completed: true,
          repeat_active: true,
          end_time: '',
          priority: '',
          description: '',
          repeat: '',
          label: '',
          icon: '',
          reminder: ''

        });
      this.props.history.push('/events');
    };

    static propTypes = {
        addEvent: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getEventReminderChoices: PropTypes.func.isRequired,
        getEventTimeChoices: PropTypes.func.isRequired,
        getEventPriorityChoices: PropTypes.func.isRequired, 
        getEventRepeatChoices: PropTypes.func.isRequired, 
        getEventIconChoices: PropTypes.func.isRequired, 

    }

    componentDidMount() {
      this.props.getEmployees()
      this.props.getEventReminderChoices()
      this.props.getEventTimeChoices()
      this.props.getEventPriorityChoices()
      this.props.getEventRepeatChoices()
      this.props.getEventIconChoices()
    }

    render() {
        const {
          owner,
          date,
          start_time,
          completion_time,
          completed,
          repeat_active,
          end_time,
          priority,
          description,
          repeat,
          label,
          icon,
          reminder
        } = this.state;
        const { inputValue } = this.state;
        
        const {employees} = this.props;
        const {eventreminderchoices} = this.props;
        const {eventtimechoices} = this.props;
        const {eventprioritychoices} = this.props;
        const {eventrepeatchoices} = this.props;
        const {eventiconchoices} = this.props;



        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add An Event</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                    <label>Label</label>
                    <InputText
                      name="label"
                      onChange={this.onChange}
                      value={label}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Description</label>
                    <InputTextarea
                      name="description"
                      onChange={this.onChange}
                      value={description}
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
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>COMPLETED :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onCompleted}
                      checked={this.state.completed}
                    />                        
                  </div>
                  <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                    <label>REPEAT ACTIVE :</label>
                    <Checkbox
                      inputId="working"
                      onChange={this.onRepeatActive}
                      checked={this.state.repeat_active}
                    /> 
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT OWNER"
                      value={owner}
                      onChange={this.onOwner}
                      options={employees}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="employee_number" 
                      optionValue="id"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT REMINDER"
                      value={reminder}
                      onChange={this.onReminder}
                      options={eventreminderchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT START TIME"
                      value={start_time}
                      onChange={this.onStartTime}
                      options={eventtimechoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT END TIME"
                      value={end_time}
                      onChange={this.onEndTime}
                      options={eventtimechoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT PRIORITY"
                      value={priority}
                      onChange={this.onPriority}
                      options={eventprioritychoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT REPEAT"
                      value={repeat}
                      onChange={this.onRepeat}
                      options={eventrepeatchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-6">
                    <Dropdown 
                      placeholder ="SELECT ICON"
                      value={icon}
                      onChange={this.onIcon}
                      options={eventiconchoices}
                      filter={true} 
                      filterBy="id,name" 
                      showClear={true}
                      optionLabel="value" 
                      optionValue="key"
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
    employees: state.employees.employees,
    eventreminderchoices: state.eventreminderchoices.eventreminderchoices,
    eventtimechoices: state.eventtimechoices.eventtimechoices,
    eventprioritychoices: state.eventprioritychoices.eventprioritychoices,
    eventrepeatchoices: state.eventrepeatchoices.eventrepeatchoices,
    eventiconchoices: state.eventiconchoices.eventiconchoices
})

export default connect(mapStateToProps, {getEmployees, getEventIconChoices, getEventRepeatChoices, getEventPriorityChoices, getEventTimeChoices, getEventReminderChoices, addEvent})(EventForm);
