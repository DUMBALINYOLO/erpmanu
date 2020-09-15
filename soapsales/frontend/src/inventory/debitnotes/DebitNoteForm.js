import React, { Component } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { getInventoryOrders } from '..//../actions/inventoryorders';
import { addDebitNote } from '..//../actions/debitnotes';
import {Calendar} from "primereact/calendar";
import PropTypes from 'prop-types';
import DebitNoteLines from './DebitNoteLines';

class DebitNoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: '',
            comments: '',
            order: null,
            lines: [{ index: Math.random(), item: "", quantity: '' }],

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    onTypeChange (e){
        this.setState({order: e.value})
    }

    handleChange = (e) => {
        if (["item", "quantity"].includes(e.target.name)) {
            let lines = [...this.state.lines]
            lines[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            lines: [...prevState.lines, { index: Math.random(), item: "", quantity: '' }],
        }));
    }

    deleteRow = (index) => {
        this.setState({
            lines: this.state.lines.filter((s, sindex) => index !== sindex),
        });
    }

    clickOnDelete(record) {
        this.setState({
            lines: this.state.lines.filter(r => r !== record)
        });
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            date,
            comments,
            order,
            lines
        } = this.state;

        const note = {
            date,
            comments,
            order,
            lines,
        };

        this.props.addDebitNote(note);
        this.setState({
            lines: [],
            order: '',
            date: '',
            comments: '',
        });
    };


    static propTypes = {
        addDebitNote: PropTypes.func.isRequired,
        getInventoryOrders: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getInventoryOrders();
    }

    render = () => {
        const {
            date,
            order,
            comments,
        } = this.state;

        let { lines } = this.state

        const { inventoryorders } = this.props;


        return (
          <div className="card card-body mt-4 mb-4">
            <h2>Manage Debit Note</h2>
            <form onSubmit={this.onSubmit} onChange={this.handleChange}>
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                        <InputTextarea
                            name="comments"
                            onChange={this.onChange}
                            value={comments}
                        />
                        <label htmlFor="inputtext">COMMENTS</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="date"
                            onChange={this.onChange}
                            value={date}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Date</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <span className="p-float-label">
                        <Dropdown
                            value={order}
                            onChange={this.onTypeChange}
                            options={inventoryorders}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="tracking_number"
                            optionValue="id"
                        />
                        <label htmlFor="inputtext">SELECT ACCOUNT TYPE</label>
                    </span>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <Button label="Submit" className="p-button-success p-button-rounded" />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>QUANTITY</th>
                            <th>ORDER ITEMS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DebitNoteLines add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lines={lines} />
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

const mapStateToProps = state =>({
    inventoryorders: state.inventoryorders.inventoryorders
})

export default connect(mapStateToProps, {getInventoryOrders, addDebitNote})(DebitNoteForm);
