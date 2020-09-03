import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProcessMachineGroup } from '../../actions/processmachinegroups';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';


export class ProcessMachineGroupForm extends Component{
    state = {
        name: '',
        description: '',
    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        const processmachinegroup = { name, description };
        this.props.addProcessMachineGroup(processmachinegroup);
        this.setState({
            name: '',
            description: '',
        });
        this.props.history.push('/processmachinegroups');
    };

    static propTypes = {
        addProcessMachineGroup: PropTypes.func.isRequired,
    }


    render() {
        const { name, description} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage Process Machine Group</h2>
                <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputText
                                name="name"
                                onChange={this.onChange}
                                value={name}
                            />
                            <label htmlFor="inputtext">Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputTextarea
                                name="description"
                                onChange={this.onChange}
                                value={description}
                            />
                            <label htmlFor="inputtext">Description</label>
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

export default connect(null, { addProcessMachineGroup })(ProcessMachineGroupForm);
