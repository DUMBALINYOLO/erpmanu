import React, { Component, Fragment } from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '..//../actions/auth';





class Login  extends Component{
	state = {
		username: '',
		password: '',
	}


	static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e =>{
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	};


	render(){
		if(this.props.isAuthenticated){
			return <Redirect to="/dashboard" />;
		}
		const {username, password} = this.state;
		return(

			<Fragment>
				<h1>Login</h1>

					<form onSubmit={this.onSubmit}>
			                <div className="p-field">
			                  <label>Username</label>
			                  <input
			                    className="form-control"
			                    type="text"
			                    name="username"
			                    onChange={this.onChange}
			                    value={username}
			                  />
			                </div>
			                <div className="form-group">
			                  <label>Password</label>
			                  <input
			                    className="form-control"
			                    type="password"
			                    name="password"
			                    onChange={this.onChange}
			                    value={password}
			                  />
			                </div>
		                <div className="p-field">
		                  <Button label="Login" className="p-button-raised p-button-rounded" />
		                </div>
		                <p>
		                	Dont have an Account?<Link to="/register">Register</Link>
		                </p>
		             </form>

			</Fragment>

		);
	}
}

const mapStateToProps = state =>({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login }) (Login);
