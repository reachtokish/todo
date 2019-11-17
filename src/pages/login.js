import React from 'react';
import { indexedDBService } from './../indexedDB';

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
	}

	componentDidMount() {
		indexedDBService.findWhere("users", "first_name", "test")
			.then(
				res => {
					console.log(res);
				}
			);
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

export default Login;
