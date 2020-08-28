import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {ProgressSpinner} from 'primereact/progressspinner';
import { getProcessProduct } from '..//../actions/processproducts';





class ProcessproductDetail extends Component {

	static propTypes = {
        getProcessProduct: PropTypes.func.isRequired,

    };

    componentDidMount(){
        this.props.getProcessProduct(this.props.match.params.id);
    }

	render() {
		const { processproduct } = this.props;

        return (
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
						<h1>Process Product Details</h1>
					</div>
				</div>
				<div className="row">
				<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					ID: <span className="text-uppercase">{ processproduct.id }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					NAME: <span className="text-uppercase">{ processproduct.name }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					TYPE: <span className="text-uppercase">{ processproduct.type }</span>
					</h4>
					<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					UNIT: <span className="text-uppercase">{ processproduct.unit }</span>
					</h4>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					FINISHED GOODS: <span className="text-uppercase">{ processproduct.finished_goods }</span>
					</h4>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					INVENTORY PRODUCT: <span className="text-uppercase">{ processproduct.inventory_product }</span>
					</h4>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
					PRODUCT LIST: <span className="text-uppercase">{ processproduct.product_list }</span>
					</h4>
					<p className="text-capitalize font-weight-bold mt-3 mb-0">
					DESCRIPTION :</p>
					<p className="text-muted lead">{processproduct.description }</p>
	            </div>
	            </div>
            </div>
        );
    }
}



const mapStateToProps = state =>({
    processproduct: state.processproducts.processproduct
})

export default connect(mapStateToProps, {getProcessProduct} ) (ProcessproductDetail);
