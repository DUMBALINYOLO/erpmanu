import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { getWasteReport } from '..//../actions/wasteReports';





class WasteReportDetail extends Component {

	static propTypes = {
        getWasteReport: PropTypes.func.isRequired,

    };

    componentDidMount(){
        this.props.getWasteReport(this.props.match.params.id);
    }

	render() {
		const { wastereport } = this.props;

        return (
			<div className="card py-5">
				<div className="row">
					<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
						<h1>Waste Report Details</h1>
					</div>
				</div>
				<table className="table">
					<thead>
						<th>ID</th>
						<th>PRODUCTS</th>
						<th>UNIT</th>
						<th>QUANTITY</th>
						<th>RECORDED BY</th>
						<th />
					</thead>
					<tbody>
						<tr>
							<td>{ wastereport.id }</td>
							<td>{ wastereport.product }</td>
							<td>{ wastereport.unit }</td>
							<td>{ wastereport.quantity }</td>
							<td>{ wastereport.recorded_by }</td>
						</tr>
					</tbody>
				</table>
				<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
					<p className="text-capitalize font-weight-bold mt-3 mb-0">
					COMMENTS :</p>
					<p className="text-muted lead">{ wastereport.comments }</p>
				</div>
			</div>
        );
    }
}


const mapStateToProps = state =>({
    wastereport: state.wastereports.wastereport
})

export default connect(mapStateToProps, {getWasteReport} ) (WasteReportDetail);
