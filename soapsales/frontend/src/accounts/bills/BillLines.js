import React, { useEffect } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getAccounts} from '..//../actions/accounts';


const BillLines = (props) => {
    useEffect(() => {
        if(!props.fetched) {
            props.getAccounts();
        }
        console.log('mount it!');
    }, [props]);

    const { accounts } = props;

    let debitAccounts = accounts.length > 0
        && accounts.map((item, i) => {
    return (
        <option key={i} value={item.id}>{item.name}</option>
        )
    }, this);

    return (
        props.lines.map((val, idx) => {
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
                    <select
                        name="debit_account"
                        id={debit_account}
                        data-id={idx}
                        className="form-control"
                        >
                        {debitAccounts}
                    </select>
                </td>
                <td>
                    {
                    idx===0?<Button onClick={()=>props.add()} type="button" icon='pi pi-plus' className="p-button-warning" />
                    : <Button icon='pi pi-trash' className="p-button-danger" onClick={(() => props.delete(val))} />
                    }
                </td>
            </tr>
        )
    }))
}


const mapStateToProps = state =>({
    accounts: state.accounts.accounts
})

export default connect(mapStateToProps, {getAccounts} ) (BillLines);
