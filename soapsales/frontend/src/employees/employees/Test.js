import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {RadioButton} from 'primereact/radiobutton';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';

export class FormLayoutDemo extends Component {

    constructor() {
        super();
        this.state = {
            cities1: [],
            cities2: [],
            selectedState: null
        };

        this.states = [
            {name: 'Arizona', code: 'Arizona'},
            {name: 'California', value: 'California'},
            {name: 'Florida', code: 'Florida'},
            {name: 'Ohio', code: 'Ohio'},
            {name: 'Washington', code: 'Washington'}
        ];
        this.onCityChange1 = this.onCityChange1.bind(this);
        this.onCityChange2 = this.onCityChange2.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
    }

    onCityChange1(e) {
        let selectedCities = [...this.state.cities1];

        if(e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        this.setState({cities1: selectedCities});
    }

    onCityChange2(e) {
        let selectedCities = [...this.state.cities2];

        if(e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        this.setState({cities2: selectedCities});
    }

    onStateChange(e) {
        this.setState({selectedState: e.value});
    }

    render() {
        return (
            <div>
                <h3>Advanced</h3>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="firstname6">Firstname</label>
                        <InputText id="firstname6" type="text" />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="lastname6">Lastname</label>
                        <InputText id="lastname6" type="text" />
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea id="address" type="text" rows="4" />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="city">City</label>
                        <InputText id="city" type="text" />
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <label htmlFor="state">State</label>
                        <Dropdown inputId="state" value={this.state.selectedState} options={this.state.states} onChange={this.onStateChange} placeholder="Select" optionLabel="name"/>
                    </div>
                    <div className="p-field p-col-12 p-md-3">
                        <label htmlFor="zip">Zip</label>
                        <InputText id="zip" type="text" />
                    </div>
                </div>
            </div>
        )
    }
}                
const rootElement = document.getElementById("root");
ReactDOM.render(<FormLayoutDemo />, rootElement);