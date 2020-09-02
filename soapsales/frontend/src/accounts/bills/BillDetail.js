import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { getBill } from '..//../actions/bills';





class BillDetail extends Component {

	static propTypes = {
        getBill: PropTypes.func.isRequired,

    };

    componentDidMount(){
        this.props.getBill(this.props.match.params.id);
    }

	render() {
		const { bill } = this.props;

        return (
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
						<h1>Bill Payment Details</h1>
					</div>
				</div>
				<div className="row">
				<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					ID: <span className="text-uppercase">{ bill.id }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					VENDOR: <span className="text-uppercase">{ bill.vendor }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					REFERENCE: <span className="text-uppercase">{ bill.reference }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					ENTRY: <span className="text-uppercase">{ bill.entry }</span>
					</h4>
					<p className="text-capitalize font-weight-bold mt-3 mb-0">
					Memo :</p>
					<p className="text-muted lead">{ bill.memo }</p>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					Date: <span className="text-uppercase">{bill.date}</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					Due: <span className="text-uppercase">{bill.due}</span>
					</h4>
	            </div>
	            </div>
            </div>
        );
    }
}


const mapStateToProps = state =>({
    bill: state.bills.bill
})

export default connect(mapStateToProps, {getBill} ) (BillDetail);
