import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { getProcessMachine } from '..//../actions/processmachines';





class ProcessMachineDetail extends Component {

	static propTypes = {
        getProcessMachine: PropTypes.func.isRequired,

    };

    componentDidMount(){
        this.props.getProcessMachine(this.props.match.params.id);
    }

	render() {
		const { processmachine } = this.props;

        return (
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
						<h1>Process Group Details</h1>
					</div>
				</div>
				<div className="row">
				<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					ID: <span className="text-uppercase">{ processmachine.id }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					NAME: <span className="text-uppercase">{ processmachine.name }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					MACHINE GROUP: <span className="text-uppercase">{ processmachine.machine_group }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					DATE COMMISSIONED: <span className="text-uppercase">{ processmachine.date_commissioned }</span>
					</h4>
					<p className="text-capitalize font-weight-bold mt-3 mb-0">
					DESCRIPTION :</p>
					<p className="text-muted lead">{ processmachine.description }</p>
	            </div>
	            </div>
            </div>
        );
    }
}


const mapStateToProps = state =>({
    processmachine: state.processmachines.processmachine
})

export default connect(mapStateToProps, {getProcessMachine} ) (ProcessMachineDetail);
