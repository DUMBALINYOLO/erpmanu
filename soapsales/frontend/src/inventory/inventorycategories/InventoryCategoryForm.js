import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInventoryCategory, getInventoryCategories } from '..//../actions/inventorycategories';
import PropTypes from 'prop-types';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';


class InventoryCategoryForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            parent: null,
            description: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onParent = this.onParent.bind(this);
    }

    onParent (e){
        this.setState({parent: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            parent,
            description
        } = this.state;
        const inventorycategory = {
            name,
            parent,
            description
        };
        this.props.addInventoryCategory(inventorycategory);
        this.setState({
            name: '',
            parent: '',
            description: ''
        });
        this.props.history.push('/inventorycategories');
    };

    static propTypes = {
        addInventoryCategory: PropTypes.func.isRequired,
        getInventoryCategories: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getInventoryCategories()
    }

    render() {
        const {
            name,
            parent,
            description
        } = this.state;

        const {inventorycategories} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Inventory Category</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
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
                        <span className="p-float-label">
                        <Dropdown
                            value={parent}
                            onChange={this.onParent}
                            options={inventorycategories}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT PARENT</label>
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


const mapStateToProps = state =>({
    inventorycategories: state.inventorycategories.inventorycategories,
})

export default connect(mapStateToProps, {getInventoryCategories, addInventoryCategory})(InventoryCategoryForm);
