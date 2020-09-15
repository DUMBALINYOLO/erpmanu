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
                label: 'Accounting Journal Entries', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Journals', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/journals'},
                        ]
                    },
                    {
                        label: 'Unposted & Unadjusted Entries', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unpostedandunadjustedjournalentries'},
                        ]
                    },
                    {
                        label: 'Unadjusted Entries', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unadjustedjournalentries'},
                        ]
                    },
                    {
                        label: 'Unposted Entries', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unpostedjournalentries'},
                        ]
                    },
                    {
                        label: 'Posted Entries', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/postedjournalentries'},
                        ]
                    },

                ]
            },
            {
                label: 'Accounts & Transactions', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Accounts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/accounts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/accounts'}
                        ]
                    },
                    {
                        label: 'Interest Bearing Accounts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/interestbearingaccounts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/interestbearingaccounts'},
                        ]
                    },
                    {
                        label: 'In Active Accounts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inactiveaccounts'},
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

                ]
            },

            {
                label: 'Bills & Assets', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Assets', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/assets/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/assets'},
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
                label: 'Accounting Books', icon: 'pi pi-fw pi-ticket',
                items: [

                    
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
                label: 'Officers', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Shareholders', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companyshareholders'},
                            ]
                    },
                    {
                        label: 'Managers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companymanagers'}
                        ]
                    },
                    {
                        label: 'Bookkeepers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companybookkeepers'}
                        ]
                    },
                    {
                        label: 'Payroll Officers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companypayrollofficers'}
                        ]
                    },
                    {
                        label: 'Drivers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companydrivers'}
                        ]
                    },
                    {
                        label: 'Manufacturing Staff', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companymanufacturingpersonells'}
                        ]
                    },
                    {
                        label: 'Inventory Controllers', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companyinventorycontrollers'}
                        ]
                    },
                    {
                        label: 'Company Salesreps', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/companysalesreps'}
                        ]
                    },

                  
                ]
            },
            {
                label: 'Leave Requests', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Pending Leaves', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/pendingemployeeleaves'},
                        ]
                    },
                    {
                        label: 'Authorised Leaves', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/authorisedemployeeleaves'},
                        ]
                    },
                    {
                        label: 'Declined Leaves', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/declinedemployeeleaves'},
                        ]
                    },
                    {
                        label: 'Create', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeleaves/create'},
                        ]
                    },
                    
                ]
            },
            {
                label: 'Payroll Configurations', icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Pay Deductions', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaydeductions/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaydeductions'},
                        ]
                    },
                    {
                        label: 'Commission Rules', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaycommissionrules/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaycommissionrules'},
                        ]
                    },
                    {
                        label: 'Schedule', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrollschedules/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrollschedules'},
                        ]
                    },

                    {
                        label: 'Allowances', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeallowances/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeallowances'}
                        ]
                    },
                    {
                        label: 'Paygrades', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepaygrades/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepaygrades'}
                        ]
                    },

                    {
                        label: 'Payroll Dates', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolldates/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolldates'}
                        ]
                    },
                    {
                        label: 'Payroll Taxes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolltaxes/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayrolltaxes'},
                        ]
                    },
                    
                ]
            },
            {
                label: 'Human Resource', icon: 'pi pi-fw pi-users',
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
                        label: 'Attendance', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeeattendancetimesheets/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeeattendancetimesheets'},
                        ]
                    },


                    
                ]
            },
            {
    
                label: 'Payslips', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/employeepayslips/create'},
                    {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/employeepayslips'}

                            

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
                label: 'Inventory Orders', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Orders', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorders/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorders'}
                        ]
                    },
                    {
                        label: 'Received & Paid', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullyreceivedandtotalpaidfororders'}
                        ]
                    },

                    {
                        label: 'Received, Paid & Verified', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullyreceivedtotalpaidforandverifiedorders'}
                        ]
                    },
                    {
                        label: 'Payments', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorderpayments'},
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventoryorderpayments/create'}

                        ]
                    },

                ]
            },
            {
                label: 'Inventory Configurations', icon: 'pi pi-fw pi-calendar',
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
                        label: 'Inventory Categories', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/inventorycategories/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorycategories'},
                        ]
                    },
                    {
                        label: 'Debit Notes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/debitnotes/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/debitnotes'}
                        ]
                    },



                ]
            },
            {
                label: 'Stock Management', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Stock Items', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Add', icon: 'pi pi-fw pi-bookmark', to: '/inventorystockitems/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorystockitems'}
                        ]
                    },

                    {
                        label: 'Stock Receipts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Receive', icon: 'pi pi-fw pi-bookmark', to: '/inventoryreceipts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventoryreceipts'}
                        ]
                    },
                    {
                        label: 'Stock Takes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Take', icon: 'pi pi-fw pi-bookmark', to: '/inventorystocktakes/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/inventorystocktakes'}
                        ]
                    },
                    {
                        label: 'Stock Adjustments', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/stockadjustments'}
                        ]
                    },


                ]
            },
            {
                label: 'Inventory Items', icon: 'pi pi-fw pi-calendar',
                items: [
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
            },
            {
                label: 'Company Suppliers', icon: 'pi pi-fw pi-calendar',
                items: [
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


                ]
            },

            {
                label: 'Sales', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Quotations', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/quotations'}
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
                        label: 'Make Sales Invoices', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/fullypaidnotyetsalesinvoices'}
                        ]
                    },
                    {
                        label: 'Sales', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/sales'},
                        ]
                    },
                    {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/sales/create'},



                ]
            },
            {
                label: 'Sales Payments', icon: 'pi pi-fw pi-calendar',
                items: [
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

                ]
            },
            {
                label: 'Sales Returns & Discounts', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Credit Notes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/creditnotes/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/creditnotes'}
                        ]
                    },
                    {
                        label: 'Sales Groups Pricing Discounts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/salesgroupspricingdiscounts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/salesgroupspricingdiscounts'}
                        ]
                    },


                ]
            },
            {
                label: 'Production Process', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Unverified Production Processes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/unverifiedproductionprocesses'}
                        ]
                    },
                    {label: 'CREATE', icon: 'pi pi-fw pi-bookmark', to: '/productionprocess'},
                    {
                        label: 'Verified Production Processes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/verifiedproductionprocesses'}
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
                        label: 'Production Orders', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/productionorders/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/productionorders'}
                        ]
                    },
                    {
                        label: 'Process Rates', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processrates/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processrates'}
                        ]
                    },

                ]
            },
            {
                label: 'Manufactured Stock Management', icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Stock Adjustments', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockadjustments'}
                        ]
                    },
                    {
                        label: 'Stock Receipts', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Receive', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockreceipts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstockreceipts'}
                        ]
                    },
                    {
                        label: 'Process Products', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processproducts/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processproducts'}
                        ]
                    },
                    {
                        label: 'Stock Takes', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstocktakes/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/processedproductstocktakes'}
                        ]
                    },
                    {
                        label: 'Stock Items', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Add', icon: 'pi pi-fw pi-bookmark', to: '/manufacturedstockitems/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/manufacturedstockitems'},
                        ]
                    },
                    {
                        label: 'Waste Generation Reports', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Create', icon: 'pi pi-fw pi-bookmark', to: '/wastegenerationreports/create'},
                            {label: 'View', icon: 'pi pi-fw pi-bookmark', to: '/wastegenerationreports'},
                        ]
                    },

                ]
            },
            {
                label: 'Manufacturing Shifts & Personel', icon: 'pi pi-fw pi-calendar',
                items: [
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
