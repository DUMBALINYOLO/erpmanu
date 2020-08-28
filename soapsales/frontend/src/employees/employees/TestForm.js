import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {RadioButton} from 'primereact/radiobutton';

export class InputGroupDemo extends Component {

    constructor() {
        super();
        this.state = {
            usernameChecked: false,
            priceChecked: false,
            website1Checked: false,
            website2Checked: false,
        }
    }

    render() {
        return (
            <div>
                <h3 className="first">Addons</h3>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Username" />
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">$</span>
                            <InputText placeholder="Price" />
                            <span className="p-inputgroup-addon">.00</span>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">W</span>
                            <InputText placeholder="Website" />
                        </div>
                    </div>
                </div>

                <h3>Multiple Addons</h3>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-clock"></i>
                            </span>
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-star"></i>
                            </span>
                            <InputText placeholder="Price" />
                            <span className="p-inputgroup-addon">$</span>
                            <span className="p-inputgroup-addon">.00</span>
                        </div>
                    </div>
                </div>

                <h3>Button Addons</h3>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <Button label="Search"/>
                            <InputText placeholder="Keyword"/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <InputText placeholder="Keyword"/>
                            <Button icon="pi pi-search" className="p-button-warning"/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <Button icon="pi pi-check" className="p-button-success"/>
                            <InputText placeholder="Vote"/>
                            <Button icon="pi pi-times" className="p-button-danger"/>
                        </div>
                    </div>
                </div>

                <h3>Checkbox and RadioButton</h3>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Checkbox checked={this.state.usernameChecked} onChange={(e) => this.setState({usernameChecked: !this.state.usernameChecked})} />
                            </span>
                            <InputText placeholder="Username"/>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <InputText placeholder="Price"/>
                            <span className="p-inputgroup-addon">
                                <RadioButton checked={this.state.priceChecked} value="price" onChange={(e) => this.setState({priceChecked: e.checked})} />
                            </span>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Checkbox checked={this.state.website1Checked} onChange={(e) => this.setState({website1Checked: !this.state.website1Checked})} />
                            </span>
                            <InputText placeholder="Website"/>
                            <span className="p-inputgroup-addon">
                                <RadioButton checked={this.state.website2Checked} value="price" onChange={(e) => this.setState({website2Checked: e.checked})} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<InputGroupDemo />, rootElement);