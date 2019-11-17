import React from 'react';
import { IDBService } from './../indexedDB';
import { history } from './../history';
import { setCurrentUser } from './../actions/setCurrentUser';
import { connect } from 'react-redux';
import DB from './../dexieConfig';

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
		if(email && password) {
			DB.users.where('email').equals(email).toArray(user => {
				if(user.length > 0) {
					const checkValidPass = user.filter(el => el.password === password);
					if(checkValidPass.length > 0) {
						const { dispatch } = this.props;
						dispatch(setCurrentUser(user[0]));
						localStorage.setItem("user", JSON.stringify(user[0]));
						history.push(`/dashboard`);
					}
					else {
						alert("Wrong username or password");
					}
				}
				else {
					alert("Wrong username or password");
				}
			});
		}
		else {
			alert("Email or Password can't be empty");
		}
	}

	render() {
		const { email, password } = this.state;
		return (
			<div className="login_page">
				<div>
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
			</div>
		);
	}
}

export default connect()(Login);