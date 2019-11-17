import React from 'react';
import { IDBService } from './../indexedDB';
import { history } from './../history';
import { setCurrentUser } from './../actions/setCurrentUser';
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		IDBService.findWhere("users", "email", email)
			.then(
				res => {
					const response = res;
					if(response.password === password) {
						const { dispatch } = this.props;
						dispatch(setCurrentUser(response));
						localStorage.setItem("user", JSON.stringify(response));
						history.push(`/dashboard`);
					}
					else {
						alert("Wrong username or password");
					}
				},
				err => {
					alert("Wrong username or password");
				}
			)
			.catch(
				err => {
					console.log(err);
				}
			)
	}

	render() {
		const { email, password } = this.state;
		return (
			<div className="App">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Email:</label>
						<input
							type="text"
							placeholder="Enter email"
							value={email}
							name="email"
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label>Password:</label>
						<input
							type="password"
							placeholder="Enter password"
							value={password}
							name="password"
							onChange={this.handleChange}
						/>
					</div>
					<button>Login</button>
				</form>
			</div>
		);
	}
}

export default connect()(Login);