import React, { Component } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { getActiveSuppliers} from '..//../actions/activesuppliers';
import { addBill} from '..//../actions/bills';
import {Calendar} from "primereact/calendar";
import PropTypes from 'prop-types';
import BillLines from './BillLines';



class BillForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            vendor: null,
            date: '',
            reference: '',
            due: '',
            memo: '',
            formData: {},
            lines: [{ index: Math.random(), debit_account: null, amount: '' }],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.onVendor = this.onVendor.bind(this);
    }

    onVendor (e){
        this.setState({vendor: e.value})
    }

    onAccount (e){
        this.setState({debit_account: e.value})
    }

    handleChange = (e) => {
        if (["debit_account", "amount"].includes(e.target.name)) {
            let lines = [...this.state.lines]
            lines[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            lines: [...prevState.lines, { index: Math.random(), debit_account: "", amount: '' }],
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
            vendor,
            date,
            reference,
            due,
            memo,
            lines

        } = this.state;

        const bill = {
            vendor,
            date,
            reference,
            due,
            memo,
            lines,
        };

        this.props.addBill(bill);
        console.log(bill)
        this.setState({
            lines: [],
            vendor: '',
            date: '',
            reference: '',
            due: '',
            memo: '',
        });
        this.props.history.push('/bills')
    };

    static propTypes = {
        addBill: PropTypes.func.isRequired,
        getActiveSuppliers: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getActiveSuppliers();
    }

    render = () => {
        const {
            date,
            vendor,
            reference,
            due,
            memo
        } = this.state;

        let { lines } = this.state

        const { activesuppliers } = this.props;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Manage Bill</h2>
        <form onSubmit={this.onSubmit} onChange={this.handleChange}>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
                <span className="p-float-label">
                    <InputText
                        name="reference"
                        onChange={this.onChange}
                        value={reference}
                    />
                    <label htmlFor="inputtext">Reference</label>
                </span>
            </div>
            <div className="p-field p-col-12 p-md-6">
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
                <Calendar
                    showIcon={true}
                    className="form-control"
                    name="due"
                    onChange={this.onChange}
                    value={due}
                    dateFormat="yy-mm-dd"
                />
                <label htmlFor="inputtext">Due</label>
                </span>
            </div>
            <div className="p-field p-col-12 p-md-12">
                <span className="p-float-label">
                    <InputTextarea
                        name="memo"
                        onChange={this.onChange}
                        value={memo}
                    />
                    <label htmlFor="inputtext">Memo</label>
              </span>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <span className="p-float-label">
                <Dropdown
                    value={vendor}
                    onChange={this.onVendor}
                    options={activesuppliers}
                    filter={true}
                    filterBy="id,name"
                    showClear={true}
                    optionLabel="name"
                    optionValue="id"
                />
                <label htmlFor="dropdown">SELECT VENDOR</label>
                </span>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <Button label="Submit" className="p-button-success p-button-rounded" />
            </div>
            <table className="table">
              <thead>
                  <tr>
                    <th>AMOUNT</th>
                    <th>DEBIT ACCOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <BillLines add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lines={lines} />
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
    activesuppliers: state.activesuppliers.activesuppliers
})

export default connect(mapStateToProps, {getActiveSuppliers, addBill})(BillForm);
