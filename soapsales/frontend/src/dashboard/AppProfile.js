import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { logout } from '..//./actions/auth';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">User</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button onClick={this.props.logout}className="p-link"><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}



const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps) (AppProfile);
