import React, { Component } from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import { getInvoices } from '..//../actions/invoices';
import { addCreditNote } from '..//../actions/creditnotes';
import {Calendar} from "primereact/calendar";
import PropTypes from 'prop-types';
import CreditNoteLines from './CreditNoteLine';

class CreditNoteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: '',
      invoice: null,
      comments: '',
      lines: [{ index: Math.random(), line: "", quantity: '' }],

    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewRow = this.addNewRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  onTypeChange (e){
      this.setState({invoice: e.value})
    }

  handleChange = (e) => {
    if (["line", "quantity"].includes(e.target.name)) {
        let lines = [...this.state.lines]
        lines[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
        this.setState({ [e.target.name]: e.target.value })
    }
  }

  addNewRow = (e) => {
      this.setState((prevState) => ({
          lines: [...prevState.lines, { index: Math.random(), line: "", quantity: '' }],
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
        invoice,
        comments,
        lines

      } = this.state;

      const creditnote = {
        date,
        invoice,
        comments,
        lines

      };

      this.props.addCreditNote(creditnote);
      this.setState({
          lines: [],
          invoice: '',
          date: '',
          comments: '',

        });
    };

    static propTypes = {
        addCreditNote: PropTypes.func.isRequired,
        getInvoices: PropTypes.func.isRequired,
    }

  componentDidMount() {
    this.props.getInvoices();
  }

  render = () => {
    const {
        invoice,
        date,
        comments,
    } = this.state;

    let { lines } = this.state

    const { invoices } = this.props;


    let amainvoices = invoices.length > 0
      && invoices.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.invoice_number}</option>
      )
    }, this);


    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Credit Note</h2>
        <form onSubmit={this.onSubmit} onChange={this.handleChange}>
          <div className="p-fluid p-formgrid p-grid">
             <div className="p-field p-col-12 p-md-12">
              <label>Date</label>
              <Calendar
                showIcon={true}
                className="form-control"
                name="date"
                onChange={this.onChange}
                value={date}
                dateFormat="yy-mm-dd"
              />
            </div>
            <div className="p-field p-col-12 p-md-12">
              <label>COMMENTS</label>
              <InputTextarea
                rows="3"
                className="form-control"
                type="text"
                name="comments"
                onChange={this.onChange}
                value={comments}
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Dropdown
                placeholder ="SELECT INVOICE"
                value={invoice}
                onChange={this.onTypeChange}
                options={invoices}
                filter={true}
                filterBy="id,name"
                showClear={true}
                optionLabel="name"
                optionValue="id"
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <Button label="Submit" className="p-button-success p-button-rounded" />
            </div>
            <table className="table">
              <thead>
                  <tr>
                    <th>QUANTITY</th>
                    <th>LINE</th>
                  </tr>
                </thead>
                <tbody>
                  <CreditNoteLines add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lines={lines} />
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
    invoices: state.invoices.invoices
})

export default connect(mapStateToProps, {getInvoices, addCreditNote})(CreditNoteForm);
