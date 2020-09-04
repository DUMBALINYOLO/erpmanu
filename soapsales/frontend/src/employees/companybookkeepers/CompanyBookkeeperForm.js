import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCompanyBookkeeper } from '..//../actions/companybookkeepers';
import PropTypes from 'prop-types';
import { getEmployeePaygrades } from '..//../actions/employeepaygrades';
import { getEmployeesTypeChoices, getEmployeesGenderChoices } from '..//../actions/choices';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea';
import {Checkbox} from 'primereact/checkbox';
import {Calendar} from "primereact/calendar";


class CompanyBookkeeperForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
			category: null,
			phone: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			address: '',
			date_of_birth: '',
			id_number: '',
			gender: null,
			pay_grade: null,
			leave_days: '',
			last_leave_day_increment: '',
			uses_timesheet: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategory = this.onCategory.bind(this);
        this.onGender = this.onGender.bind(this);
        this.onPayGrade = this.onPayGrade.bind(this);
        this.onUsesTimesheet = this.onUsesTimesheet.bind(this)
    }

    onUsesTimesheet() {
        this.setState({
            uses_timesheet: !this.state.checked
        });
    }

    onCategory (e){
        this.setState({category: e.value})
    }

    onGender (e){
        this.setState({gender: e.value})
    }

    onPayGrade (e){
        this.setState({pay_grade: e.value})
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {
            email,
			category,
			phone,
			first_name,
			middle_name,
			last_name,
			address,
			date_of_birth,
			id_number,
			gender,
			pay_grade,
			leave_days,
			last_leave_day_increment,
			uses_timesheet,
        } = this.state;
        const companybookkeeper = {
            email,
			category,
			phone,
			first_name,
			middle_name,
			last_name,
			address,
			date_of_birth,
			id_number,
			gender,
			pay_grade,
			leave_days,
			last_leave_day_increment,
			uses_timesheet,
        };
        this.props.addCompanyBookkeeper(companybookkeeper);
        this.setState({
            email: '',
			category: '',
			phone: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			address: '',
			date_of_birth: '',
			id_number: '',
			gender: '',
			pay_grade: '',
			leave_days: '',
			last_leave_day_increment: '',
			uses_timesheet: true,
        });
        this.props.history.push('/companybookkeepers');
    };

    static propTypes = {
        addCompanyBookkeeper: PropTypes.func.isRequired,
        getEmployeesTypeChoices: PropTypes.func.isRequired,
        getEmployeesGenderChoices: PropTypes.func.isRequired,
        getEmployeePaygrades: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getEmployeesTypeChoices()
        this.props.getEmployeesGenderChoices()
        this.props.getEmployeePaygrades()
    }

    render() {
        const {
            email,
			category,
			phone,
			first_name,
			middle_name,
			last_name,
			address,
			date_of_birth,
			id_number,
			gender,
			pay_grade,
			leave_days,
			last_leave_day_increment,
        } = this.state;

        const { employeestypechoices } = this.props;
        const { employeesgenderchoices } = this.props;
        const { employeepaygrades } = this.props;

        return (
            <div className="card card-body mt-4 mb-4">
              <h2>Manage Company Bookkeeper</h2>
              <form onSubmit={this.onSubmit}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="first_name"
                                onChange={this.onChange}
                                value={first_name}
                            />
                            <label htmlFor="inputtext">First Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="middle_name"
                                onChange={this.onChange}
                                value={middle_name}
                            />
                            <label htmlFor="inputtext">Middle Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="last_name"
                                onChange={this.onChange}
                                value={last_name}
                            />
                            <label htmlFor="inputtext">Last Name</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="phone"
                                onChange={this.onChange}
                                value={phone}
                            />
                            <label htmlFor="inputtext">Phone</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                            <label htmlFor="inputtext">Email</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="id_number"
                                onChange={this.onChange}
                                value={id_number}
                            />
                            <label htmlFor="inputtext">Id Number</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                            <InputText
                                name="leave_days"
                                onChange={this.onChange}
                                value={leave_days}
                            />
                            <label htmlFor="inputtext">Leave Days</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="last_leave_day_increment"
                            onChange={this.onChange}
                            value={last_leave_day_increment}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Last Leave Day Increment</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Calendar
                            showIcon={true}
                            className="form-control"
                            name="date_of_birth"
                            onChange={this.onChange}
                            value={date_of_birth}
                            dateFormat="yy-mm-dd"
                        />
                        <label htmlFor="inputtext">Date Of Birth</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-12">
                        <span className="p-float-label">
                            <InputTextarea
                                name="address"
                                onChange={this.onChange}
                                value={address}
                            />
                            <label htmlFor="inputtext">Address</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-formgroup-inline">
                        <label>USES TIMESHEET :</label>
                        <Checkbox
                            inputId="working"
                            onChange={this.onUsesTimesheet}
                            checked={this.state.uses_timesheet}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={category}
                            onChange={this.onCategory}
                            options={employeestypechoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT CATEGORY</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={gender}
                            onChange={this.onGender}
                            options={employeesgenderchoices}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="value"
                            optionValue="key"
                        />
                        <label htmlFor="dropdown">SELECT GENDER</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <span className="p-float-label">
                        <Dropdown
                            value={pay_grade}
                            onChange={this.onPayGrade}
                            options={employeepaygrades}
                            filter={true}
                            filterBy="id,name"
                            showClear={true}
                            optionLabel="name"
                            optionValue="id"
                        />
                        <label htmlFor="dropdown">SELECT PAY GRADE</label>
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
    employeestypechoices: state.employeestypechoices.employeestypechoices,
    employeesgenderchoices: state.employeesgenderchoices.employeesgenderchoices,
    employeepaygrades: state.employeepaygrades.employeepaygrades
})
export default connect(mapStateToProps, {getEmployeesTypeChoices, getEmployeesGenderChoices, getEmployeePaygrades, addCompanyBookkeeper})(CompanyBookkeeperForm);
