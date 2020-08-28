import React, { Component, Fragment } from 'react';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";


class Register  extends Component{
	state = {
		username: '',
		email: '',
		password: '',
		password2: ''
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e =>{
		e.preventDefault();
		console.log('submit')
	};


	render(){
		const {username, email, password, password2} = this.state;
		return(

			<Fragment>
				<h1>Create Staff User</h1>
				<div className="p-fluid p-formgrid p-grid">
					<form onSubmit={this.onSubmit}>
		                <div className="form-group">
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
		                  <label>Email</label>
		                  <input
		                    className="form-control"
		                    type="email"
		                    name="email"
		                    onChange={this.onChange}
		                    value={email}
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
		                <div className="form-group">
		                  <label>Password2</label>
		                  <input
		                    className="form-control"
		                    type="password2"
		                    name="password2"
		                    onChange={this.onChange}
		                    value={password2}
		                  />
		                </div>
		                <div className="form-group">
		                  <Button label="Register" className="p-button-raised p-button-rounded" />
		                </div>
		                <p>
		                	Already have an Account?<Link to="/login">Login</Link>
		                </p>
		             </form>
	             </div>
			</Fragment>

		);
	}
}

export default Register;