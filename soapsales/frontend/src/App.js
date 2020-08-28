import React, {Component, Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import Home from './components/Home/Home';
import Default from './components/Home/Default';
import Content from "./dashboard/Content";
import Dashboard from './dashboard/components/Dashboard';

import ProcessMachineGroups from './manufacture/ProcessMachineGroups';

import Taxes from './accounts/taxes/Taxes';
import TaxForm from './accounts/taxes/TaxForm';

import Journals from './accounts/journals/Journals';

import Assets from './accounts/assets/Assets';

import Currencies from './accounts/currencies/Currencies';

import EmployeePayrollSchedules from './employees/employeepayrollschedules/EmployeePayrollSchedules';
import EmployeePayrollScheduleForm from './employees/employeepayrollschedules/EmployeePayrollScheduleForm';

import Alerts from './components/alerts/Alert';

//Alert Options
const alertOptions = {
	timeout: 30000,
	position: 'top center'
}


class App extends Component {
	render(){
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions} >
					<Fragment>
						< Alerts />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/dashboard' component={Content} />
							<Route exact path='/dash-view' component={Dashboard} />

							<Route exact path='/taxes' component={Taxes} />
							<Route exact path='/taxes/create' component={TaxForm} />

							<Route exact path='/assets' component={Assets} />

							<Route exact path='/journals' component={Journals} />

							<Route exact path='/currencies' component={Currencies} />

							<Route exact path='/employeepayrollschedules' component={EmployeePayrollSchedules} />
							<Route exact path='/employeepayrollschedules/create' component={EmployeePayrollScheduleForm} />

							<Route exact path='/processmachinegroups' component={ProcessMachineGroups} />

							<Route component={Default} />
						</Switch>
					</Fragment>
				</AlertProvider>
			</Provider>
		);
	}
}

export default App;
