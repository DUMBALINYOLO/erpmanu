import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { getBillpayment } from '..//../actions/billpayments';


class BillPaymentDetail extends Component {

	static propTypes = {
        getBillpayment: PropTypes.func.isRequired,

    };

    componentDidMount(){
        this.props.getBillpayment(this.props.match.params.id);
    }

	render() {
		const { billpayment } = this.props;

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
					ID: <span className="text-uppercase">{ billpayment.id }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					ACCOUNT: <span className="text-uppercase">{ billpayment.account }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					Bill: <span className="text-uppercase">{billpayment.bill}</span>
					</h4>
					<h4 className="text-blue">
					<strong>
					AMOUNT: <span>$</span>
					{ billpayment.amount }
					</strong>
					</h4>
					<p className="text-capitalize font-weight-bold mt-3 mb-0">
					Memo :</p>
					<p className="text-muted lead">{ billpayment.memo }</p>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					Date: <span className="text-uppercase">{billpayment.date}</span>
					</h4>
	            </div>
	            </div>
            </div>
        );
    }
}


const mapStateToProps = state =>({
    billpayment: state.billpayments.billpayment
})

export default connect(mapStateToProps, {getBillpayment} ) (BillPaymentDetail);
