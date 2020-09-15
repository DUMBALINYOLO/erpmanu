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
import Machines from './Machines';


export class ProcessMachineGroupForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            machines: [{ index: Math.random(), equipment: '', date_commissioned: '' }],
        }
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);


    }

    handleChange = (e) => {
        if (["equipment", "date_commissioned"].includes(e.target.name)) {
            let machines = [...this.state.machines]
            machines[e.target.dataset.id][e.target.name] = e.target.value;

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            machines: [...prevState.machines, { index: Math.random(), equipment: '', date_commissioned: ''  }],
        }));
    }

    deleteRow = (index) => {
        this.setState({
            machines: this.state.machines.filter((s, sindex) => index !== sindex),
        });
    }

    clickOnDelete(record) {
        this.setState({
            machines: this.state.machines.filter(r => r !== record)
        });
    }


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { name, description, machines } = this.state;
        const processmachinegroup = { name, description, machines };
        this.props.addProcessMachineGroup(processmachinegroup);
        this.setState({
            machines: [],
            name: '',
            description: '',
        });
        this.props.history.push('/processmachinegroups');
    };

    static propTypes = {
        addProcessMachineGroup: PropTypes.func.isRequired,
    }


    render() {
        const { name, description, machines} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Manage Process Machine Group</h2>
                <form onSubmit={this.onSubmit} onChange={this.handleChange}>
                    <div className="p-fluid p-formgrid p-grid">
                        
                        <div className="p-field p-col-12 p-md-12">
                            <span className="p-float-label">
                                <InputTextarea
                                    name="description"
                                    value={description}
                                />
                                <label htmlFor="inputtext">Description</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <span className="p-float-label">
                                <InputText
                                    name="name"
                                    value={name}
                                />
                                <label htmlFor="inputtext">Name</label>
                            </span>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <Button label="Submit" className="p-button-success p-button-rounded" />
                        </div>
                        <table className="table">
                          <thead>
                              <tr>
                                <th>DATE COMMISIONED</th>
                                <th>EQUIPMENT</th>

                              </tr>
                            </thead>
                            <tbody>
                              <Machines add={this.addNewRow} delete={this.clickOnDelete.bind(this)} machines={machines} />
                            </tbody>
                            <tfoot>
                                <tr><td colSpan="4">
                                    <Button onClick={this.addNewRow} type="button" icon='pi pi-plus' className="p-button-warning"/>
                                </td></tr>
                            </tfoot>
                        </table>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addProcessMachineGroup })(ProcessMachineGroupForm);
