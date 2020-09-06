import React, { Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import { connect } from 'react-redux';
import { getAccounts} from '..//../actions/accounts';


class BillLines extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         debit_account: null,

    //     }
                 
    //     this.onAccount = this.onAccount.bind(this);

    // }

    

    componentDidMount() {
        this.props.getAccounts();
    }
    
    render(){
        const { accounts } = this.props;



        return (
           this.props.lines.map((val, idx) => {
            let debit_account = `debit_account-${idx}`, amount = `amount-${idx}`
            return (
                <tr key={val.index}>
                    <td>
                        <input
                            type="number"
                            name="amount"
                            data-id={idx}
                            id={amount}
                            className="form-control"
                        />
                    </td>
                    <td>
                        <Dropdown
                            value={debit_account}
                            data-id={idx}
                            id={debit_account}
                            onChange={this.props.onAccount}
                            options={accounts}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                    </td>

                    <td>
                        {
                        idx===0?<Button onClick={()=>this.props.add()} type="button" icon='pi pi-plus' className="p-button-warning" />
                        : <Button icon='pi pi-trash' className="p-button-danger" onClick={(() => this.props.delete(val))} />
                        }
                    </td>
                </tr>
            )
        }))
    }
}


const mapStateToProps = state =>({
    accounts: state.accounts.accounts
})

export default connect(mapStateToProps, {getAccounts} ) (BillLines);
