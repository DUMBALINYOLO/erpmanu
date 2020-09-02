import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAccountingPost } from '..//../actions/accountingposts';
import PropTypes from 'prop-types';
import { getDebits } from '..//../actions/debits';
import { getCredits } from '..//../actions/credits';
import { getLedgers } from '..//../actions/ledgers';
import { getJournals } from '..//../actions/journals';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';


class AccountingPostForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            entry: null,
			debit: null,
			credit: null,
			ledger: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEntry = this.onEntry.bind(this);
        this.onDebit = this.onDebit.bind(this);
        this.onCredit = this.onCredit.bind(this);
        this.onLedger = this.onLedger.bind(this);
    }

    onEntry (e){
        this.setState({entry: e.value})
    }

    onDebit (e){
        this.setState({debit: e.value})
    }

    onCredit (e){
        this.setState({credit: e.value})
    }

    onLedger (e){
        this.setState({ledger: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            entry,
			debit,
			credit,
			ledger,
        } = this.state;
        const accountingpost = {
            entry,
			debit,
			credit,
			ledger,
        };
        this.props.addAccountingPost(accountingpost);
        this.setState({
            entry: '',
			debit: '',
			credit: '',
			ledger: '',
        });
        this.props.history.push('/accountingposts');
    };

    static propTypes = {
        addAccountingPost: PropTypes.func.isRequired,
        getJournals: PropTypes.func.isRequired,
        getDebits: PropTypes.func.isRequired,
        getCredits: PropTypes.func.isRequired,
        getLedgers: PropTypes.func.isRequired

    }

    componentDidMount() {
        this.props.getJournals()
        this.props.getDebits()
        this.props.getCredits()
        this.props.getLedgers()
    }

    render() {
        const {
            entry,
			debit,
			credit,
			ledger,
        } = this.state;

        const {journals} = this.props;
        const {debits} = this.props;
        const {credits} = this.props;
        const {ledgers} = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Account Post</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={entry}
                            onChange={this.onEntry}
                            options={journals}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT ENTRY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={debit}
                            onChange={this.onDebit}
                            options={debits}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT DEBITS</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={credit}
                            onChange={this.onCredit}
                            options={credits}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT CREDIT</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={ledger}
                            onChange={this.onLedger}
                            options={ledgers}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT LEDGER</label>
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
    journals: state.journals.journals,
    debits: state.debits.debits,
    ledgers: state.ledgers.ledgers,
    credits: state.credits.credits
})

export default connect(mapStateToProps, {getJournals, getDebits, getCredits, getLedgers, addAccountingPost})(AccountingPostForm);
