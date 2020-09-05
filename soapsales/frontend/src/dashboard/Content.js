import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import {AppProfile} from './AppProfile';
import Dashboard from './components/Dashboard';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './layout/layout.scss';
import './App.scss';


class Content extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/dash-view'}},
            {
                label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
                items: [
                    {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'static'}) },
                    {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'overlay'}) }
                ]
            },
            {
                label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                items: [
                    {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
                    {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
                ]
            },
            {
                label: 'Configurations', icon: 'pi pi-fw pi-unlock',
                items: [
                    {
                        label: 'Employee Config', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeconfig'},
                        ]
                    },
                    {
                        label: 'Accounting Configuration', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accountingconfiguration'},
                        ]
                    },
                    {
                        label: 'Event Config', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/eventconfig'},
                        ]
                    },
                    {
                        label: 'Inventory Config', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/config'},
                        ]
                    },
                ]
            },
            {
                label: 'Accounting', icon: 'pi pi-fw pi-ticket',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Interest Bearing Accounts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/interestbearingaccounts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/interestbearingaccounts'},
                                ]
                            },
                            {
                                label: 'Ledgers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/ledgers'},
                                ]
                            },
                            {
                                label: 'Accounting Posts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/accountingposts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accountingposts'}
                                ]
                            },
                            {
                                label: 'Accounting Adjustments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/accountingadjustments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accountingadjustments'}
                                ]
                            },
                            {
                                label: 'Debits', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/debits'},
                                ]
                            },
                            {
                                label: 'Credits', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/credits'},
                                ]
                            },
                            {
                                label: 'Fully Paid Not Verified Bills', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullypaidnotverifiedbills'},
                                ]
                            },
                            {
                                label: 'Fully Paid Bills', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullypaidbills'},
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Accounts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/accounts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accounts'}
                                ]
                            },
                            {
                                label: 'Workbooks', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/workbooks/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/workbooks'}
                                ]
                            },
                            {
                                label: 'Assets', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/assets/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/assets'},
                                ]
                            },
                            {
                                label: 'Taxes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/taxes'}
                                ]
                            },
                            {
                                label: 'Currencies', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/currencies'}
                                ]
                            },
                            {
                                label: 'Bills', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/bills/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/bills'}
                                ]
                            },
                            {
                                label: 'Bill Payments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/billpayments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/billpayments'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 3', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Journals', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/journals'},
                                ]
                            },
                            {
                                label: 'Unposted And Unadjusted Journal Entries', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unpostedandunadjustedjournalentries'},
                                ]
                            },
                            {
                                label: 'Unadjusted Journal Entries', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unadjustedjournalentries'},
                                ]
                            },
                            {
                                label: 'Unposted Journal Entries', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unpostedjournalentries'},
                                ]
                            },
                            {
                                label: 'Posted Journal Entries', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/postedjournalentries'},
                                ]
                            },
                            {
                                label: 'In Active Accounts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inactiveaccounts'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Customers', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Deactivated Customers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/deactivatedcustomers'},
                        ]
                    },
                    {
                        label: 'Customer Addresses', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/customeraddresses/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/customeraddresses'},
                        ]
                    },
                    {
                        label: 'Active Customers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/activecustomers/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/activecustomers'},
                        ]
                    },
                ]
            },
            {
                label: 'Employees', icon: 'pi pi-fw pi-user-edit',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Company Shareholders', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companyshareholders/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companyshareholders'},
                                ]
                            },
                            {
                                label: 'Company Managers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companymanagers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companymanagers'}
                                ]
                            },
                            {
                                label: 'Company Bookkeepers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companybookkeepers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companybookkeepers'}
                                ]
                            },
                            {
                                label: 'Company Payroll Officers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companypayrollofficers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companypayrollofficers'}
                                ]
                            },
                            {
                                label: 'Company Drivers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companydrivers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companydrivers'}
                                ]
                            },
                            {
                                label: 'Manufacturing Personells', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companymanufacturingpersonells/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companymanufacturingpersonells'}
                                ]
                            },
                            {
                                label: 'Inventory Controllers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companyinventorycontrollers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companyinventorycontrollers'}
                                ]
                            },
                            {
                                label: 'Company Salesreps', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/companysalesreps/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companysalesreps'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Employees', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employees/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employees'}
                                ]
                            },
                            {
                                label: 'Pending Employee Leaves', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/pendingemployeeleaves'},
                                ]
                            },
                            {
                                label: 'Authorised Employee Leaves', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/authorisedemployeeleaves'},
                                ]
                            },
                            {
                                label: 'Declined Employee Leaves', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/declinedemployeeleaves'},
                                ]
                            },
                            {
                                label: 'Employee Leaves', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeleaves/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeleaves'},
                                ]
                            },
                            {
                                label: 'Employee Pay Deductions', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaydeductions/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaydeductions'},
                                ]
                            },
                            {
                                label: 'Pay Commission Rules', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaycommissionrules/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaycommissionrules'},
                                ]
                            },
                            {
                                label: 'Employee Payroll Schedules', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrollschedules/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrollschedules'},
                                ]
                            },
                            {
                                label: 'Attendance Timesheets', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeattendancetimesheets/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeattendancetimesheets'},
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 3', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Employee Contracts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeecontracts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeecontracts'}
                                ]
                            },
                            {
                                label: 'Contracts Terminations', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeecontractsterminations/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeecontractsterminations'},
                                ]
                            },
                            {
                                label: 'Employee Departments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeedepartments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeedepartments'}
                                ]
                            },
                            {
                                label: 'Employee Paygrades', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaygrades/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaygrades'}
                                ]
                            },
                            {
                                label: 'Employee Allowances', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeallowances/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeallowances'}
                                ]
                            },
                            {
                                label: 'Employee Payslips', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayslips/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayslips'}
                                ]
                            },
                            {
                                label: 'Employee Payroll Dates', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolldates/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolldates'}
                                ]
                            },
                            {
                                label: 'Employee Payroll Taxes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolltaxes/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolltaxes'},
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Events', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Upcoming Events', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/upcomingevents'},
                        ]
                    },
                    {
                        label: 'Completed Events', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/completedevents/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/completedevents'},
                        ]
                    },
                ]
            },
            {
                label: 'Inventory', icon: 'pi pi-fw pi-file-o',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Inventory Categories', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventorycategories/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorycategories'},
                                ]
                            },
                            {
                                label: 'Inventory Orders', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventororders/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventororders'}
                                ]
                            },
                            {
                                label: 'Inventory Orderpayments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorderpayments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorderpayments'}
                                ]
                            },
                            {
                                label: 'Inventory Stock Items', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventorystockitems/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorystockitems'}
                                ]
                            },
                            {
                                label: 'Order Items', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/orderitems/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/orderitems'}
                                ]
                            },
                            {
                                label: 'Inventory Receipts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventoryreceipts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventoryreceipts'}
                                ]
                            },
                            {
                                label: 'Inventory Stock Takes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventorystocktakes/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorystocktakes'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Debit Notes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/debitnotes/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/debitnotes'}
                                ]
                            },
                            {
                                label: 'Stock Adjustments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/stockadjustments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/stockadjustments'}
                                ]
                            },
                            {
                                label: 'Active Suppliers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/activesuppliers/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/activesuppliers'},
                                ]
                            },
                            {
                                label: 'DeActived Suppliers', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/deactivedsuppliers'}
                                ]
                            },
                            {
                                label: 'Fully Received And Total Paid For Orders', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullyreceivedandtotalpaidfororders'}
                                ]
                            },
                            {
                                label: 'Fully Received Total Paid For And Verified Orders', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullyreceivedtotalpaidforandverifiedorders'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 3', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Warehouses', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/warehouses/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/warehouses'},
                                ]
                            },
                            {
                                label: 'Storage Medias', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/storagemedias/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/storagemedias'},
                                ]
                            },
                            {
                                label: 'Raw Materials', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/rawmaterials/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/rawmaterials'},
                                ]
                            },
                            {
                                label: 'Equipments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/equipments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/equipments'},
                                ]
                            },
                            {
                                label: 'Consumables', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/consumables/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/consumables'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Invoicing', icon: 'pi pi-fw pi-money-bill',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Sales', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/sales/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/sales'},
                                ]
                            },
                            {
                                label: 'Quotations', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/quotations/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/quotations'}
                                ]
                            },
                            {
                                label: 'Credit Notes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/creditnotes/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/creditnotes'}
                                ]
                            },
                            {
                                label: 'Payments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/payments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/payments'}
                                ]
                            },
                            {
                                label: 'Receipts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/receipts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/receipts'}
                                ]
                            },
                            {
                                label: 'Invoice Lines', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/invoicelines/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/invoicelines'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Sales Groups Pricing Discounts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/salesgroupspricingdiscounts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/salesgroupspricingdiscounts'}
                                ]
                            },
                            {
                                label: 'Unverified Invoices', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unverifiedinvoices'}
                                ]
                            },
                            {
                                label: 'Overdue Invoices', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/overdueinvoices'},
                                ]
                            },
                            {
                                label: 'Voided Invoices', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/voidedinvoices'}
                                ]
                            },
                            {
                                label: 'Refunded Invoices', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/refundedinvoices'}
                                ]
                            },
                            {
                                label: 'Fullypaid Not Yet Sales Invoices', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullypaidnotyetsalesinvoices'}
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Manufacture', icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Manufactured Stock Items', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/manufacturedstockitems/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/manufacturedstockitems'},
                                ]
                            },
                            {
                                label: 'Process Machines', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processmachines'},
                                ]
                            },
                            {
                                label: 'Process Machine Groups', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processmachinegroups/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processmachinegroups'}
                                ]
                            },
                            {
                                label: 'Accounting Adjustments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/accountingadjustments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accountingadjustments'}
                                ]
                            },
                            {
                                label: 'Shifts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/shifts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/shifts'}
                                ]
                            },
                            {
                                label: 'Shift Schedules', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/shiftschedules/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/shiftschedules'}
                                ]
                            },
                            {
                                label: 'Process Rates', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processrates/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processrates'}
                                ]
                            },
                            {
                                label: 'Production Orders', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/productionorders/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/productionorders'}
                                ]
                            },
                            {
                                label: 'Process Products', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processproducts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processproducts'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Manufacturing Teams', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/manufacturingteams/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/manufacturingteams'}
                                ]
                            },
                            {
                                label: 'Manufacturing Personels', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/manufacturingpersonels/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/manufacturingpersonels'}
                                ]
                            },
                            {
                                label: 'Waste Generation Reports', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/wastegenerationreports/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/wastegenerationreports'},
                                ]
                            },
                            {
                                label: 'Unverified Production Processes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unverifiedproductionprocesses'}
                                ]
                            },
                            {
                                label: 'Verified Production Processes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/verifiedproductionprocesses'}
                                ]
                            },
                            {
                                label: 'Processed Product Stock Adjustments', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockadjustments/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockadjustments'}
                                ]
                            },
                            {
                                label: 'Processed Product Stock Receipts', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockreceipts/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockreceipts'}
                                ]
                            },
                            {
                                label: 'Processed Product Stock Takes', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstocktakes/create'},
                                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstocktakes'}
                                ]
                            },
                        ]
                    },
                ]
            },
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu}/>

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <AppProfile />
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <Dashboard />

                <AppFooter />

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default Content;
