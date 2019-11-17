import React from 'react';

class Dashboard extends React.Component {
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

	render() {
		const { email, password } = this.state;
		return (
			<div className="App">
				<h1>Signup</h1>
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

export default Dashboard;