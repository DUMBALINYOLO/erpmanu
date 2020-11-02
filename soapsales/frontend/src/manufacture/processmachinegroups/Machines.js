import React, { Component } from "react"
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Button} from 'primereact/button';
import { connect } from 'react-redux';
import { getEquipments } from '..//../actions/equipments';


class Machines extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         debit_account: null,

    //     }
                 
    //     this.onAccount = this.onAccount.bind(this);

    // }

    

    componentDidMount() {
        this.props.getEquipments();
    }
    
    render(){
        const { equipments } = this.props;

        let EquipmentOptions = equipments.length > 0
            && equipments.map((item, i) => {
            return (
              <option key={i} value={item.id}>{item.name}</option>
            )
          }, this);

        return (
           this.props.machines.map((val, idx) => {
            let equipment = `equipment-${idx}`, date_commissioned = `date_commissioned-${idx}` 
            return (
                <tr key={val.index}>
                    <td>
                        <input
                          type="date"
                          name="date_commissioned"
                          data-id={idx}
                          format="yy-mm-dd"
                          id={date_commissioned}
                          className="form-control"
                        />
                    </td>

                    <td>
                        <select
                          name="equipment"
                          id={equipment}
                          data-id={idx}
                          className="form-control"
                        >
                           {EquipmentOptions}
                        </select>
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
    equipments: state.equipments.equipments
})

export default connect(mapStateToProps, {getEquipments} ) (Machines);













