import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProcessGroup } from '../../actions/processGroups';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';


export class ProcessGroupForm extends Component{
    state = {
        name: '',
        description: '',
    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
      e.preventDefault();
      const { name, description } = this.state;
      const processGroups = { name, description };
      this.props.addProcessGroup(processGroups);
      this.setState({
        name: '',
        description: '',
      });
      this.props.history.push('/processmachinegroups');
    };

    static propTypes = {
        addProcessGroup: PropTypes.func.isRequired,
    }


    render() {
        const { name, description} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Add Process Group</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                  <div className="p-field p-col-12 p-md-12">
                  <label>Name</label>
                    <InputText
                      className="form-control"
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12">
                    <label>Description</label>
                    <InputTextarea
                      className="form-control"
                      type="text"
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




export default connect(null, { addProcessGroup })(ProcessGroupForm);
